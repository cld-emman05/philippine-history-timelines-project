import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent
  implements OnInit {
  events: any[] = [];
  articles: any[] = [];
  constructor(private afs: AngularFirestore, public auth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
    this.afs.collection(`Events`, filter => filter.orderBy('timestamp', 'desc')).snapshotChanges().subscribe(
      (data: any) => {
        this.events = [];
        data.forEach((info: any) => {
          let event: any = info.payload.doc.data();
          event.id = info.payload.doc.id;

          this.events.push(event);
        });
      });

    this.afs.collection(`Articles`, filter => filter.orderBy('timestamp', 'desc')).snapshotChanges().subscribe(
      (data: any) => {
        this.articles = [];
        data.forEach((info: any) => {
          let article: any = info.payload.doc.data();
          article.id = info.payload.doc.id;

          this.articles.push(article);
        });
      });
  }

  monthToString(index: any) {
    if (index) {
      return new Date(-1, index, -1).toLocaleDateString("en", { month: "long" })
    }
    else {
      return null
    }
  }

  editEvent(event: any) {
    this.router.navigate(['/edit-event', event.id]);
  }

  delEvent(event: any) {
    this.router.navigate(['/del-event', event.id]);
  }

  editArticle(id: string) {
    this.afs.doc(`Articles/${id}`).update({
      color: 'info',
      action: 'Updated on',
      timestamp: new Date()
    });
  }

  delArticle(id: string) {
    this.afs.doc(`Articles/${id}`).delete();
  }
}

import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent
  implements OnInit {
  events: any[] = [];
  articles: any[] = [];
  constructor(private afs: AngularFirestore, public auth: AngularFireAuth) { }

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

  editEvent(event: any) {
    this.afs.doc(`Events/${event.id}`).update({
      color: 'info',
      action: 'Updated on',
      timestamp: new Date()
    });
  }

  delEvent(event: any) {
    this.afs.doc(`Events/${event.id}`).delete();
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

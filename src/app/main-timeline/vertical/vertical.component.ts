import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-vertical',
  templateUrl: './vertical.component.html',
  styleUrls: ['./vertical.component.css']
})
export class VerticalComponent implements OnInit {
  public show: boolean = false;
  public icon: any = 'bi bi-eye-fill';
  public status: any = 'Show'

  events: any[] = [];

  constructor(private afs: AngularFirestore) {

  }

  ngOnInit(): void {
    this.afs.collection(`Events`, filter => filter.orderBy('startPeriod.year', 'desc').orderBy('startPeriod.month', 'desc').orderBy('startPeriod.day', 'desc')).snapshotChanges().subscribe(
      (data: any) => {
        this.events = [];
        data.forEach((info: any) => {
          let event: any = info.payload.doc.data();
          event.id = info.payload.doc.id;

          this.events.push(event);
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

  toggle() {
    this.show = !this.show;

    // CHANGE THE NAME OF THE BUTTON.
    if (this.show) {
      this.icon = "bi bi-eye-slash-fill";
      this.status = 'Hide';
    }

    else {
      this.status = 'Show';
      this.icon = "bi bi-eye-fill";
    }

  }

}

import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFireAuth } from '@angular/fire/auth';
import { Month } from '../month';


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  constructor(private afs: AngularFirestore, private router: Router, public auth: AngularFireAuth) { }
  date = new Date();
  startMonth: any;
  startYear: any;
  startDay: any;

  endMonth: any;
  endYear: any;
  endDay: any;
  hide: boolean = true;
  hideEd: boolean = true;
  startDays: any = [];
  endDays: any = [];


  startMonths = Array.from({ length: 12 }, (e, i) => {
    return {
      id: i + 1,
      name: new Date(-1, i + 1, -1).toLocaleDateString("en", { month: "long" })
    }
  })

  endMonths = Array.from({ length: 12 }, (e, i) => {
    return {
      id: i + 1,
      name: new Date(-1, i + 1, -1).toLocaleDateString("en", { month: "long" })
    }
  })

  user: any;

  ngOnInit(): void {
    this.auth.user.subscribe(info => {
      if (info) {
        this.user = info?.displayName;
      }
      else {
        this.router.navigate(['/']).then(data => {
          alert('You must login first')
        })
      }
    })
  }


  form = new FormGroup({
    eventName: new FormControl('', Validators.required),
    eventStartYear: new FormControl('', Validators.required),
    eventStartMonth: new FormControl(''),
    eventStartDay: new FormControl(''),
    eventEndYear: new FormControl(''),
    eventEndMonth: new FormControl(''),
    eventEndDay: new FormControl(''),
    eventDesc: new FormControl(''),
    eventTagCloud: new FormControl(''),
    eventRelLink: new FormControl('http://'),
    eventImgLink: new FormControl('http://')
  });

  viewStartMonth(input: any) {
    if (input) {
      this.hide = false
      this.startYear = input;
    }
    else {
      this.hide = true
    }
  }

  getStartDay(month: any) {
    this.startMonth = month;
    this.startDay = new Date(this.startYear, month, 0).getDate();

    this.startDays = Array.from({ length: this.startDay }, (e, i) => {
      return i + 1;
    })
  }

  viewEndMonth(input: any) {
    if (input) {
      this.hideEd = false
      this.endYear = input;
    }
    else {
      this.hideEd = true
    }
  }

  getEndDay(month: any) {
    this.endMonth = month;
    this.endDay = new Date(this.endYear, month, 0).getDate();

    this.endDays = Array.from({ length: this.endDay }, (e, i) => {
      return i + 1;
    })
  }

  add() {
    let startPeriod = {
      month: this.form.value.eventStartMonth,
      day: this.form.value.eventStartDay,
      year: this.form.value.eventStartYear,
    }

    let endPeriod = {
      month: this.form.value.eventEndMonth,
      day: this.form.value.eventEndDay,
      year: this.form.value.eventEndYear,
    };

    let name = this.form.value.eventName;
    console.log(this.form.value.eventStartDate);


    let description = this.form.value.eventDesc;

    let tags: string[] = [];
    this.form.value.eventTagCloud.split(/[,]+/).forEach((element: any) => {
      tags.push(element.replace(/([a-z])([A-Z])/g, '$1-$2')    // get all lowercase letters that are near to uppercase ones
        .replace(/[\s_.,]+/g, '-').replace('\\', '-').replace('\/', '-')                // replace all spaces and low dash
        .toLowerCase())
    });

    let relLink = this.form.value.eventRelLink;
    let imgLink = this.form.value.eventImgLink;

    if (!name) {
      alert('Missing Event Name');
      this.router.navigate(['/add-event']);
    }
    else if (!startPeriod.year) {
      alert('Missing Start Date');
      this.router.navigate(['/add-event']);
    }
    else {
      this.afs.collection(`Events`).add({
        name, startPeriod, endPeriod,
        description, tags, relLink, imgLink,
        color: 'info',
        action: 'Created on',
        timestamp: new Date(),
        submittedBy: this.user
      }).then(data => {
        alert('Event has been created'),
          this.router.navigate(['/']);
      });

    }
  }

}

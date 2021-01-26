import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})

export class EditEventComponent implements OnInit {
  constructor(private afs: AngularFirestore, private router: Router, public auth: AngularFireAuth,
    private route: ActivatedRoute) { }
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
  id: any;

  ngOnInit(): void {
    this.auth.user.subscribe(info => {
      if (info) {
        this.user = info?.displayName;

        this.id = this.route.snapshot.params.id;

        this.afs.doc(`Events/${this.id}`).get().subscribe(data => {
          if (data.exists) {
            this.form.patchValue({
              eventName: data.get('name'),
              eventStartYear: data.get('startPeriod.year'),
              eventStartMonth: data.get('startPeriod.month'),
              eventStartDay: data.get('startPeriod.day'),
              eventEndYear: data.get('endPeriod.year'),
              eventEndMonth: data.get('endPeriod.month'),
              eventEndDay: data.get('endPeriod.day'),
              eventDesc: data.get('description'),
              eventTagCloud: data.get('tags'),
              eventRelLink: data.get('relLink'),
              eventImgLink: data.get('imgLink'),
            })
            this.viewStartMonth(data.get('startPeriod.year'));
            this.getStartDay(data.get('startPeriod.month'));
            this.viewEndMonth(data.get('endPeriod.year'));
            this.getEndDay(data.get('endPeriod.month'));
          }
          else {
            this.router.navigate(['/error'])
          }

        })
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

  edit() {
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
      this.router.navigate(['/edit-event', this.id]);
    }
    else if (!startPeriod.year) {
      alert('Missing Start Year');
      this.router.navigate(['/edit-event', this.id]);
    }
    else {
      this.afs.doc(`Events/${this.id}`).update({
        name, startPeriod, endPeriod,
        description, tags, relLink, imgLink,
        color: 'info',
        action: 'Updated on',
        timestamp: new Date(),
        submittedBy: this.user
      }).then(data => {
        alert('Event has been updated');
        this.router.navigate(['/']);
      });

    }
  }

}

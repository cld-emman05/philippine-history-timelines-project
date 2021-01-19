import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  constructor(private afs: AngularFirestore, private router: Router, public auth: AngularFireAuth) { }
  date = new Date();
  Era: any = [{
    'name': 'BCE', 'description': 'Before Common Era/Before Christ (BC): pertaining to the period before Christ\'s birth'
  }, {
    'name': 'CE', 'description': 'Common Era/Anno Domini (AD): pertaining period after Christ\'s birth to the present day'
  }];
  Month: any = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'];

  user: any;

  ngOnInit(): void {
    this.auth.user.subscribe(info => {
      this.user = info?.displayName;
    })

  }

  form = new FormGroup({
    eventName: new FormControl('', Validators.required),
    eventStartYear: new FormControl('', Validators.required),
    eventStartYearEra: new FormControl('', Validators.required),
    eventStartMonth: new FormControl('', Validators.required),
    eventEndYear: new FormControl(''),
    eventEndYearEra: new FormControl(''),
    eventEndMonth: new FormControl(''),
    eventDesc: new FormControl(''),
    eventTagCloud: new FormControl(''),
    eventRelLink: new FormControl('http://'),
    eventImgLink: new FormControl('http://')
  });

  add() {
    let name = this.form.value.eventName;
    let startPeriod = {
      year: this.form.value.eventStartYear,
      era: this.form.value.eventStartYearEra,
      month: this.form.value.eventStartMonth,
    };
    let endPeriod = {
      year: this.form.value.eventEndYear,
      era: this.form.value.eventEndYearEra,
      month: this.form.value.eventEndMonth,
    };
    let description = this.form.value.eventDesc;
    let tags = this.form.value.eventTagCloud.split(/[ ,]+/);
    let relLink = this.form.value.eventRelLink;
    let imgLink = this.form.value.eventImgLink;

    if (!name) {
      alert('Missing Event Name');
      this.router.navigate(['/add-event']);
    }
    else if (startPeriod.year < 0 || startPeriod.year === '') {
      alert('Missing Year for Start Date');
      this.router.navigate(['/add-event']);
    }
    else if (!startPeriod.era) {
      alert('Missing Era from Start Date');
      this.router.navigate(['/add-event']);
    }
    else if (!startPeriod.month) {
      alert('Missing Month from Start Date');
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
      });
      this.router.navigate(['/']);
    }
  }

}

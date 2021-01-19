import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {
  constructor(private afs: AngularFirestore, private router:Router) { }

  ngOnInit(): void {
  }

  add(){
    this.afs.collection(`Events`).add({
      color: 'info',
      action: 'Created on', 
      timestamp: new Date()
    });
    this.router.navigate(['/']);
  }

}

import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})

export class AddArticleComponent implements OnInit {

 constructor(private afs: AngularFirestore, private router:Router) { }

  ngOnInit(): void {
  }

  add(){
    this.afs.collection(`Articles`).add({
      color: 'info',
      action: 'Created on', 
      timestamp: new Date(),
    })
    this.router.navigate(['/']);
  }
}

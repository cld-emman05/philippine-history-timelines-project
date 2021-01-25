import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.css']
})
export class DeleteEventComponent implements OnInit {

  constructor(private afs: AngularFirestore, private router: Router, public auth: AngularFireAuth,
    private route: ActivatedRoute) { }

  id: any;
  user: any;

  ngOnInit(): void {
    this.auth.user.subscribe(info => {
      if (info) {
        this.user = info?.displayName;
        this.id = this.route.snapshot.params.id;
        this.afs.doc(`Events/${this.id}`).get().subscribe(data => {
          if (!data.exists) {
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

  delete() {
    this.afs.doc(`Events/${this.id}`).delete().then((data => {
      alert('Event has been deleted');
      this.router.navigate(['/']);
    }));

  }


}

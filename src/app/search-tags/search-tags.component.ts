import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-search-tags',
  templateUrl: './search-tags.component.html',
  styleUrls: ['./search-tags.component.css']
})
export class SearchTagsComponent implements OnInit {
  public show: boolean = false;
  public icon: any = 'bi bi-eye-fill';
  public status: any = 'Show'

  events: any[] = [];
  tagURL: string = "tag-name";

  constructor(private afs: AngularFirestore,
    private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    let search = this.route.snapshot.params.tag;
    this.tagURL = search;

    this.form.patchValue({
      searchBox: this.tagURL,
    })

    this.searchTagURL(search);
  }

  form = new FormGroup({
    searchBox: new FormControl('')
  });

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

  searchTagURL(query: any) {
    if (query != null) {
      this.tagURL = query.replace(/([a-z])([A-Z])/g, '$1-$2')    // get all lowercase letters that are near to uppercase ones
        .replace(/[\s_.,]+/g, '-').replace('\\', '-').replace('\/', '-')                // replace all spaces and low dash
        .toLowerCase();

      this.router.navigateByUrl(`search-tags/${this.tagURL}`);
    }

    if (!this.tagURL) {
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
    else {
      this.afs.collection(`Events`, filter => filter.where('tags', 'array-contains', this.tagURL)
        .orderBy('startPeriod.year', 'desc').orderBy('startPeriod.month', 'desc').orderBy('startPeriod.day', 'desc')).snapshotChanges().subscribe(
          (data: any) => {
            this.events = [];
            data.forEach((info: any) => {
              let event: any = info.payload.doc.data();
              event.id = info.payload.doc.id;

              this.events.push(event);
            });
          });

    }

  }
}

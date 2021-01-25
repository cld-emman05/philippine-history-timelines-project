import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-main-timeline',
  templateUrl: './main-timeline.component.html',
  styleUrls: ['./main-timeline.component.css']
})
export class MainTimelineComponent implements OnInit {


  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.router.navigate(['main-timeline/vertical'])
  }

}

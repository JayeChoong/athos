import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showNavigationArrows = false;


  constructor() {
   }

  ngOnInit(): void {
    // const carousel = document.getElementById('activeCarousel');
    // const video = document.querySelector('video');
    // if (carousel?.className === 'carousel-item') {
    //   video?.pause();
    // } else if (carousel?.className === 'carousel-item active') {
    //   video?.play();
    // }
  }


}

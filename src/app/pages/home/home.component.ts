import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit { 
  slides = [
    {image: './assets/athos-logo-mobile.mp4'},
    {image: './assets/athos-mobile.mp4'},
    {image: './assets/athos-logo-mobile.mp4'},
    {image: './assets/athos-mobile.mp4'},
    {image: './assets/athos-logo-mobile.mp4'},
    {image: './assets/athos-mobile.mp4'},
  ];
  slide: any;

  constructor(private pS: ProductService) {
  }

  ngOnInit(): void {
    const video = document.querySelectorAll('video');
    const w = window.innerWidth;
    let myCarousel: any;

    if (w > 1250) {
      myCarousel = document.getElementById('desktopCarousel');
      video[0].play();
      video[0].muted = true;
      this.slide = 3;
    } else if (w <= 1250) {
      myCarousel = document.getElementById('mobileCarousel');
      video[2].play();
      video[2].muted = true;
      this.slide = 1;
    };

    myCarousel!.addEventListener('slide.bs.carousel', function (evt: any) {
      if (w > 1250) {
        video[evt.to].play();
        video[evt.to].muted = true;
      } else if (w <= 1250) {
        video[evt.to + 2].play();
        video[evt.to + 2].muted = true;
      };
    });

  }
}

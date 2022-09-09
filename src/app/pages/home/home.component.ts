import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  constructor() {
  }


  ngOnInit(): void {
    const myCarousel = document.getElementById('bannerCarousel');
    myCarousel!.addEventListener('slide.bs.carousel', function () {
      // const activeCarousel = document.getElementsByClassName('carousel-item active');
      const video = document.querySelector('video');
          video!.play();
    })

    // fromEvent(this.carousel.nativeElement, 'slid.bs.carousel').subscribe(( data : any)=>  // slide.bs.carousel or slid.bs.carousel 
    // {
    //      // Look for the video element that have Active class using Selector? or document.querySelector?
    //      //  
    //      @ViewChild('activeVideoPlayer') videoplayer: ElementRef; // ACTIVE VIDEO
    //      this.videoplayer?.nativeElement.play();
    //     @ViewChild('inactiveVideoPlayer') videoplayer: ElementRef; // INACTIVE VIDEO
    //     this.videoplayer?.nativeElement.stop(); // or pause() ??

    // });
  }


}

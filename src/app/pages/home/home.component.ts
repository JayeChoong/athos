import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  slides = [
    { image: './assets/carousel/R1.jpg', left: 0, top: 0 },
    { image: './assets/carousel/R2.jpg', left: 25, top: 0 },
    { image: './assets/carousel/R3.jpg', left: 50, top: 0 },
    { image: './assets/carousel/R4.jpg', left: 60, top: 0 },
    { image: './assets/carousel/R5.jpg', left: 80, top: 0 },
    { image: './assets/carousel/R6.jpg', left: 0, top: 30 },
    { image: './assets/carousel/R7.jpg', left: 15, top: 20 },
    { image: './assets/carousel/R8.jpg', left: 35, top: 15 },
    { image: './assets/carousel/R9.jpg', left: 25, top: 65 },
    { image: './assets/carousel/R10.jpg', left: 75, top: 30 },
    { image: './assets/carousel/R11.jpg', left: 20, top: 50 },
    { image: './assets/carousel/R12.jpg', left: 20, top: 45 },
    { image: './assets/carousel/R13.jpg', left: 35, top: 35 },
    { image: './assets/carousel/R14.jpg', left: 60, top: 40 },
    { image: './assets/carousel/R15.jpg', left: 80, top: 45 },
    { image: './assets/carousel/R16.jpg', left: 0, top: 65 },
    { image: './assets/carousel/R17.jpg', left: 15, top: 65 },
    { image: './assets/carousel/R18.jpg', left: 40, top: 65 },
    { image: './assets/carousel/R19.jpg', left: 55, top: 65 },
    { image: './assets/carousel/R20.jpg', left: 80, top: 65 },
  ];
  slide: any;

  constructor(private pS: ProductService,
  ) {

    // let images = document.querySelectorAll(".img-text-container");

    // images.forEach(image => {
    //     let text = image.querySelectorAll(".black");

    //     image.addEventListener("mouseover", () => {
    //         text.forEach(item => {
    //             item.classList.remove("black");
    //             item.classList.add("white");
    //         })
    //     })

    //     image.addEventListener("mouseleave", () => {
    //         text.forEach(item => {
    //             item.classList.add("black");
    //             item.classList.remove("white");
    //         })
    //     })
    // })

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
      for (const itm of this.slides) {
        itm.left = itm.left-25;
      }
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

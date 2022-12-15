import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {
  slides = [
    {image: './assets/carousel/athos-logo-mobile.mp4'},
    {image: './assets/carousel/athos-mobile.mp4'},
    {image: './assets/carousel/athos-logo-mobile.mp4'},
    {image: './assets/carousel/athos-mobile.mp4'},
    {image: './assets/carousel/athos-logo-mobile.mp4'},
    {image: './assets/carousel/athos-mobile.mp4'},
  ];

  constructor(
    public aS: AuthService
  ) { }

  ngOnInit(): void {
  }

}

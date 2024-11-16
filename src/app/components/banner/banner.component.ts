import { Component, Input } from '@angular/core';
import { IonicSlides } from '@ionic/angular';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent {
  swiperModules = [IonicSlides];
  @Input() bannerImages: any[];
  constructor() {}
}

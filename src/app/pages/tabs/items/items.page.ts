import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { shop } from 'src/app/models/shop.model';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {
  shops: shop[] = [];
  pros: any[] = [];
  id: any;
  data = {} as shop;
  items: any[] = [];
  categories: any[] = [];
  new: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.shops = this.api.shops;
    this.pros = this.api.pros;
    this.route.paramMap.subscribe((paramMap) => {
      console.log('data', paramMap);
      if (!paramMap.has('shopId')) {
        this.navCtrl.back();
        return;
      }
      this.id = paramMap.get('shopId');
      // console.log(this.id);
      this.getItems();
    });
  }
  getItems() {
    this.data = {} as shop; //set empty when call more time
    let dataTemp = this.shops.filter((x) => x.uid === this.id);
    this.data = dataTemp[0];
    console.log('shop:', this.data);
  }
  newOnly(event) {}
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { deal } from 'src/app/models/deal.model';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-deal-items',
  templateUrl: './deal-items.page.html',
  styleUrls: ['./deal-items.page.scss'],
})
export class DealItemsPage implements OnInit {
  id: any;
  data: any;
  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      console.log('data DealItem', paramMap);
      if (!paramMap.has('dealId')) {
        this.navCtrl.back();
        return;
      }
      this.id = paramMap.get('shopId');
      // console.log(this.id);
      this.getItems();
    });
  }
  getItems() {
    this.data = {} as deal; //set empty when call more time
    this.data = {
      uid: '115abc',
      cover:
        'https://png.pngtree.com/png-clipart/20231201/ourlarge/pngtree-november-2024-calendar-sleeping-cat-png-image_10777484.png',
      title: 'List 07/11/2024',
    };
  }
}

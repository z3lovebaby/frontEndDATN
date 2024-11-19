import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global/global.service';
import { QuanlydonService } from 'src/app/services/quanlydon/quanlydon.service';

@Component({
  selector: 'app-quan-ly-order',
  templateUrl: './quan-ly-order.page.html',
  styleUrls: ['./quan-ly-order.page.scss'],
})
export class QuanLyOrderPage implements OnInit {
  lab = 'Chọn tệp';
  file: any;
  orderItems: any;
  constructor(private global: GlobalService, private order: QuanlydonService) {}
  ngOnInit() {
    this.getOrder();
  }

  preview(event) {
    this.global.showLoader();
    console.log(event);
    const files = event.target.files;
    console.log(files);
    if (files.length == 0) return;
    const mimeType = files[0].type;
    if (mimeType.match(/csv\/*/) == null) {
      this.global.errorToast('Chỉ hỗ trợ file csv. Hãy thử lại !');
      this.global.hideLoader();
      return;
    }
    this.file = files[0];
    this.lab = 'Thay đổi';
    this.global.hideLoader();
  }

  async save() {
    //console.log(this.file);
    try {
      this.global.showLoader();
      console.log(this.file);
      let postData = new FormData();
      postData.append('fileAffReport', this.file, this.file.name);
      const response = await this.order.addOrderByFileReport(postData);
      console.log(response);
      await this.getOrder();
      this.global.successToast('Banner added successfully');
      this.reset();
      this.global.hideLoader();
    } catch (e) {
      this.global.hideLoader();
      console.log(e);
    }
  }
  async getOrder() {
    try {
      this.global.showLoader();
      this.orderItems = await this.order.getOrderItems();
      console.log(this.orderItems);
      this.global.hideLoader();
    } catch (e) {
      this.global.hideLoader();
      console.log(e);
    }
  }
  private generateItems() {
    const count = this.orderItems.length + 1;
    for (let i = 0; i < 50; i++) {
      this.orderItems.push(`Item ${count + i}`);
    }
  }
  async reset() {}
  onIonInfinite(ev) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
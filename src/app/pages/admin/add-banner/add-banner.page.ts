import { GlobalService } from 'src/app/services/global/global.service';
import { BannerService } from './../../../services/banner/banner.service';
import { Component, OnInit } from '@angular/core';
import { Banner } from 'src/app/interfaces/banner.interface';

@Component({
  selector: 'app-add-banner',
  templateUrl: './add-banner.page.html',
  styleUrls: ['./add-banner.page.scss'],
})
export class AddBannerPage implements OnInit {
  bannerImage: any;
  banner_file: any;
  files: any;
  file: any;
  lab = 'Chọn tệp';
  link = '';
  bannerItems = [];

  constructor(private banner: BannerService, private global: GlobalService) {}
  ngOnInit() {
    this.getBanner();
  }

  preview(event) {
    this.global.showLoader();
    console.log(event);
    const files = event.target.files;
    console.log(files);
    if (files.length == 0) return;
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.global.hideLoader();
      return;
    }
    this.files = files;
    this.file = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log('result: ', reader.result);
      this.bannerImage = reader.result;
    };
    reader.readAsDataURL(this.file);
    this.banner_file = this.file;
    this.lab = 'Thay đổi';
    this.global.hideLoader();
  }

  async save() {
    try {
      this.global.showLoader();
      console.log(this.banner_file);
      let postData = new FormData();
      postData.append('bannerImages', this.banner_file, this.banner_file.name);
      postData.append('link', this.link);
      const response = await this.banner.addBanner(postData);
      console.log(response);
      await this.getBanner();
      this.global.successToast('Banner added successfully');
      this.reset();
      this.global.hideLoader();
    } catch (e) {
      this.global.hideLoader();
      console.log(e);
    }
  }
  async getBanner() {
    try {
      this.bannerItems = [];
      this.global.showLoader();
      this.bannerItems = await this.banner.getBanners();
      for (const data of this.bannerItems) {
        console.log(data);
        data.banner.banner = `data:image/png;base64,${data.dataFile}`;
        // const blob = new Blob([new Uint8Array(data.dataFile)], {
        //   type: 'image/png',
        // });
        // data.banner.banner = URL.createObjectURL(blob);
      }
      console.log('bna data', this.bannerItems);
      this.global.hideLoader();
    } catch (e) {
      this.global.hideLoader();
      console.log(e);
    }
  }
  newOnly(event, item) {
    item.status = event.detail.checked;
    return this.banner.updateBanner(item);
  }
  reset() {
    this.file = '';
    this.lab = 'Chọn tệp';
    this.bannerImage = '';
    this.link = '';
  }
}

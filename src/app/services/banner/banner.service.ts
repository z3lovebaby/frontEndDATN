import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Banner } from 'src/app/interfaces/banner.interface';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  constructor(private api: ApiService) {}

  async addBanner(formData) {
    try {
      const data = await this.api.post('banner/create', formData, true);
      return data;
    } catch (e) {
      throw e;
    }
  }

  async getBanners() {
    try {
      const data = await this.api.get('banner/banners');
      return data;
    } catch (e) {
      throw e;
    }
  }
  async updateBanner(item) {
    const data = {
      id: item._id,
      status: item.status,
    };
    try {
      const response = await this.api.post('banner/update', data);
      return response;
    } catch (e) {
      throw e;
    }
  }
}

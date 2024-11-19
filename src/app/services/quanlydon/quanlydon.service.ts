import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class QuanlydonService {
  constructor(private api: ApiService) {}

  async addOrderByFileReport(formData) {
    try {
      const data = await this.api.post('quanlydon/create', formData, true);
      return data;
    } catch (e) {
      throw e;
    }
  }

  async getOrderItems() {
    try {
      const res = await this.api.get('quanlydon/orderItems');
      return res.data;
    } catch (e) {
      throw e;
    }
  }
}

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

  getOrderItems(page: string) {
    try {
      const res = this.api.getOb('quanlydon/orderItems', { page: page });
      return res;
    } catch (e) {
      throw e;
    }
  }
}

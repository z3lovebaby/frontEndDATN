import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root',
})
export class ShopeeAPIService {
  constructor(
    private router: Router,
    private api: ApiService,
    private injector: Injector
  ) {}
  async convertLink(link: string): Promise<any> {
    try {
      const data = {
        link,
      };
      const response = await this.api.post('shopee/convert', data);
      console.log(response);
      return response;
    } catch (e) {
      throw e;
    }
    //return await this.storage.setStorage('uid', 'ABSGAHSJKAJSKAJSKA');
  }
  async sendOrderID(link: string): Promise<any> {
    try {
      const data = {
        link,
      };
      const response = await this.api.get('shopee/sendOrder', data);
      console.log(response);
      return response;
    } catch (e) {
      throw e;
    }
    //return await this.storage.setStorage('uid', 'ABSGAHSJKAJSKAJSKA');
  }
}

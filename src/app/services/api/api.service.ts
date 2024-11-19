import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { shop } from 'src/app/models/shop.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  bannerImgs = [
    {
      banner:
        'https://pos.nvncdn.com/14f951-12134/art/artCT/20230723_Vne80hqk.jpg',
    },
    {
      banner:
        'https://treobangron.com.vn/wp-content/uploads/2023/01/banner-shopee-12.jpg',
    },
    {
      banner:
        'https://pos.nvncdn.com/14f951-12134/art/artCT/20230723_Vne80hqk.jpg',
    },
  ];

  shops: shop[] = [
    {
      uid: '123abcd',
      cover: 'https://pos.nvncdn.com/888555-3379/ps/20240705_KRJGiRoHwT.jpeg',
      nameShop: 'Crors Official',
      type: 'Thời trang',
      rating: 4.5,
      addr: 'Hà Nội',
    },
    {
      uid: '345abcgd',
      cover: 'https://pos.nvncdn.com/888555-3379/ps/20240705_KRJGiRoHwT.jpeg',
      nameShop: 'TinNgoan',
      type: 'Thời trang',
      rating: 4.5,
      addr: 'Hà Tây',
    },
    {
      uid: '12432hns',
      cover: 'https://pos.nvncdn.com/888555-3379/ps/20240705_KRJGiRoHwT.jpeg',
      nameShop: 'Huggies Official',
      type: 'Mẹ bé',
      rating: 5,
      addr: 'Hà Nazm',
    },
  ];
  pros = [
    {
      category_id: 'e00',
      cover:
        'https://media.hcdn.vn/catalog/product/k/e/kem-chong-nang-beplain-nang-tong-kiem-dau-min-li-50ml-2-1720081924_img_680x680_d30c8d_fit_center.jpg',
      desc: 'Great in cosmetic',
      id: 'i1',
      name: 'Beplain tím nhạt',
      price: 120,
      rating: 0,
      status: true,
      uid: '12wefdss',
      variation: false,
      new: false,
    },
    {
      category_id: 'e01',
      cover:
        'https://file.hstatic.net/200000551679/file/beplain_kem_chong_nang_sunmuse_mineral_sunscreen_spf50__pa_____50ml_477d0483d7904868991a81021e2833b1_1024x1024.jpg',
      desc: 'Kem CN',
      id: 'i1',
      name: 'Beplain tím nhạt',
      price: 120,
      rating: 0,
      status: true,
      uid: '12wefdss',
      variation: false,
      new: true,
    },
    {
      category_id: 'e03',
      cover:
        'https://media.hcdn.vn/catalog/product/k/e/kem-chong-nang-beplain-nang-tong-kiem-dau-min-li-50ml-2-1720081924_img_680x680_d30c8d_fit_center.jpg',
      desc: 'Hot',
      id: 'i1',
      name: 'Beplain tím nhạt 2',
      price: 120,
      rating: 0,
      status: true,
      uid: '12wefdss',
      variation: false,
      new: false,
    },
    {
      category_id: 'e04',
      cover:
        'https://file.hstatic.net/200000551679/file/beplain_kem_chong_nang_sunmuse_mineral_sunscreen_spf50__pa_____50ml_477d0483d7904868991a81021e2833b1_1024x1024.jpg',
      desc: 'Good choice',
      id: 'i1',
      name: 'Beplain xa lánh',
      price: 120,
      rating: 0,
      status: true,
      uid: '12wefdss',
      variation: false,
      new: true,
    },
  ];

  constructor(private http: HttpClient) {}

  get(url: string, data?: any) {
    return firstValueFrom(
      this.http.get<any>(environment.serverBaseUrl + url, { params: data })
    );
  }

  post(url: string, data: any, formData: boolean = false) {
    if (!formData) {
      data = new HttpParams({ fromObject: data });
    }
    return firstValueFrom(
      this.http.post<any>(environment.serverBaseUrl + url, data)
    );
  }
  patch(url: string, data: any) {
    const body = new HttpParams({
      fromObject: data,
    });
    return firstValueFrom(
      this.http.patch<any>(environment.serverBaseUrl + url, body)
    );
  }
}

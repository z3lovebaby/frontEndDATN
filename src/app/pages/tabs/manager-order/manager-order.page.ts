import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { order } from 'src/app/models/order.model';
import { GlobalService } from 'src/app/services/global/global.service';
import { ShopeeAPIService } from 'src/app/services/shopee/shopee-api.service';

@Component({
  selector: 'app-manager-order',
  templateUrl: './manager-order.page.html',
  styleUrls: ['./manager-order.page.scss'],
})
export class ManagerOrderPage implements OnInit {
  orderID: any;
  orderItems: order[] = [];
  total = 1000000;
  constructor(
    private peeService: ShopeeAPIService,
    private global: GlobalService,
    private router: Router
  ) {}
  ngOnInit() {
    this.orderItems = [
      {
        oid: 'ORD-123456',
        cover:
          'https://down-cvs-vn.img.susercontent.com/sg-11134201-7qvfb-lijwcj3e5qxb3f.webp',
        name: 'Sản phẩm A',
        shop: 'Cửa hàng ABC',
        date: '15/11/2024',
        status: 'Bị hủy',
        textColor: 'gray',
        hoahong: 150000,
      },
      {
        oid: 'ORD-123456',
        cover:
          'https://down-cvs-vn.img.susercontent.com/sg-11134201-7qvfb-lijwcj3e5qxb3f.webp',
        name: 'Sản phẩm A',
        shop: 'Cửa hàng ABC',
        date: '15/11/2024',
        status: 'Bị hủy',
        textColor: 'gray',
        hoahong: 150000,
      },
      {
        oid: 'ORD-123456',
        cover:
          'https://down-cvs-vn.img.susercontent.com/sg-11134201-7qvfb-lijwcj3e5qxb3f.webp',
        name: 'Sản phẩm A',
        shop: 'Cửa hàng ABC',
        date: '15/11/2024',
        status: 'Bị hủy',
        textColor: 'gray',
        hoahong: 150000,
      },
      {
        oid: 'ORD-123456',
        cover:
          'https://down-cvs-vn.img.susercontent.com/sg-11134201-7qvfb-lijwcj3e5qxb3f.webp',
        name: 'Sản phẩm A',
        shop: 'Cửa hàng ABC',
        date: '15/11/2024',
        status: 'Bị hủy',
        textColor: 'gray',
        hoahong: 150000,
      },
      {
        oid: 'ORD-123456',
        cover:
          'https://down-cvs-vn.img.susercontent.com/sg-11134201-7qvfb-lijwcj3e5qxb3f.webp',
        name: 'Sản phẩm A',
        shop: 'Cửa hàng ABC',
        date: '15/11/2024',
        status: 'Bị hủy',
        textColor: 'gray',
        hoahong: 150000,
      },
      {
        oid: 'ORD-123456',
        cover:
          'https://down-cvs-vn.img.susercontent.com/sg-11134201-7qvfb-lijwcj3e5qxb3f.webp',
        name: 'Sản phẩm A',
        shop: 'Cửa hàng ABC',
        date: '15/11/2024',
        status: 'Bị hủy',
        textColor: 'gray',
        hoahong: 150000,
      },
      {
        oid: 'ORD-123456',
        cover:
          'https://down-cvs-vn.img.susercontent.com/sg-11134201-7qvfb-lijwcj3e5qxb3f.webp',
        name: 'Sản phẩm A',
        shop: 'Cửa hàng ABC',
        date: '15/11/2024',
        status: 'Bị hủy',
        textColor: 'gray',
        hoahong: 150000,
      },
      {
        oid: 'ORD-123457',
        cover:
          'https://down-cvs-vn.img.susercontent.com/sg-11134201-7qvfb-lijwcj3e5qxb3f.webp',
        name: 'Sản phẩm AB',
        shop: 'Cửa hàng X',
        date: '15/11/2024',
        status: 'Đang xử lý',
        textColor: 'orange',
        hoahong: 150000,
      },
      {
        oid: 'ORD-123458',
        cover:
          'https://down-cvs-vn.img.susercontent.com/sg-11134201-7qvfb-lijwcj3e5qxb3f.webp',
        name: 'Sản phẩm CA',
        shop: 'Cửa hàng BC',
        date: '15/11/2024',
        status: 'Hoàn thành',
        textColor: 'green',
        hoahong: 13000,
      },
    ];
  }

  onClick(event) {
    this.orderItems.push({
      oid: 'ORD-12328',
      cover:
        'https://down-cvs-vn.img.susercontent.com/sg-11134201-7qvfb-lijwcj3e5qxb3f.webp',
      name: 'Sản phẩm CA',
      shop: 'Cửa hàng BC',
      date: '15/11/2024',
      status: 'Hoàn thành',
      textColor: 'green',
      hoahong: 13000,
    });
    this.global.successToast('Đơn hàng hợp lệ, cảm ơn bạn !');
    // this.peeService
    //   .sendOrderID(this.orderID)
    //   .then((res) => {
    //     //add vào mảng dữ liệu để hiển thị danh sách đơn.
    //     this.global.successToast('Đơn hàng hợp lệ, cảm ơn bạn !');
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     let msg = 'Có lỗi xảy ra xin hãy đợi';
    //     if (e?.error?.message) {
    //       msg = e.error.message;
    //     }
    //     this.global.showAlert(msg);
    //     if (e.error?.count == 5) {
    //       //khoa tam thoi tai khoan -  chuc nang rut tien
    //     }
    //   });
  }
  rut() {
    this.router.navigateByUrl('/tabs/withdraw');
  }
}

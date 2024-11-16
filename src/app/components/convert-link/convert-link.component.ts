import { Component, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global/global.service';
import { ShopeeAPIService } from 'src/app/services/shopee/shopee-api.service';

@Component({
  selector: 'app-convert-link',
  templateUrl: './convert-link.component.html',
  styleUrls: ['./convert-link.component.scss'],
})
export class ConvertLinkComponent {
  constructor(
    private peeService: ShopeeAPIService,
    private router: Router,
    private global: GlobalService
  ) {}
  inputLink: string = '';
  @ViewChild('inputRef') inputRef: any;
  inputRefErrors: any = null; // Biến để lưu trữ lỗi
  private debounceTimer: any;
  convertedLink: string | null = null;
  onInputChange() {
    // Xóa timeout cũ nếu có
    clearTimeout(this.debounceTimer);

    // Thiết lập timeout mới
    this.debounceTimer = setTimeout(() => {
      // Kiểm tra tính hợp lệ
      this.inputRefErrors = this.inputRef.errors; // Gán giá trị lỗi vào biến
    }, 800); // Thay đổi 500 thành thời gian delay bạn muốn (500ms ở đây)
  }
  onClick(event) {
    console.log(event, this.inputLink);
    this.peeService
      .convertLink(this.inputLink)
      .then((res) => {
        console.log('data convert', res.data.batchCustomLink[0].shortLink);
        this.convertedLink = res.data.batchCustomLink[0].shortLink;
        this.global.successToast('Convert thành công');
      })
      .catch((e) => {
        console.log(e);
        let msg = 'Có lỗi xảy ra xin hãy đợi';
        if (e?.error?.message) {
          msg = e.error.message;
        }
        this.global.showAlert(msg);
      });
  }
}

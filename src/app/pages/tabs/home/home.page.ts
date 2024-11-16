import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonicSlides, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { shop } from 'src/app/models/shop.model';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api/api.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  @ViewChild('otp_modal') modal: ModalController;
  private mouseDownTime: number | null = null;
  private readonly clickThreshold = 200; //
  swiperModules = [IonicSlides];
  bannerImgs: any[] = [];
  shops: shop[] = [];
  isLoading: boolean = false;
  profile: User;
  profileSub: Subscription;
  verifyOtp = false;

  constructor(
    private router: Router,
    private api: ApiService,
    private global: GlobalService,
    private profileService: ProfileService
  ) {
    this.isLoading = true;
    setTimeout(() => {
      this.bannerImgs = this.api.bannerImgs;
      this.shops = this.api.shops;
      this.isLoading = false;
    }, 3000);
  }
  ngOnInit() {
    this.getProfile();
    this.profileSub = this.profileService.profile.subscribe((profile) => {
      console.log('profile: ', profile);
      this.profile = profile;
      if (this.profile && !this.profile?.email_verified) {
        this.checkEmailVerified();
      }
    });
  }
  async getProfile() {
    try {
      await this.profileService.getProfile();
    } catch (e) {
      console.log(e);
      this.global.errorToast();
    }
  }
  async checkEmailVerified() {
    const verify = await this.global.showButtonToast(
      'Please verify your email address'
    );
    console.log('verify: ', verify);
    if (verify) this.verifyOtp = true;
  }
  resetOtpModal(value) {
    console.log(value);
    this.verifyOtp = false;
  }

  otpVerified(event) {
    if (event) this.modal.dismiss();
  }
  onMouseDown() {
    this.mouseDownTime = Date.now(); // Ghi lại thời điểm nhấn chuột
  }

  onMouseUp(uid: string) {
    if (this.mouseDownTime) {
      const timeElapsed = Date.now() - this.mouseDownTime;
      if (timeElapsed < this.clickThreshold) {
        // Nếu nhấn và thả trong khoảng thời gian ngắn, thực hiện điều hướng
        this.router.navigate(['/tabs/shops', uid]);
      }
    }
    this.mouseDownTime = null; // Reset trạng thái
  }
  ngOnDestroy() {
    if (this.profileSub) this.profileSub.unsubscribe();
  }
}

import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { ProfileService } from 'src/app/services/profile/profile.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit, OnDestroy {
  @ViewChild('otp_modal') modal: ModalController;
  profile: any = {};
  isLoading: boolean;
  profileSub: Subscription;
  verifyOtp = false;
  constructor(
    private auth: AuthService,
    private global: GlobalService,
    private profileService: ProfileService
  ) {
    // this.isLoading = true;
    // setTimeout(() => {
    //   this.profile = {
    //     name: 'Nikhil Agarwal',
    //     phone: '9109109100',
    //     email: 'technyks@gmail.com',
    //   };
    //   this.isLoading = false;
    // }, 3000);
  }
  ngOnInit() {
    this.profileSub = this.profileService.profile.subscribe((profile) => {
      this.profile = profile;
      console.log(this.profile);
    });
    this.getData();
  }

  async getData() {
    try {
      this.isLoading = true;
      await this.profileService.getProfile();
      this.isLoading = false;
    } catch (e) {
      console.log(e);
      this.isLoading = false;
    }
  }

  logout() {
    this.auth.logout();
  }
  resetOtpModal(value) {
    console.log(value);
    this.verifyOtp = false;
  }

  otpVerified(event) {
    if (event) this.modal.dismiss();
  }

  ngOnDestroy() {
    if (this.profileSub) this.profileSub.unsubscribe();
  }
}
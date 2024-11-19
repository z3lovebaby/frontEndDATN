import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Strings } from 'src/app/enum/strings';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  @ViewChild('forgot_pwd_modal') modal: ModalController;
  isLogin = false;
  type: boolean = true;
  reset_pwd_model = {
    email: '',
    otp: '',
    new_password: '',
  };
  constructor(
    private auth: AuthService,
    private router: Router,
    private global: GlobalService
  ) {}

  async isLoggedIn() {
    try {
      this.global.showLoader();
      const val = await this.auth.getToken();
      console.log(val);
      if (val) this.navigate();
      this.global.hideLoader();
    } catch (e) {
      console.log(e);
      this.global.hideLoader();
    }
  }
  onSubmit(form: NgForm) {
    console.log(form);
    if (!form.valid) return;
    this.login(form);
  }
  login(form) {
    this.isLogin = true;
    this.auth
      .login(form.value.email, form.value.password)
      .then((data) => {
        console.log(data);
        this.navigate(data?.user?.type);
        this.isLogin = false;
        form.reset();
      })
      .catch((e) => {
        console.log(e);
        this.isLogin = false;
        let msg = 'Could not sign in, please try again';
        if (e?.error?.message) {
          msg = e.error.message;
        }
        this.global.showAlert(msg);
      });
  }

  navigate(role?) {
    let url: string = Strings.TABS;
    if (role == Strings.ADMIN_TYPE) url = Strings.ADMIN;
    this.router.navigateByUrl(url, { replaceUrl: true });
  }
  changeType() {
    this.type = !this.type;
  }
  reset(event) {
    console.log(event);
    this.reset_pwd_model = {
      email: '',
      otp: '',
      new_password: '',
    };
  }
  sendResetPasswordEmailOtp(email) {
    console.log(this.reset_pwd_model);
    this.global.showLoader();
    this.auth
      .sendResetPasswordOtp(email)
      .then((data) => {
        console.log(data);
        this.reset_pwd_model = { ...this.reset_pwd_model, email };
        this.global.hideLoader();
      })
      .catch((e) => {
        console.log(e);
        this.global.hideLoader();
        let msg = 'Something went wrong, please try again';
        if (e?.error?.message) {
          msg = e.error.message;
        }
        this.global.showAlert(msg);
      });
  }

  verifyResetPasswordOtp(otp) {
    this.global.showLoader();
    this.auth
      .verifyResetPasswordOtp(this.reset_pwd_model.email, otp)
      .then((data) => {
        console.log(data);
        this.reset_pwd_model = { ...this.reset_pwd_model, otp };
        this.global.hideLoader();
      })
      .catch((e) => {
        console.log(e);
        this.global.hideLoader();
        let msg = 'Something went wrong, please try again';
        if (e?.error?.message) {
          msg = e.error.message;
        }
        this.global.showAlert(msg);
      });
  }

  resetPassword(new_password) {
    this.global.showLoader();
    this.reset_pwd_model = { ...this.reset_pwd_model, new_password };
    this.auth
      .resetPassword(this.reset_pwd_model)
      .then((data) => {
        console.log(data);
        this.global.hideLoader();
        this.modal.dismiss();
        this.global.successToast(
          'Your password is changed successfully. Please login now.'
        );
      })
      .catch((e) => {
        console.log(e);
        this.global.hideLoader();
        let msg = 'Something went wrong, please try again';
        if (e?.error?.message) {
          msg = e.error.message;
        }
        this.global.showAlert(msg);
      });
  }
}

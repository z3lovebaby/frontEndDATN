import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  @Input() model: any;
  otp: string;
  length: number;
  flag: number;
  @Output() check_email: EventEmitter<any> = new EventEmitter();
  @Output() verify_otp: EventEmitter<any> = new EventEmitter();
  @Output() set_password: EventEmitter<any> = new EventEmitter();

  constructor() {}

  getOtpLength(length) {
    this.length = length;
  }

  onOtpChange(otp) {
    this.otp = otp;
    console.log(this.otp);
  }

  getData() {
    let data: any = {};
    if (this.model?.email == '' && this.model?.otp == '') {
      data = {
        title: 'Forgot password',
        subTitle:
          'Enter your email for the verification process, we will send a verification code to your email.',
        button: 'SEND OTP',
      };
      this.otp = '';
      this.flag = 1;
    } else if (this.model?.email != '' && this.model?.otp == '') {
      data = {
        title: 'Verify your Email',
        subTitle: 'Enter the verification code sent to your email.',
        button: 'VERIFY',
      };
      this.flag = 2;
    } else {
      data = {
        title: 'Reset password',
        subTitle: 'Enter your new password, must be atleast 8 characters long.',
        button: 'SAVE',
      };
      this.flag = 3;
    }
    console.log(data);
    return data;
  }

  onSubmit(form: NgForm) {
    console.log(form);
    if (!form.valid) return;
    if (this.flag == 1) this.check_email.emit(form.value.email);
    else if (this.flag == 2) this.verify_otp.emit(this.otp);
    else this.set_password.emit(form.value.new_password);
  }
}

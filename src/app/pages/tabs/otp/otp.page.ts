import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage {
  constructor(private router: Router) {}

  verify(event) {
    if (event) this.router.navigateByUrl('/tabs/home', { replaceUrl: true });
  }
}

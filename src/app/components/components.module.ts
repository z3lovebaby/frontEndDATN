import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ShopComponent } from './shop/shop.component';
import { LoadingShopComponent } from './loading-shop/loading-shop.component';
import { EmptyScreenComponent } from './empty-screen/empty-screen.component';
import { ConvertLinkComponent } from './convert-link/convert-link.component';
import { FormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { OtpInputComponent } from './otp-input/otp-input.component';
import { OtpScreenComponent } from './otp-screen/otp-screen.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DealInputComponent } from './deal-input/deal-input.component';

@NgModule({
  declarations: [
    ShopComponent,
    LoadingShopComponent,
    EmptyScreenComponent,
    ConvertLinkComponent,
    OtpInputComponent,
    OtpScreenComponent,
    ResetPasswordComponent,
    DealInputComponent,
  ],
  imports: [IonicModule, CommonModule, FormsModule, NgOtpInputModule],
  exports: [
    ShopComponent,
    LoadingShopComponent,
    EmptyScreenComponent,
    ConvertLinkComponent,
    OtpInputComponent,
    OtpScreenComponent,
    ResetPasswordComponent,
    DealInputComponent,
  ],
})
export class ComponentsModule {}

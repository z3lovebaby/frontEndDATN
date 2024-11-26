import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuanLyOrderPageRoutingModule } from './quan-ly-order-routing.module';

import { QuanLyOrderPage } from './quan-ly-order.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuanLyOrderPageRoutingModule,
  ],
  declarations: [QuanLyOrderPage],
})
export class QuanLyOrderPageModule {}

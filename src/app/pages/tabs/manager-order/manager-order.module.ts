import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManagerOrderPageRoutingModule } from './manager-order-routing.module';

import { ManagerOrderPage } from './manager-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManagerOrderPageRoutingModule
  ],
  declarations: [ManagerOrderPage]
})
export class ManagerOrderPageModule {}

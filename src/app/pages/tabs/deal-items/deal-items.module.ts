import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DealItemsPageRoutingModule } from './deal-items-routing.module';

import { DealItemsPage } from './deal-items.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DealItemsPageRoutingModule
  ],
  declarations: [DealItemsPage]
})
export class DealItemsPageModule {}

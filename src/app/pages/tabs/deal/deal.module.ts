import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DealPageRoutingModule } from './deal-routing.module';

import { DealPage } from './deal.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DealPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [DealPage],
})
export class DealPageModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuanLyOrderPage } from './quan-ly-order.page';

const routes: Routes = [
  {
    path: '',
    component: QuanLyOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuanLyOrderPageRoutingModule {}

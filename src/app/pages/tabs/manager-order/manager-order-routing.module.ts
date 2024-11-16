import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManagerOrderPage } from './manager-order.page';

const routes: Routes = [
  {
    path: '',
    component: ManagerOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerOrderPageRoutingModule {}

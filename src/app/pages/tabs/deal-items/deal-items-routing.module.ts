import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DealItemsPage } from './deal-items.page';

const routes: Routes = [
  {
    path: '',
    component: DealItemsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DealItemsPageRoutingModule {}

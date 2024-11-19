import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage
  },  {
    path: 'add-banner',
    loadChildren: () => import('./add-banner/add-banner.module').then( m => m.AddBannerPageModule)
  },
  {
    path: 'quan-ly-order',
    loadChildren: () => import('./quan-ly-order/quan-ly-order.module').then( m => m.QuanLyOrderPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}

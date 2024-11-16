import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'search',
        loadChildren: () =>
          import('./search/search.module').then((m) => m.SearchPageModule),
      },
      {
        path: 'account',
        loadChildren: () =>
          import('./account/account.module').then((m) => m.AccountPageModule),
      },
      {
        path: 'deal',
        loadChildren: () =>
          import('./deal/deal.module').then((m) => m.DealPageModule),
      },
      {
        path: 'tool',
        loadChildren: () =>
          import('./tool/tool.module').then((m) => m.ToolPageModule),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'shops/:shopId',
    loadChildren: () =>
      import('./items/items.module').then((m) => m.ItemsPageModule),
  },
  {
    path: 'deals/:dealId',
    loadChildren: () =>
      import('./deal-items/deal-items.module').then(
        (m) => m.DealItemsPageModule
      ),
  },
  {
    path: 'otp',
    loadChildren: () => import('./otp/otp.module').then((m) => m.OtpPageModule),
  },
  {
    path: 'deal-items',
    loadChildren: () =>
      import('./deal-items/deal-items.module').then(
        (m) => m.DealItemsPageModule
      ),
  },
  {
    path: 'manager-order',
    loadChildren: () =>
      import('./manager-order/manager-order.module').then(
        (m) => m.ManagerOrderPageModule
      ),
  },
  {
    path: 'withdraw',
    loadChildren: () =>
      import('./withdraw/withdraw.module').then((m) => m.WithdrawPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}

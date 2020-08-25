import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RiwayatOrderPage } from './riwayat-order.page';

const routes: Routes = [
  {
    path: '',
    component: RiwayatOrderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RiwayatOrderPageRoutingModule {}

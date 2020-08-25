import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RiwayatOrderDetailPage } from './riwayat-order-detail.page';

const routes: Routes = [
  {
    path: '',
    component: RiwayatOrderDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RiwayatOrderDetailPageRoutingModule {}

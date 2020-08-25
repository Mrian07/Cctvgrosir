import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PengirimanPage } from './pengiriman.page';

const routes: Routes = [
  {
    path: '',
    component: PengirimanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PengirimanPageRoutingModule {}

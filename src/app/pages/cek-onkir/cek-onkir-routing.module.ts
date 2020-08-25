import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CekOnkirPage } from './cek-onkir.page';

const routes: Routes = [
  {
    path: '',
    component: CekOnkirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CekOnkirPageRoutingModule {}

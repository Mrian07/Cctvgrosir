import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KontakPage } from './kontak.page';

const routes: Routes = [
  {
    path: '',
    component: KontakPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KontakPageRoutingModule {}

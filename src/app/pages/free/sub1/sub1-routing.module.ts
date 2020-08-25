import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Sub1Page } from './sub1.page';

const routes: Routes = [
  {
    path: '',
    component: Sub1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Sub1PageRoutingModule {}

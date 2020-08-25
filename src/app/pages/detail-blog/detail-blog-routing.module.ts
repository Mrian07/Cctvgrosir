import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailBlogPage } from './detail-blog.page';

const routes: Routes = [
  {
    path: '',
    component: DetailBlogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailBlogPageRoutingModule {}

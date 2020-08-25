import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailBlogPageRoutingModule } from './detail-blog-routing.module';

import { DetailBlogPage } from './detail-blog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailBlogPageRoutingModule
  ],
  declarations: [DetailBlogPage]
})
export class DetailBlogPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ProductFilterPageRoutingModule } from './product-filter-routing.module';

// import { ProductFilterPage } from './product-filter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProductFilterPageRoutingModule,
  ],
  declarations: [
    // ProductFilterPage
  ]
})
export class ProductFilterPageModule {}

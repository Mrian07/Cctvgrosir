import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductPageRoutingModule } from './product-routing.module';
import { ProductFilterPage } from '../product-filter/product-filter.page';
import { ProductPage } from './product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductPageRoutingModule
    
  ],
  declarations: [ProductPage, ProductFilterPage],
  entryComponents: [
    ProductFilterPage
  ]  
})
export class ProductPageModule {}

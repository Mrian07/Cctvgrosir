import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PengirimanPageRoutingModule } from './pengiriman-routing.module';

import { PengirimanPage } from './pengiriman.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PengirimanPageRoutingModule
  ],
  declarations: [PengirimanPage]
})
export class PengirimanPageModule {}

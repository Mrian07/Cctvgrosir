import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RiwayatOrderPageRoutingModule } from './riwayat-order-routing.module';

import { RiwayatOrderPage } from './riwayat-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RiwayatOrderPageRoutingModule
  ],
  declarations: [RiwayatOrderPage]
})
export class RiwayatOrderPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CekOngkirPageRoutingModule } from './cek-ongkir-routing.module';

import { CekOngkirPage } from './cek-ongkir.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CekOngkirPageRoutingModule
  ],
  declarations: [CekOngkirPage]
})
export class CekOngkirPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CekOnkirPageRoutingModule } from './cek-onkir-routing.module';

import { CekOnkirPage } from './cek-onkir.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CekOnkirPageRoutingModule
  ],
  declarations: [CekOnkirPage]
})
export class CekOnkirPageModule {}

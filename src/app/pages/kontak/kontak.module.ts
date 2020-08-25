import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KontakPageRoutingModule } from './kontak-routing.module';

import { KontakPage } from './kontak.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KontakPageRoutingModule
  ],
  declarations: [KontakPage]
})
export class KontakPageModule {}

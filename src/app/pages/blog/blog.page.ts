import { Component, OnInit, ViewChild } from '@angular/core';
import { API_URL_SLIDER, API_URL, IMAGE_URL_PRODUCT } from '../../providers/constant.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertController, IonList, LoadingController, ModalController, NavController, ToastController, Config, IonSlides, ActionSheetController } from '@ionic/angular';
import { ProductFilterPage } from '../../product-filter/product-filter.page';
import { Router } from '@angular/router';
import { DataCartService } from '../../services/data-cart.service';
import { NgxCommunicateService } from 'ngx-communicate';
import { UserData } from '../../providers/user-data';
import { IonicHeaderParallaxModule } from 'ionic-header-parallax';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ConstantService } from '../../providers/constant.service';

@Component({
  selector: 'blog',
  templateUrl: './blog.page.html',
  styleUrls: ['./blog.page.scss'],
})
export class BlogPage implements OnInit {
  hasil:any;
  constructor(
    public http2: HttpClient,
  ) { }
  ionViewWillEnter() {
    this.get_blog();
  }
  ngOnInit() {
  }
  get_blog(){
    this.http2.post(API_URL + 'api_blog', { }, {} )
    .subscribe(( data ) => {
      console.log(data); 
      let hsl : any = {};
      hsl = data;
      this.hasil = hsl.blog;
    })
  }
}

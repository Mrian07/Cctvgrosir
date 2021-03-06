import { Injectable } from '@angular/core';
// development
// export let API_URL='http://172.20.10.5/msi2/app/';
// export let API_URL_SLIDER='http://172.20.10.5/msi2/app/';
// export let IMAGE_URL_PRODUCT='http://172.20.10.5/msi2/gambar/produk/';
// production
export let API_RAJAONKIR='';
export let BASE_URL = 'https://shop.cctvgrosir.com/';
// export let BASE_URL = 'http://192.168.100.13:8080/cctvgrosir/';
// export let API_URL = 'https://msidahua.com/app/';
export let API_URL = BASE_URL + 'app/';
// export let API_URL_SLIDER='https://msidahua.com/app/';
export let API_URL_SLIDER = API_URL;
// export let IMAGE_URL_PRODUCT='https://msidahua.com/gambar/produk/';
export let IMAGE_URL_PRODUCT = BASE_URL + 'gambar/produk/';

import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertController, IonList, LoadingController, ModalController, NavController, ToastController, Config } from '@ionic/angular';

// export let API_URL='http://192.168.43.80/customerloyalty/rest/';
@Injectable({
  providedIn: 'root'
})
export class ConstantService {
  product_category : any = [];
  alertfun : any;

  constructor(
    public http: HttpClient,
    public alertctrl: AlertController,

  ) { }
  
  // async show_alert(title, sub_title, message){
  //   this.alertfun = await this.alertctrl.create({
  //     header: title!='' ? title : 'Pemberitahuan',
  //     subHeader: sub_title!='' ? sub_title : '',
  //     message: message,
  //     buttons: ['OK']
  //   });
  //   this.alertfun.present();
  // }
  show_alert(title, sub_title, message):Promise<boolean> {
    return new Promise((resolve, reject) => {
      const ctl = this.alertctrl;
      let alert:any = this.alertctrl.create({
        header: title!='' ? title : 'Pemberitahuan',
        subHeader: sub_title!='' ? sub_title : '',
        message: message,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              ctl.dismiss().then(() => { resolve(true); });
              return false;
            }
          },
          // {
          //   text: 'Cancel',
          //   handler: () => {
          //     ctl.dismiss().then(() => { resolve(true); });
          //     return false;
          //   }
          // },          
      ]
      }).then((dlg) => dlg.present());
    });
  } 
  get_product_category(){
    this.product_category = [];
    return this.http.post(API_URL + 'get_product_category', {  } )
    .pipe(map((data : any) => {
      // const datax : any = [];
      // data.data.forEach(element => {
      //   datax.push(element.label)
      // });
      // return datax;
      return data.data;
    }));
  }
}

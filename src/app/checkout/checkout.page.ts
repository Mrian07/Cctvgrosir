import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { API_URL_SLIDER, IMAGE_URL_PRODUCT } from '../providers/constant.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertController, IonList, LoadingController, ModalController, NavController, ToastController, Config, IonCheckbox } from '@ionic/angular';
import { ProductFilterPage } from '../product-filter/product-filter.page';
import { Router } from '@angular/router';
import { DataCartService } from '../services/data-cart.service';
import { NgxCommunicateService } from 'ngx-communicate';
import { ConstantService } from '../providers/constant.service';
import { UserData } from '../providers/user-data';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  data_keranjang: any;
  list_detail: any = [];
  loading: any;
  input_qty: any = [];
  harga_pro_real: any = [];
  sub_total_real: any = [];
  total_real: any = 0;
  checkall : any = false;
  data_user: any = {};
  constructor(
    public http: HttpClient,
    public modalCtrl: ModalController,
    public router: Router,
    public navCtrl: NavController,
    public servcart: DataCartService,
    public loadingctrl: LoadingController,
    public alertctrl: AlertController,
    private combroadcast: NgxCommunicateService,
    private consta: ConstantService,
    public changeref : ChangeDetectorRef,
    private userdata: UserData

  ) {
  }

  ionViewWillEnter() {
    console.log('view wenter')
    this.checkall=false;
    this.userdata.getUsername().then( hsl => {
      console.log(hsl, 'hasil');
      if(hsl==null){
        this.router.navigateByUrl('login');
      }else{
        this.data_user=hsl;
        this.get_data_keranjang();
      }
    });
  }
  check_user(){

  }
  set_var(i) {
    console.log(i);
  }
  ngOnInit() {
  }
  pilih_item($event) {
    let hsl = $event.target.value;
    console.log(hsl);
  }
  calculate_total() {
    this.total_real = 0;
    this.list_detail.forEach(element => {
      this.total_real += element.sub_total_real;
    });
    console.log(this.total_real, 'total real')
  }
  add_minus(index) {
    if (this.list_detail[index].qty_pro == 1) {
      // this.sub_total_real[index] = this.input_qty[index] * this.harga_pro_real[index];
      // this.list_detail[index].input_qty++;
      this.list_detail[index].sub_total_real = this.list_detail[index].qty_pro * this.list_detail[index].harga_pro_real;
      this.calculate_total();
      return false;
    } else {
      // this.input_qty[index]--;
      // this.sub_total_real[index] = this.input_qty[index] * this.harga_pro_real[index];
      this.list_detail[index].qty_pro--;
      this.list_detail[index].sub_total_real = this.list_detail[index].qty_pro * this.list_detail[index].harga_pro_real;
      this.calculate_total();

    }
  }
  async hapus_keranjang(){
    let count : any = 0;
    let i : any = 0;
    this.list_detail.forEach( el => {
      if(this.list_detail[i].isChecked == true){
        count++;
      }
      i++;
    })
    if(count == 0 ){
      this.consta.show_alert('Error', '', 'Silahkan cek keranjang terlebih dulu');
    }else{
      this.loading = await this.loadingctrl.create({
        message: 'Please wait...'
      });
      this.loading.present();      
      this.servcart.hapus_keranjang(this.data_user.id_pel, this.list_detail).then((data)=>{
        this.loading.dismiss();
        let hsl : any = {};
        hsl = data;
        this.consta.show_alert('Success', '', hsl.msg);
        this.get_data_keranjang();
        this.combroadcast.broadcast('broadcast_keranjang', '');
      })
      .catch((err)=>{
        this.loading.dismiss();
        this.consta.show_alert('Error', '', 'Terjadi kesalahan periksa koneksi anda, jika masih berlanjut silahkan hubungi tim support kami');
      })
    }
  }
  check_all(){
    console.log(this.checkall, 'checkall')
    let flag : any;
    if(this.checkall==false){
      flag=true;
    }else{
      flag=false;
    }
    let i : any  = 0;
    this.list_detail.forEach( el => {
      this.list_detail[i].isChecked = flag;
      i++;
    })
  }
  async update_keranjang() {
    this.loading = await this.loadingctrl.create({
      message: 'Please wait...'
    });
    this.loading.present();
    this.servcart.update_keranjang(this.data_user.id_pel, this.list_detail).then((data) => {
      console.log(data, 'data');
      this.loading.dismiss();
      let hsl : any = {};
      hsl = data;
      this.consta.show_alert('Success', '', hsl.msg);
    })
    .catch((err)=>{
      this.loading.dismiss();
      this.consta.show_alert('Error', '', 'Terjadi kesalahan periksa koneksi anda, jika masih berlanjut silahkan hubungi tim support kami');
    })
    ;
  }
  add_plus(index) {
    this.list_detail[index].qty_pro++;
    this.list_detail[index].sub_total_real = this.list_detail[index].qty_pro * this.list_detail[index].harga_pro_real;
    this.calculate_total();
  }
  async get_data_keranjang() {
    this.loading = await this.loadingctrl.create({
      message: 'Please wait...'
    });
    await this.loading.present();
    this.servcart.get_keranjang(this.data_user.id_pel).then(data => {
      let hsl: any = {};
      hsl = data;
      this.data_keranjang = hsl;
      let x: any = 0;
      hsl.detail.forEach(el => {
        hsl.detail[x].val = el.nama_pro;
        hsl.detail[x].isChecked = false;
        x++;
      })
      this.list_detail = hsl.detail;
      console.log(this.list_detail, 'list detail');
      this.loading.dismiss();
      // let i = 0;
      // this.list_detail.forEach(element => {
      //   this.input_qty[i] = element.qty_pro;
      //   this.harga_pro_real[i] = element.harga_pro_real;
      //   this.sub_total_real[i] = element.sub_total_real;
      //   i++;
      // });
      this.total_real = hsl.total_real;
      console.log(this.changeref.detectChanges(), 'change detect');
      console.log(this.total_real, 'DATA KERANJANG')
    }).catch(err => {
      console.log(err)
      this.loading.dismiss();
      this.consta.show_alert('Error', '', 'Terjadi kesalahan periksa koneksi anda, jika masih berlanjut silahkan hubungi tim support kami');
    }).finally(() => {
      this.loading.dismiss();

    });
  }
  ke_pengiriman(){
    let count : any = 0;
    let i : any = 0;
    this.list_detail.forEach( el => {
      if(this.list_detail[i].isChecked == true){
        count++;
      }
      i++;
    })
    if  (count == 0 ){
      this.consta.show_alert('Error', '', 'Silahkan cek keranjang terlebih dulu');
    }else{    
      this.router.navigateByUrl('pengiriman');
    }
  }
}

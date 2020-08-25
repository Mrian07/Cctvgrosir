import { Component, OnInit } from '@angular/core';
import { API_URL_SLIDER, IMAGE_URL_PRODUCT } from '../providers/constant.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertController, IonList, LoadingController, ModalController, NavController, ToastController, Config } from '@ionic/angular';
import { ProductFilterPage } from '../product-filter/product-filter.page';
import { Router, ActivatedRoute } from '@angular/router';
import { DataCartService } from '../services/data-cart.service';
import { ProductService } from '../services/product.service';
import { ConstantService } from '../providers/constant.service';
import { NgxCommunicateService } from 'ngx-communicate';
import { UserData } from '../providers/user-data';


@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})
export class ProductDetailPage implements OnInit {
  data_product_detail : any = {}; 
  nama_pro : any;
  id_pro : any;
  cover_style:any;
  total_keranjang: any;
  input_qty: any = 1;
  harga_jual_pro:any;
  harga_jual_pro2=0;
  harga_jual_reseller=0;
  harga_user=0;
  stok_pro:any;
  loading:any;
  cover:any;
  data_user: any = {};
  desc_pro : any;
  disc_pro = 0;
  status_pel=0;
  constructor(
    public http: HttpClient,
    public modalCtrl: ModalController,
    public router: Router,
    public navCtrl: NavController,
    public servcart : DataCartService,
    public loadingctrl : LoadingController,
    public alertctrl: AlertController,
    public product_service : ProductService,
    private route: ActivatedRoute,
    private consta: ConstantService,
    private combroadcast : NgxCommunicateService,
    private userdata: UserData
  ) {
    this.combroadcast.on('broadcast_keranjang', (data : any )=>{
        this.get_total_keranjang();
    })

   }

  ngOnInit() {
    // this.id_pro = this.route.snapshot.paramMap.get('id');
    // this.get_product_detail();
    // this.get_total_keranjang();
  }
  ionViewWillEnter() {
    console.log('view wenter')
    this.userdata.getUsername().then( hsl => {
      console.log(hsl, 'hasil');
      if(hsl==null){
        this.router.navigateByUrl('login');
      }else{
        this.data_user=hsl;
        this.id_pro = this.route.snapshot.paramMap.get('id');
        this.status_pel = hsl['status_pel'];
        // this.status_pel = 0;
        this.get_product_detail();
        this.get_total_keranjang();
      }
    });
  } 
  get_total_keranjang(){
    this.servcart.get_keranjang(60).then( hasil => {
      console.log(hasil, 'keranjang')
      let hsl : any = {};
      hsl = hasil;
      this.total_keranjang = hsl.total_qty;
    })
  }
  goto_checkout(){
    this.router.navigateByUrl('checkout');
  }
  add_minus(){
    if(this.input_qty==1){
      return false;
    }else{
      this.input_qty--;
    }
  }
  add_plus(){
    this.input_qty++;
  }
  get_product_detail(){
      this.product_service.get_product_detail(this.id_pro).then(hsl => {
        this.data_product_detail = hsl;
        this.nama_pro= this.data_product_detail.produk[0].nama_pro;
        
        this.harga_jual_pro= this.data_product_detail.produk[0].harga_jual_pro;
        this.harga_jual_pro2 = this.data_product_detail.produk[0].harga_jual_pro2;
        this.harga_jual_reseller = this.data_product_detail.produk[0].harga_reseller;
        this.harga_user = this.data_product_detail.produk[0].harga_user;
        this.disc_pro= this.data_product_detail.produk[0].disc_pro;
        
        this.stok_pro= this.data_product_detail.produk[0].stok_pro;
        // console.log(this.nama_pro);
        this.desc_pro = this.data_product_detail.produk[0].desc_pro;
        this.cover=this.data_product_detail.cover;
        this.cover_style = { 'background-image' : 'url("'+this.data_product_detail.cover+'")'};
        console.log(this.status_pel);
        debugger;
      })
  }
  async insert_cart(){
    this.loading = await this.loadingctrl.create({
      message: 'Please wait...'
    });
    await this.loading.present();
    this.servcart.save_keranjang(this.id_pro, this.data_user.id_pel, 0, this.input_qty).then( hasil => {
      this.loading.dismiss();
      let hasil2 : any = {};
      hasil2=hasil;
      console.log(hasil2, 'HASIL')
      if(hasil2.code==1){
        this.consta.show_alert('', '', hasil2.msg);
        this.get_total_keranjang();
        this.combroadcast.broadcast('broadcast_keranjang', '');
      }
    })
  }  
}

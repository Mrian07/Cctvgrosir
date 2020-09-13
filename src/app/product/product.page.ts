import { Component, OnInit, ViewChild } from '@angular/core';
import { API_URL_SLIDER, IMAGE_URL_PRODUCT } from '../providers/constant.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertController, IonList, LoadingController, ModalController, NavController, ToastController, Config, IonSlides, ActionSheetController, Platform } from '@ionic/angular';
import { ProductFilterPage } from '../product-filter/product-filter.page';
import { Router } from '@angular/router';
import { DataCartService } from '../services/data-cart.service';
import { NgxCommunicateService } from 'ngx-communicate';
import { UserData } from '../providers/user-data';
import { IonicHeaderParallaxModule } from 'ionic-header-parallax';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ConstantService } from '../providers/constant.service';
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";

@Component({
  selector: 'product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss', './product.page.css'],
  animations: [
    trigger('visibilityChanged', [
      state('shown', style({ opacity: 1, display : 'block' })),
      state('hidden', style({ opacity: 0, display : 'none' })),
      transition('* => *', animate('500ms'))
    ])
  ]  
})
export class ProductPage implements OnInit {
  @ViewChild(IonSlides, null) slides: IonSlides;
  url = IMAGE_URL_PRODUCT;
  list_product: any = [];
  arr: any = {};
  queryText: String = '';
  min_price: any;
  max_price: any;
  selected_category: any;
  selected_sub_category: any;
  order: any = 'date_desc';
  loading: any;
  total_keranjang: any;
  alertfun : any;
  data_user:any = {};
  data_slider:any;
  hide_header:string = 'shown';
  head_kategori:any = 0;
  choose_harga:any = 0;
  choose_penjualan:any = 0;
  choose_terbaru:any = 0;
  product_category : any;
  actionSheet: any;
  cat_filter_array=[];

  constructor(
    public platform : Platform,
    public http: HttpClient,
    public modalCtrl: ModalController,
    public router: Router,
    public navCtrl: NavController,
    public servcart : DataCartService,
    public loadingctrl : LoadingController,
    public alertctrl: AlertController,
    private combroadcast: NgxCommunicateService,
    private userdata: UserData,
    public constant: ConstantService,
    public actionSheetController: ActionSheetController,
    private fcm: FCM
  ) {

    this.get_product('refresh', '');
    this.get_product_category();
    this.combroadcast.on('broadcast_keranjang', (data : any )=>{
      this.get_total_keranjang();
    })
  }
  
  subscribeToTopic() {
    this.fcm.subscribeToTopic('enappd');
  }

  getToken() {
    this.fcm.getToken().then(token => {
      console.log(token)
      // Register your new token in your back-end if you want
      // backend.registerToken(token);
    });
  }

  unsubscribeFromTopic() {
    this.fcm.unsubscribeFromTopic('enappd');
  }

  ionViewDidEnter() {
    this.slides.startAutoplay();//slider autoplay biult-in function
    // this.platform.backButton.subscribe(hsl=>{
    //   this.keluar_aplikasi();
    // })
  }
  // async keluar_aplikasi() {
  //   this.actionSheet = await this.actionSheetController.create({
  //     header : 'Apakah anda yakin ingin keluar aplikasi ? ',
  //     buttons : [
  //       {
  //         text : 'Ya',
  //         handler : () => {
  //           navigator['app'].exitApp();
  //         }
  //       },
  //       {
  //         text : 'Tidak',
  //         role: 'cancel',
  //         handler : () =>{
            
  //         }
  //       }
  //     ]
  //   });
  //   await this.actionSheet.present();
  // }  
  get_product_category() {
    this.constant.get_product_category().subscribe(data => {
      //console.log(data, 'PRO CATE')
      this.product_category = data;
    })
  }
  choose_subcategory(val){
      console.log(val);
      this.selected_category='';
      this.selected_sub_category = val.link;
      this.get_product('refresh', null);
  }  
  async presentActionSheet(item, dept) {
    let data : any = [];
    for(let i=0; i<item.length; i++){
      data.push({
        text : item[i].label,
        cssClass: 'cat-has-children',
        // icon: 'arrow-dropright-circle',
        handler : ()=>{
          console.log('subcategory selected, show possible has children');
          // this.choose_subcategory(item[i])
          // this.choose_kategori({detail:{value:item[i]}});
          this.choose_kategori(item[i], dept);
        }
      })
    }
    // console.log(data, 'DATA ITEM')
    this.actionSheet = await this.actionSheetController.create({
      header : 'Sub Kategori',
      buttons : data
    });
    await this.actionSheet.present();
  }
  choose_kate(val){
    this.head_kategori=val;
    if(val==1){
      if(this.choose_harga==0){
        this.choose_harga=1;
        // this.order = 'terendah_ke_termahal';
        this.order = 'price_asc';
      }else{
        this.choose_harga=0;
        // this.order = 'termahal_ke_terendah';
        this.order = 'price_desc';
      }
    }else if(val==2){
      if(this.choose_penjualan==0){
        this.choose_penjualan=1;
        this.order = 'sale_asc';
      }else{
        this.choose_penjualan=0;
        this.order = 'sale_desc';
      }
    }else if(val==3){
      if(this.choose_terbaru==0){
        this.choose_terbaru=1;
        this.order = 'date_asc';
      }else{
        this.choose_terbaru=0;
        this.order = 'date_desc';
      }
    }else if(val==0){
      this.choose_harga = 0;
      this.choose_terbaru=0;
      this.order = '';
      this.choose_penjualan = 0;
    }
    this.get_product('refresh', null);
  }
  onScroll(event) {
    // used a couple of "guards" to prevent unnecessary assignments if scrolling in a direction and the var is set already:
    if(event.detail.scrollTop==0){
      this.hide_header = 'shown';
    }else{
      this.hide_header = 'hidden';
    }
    // if (event.detail.deltaY > 0 && this.hide_header) return;
    // if (event.detail.deltaY < 0 && !this.hide_header) return;
    // if (event.detail.deltaY > 0) {
    //   console.log("scrolling down, hiding footer...");
    //   this.hide_header = true;
    // } else {
    //   console.log("scrolling up, revealing footer...");
    //   this.hide_header = false;
    // };   
  };
  choose_kategori(val, dept){
    console.log('choose kategory', val, dept);
    let hasil : any = {}
    if(dept<=1) {
      this.cat_filter_array = [];
    }
    if(val=='semua'){
      this.selected_category = '';
      this.selected_sub_category = '';
      this.order = 'date_desc';
      this.get_product('refresh', null);
      return;      
    }
    console.log('choose kategori argument:',val);
    if(typeof val == 'object'){
      // hasil = val.detail.value;
      hasil = val;
      this.cat_filter_array.push(val);
      console.log('filter category stack', this.cat_filter_array);
      if(hasil.children && hasil.children.length > 0){
        console.log('show subcategory action sheet');
        this.presentActionSheet(hasil.children, dept+1);
      }else {
        console.log('req product with filter category');
        this.selected_category = hasil.link;
        this.selected_sub_category = '';
        this.get_product('refresh', null);
      }
    }
    else{
      console.log('has no children, request product with category filter');
      // this.selected_category = hasil.link;
      this.selected_category = '';
      this.selected_sub_category = '';
      this.get_product('refresh', null);
    }
    // console.log(hasil, this.selected_category, 'hasil')

  } 
  ionViewWillEnter() {
    console.log('view wenter')
    this.userdata.getUsername().then( hsl => {
      console.log(hsl, 'hasil');
      if(hsl==null){
        this.router.navigateByUrl('login');
      }else{
        this.data_user=hsl;
        this.get_total_keranjang();
        this.platform.ready()
          .then(() => {
            console.log("Tesss");
            this.fcm.onNotification().subscribe(data => {
              console.log(data);
              if (data.wasTapped) {
                console.log("Received in background");
              } else {
                console.log("Received in foreground");
              };
              if(data.type == "NEWS") {
                alert(data.id);
              }
            });

            this.getToken();

            this.fcm.onTokenRefresh({once:false}).subscribe(token => {
              console.log(token)
              // Register your new token in your back-end if you want
              // backend.registerToken(token);
            });

            // this.subscribeToTopic();
          })
      }
    });
    this.get_data_slider();
  }
  get_data_slider(){
    this.http.get(API_URL_SLIDER+'api_welcome').subscribe( hsl => {
      let hasil:any={};
      hasil = hsl;
      this.data_slider = hasil.slider;
    })
  }
  get_total_keranjang(){
      this.servcart.get_keranjang(this.data_user.id_pel).then( hasil => {
        console.log(hasil, 'keranjang')
        let hsl : any = {};
        hsl = hasil;
        this.total_keranjang = hsl.total_qty;
      })
  }
  async presentFilter() {
    const modal = await this.modalCtrl.create({
      component: ProductFilterPage,
      componentProps: { 
        selected_category : this.selected_category,
        selected_sub_category : this.selected_sub_category,
        min_price : this.min_price,
        max_price : this.max_price,
        order : this.order,      
        cat_filter: this.cat_filter_array  
       }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data, 'data from modal')
    if (data != null) {
      // this.selected_category = data.selected_category;
      // this.selected_sub_category = data.selected_sub_category;
      this.selected_category = '';
      if(data.cat_filter) {
        var fl = data.cat_filter.length;
        if(fl>0){
          this.selected_category = data.cat_filter[fl-1].link;
          this.cat_filter_array = data.cat_filter;
        }
      }
      this.min_price = data.min_price;
      this.max_price = data.max_price;
      this.order = data.order;
      this.get_product('refresh', '');
    }
  }
  ngOnInit() {
    // this.get_total_keranjang();
  }
  async show_alert(title, sub_title, message){
    this.alertfun = await this.alertctrl.create({
      header: title!='' ? title : 'Pemberitahuan',
      subHeader: sub_title!='' ? sub_title : '',
      message: message,
      buttons: ['OK']
    });
    this.alertfun.present();
  }
  goto_checkout(){
    this.router.navigateByUrl('checkout');
  }
  async insert_cart(id_pro, id_pel, id_varian, qty_pro ){
    this.loading = await this.loadingctrl.create({
      message: 'Please wait...'
    });
    await this.loading.present();
    this.servcart.save_keranjang(id_pro, this.data_user.id_pel, 0, 1).then( hasil => {
      this.loading.dismiss();
      let hasil2 : any = {};
      hasil2=hasil;
      console.log(hasil2, 'HASIL')
      if(hasil2.code==1){
        this.show_alert('', '', hasil2.msg);
        this.get_total_keranjang();
        this.combroadcast.broadcast('broadcast_keranjang', '');
      }
    })
  }
  goto_detail(id){
      this.router.navigateByUrl('/product-detail/' + id );
  }
  doRefresh(event) {
    this.get_product('refresh', event);
  }

  search_product($event) {
    console.log(this.queryText.length);
    this.get_product('refresh', '');
  }
  loadData(event) {
    this.get_product('loadmore', event);
  }
  get_product(type, event) {
    if (type == 'refresh'){
      this.list_product = [];
    }
    this.http.get(API_URL_SLIDER + 'get_product', {params:{
      offset: this.list_product.length,
      type: type,
      cari: this.queryText as any,
      selected_category: this.selected_category,
      selected_sub_category: this.selected_sub_category,
      min_price: this.min_price,
      max_price: this.max_price,
      order: this.order,
      terbaru : this.choose_terbaru
    }})
      .pipe(map((data: any) => {
        console.log(data, 'map')
        return data.data;
      }))
      .subscribe(hasil => {
        this.arr = hasil;
        if (type == 'refresh') {
          this.list_product = this.arr;
          if (event)
            event.target.complete();
        } else {
          this.arr.forEach(element => {
            console.log(element);
            this.list_product.push(element);
          });
          if (event)
            event.target.complete();

        }
        console.log(this.list_product, 'PRODUCT');
      });
  }


}

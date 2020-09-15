import { Component, ViewChildren, OnInit, ViewEncapsulation, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

import { MenuController, Platform, ToastController, NavController, LoadingController, AlertController, ActionSheetController, IonRouterOutlet } from '@ionic/angular';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Storage } from '@ionic/storage';

import { UserData } from './providers/user-data';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { NgxCommunicateService } from 'ngx-communicate';
import { HTTP, HTTPResponse } from '@ionic-native/http/ngx';
import { NgxXml2jsonService } from 'ngx-xml2json';
import { API_URL } from './providers/constant.service';
import { FirebaseDynamicLinks } from '@ionic-native/firebase-dynamic-links/ngx';
import { ConstantService } from './providers/constant.service';
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { HttpClient } from '@angular/common/http';
import { NgZone } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  appPages = [
    // {
    //   title: 'Schedule',
    //   url: '/app/tabs/schedule',
    //   icon: 'calendar'
    // },
    // {
    //   title: 'Speakers',
    //   url: '/app/tabs/speakers',
    //   icon: 'contacts'
    // },
    // {
    //   title: 'Map',
    //   url: '/app/tabs/map',
    //   icon: 'map'
    // },
    // {
    //   title: 'About',
    //   url: '/app/tabs/about',
    //   icon: 'information-circle'
    // },
    // {
    //   title: 'Product',
    //   url: '/product',
    //   icon: 'information-circle'
    // }
  ];
  list_menu: any = [
    { name: 'Produk', link: '/product', icon: 'fa fa-compass', items: [] },
    { name: 'Keranjang', link: '/checkout', icon: 'fa fa-compass', items: [] },
    { name: 'Blog', link: '/blog', icon: 'fa fa-compass', items: [] },
    { name: 'Riwayat Order', link: '/riwayat-order', icon: 'fa fa-compass', items: [] },
    { name: 'Referral', link: '/referral', icon: 'fa fa-compass', items: [] },
    { name: 'Wallet', link: '/wallet', icon: 'fa fa-compass', items: [] },
    { name: 'Cek Ongkir', link: '/cek-ongkir', icon: 'fa fa-compass', items: [] },
    { name: 'Kontak', link: '/kontak', icon: 'fa fa-compass', items: [] },
    // { name: 'Conference', link : '', icon : 'fa fa-chart-pie', items: [
    //     { name: 'Schedule', link : '/app/tabs/schedule', icon : ''},
    //     { name: 'Speakers', link : '/app/tabs/speakers', icon : ''},
    //     { name: 'Map', link : '/app/tabs/map', icon : ''}
    // ] },
    // { name: 'Use', link : '', icon : 'fa fa-cog', items: [
    //     { name: 'NMS Map', link : 'map', icon : '', items: [] },
    //     { name: 'Site Topology', link : 'site_topology', icon : '', items: [] },
    //     { name: 'Alarm Viewer', link : 'alarm', icon : '', items: [] },
    //     { name: 'Performance', link : 'performance', icon : '', items: [] },
    // ] },
  ]
  alert1: any;
  loggedIn = false;
  dark = false;
  img_profile = '/assets/img/no_image.png';
  name_user = '';
  mystyle = {
    'width': '150px',
    'height': '150px',
    // 'border' : '1px solid black',
    'border-radius': '50%',
    'background-image': "url('" + this.img_profile + "'",
    'margin': '0 auto',
    'background-size': 'cover',
    'background-position': 'center',
  };
  arr_sess: any = {};
  loading: any;
  hasil: any = {};
  shownGroup: any;
  show_div_photo_profile = false;
  actionSheet: any;
  constructor(
    private consta : ConstantService,
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private userData: UserData,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
    private camera: Camera,
    private communicate: NgxCommunicateService,
    public http: HTTP,
    private ngxXml2jsonService: NgxXml2jsonService,
    public loadingCtrl: LoadingController,
    public alertController: AlertController,
    private firebaseDynamicLinks: FirebaseDynamicLinks,
    public actionSheetController: ActionSheetController,
    private fcm: FCM,
    private localNotifications: LocalNotifications,
    public http2: HttpClient,
    public zone: NgZone,
    public inAppBrowser: InAppBrowser,
  ) {
    
    this.initializeApp();

    this.arr_sess.nama_pel = "";
    this.communicate.on('login_success', (data: any) => {
      //console.log(data, 'LOGIN SUCCESS');
      this.userData.getUsername().then(hsl => {
        //console.log(hsl, this.arr_sess, 'session user');
        if (hsl) {
          // alert('a')
          this.arr_sess = hsl;

          // this.name_user='Hi, '+this.arr_sess.nama_pel;
          // console.log(this.name_user,'nama user 1')

          // this.mystyle['background-image'] = "url('"+this.arr_sess.photo+"'";
        } else {
          // alert('b')
          // this.name_user='';
          this.arr_sess.nama_pel = "";

        }
      })
    });
    this.userData.getUsername().then(hsl => {
      if (hsl) {
        // alert('a')
        this.arr_sess = hsl;

        // this.name_user='Hi, '+this.arr_sess.nama_pel;
        // console.log(this.name_user,'nama user 1')

        // this.mystyle['background-image'] = "url('"+this.arr_sess.photo+"'";
      } else {
        // alert('b')
        // this.name_user='';
        this.arr_sess.nama_pel = "";

      }
    })
    
  }

  ionViewWillEnter() {
    this.userData.getUsername().then(hsl => {
      if (hsl == null) {
        this.router.navigateByUrl('login')
      } else {

      }
    });

  }
  ionViewDidEnter() {

  }
  async keluar_aplikasi() {
    this.actionSheet = await this.actionSheetController.create({
      header: 'Apakah anda yakin ingin keluar aplikasi ? ',
      buttons: [
        {
          text: 'Ya',
          handler: () => {
            navigator['app'].exitApp();
          }
        },
        {
          text: 'Tidak',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    await this.actionSheet.present();
  }
  goto(link) {
    this.menu.toggle();
    //console.log(link, 'LINK')
    this.router.navigateByUrl(link);
  }
  toggleGroup = function (group) {
    ////console.log(group, 'GROUP')
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
    if (group.link != '' && group.items == '') {
      this.goto(group.link)
    }
  };
  isGroupShown = function (group) {
    return this.shownGroup === group;
  };
  ngOnInit() {
    this.checkLoginStatus();
    this.listenForLoginEvents();
    // this.userData.get_photo_profile().then(photo_profile => {
    //   // //console.log(photo_profile, 'PHOTO PROFILE')
    //   if(photo_profile){
    //     this.mystyle['background-image'] = "url('"+photo_profile+"'";
    //   }else{
    //     this.mystyle['background-image'] = "url('"+this.img_profile+"'";
    //   }
    // })
    this.userData.getUsername().then(hsl => {
      if (hsl) {
        this.arr_sess = hsl;
        this.name_user = 'Hi, ' + this.arr_sess.name;
        if (this.arr_sess) {
          this.mystyle['background-image'] = "url('" + this.arr_sess.photo_profile + "'";
        } else {
          this.mystyle['background-image'] = "url('" + this.img_profile + "'";
        }
      } else {
        this.name_user = '';
      }
    })
    this.swUpdate.available.subscribe(async res => {
      const toast = await this.toastCtrl.create({
        message: 'Update available!',
        showCloseButton: true,
        position: 'bottom',
        closeButtonText: `Reload`
      });

      await toast.present();

      toast
        .onDidDismiss()
        .then(() => this.swUpdate.activateUpdate())
        .then(() => window.location.reload());
    });
  }
  async alert(header, sub, msg) {
    this.alert1 = await this.alertController.create({
      header: header,
      subHeader: sub,
      message: msg,
      buttons: ['OK']
    });
    await this.alert1.present();
  }
  async get_photo_profile() {
    // alert('ambil photo');
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.loading = await this.loadingCtrl.create({
      message: 'Please wait...'
    });
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      this.userData.set_photo_profile(base64Image).then(hsl => {
        this.loading.present();
        this.http.post(API_URL + 'upload_photo', { user: this.arr_sess.code_user, photo: base64Image }, {})
          .then((data: HTTPResponse) => {
            //console.log(data); 
            const parser = new DOMParser();
            const json = parser.parseFromString(data.data, 'text/xml');
            const obj = this.ngxXml2jsonService.xmlToJson(json);
            this.hasil = obj;
            //console.log(this.hasil['xml'], 'hasil')
            if (this.hasil['xml'].code != '0') {
              //console.log('login a')
              this.loading.dismiss();

            } else {
              //console.log('login b');
              this.loading.dismiss();
              this.alert('Error', 'You got error', this.hasil.xml.msg);
            }
          })
          .catch(error => {
            this.loading.dismiss();
          });
        this.mystyle['background-image'] = "url('" + base64Image + "'";
      });
    }, (err) => {
      //console.log(err, 'ERROR CAMERA')
      // Handle error
    });
  }

  initializeApp() {
    let subs: any;
    this.platform.ready().then(() => {
      // this.platform.backButton.subscribe(hsl=>{
      this.platform.backButton.subscribeWithPriority(0, () => {
        this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
          if (this.router.url == '/product') {
            this.keluar_aplikasi();
          } else if (this.router.url == '/login') {
            this.keluar_aplikasi();
          } else
            if (outlet && outlet.canGoBack()) {
              outlet.pop();
            }
        })
      })
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.firebaseDynamicLinks.onDynamicLink()
        .subscribe((res: any) => {
          let hasil: any = {};
          hasil = res;
          let str: any;
          str = hasil.deepLink;
          let arr: any;
          arr = str.split('referral_');
          // this.alert('referral', 'test referral', arr[1]);
          this.userData.set_referral(arr[1]);
          console.log(arr, 'arr dynamic link');
          // this.userData.set_referral()
          console.log(res, 'firebase dynamic link')
        },
          (error: any) => console.log(error));

      console.log("Tesss");
      this.fcm.onNotification().subscribe(data => {
        console.log(data);
        if (data.wasTapped) {
          console.log("Received in background");
          if(data.type == "PRODUCT") {
            if(data.type == "PRODUCT") {
              this.zone.run(() => {
                this.router.navigateByUrl('/product-detail/' + data.id);
              });
            }else if(data.type == "BLOG") {
              this.zone.run(() => {
                this.router.navigateByUrl('/blog');
              });
            }else if(data.type == "LINK") {
              this.inAppBrowser.create(
                data.id,
                '_blank'
              );
            }else {
              this.zone.run(() => {
                this.router.navigateByUrl('/');
              });
            }
          }
        } else {
          console.log("Received in foreground");
          this.localNotifications.schedule({
              id: 1,
              title: data.title,
              text: data.body,
              data: {
                id: data.id,
                type: data.type
              }
          });

          this.localNotifications.on("click").subscribe(notification => {
              console.log(notification.data);
              if(notification.data.type == "PRODUCT") {
                this.zone.run(() => {
                  this.router.navigateByUrl('/product-detail/' + notification.data.id);
                });
              }else if(notification.data.type == "BLOG") {
                this.zone.run(() => {
                  this.router.navigateByUrl('/blog');
                });
              }else if(notification.data.type == "LINK") {
                this.inAppBrowser.create(
                  notification.data.id,
                  '_blank'
                );
              }else {
                this.zone.run(() => {
                  this.router.navigateByUrl('/');
                });
              }
          });
          
        };
      });

      this.fcm.onTokenRefresh({once:false}).subscribe(token => {
        console.log(token)
        // Register your new token in your back-end if you want
        // backend.registerToken(token);
      });
    });
  }

  checkLoginStatus() {
    return this.userData.isLoggedIn().then(loggedIn => {
      return this.updateLoggedInStatus(loggedIn);
    });
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      if (loggedIn) {

        this.getToken();
        this.subscribeToTopic();

        this.show_div_photo_profile = true;
      } else {
        this.show_div_photo_profile = false;
      }
      this.loggedIn = loggedIn;
    }, 300);
  }

  listenForLoginEvents() {
    window.addEventListener('user:login', () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:signup', () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:logout', () => {
      this.updateLoggedInStatus(false);
      this.arr_sess = {};
      this.name_user = '';
    });
  }

  logout() {
    this.userData.logout().then(() => {
      this.unsubscribeFromTopic();
      return this.router.navigateByUrl('/login');
    });
  }

  openTutorial() {
    this.menu.enable(false);
    this.storage.set('ion_did_tutorial', false);
    this.router.navigateByUrl('/tutorial');
  }
  
  subscribeToTopic() {
    this.fcm.subscribeToTopic('all');
  }

  getToken() {
    this.fcm.getToken().then(token => {
      console.log(token)
      this.http2.post(API_URL + 'save_fcm', { id_pel : this.arr_sess.id_pel, token : token }, {} )
      .subscribe(( data ) => {
        console.log(data); 
      })
    });
  }

  unsubscribeFromTopic() {
    this.fcm.unsubscribeFromTopic('all');
  }

}

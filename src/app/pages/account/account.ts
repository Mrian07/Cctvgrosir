
import { AfterViewInit, Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserData } from '../../providers/user-data';
import { UserOptions } from '../../interfaces/user-options';
import { AlertController, IonList, LoadingController, ModalController, NavController, ToastController, Config, IonCheckbox, IonSelect } from '@ionic/angular';
import { ConstantService } from '../../providers/constant.service';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  styleUrls: ['./account.scss'],
})
export class AccountPage {
  @ViewChild('provinsi', null) provinsi: IonSelect;

  signup: any = { 
    nama : '', 
    password: '', 
    email : '', 
    provinsi : '',
    kota:'',
    kecamatan:'',
    alamat:'',
    jk_pel : '', 
    confirm_password : '',
    no_telp : '',
    username : '',   
    info_lain_pel : '', 
    nama_bank : '',
    rek : '', 
    an : ''  
  };
  error_konfirmasi_password = 'hide';
  referral : any;
  submitted = false;
  data_provinsi : any = [];
  data_kota : any = [];
  data_kecamatan : any = [];
  loading: any;
  data_user : any;
  constructor(
    public router: Router,
    public userData: UserData,
    public loadingctrl: LoadingController,
    private consta: ConstantService,

  ) {}
  ionViewWillEnter() {
  this.error_konfirmasi_password = 'hide';
    this.userData.getUsername().then( hsl => {
      console.log(hsl, 'hasil session');
      if(hsl==null){
        this.router.navigateByUrl('login');
      }else{
        this.data_user=hsl;
        if(this.data_user!=''){
          this.signup.nama = this.data_user.nama_pel;
          this.signup.no_telp = this.data_user.no_telp_pel;
          this.signup.email = this.data_user.email_pel;
          this.signup.jk_pel = this.data_user.jk_pel;
          this.signup.alamat = this.data_user.alamat_pel;
          this.signup.info_lain_pel = this.data_user.info_lain_pel;
          this.signup.nama_bank = this.data_user.nama_bank;
          this.signup.rek = this.data_user.rek;
          this.signup.an = this.data_user.an;
          this.get_data_provinsi();
        }
      }
    });    
  }
  async get_prov_cek(data : any): Promise<any>{
    return new Promise((resolve: any, reject: any) => {
        let hasil = data.filter( hasl => {
          let hasilx : any = {};
          hasilx = hasl;
          return this.data_user.provinsi_pel.match( new RegExp(hasilx.provinsi, 'gi'));
          // return hasl.province == this.data_user.provinsi_pel;
        })
        resolve(hasil);
    })
  }  
  async get_prov_kota(data : any): Promise<any>{
    return new Promise((resolve: any, reject: any) => {
        let hasil = data.filter( hasl => {
          let hasilx : any = {};
          hasilx = hasl;
          return this.data_user.kota_pel.match( new RegExp(hasilx.kota, 'gi'));
          // return hasl.province == this.data_user.provinsi_pel;
        })
        resolve(hasil);
    })
  } 
  async get_prov_kecamatan(data : any): Promise<any>{
    return new Promise((resolve: any, reject: any) => {
        let hasil = data.filter( hasl => {
          let hasilx : any = {};
          hasilx = hasl;
          return this.data_user.kecamatan_pel.match( new RegExp(hasilx.kecamatan, 'gi'));
          // return hasl.province == this.data_user.provinsi_pel;
        })
        resolve(hasil);
    })
  }   
  async pilih_provinsi($event){
    console.log($event.target.value, 'pilih provinsi')
    this.loading = await this.loadingctrl.create({
      message: 'Silahkan tunggu system sedang mengambil data kota....'
    });
    this.loading.present();
    this.userData.get_data_kota($event.target.value.provinsi).then( hsl => {
      let hasil : any = {};
      hasil = hsl;
      this.data_kota = hasil.data;
      console.log(this.data_provinsi)
      this.get_prov_kota(hasil.data).then( (hsl) => {
        console.log(hsl, 'HASILXXX')
        let hasil : any = hsl;
        console.log(hasil[0], 'ahasilsfjalsk')
        this.signup.kota = hasil[0];
        this.loading.dismiss();
      })
      this.loading.dismiss();
    })    
  }
  async pilih_kota($event){
    this.loading = await this.loadingctrl.create({
      message: 'Silahkan tunggu system sedang mengambil data kecamatan....'
    });
    this.loading.present();
    this.userData.get_data_kecamatan($event.target.value.kota).then( hsl => {
      let hasil : any = {};
      hasil = hsl;
      this.data_kecamatan = hasil.data;
      this.get_prov_kota(hasil.data).then( (hsl) => {
        console.log(hsl, 'HASILXXX')
        let hasil : any = hsl;
        console.log(hasil[0], 'ahasilsfjalsk')
        this.signup.kecamatan = hasil[0];
        this.loading.dismiss();
      })      
      this.loading.dismiss();
    })    
  }  
  get_data_provinsi(){
    this.userData.get_data_provinsi().then( hsl => {
      let hasil : any = {};
      hasil = hsl;
      this.data_provinsi = hasil.data;
      this.get_prov_cek(hasil.data).then( (hsl) => {
        console.log(hsl, 'HASILXXX')
        let hasil : any = hsl;
        console.log(hasil[0], 'ahasilsfjalsk')
        this.signup.provinsi = hasil[0];
      })
      console.log(this.data_provinsi, 'data propinsi')
    })
  }
  async onSignup(form: NgForm) {
    this.submitted = true;
    console.log(this.signup, 'signup')
    let nama_pel = this.signup.nama;
    let email_pel = this.signup.email;
    let pass_pel = this.signup.password;
    let kon_pass = this.signup.confirm_password;
    let no_telp_pel = this.signup.no_telp;
    let prov : any = {};
    let kot : any = {};
    let kec : any = {};
    if(pass_pel!=kon_pass){
      this.error_konfirmasi_password = 'show';
      return;
    }else{
      this.error_konfirmasi_password = 'hide';
    }
    prov = this.signup.provinsi;
    kot = this.signup.kota;
    kec = this.signup.kecamatan;
    let provinsi = prov.provinsi;
    let kota = kot.kota;
    let kecamatan = kec.kecamatan;
    let alamat_pel = this.signup.alamat;
    let jk_pel =  this.signup.jk_pel;
    let info_lain_pel =  this.signup.info_lain_pel;
    let nama_bank =  this.signup.nama_bank;
    let rek =  this.signup.rek;
    let an =  this.signup.an;
    let id_pel = this.data_user.id_pel;
    if (form.valid) {
      this.loading = await this.loadingctrl.create({
        message: 'Silahkan tunggu....'
      });
      
      this.loading.present();
      this.userData.get_referral().then( val => {
        console.log(val, 'VAL REFERRAL')
        // this.referral = val;
        this.userData.update_profile(nama_pel, email_pel, pass_pel, kon_pass, no_telp_pel, provinsi, kota, kecamatan, alamat_pel, jk_pel, id_pel, info_lain_pel, nama_bank, rek, an)
        .then( hsl => {
          let hasil : any = {};
          hasil = hsl;        
          this.loading.dismiss();
          if(hasil.code==1){
            this.consta.show_alert('Sukses', '', hasil.msg).then( hsl => {
              if( hsl ){
                // form.reset();
                // this.signup = { 
                //   nama : '', 
                //   password: '', 
                //   email : '', 
                //   provinsi : '',
                //   kota:'',
                //   kecamatan:'',
                //   alamat:'',
                //   jk_pel : '', 
                //   confirm_password : '',
                //   no_telp : '',
                //   username : '', 
                //   info_lain_pel : '', 
                //   nama_bank : '',
                //   rek : '', 
                //   an : ''                     
                // };              
                this.router.navigateByUrl('login');
              }
            })
          }
        })        
      });
      // this.userData.signup(this.signup.username);

      // this.router.navigateByUrl('/app/tabs/schedule');
    }
  }
}





//   username: string;
//   data_user : any = {};
//   constructor(
//     public alertCtrl: AlertController,
//     public router: Router,
//     public userData: UserData
//   ) { }

//   ngAfterViewInit() {
//     this.getUsername();
//   }

//   updatePicture() {
//     console.log('Clicked to update picture');
//   }

//   // Present an alert with the current username populated
//   // clicking OK will update the username and display it
//   // clicking Cancel will close the alert and do nothing
//   async changeUsername() {
//     const alert = await this.alertCtrl.create({
//       header: 'Change Username',
//       buttons: [
//         'Cancel',
//         {
//           text: 'Ok',
//           handler: (data: any) => {
//             this.userData.setUsername(data.username);
//             this.getUsername();
//           }
//         }
//       ],
//       inputs: [
//         {
//           type: 'text',
//           name: 'username',
//           value: this.username,
//           placeholder: 'username'
//         }
//       ]
//     });
//     await alert.present();
//   }

//   getUsername() {
//     this.userData.getUsername().then((hsl) => {
//       // this.username = username;
//       this.data_user = hsl;
//       console.log(this.data_user, 'data user')
//     });
//   }

//   changePassword() {
//     console.log('Clicked to change password');
//   }

//   logout() {
//     this.userData.logout();
//     this.router.navigateByUrl('/login');
//   }

//   support() {
//     this.router.navigateByUrl('/support');
//   }
// }

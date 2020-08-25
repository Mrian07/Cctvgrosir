import { Injectable, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL_SLIDER, IMAGE_URL_PRODUCT, API_URL, API_RAJAONKIR } from '../providers/constant.service';
import { AlertController } from '@ionic/angular';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class DataCartService {

  constructor(
    public http: HttpClient,
  ) { }

  save_keranjang(id_pro, id_pel, id_varian, qty_pro){
    var promise = new Promise((resolve, reject) => {
      this.http.post(API_URL + 'save_keranjang', {
          id_pro : id_pro,
          id_pel : id_pel,
          id_varian : id_varian,
          qty_pro : qty_pro,
      })
      .subscribe(hasil => {
        console.log('hasil', 'hasil')
        resolve(hasil);
      });      
    });
    return promise;
  }
  update_keranjang(id_pel, data_product){
    var promise = new Promise((resolve, reject) => {
      this.http.post(API_URL + 'api_update_keranjang', {
          id_pel : id_pel,
          data_cart : data_product,
      })
      .subscribe(hasil => {
        console.log('hasil', 'hasil')
        resolve(hasil);
      });      
    });
    return promise;
  }
  hapus_keranjang(id_pel, data_product){
    var promise = new Promise((resolve, reject) => {
      this.http.post(API_URL + 'api_hapus_keranjang', {
          id_pel : id_pel,
          data_cart : data_product,
      })
      .subscribe(hasil => {
        console.log('hasil', 'hasil')
        resolve(hasil);
      });      
    });
    return promise;
  }  
  get_keranjang(id_pel){
    var promise = new Promise((resolve, reject) => {
      this.http.post(API_URL + 'api_get_data_keranjang', {
          id_pel : id_pel,
      })
      .subscribe(hasil => {
        console.log('hasil', 'hasil')
        resolve(hasil);
      });      
    });
    return promise;
  } 
  get_rajaongkir_provinsi(){
    var promise = new Promise((resolve, reject) => {
      this.http.post(API_URL + 'api_provinsi', {
      })
      .subscribe(hasil => {
        console.log('hasil', 'hasil')
        resolve(hasil);
      });      
    });
    return promise;
  }
  get_rajaongkir_kota(id_provinsi){
    var promise = new Promise((resolve, reject) => {
      this.http.post(API_URL + 'api_kota', { id_provinsi : id_provinsi
      })
      .subscribe(hasil => {
        console.log('hasil', 'hasil')
        resolve(hasil);
      });      
    });
    return promise;
  } 
  get_rajaongkir_kecamatan(id_kota){
    var promise = new Promise((resolve, reject) => {
      this.http.post(API_URL + 'api_kecamatan', { id_kota : id_kota
      })
      .subscribe(hasil => {
        console.log('hasil', 'hasil')
        resolve(hasil);
      });      
    });
    return promise;
  }
  get_rajaongkir_harga(id_kecamatan, kurir){
    var promise = new Promise((resolve, reject) => {
      this.http.post(API_URL + 'api_harga', { id_kecamatan : id_kecamatan, kurir : kurir})
      .subscribe(hasil => {
        console.log('hasil', 'hasil')
        resolve(hasil);
      });      
    });
    return promise;
  }
  get_rajaongkir_summary(cost, id_pel){
    var promise = new Promise((resolve, reject) => {
      this.http.post(API_URL + 'api_summary', { cost : cost, id_pel : id_pel})
      .subscribe(hasil => {
        console.log('hasil', 'hasil')
        resolve(hasil);
      });      
    });
    return promise;
  }
//   id_pel: 60
// paket: OKE
// perkilo: 23000
// kurir: jne
// nama: sabar
// telepon: 087878825659
// nama_pengirim: 
// no_pengirim: 
// pilihan_form: 1
// ongkir_provinsi: Jawa Timur
// ongkir_kota: Kab. Bangkalan
// ongkir_kecamatan: Kwanyar
// alamat: funyok
// alamat_pengirim: 
  get_rajaongkir_save_pengiriman(id_pel, paket, perkilo, kurir, nama, telepon, nama_pengirim, 
    no_pengirim, pilihan_form, ongkir_provinsi, ongkir_kota, ongkir_kecamatan, alamat, alamat_pengirim, catatan){
    var promise = new Promise((resolve, reject) => {
      this.http.post(API_URL + 'api_save_pengiriman', { 
        id_pel : id_pel, paket : paket, perkilo : perkilo, kurir : kurir, nama : nama, telepon : telepon, nama_pengirim : nama_pengirim, 
        no_pengirim : no_pengirim, pilihan_form : pilihan_form, ongkir_provinsi: ongkir_provinsi, 
        ongkir_kota : ongkir_kota, ongkir_kecamatan : ongkir_kecamatan, alamat : alamat, alamat_pengirim : alamat_pengirim, catatan : catatan
      })
      .subscribe(hasil => {
        console.log('hasil', 'hasil')
        resolve(hasil);
      },error=>{
        resolve(JSON.parse(error['error']['text'].slice(error['error']['text'].length - 274 , error['error']['text'].length)) )
      });      
    });
    return promise;
  }  
  master_pengiriman(id_pel){
    var promise = new Promise((resolve, reject) => {
      this.http.post(API_URL + 'api_master_pengiriman', {
          id_pel : id_pel,
      })
      .subscribe(hasil => {
        console.log('hasil', 'hasil')
        resolve(hasil);
      });      
    });
    return promise;
  }   
  
}

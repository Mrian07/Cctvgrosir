import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Config, ModalController, NavParams, IonInput, IonSelect, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ConstantService } from '../providers/constant.service';
import { of } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { formatNumber, } from '@angular/common';
import { Injectable, NgZone } from '@angular/core';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.page.html',
  styleUrls: ['./product-filter.page.scss'],
})


export class ProductFilterPage implements OnInit {
  @ViewChild('idmin_price', null) idmin_price: IonInput;
  @ViewChild('idmax_price', null) idmax_price: IonInput;
  // @ViewChild('pilih_kategori', { read : typeof ElementRef, static : true }) pilih_kategori: ElementRef;
  @ViewChild('pilih_kategori', null) pilih_kategori: IonSelect;
  param: any;
  chosen: any;
  pass_data: any;
  min_price: any = '';
  max_price: any = '';
  order: any;
  model_category: any = '';
  model_sub_category: any = '';
  model_order: any = '';
  product_category = [];
  product_sub_category: any = [];
  myModelVariable = '';
  selected_product_category: any;
  disable_sub: any = 'hide';
  clear_min_price: any = true;
  selected_category: any;
  selected_sub_category: any;
  filter_array = [];
  filter_category_complete = true;

  constructor(
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public constant: ConstantService,
    public zone: NgZone,
    public element: ElementRef,
    public alertCtrl: AlertController
  ) {

  }
  convert(event: any) {
    //console.log('old:', this.myModelVariable);
    this.myModelVariable = event.target.value.replace(/[^\d\.]/g, '');
    //console.log('new:', this.myModelVariable);
  }
  ngOnInit() {
    console.log('product filter: ng init');
    console.log('nav params', this.navParams);
    this.filter_array = this.navParams.get('cat_filter');
  }

  ionViewWillEnter() {
    console.log('product filter: view will enter');
    this.get_product_category();
    //console.log(this.product_category, 'prodcut')
    this.disable_sub = 'hide';
    this.model_category = 4;
    this.selected_category = this.navParams.get('selected_category');
    if (this.selected_category != '') {
      // this.choose_category(this.selected_category);
    }
    this.selected_sub_category = this.navParams.get('selected_sub_category');
    this.min_price = this.navParams.get('min_price');
    this.max_price = this.navParams.get('max_price');
    this.order = this.navParams.get('order');

    this.model_order = this.order;
    try {
      console.log(this.pilih_kategori, 'idmax_price')
      this.idmin_price.value = this.min_price;
      this.idmax_price.value = this.max_price;
    } catch (error) {

    }
    //console.log(this.selected_category, this.selected_sub_category, this.min_price, this.max_price, this.order);
  }
  reset() {
    this.zone.run(() => {
      this.min_price = '';
      this.max_price = '';
      this.model_category = '';
      this.model_sub_category = '';
      this.selected_category = '';
      this.selected_sub_category = '';
      this.product_sub_category = [];
      this.disable_sub = 'hide';
      this.model_order = '';
      this.filter_array = [];
      this.filter_category_complete = true;
      try {
        this.idmin_price.value = '';
        this.idmax_price.value = '';
      } catch (error) {

      }
    });
  }
  async dismiss(flag) {
    if(this.filter_category_complete==false){
      var alert = await this.alertCtrl.create({
        header: 'Kesalahan',
        message: 'Lengkapi pilihan kategori',
        buttons:['Ok']
      });
      await alert.present();
      return;
    }
    let data: any;
    if (flag == 'cancel') {
      data = null;
    } else {
      // using the injected ModalController this page
      // can "dismiss" itself and pass back data
      data = {
        selected_category: this.selected_category,
        selected_sub_category: this.selected_sub_category,
        cat_filter: this.filter_array,
        min_price: this.min_price,
        max_price: this.max_price,
        order: this.order
      };
    }
    this.modalCtrl.dismiss(data);
  }
  choose_category($event: any) {
    if ($event && $event.target) {
      //console.log('aaa1')
      const val = $event;
      this.product_sub_category = [];
      this.selected_category = this.product_category[val.target.value].link;
      if (this.product_category[val.target.value] && this.product_category[val.target.value].children && this.product_category[val.target.value].children.length > 0) {
        this.disable_sub = 'show';
        this.product_sub_category = this.product_category[val.target.value].children;
      } else {
        this.disable_sub = 'hide';
      }
    } else {
      //console.log('aaa2', this.product_category)
      this.constant.get_product_category().subscribe(data => {
        //console.log(data, 'PRO CATE')
        this.product_category = data;
        this.product_category.forEach(element => {
          //console.log(element, 'element')
          if (element.link == $event) {
            ////console.log('element')
            if (element.children && element.children && element.children.length > 0) {
              this.disable_sub = 'show';
              this.product_sub_category = element.children;
              this.model_sub_category = this.navParams.get('selected_sub_category');
            } else {
              this.disable_sub = 'hide';
            }
          }
        });
      });
    }
    //console.log(this.disable_sub, 'disabled_sub')
  }
  convert_min($event) {
    this.min_price = $event.target.value;
    // //console.log(this.min_price);
  }
  convert_max($event) {
    this.max_price = $event.target.value;
    // //console.log(this.max_price);
  }
  order_even($event) {
    this.order = $event.target.value;
  }
  choose_sub_category($event) {
    this.selected_sub_category = $event.target.value;
  }
  get_product_category() {
    this.constant.get_product_category().subscribe(data => {
      //console.log(data, 'PRO CATE')
      this.product_category = data;
    })
  }

  choose_filter_cat(args, dept) {
    console.log('instance of custom event', args instanceof CustomEvent);
    // debugger;
    if (args instanceof CustomEvent) {
      var val = args.detail.value;
      var fl = this.filter_array.length;
      console.log('choose filter cat', val, 'depth', dept, 'length', fl);
      if (fl == 0 || dept == 1) {
        var selected = this.product_category.find(function (val2, ind) {
          console.log('matching', val2, ind, val);
          return val2.link == val;
        });
        // console.log('selected cat', selected);
        // this.filter_array.push(this.product_category[index]);
        if (selected != undefined && selected != null) {
          this.filter_array = [selected];
          this.filter_category_complete = selected.children == undefined || selected.children == null || selected.children.length == 0;
        }
      } else {
        if (fl > dept) {
          console.log('saved filter than current, remove tail');
          this.filter_array = this.filter_array.filter(function (el, index2) {
            return index2 < dept;
          });
          fl = this.filter_array.length;
          console.log('removed tail', this.filter_array);
          if (dept == 1) {
            var selected = this.product_category.find(function (val2, index2) {
              return val2.link == val;
            });
            // this.filter_array[0] = this.product_category[index];
            this.filter_array = [];
            if (selected != undefined && selected != null) {
              this.filter_array = [selected];
              this.filter_category_complete = selected.children == undefined || selected.children == null || selected.children.length == 0;
            }
          } else {
            // this.filter_array[fl - 1] = this.filter_array[fl - 2].children[index];
            var selected = this.filter_array[fl - 2].children.find(function (val2, index2) {
              return val2.link == val;
            });
            if (selected != undefined && selected != null) {
              this.filter_array[fl - 1] = selected;
              this.filter_category_complete = selected.children == undefined || selected.children == null || selected.children.length == 0;
            }
          }
        } else if (fl == dept) {
          // this.filter_array[fl - 1] = this.filter_array[fl - 2].children[index];
          var selected = this.filter_array[fl - 2].children.find(function (val2, index2) {
            return val2.link == val;
          });
          if (selected != undefined && selected != null) {
            this.filter_array[fl - 1] = selected;
            this.filter_category_complete = selected.children == undefined || selected.children == null || selected.children.length == 0;
          }
        } else {
          var f = this.filter_array[fl - 1];
          // this.filter_array.push(f.children[index]);
          var selected = f.children.find(function (val2, index2) {
            return val2.link == val;
          });
          if (selected != undefined && selected != null) {
            this.filter_array.push(selected);
            this.filter_category_complete = selected.children == undefined || selected.children == null || selected.children.length == 0;
          }
        }
      }
      console.log('filter array', this.filter_array);
      // debugger;
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController, IonList, LoadingController, PickerController, ModalController, NavController, ToastController, Config, IonSlides, ActionSheetController, Platform } from '@ionic/angular';
import { SearchbarPage } from '../searchbar/searchbar.page';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sub1',
  templateUrl: './sub1.page.html',
  styleUrls: ['./sub1.page.scss'],
})
export class Sub1Page implements OnInit {
  item_form : any = {
    category : '',
    type : '',
    info : '',
    year : '',
    color : '',
  }

  item_colors : any = [
      {
         color: '#1abc9c'
      },
      {
         color: '#2ecc71'
      },
      {
         color: '#3498db'
      },
      {
         color: '#9b59b6'
      },
      {
         color: '#34495e'
      },
      {
         color: '#16a085'
      },
      {
         color: '#27ae60'
      },
      {
         color: '#2980b9'
      },
      {
         color: '#8e44ad'
      },
      {
         color: '#2c3e50'
      },
      {
         color: '#f1c40f'
      },
      {
         color: '#e67e22'
      },      
  ];
  selected_category : any;
  submitted = false;
  modal : any;
  pickerController : any;
  defaultColumnOptions : any;
  data_years:any = [];
  opt : any;
  constructor(
    public modalCtrl: ModalController,
    public pickerCtrl: PickerController,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    for(let i=30;i>0;i--){
      this.data_years.push(
        {
          text : 2020 - i,
          value : 2020 - i,
        }
      )
    }
  }
  ionViewWillEnter() {
    this.opt = this.route.snapshot.paramMap.get('opt');
    console.log('param opt', this.opt)
  } 
  async openPicker() {
    const picker = await this.pickerCtrl.create({
      buttons: [
        {
          text: 'Done',
          handler : (item)=>{
            this.item_form.year = item.years.value;
          }
        },
        {
          text: 'Reset',
          handler : (item)=>{
            this.item_form.year = '';
          }
        },        
        {
          text : 'Cancel',
          role: 'cancel'
        }
    ],
      columns: [
        {
          name: 'years',
          options: this.data_years
        },
      ]
    });
    await picker.present();
    let data : any = picker.onWillDismiss();
    console.log(data, 'data picker')
  }

  async onSubmit(form: NgForm) {
    this.submitted = true;
  }

  async show_searchbar(type){
    this.modal = await this.modalCtrl.create({
      component: SearchbarPage,
      componentProps: { 
          type : type
       }
    });
    await this.modal.present();
    const { data } = await this.modal.onWillDismiss();
    console.log(data);
    if(type=='category'){
      this.item_form.category = data.category.category;
    }else{
      this.item_form.type = data.type.type;
    }
  }
}

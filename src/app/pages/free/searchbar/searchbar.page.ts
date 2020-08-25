import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'searchbar',
  templateUrl: './searchbar.page.html',
  styleUrls: ['./searchbar.page.scss'],
})
export class SearchbarPage implements OnInit {
  categories: any =
    [
      {
        "id": "qwqe",
        "category": "Category One",
        "hide": false
      },
      {
        "id": "rfre",
        "category": "Category Two",
        "hide": false
      },
      {
        "id": "35ff",
        "category": "Category Three",
        "hide": false
      },
      {
        "id": "rtgr",
        "category": "Category Four",
        "hide": false
      },
      {
        "id": "grt",
        "category": "Category Five",
        "hide": false
      },
      {
        "id": "grg",
        "category": "Category Six",
        "hide": false
      }
    ];
  item_type: any = [
    {
      "id": "qwqe",
      "type": "Type One"
    },
    {
      "id": "rfre",
      "type": "Type Two"
    },
    {
      "id": "35ff",
      "type": "Type Three"
    },
    {
      "id": "rtgr",
      "type": "Type Four"
    },
    {
      "id": "grt",
      "type": "Type Five"
    },
    {
      "id": "grg",
      "type": "Type Six"
    }

  ]
  param_type: any;
  selected_category: any;
  constructor(
    public modalCtrl: ModalController,
    public navParams: NavParams,
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.param_type = this.navParams.get('type');
    console.log(this.param_type, 'paramtype')
  }
  choose_category(item) {
    let param: any = {};
    if (this.param_type == 'category') {
        param.category = item;
    }else{
        param.type = item;
    }
    this.modalCtrl.dismiss(param);
  }
  search_item(event) {
    // console.log(event.target.value, 'VALUE')
    if (this.param_type == 'category') {
      let query: any = event.target.value.toLowerCase();
      this.categories.forEach(item => {
        const shouldShow = item.category.toLowerCase().indexOf(query) > -1;
        item.hide = shouldShow ? false : true;
      });
    } else {
      let query: any = event.target.value.toLowerCase();
      this.item_type.forEach(item => {
        const shouldShow = item.type.toLowerCase().indexOf(query) > -1;
        item.hide = shouldShow ? false : true;
      });
    }
  }
}

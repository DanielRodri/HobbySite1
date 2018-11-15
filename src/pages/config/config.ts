import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ConfigPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})

export class ConfigPage {
  theme:string="Dark";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigPage');
  }
  changeTheme(theme){
    console.log(theme)
    if(theme==='d'){

    }
    else if(theme==='l'){

    }
  }

}

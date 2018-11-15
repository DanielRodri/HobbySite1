import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HobbyGroupWritePostModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hobby-group-write-post-modal',
  templateUrl: 'hobby-group-write-post-modal.html',
})
export class HobbyGroupWritePostModalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HobbyGroupWritePostModalPage');
  }
  
  post(){
    
  }

}

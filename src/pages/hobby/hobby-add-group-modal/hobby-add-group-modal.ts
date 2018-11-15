import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { FirestoreProvider } from '../../../providers/firestore/firestore';

/**
 * Generated class for the HobbyAddGroupModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hobby-add-group-modal',
  templateUrl: 'hobby-add-group-modal.html',
})
export class HobbyAddGroupModalPage {
  private _title:string
  private _description:string

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private _firestoreProvider: FirestoreProvider,
    private _viewCtrl:ViewController) {
      this._title=""
      this._description=""
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HobbyAddGroupModalPage');
  }

  setTitle(value) {
    this._title = value;
    console.log(this._title)
  }
  setDescription(value) {
    this._description = value;
  }

  addGroup(){
    if(this._title!==""&&this._description!=="")
      this._firestoreProvider.addHobbyGroup({description:this._description,members:[],title:this._title,owner:this._firestoreProvider.getActualUser()}).then(()=>{
          this._viewCtrl.dismiss({title:this._title});
      })
  }

}

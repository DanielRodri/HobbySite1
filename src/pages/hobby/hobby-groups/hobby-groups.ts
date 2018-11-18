import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FirestoreProvider } from '../../../providers/firestore/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { HobbyGroupTabsPage } from '../group/hobby-group-tabs/hobby-group-tabs'

/**
 * Generated class for the HobbyGroupsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hobby-groups',
  templateUrl: 'hobby-groups.html',
})
export class HobbyGroupsPage {
  private _title:string
  private _groups:Array<any>

  //private _isSearchbarOpened:boolean=false

  constructor(
    public navCtrl: NavController,
     public navParams: NavParams,
     private _firestoreProvider: FirestoreProvider,
     private _modalCtrl: ModalController) {

    this._title= this.navParams.get('title');
    this.getGroups();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HobbyGroupsPage');
  }

  itemTapped(event, group) {
    // That's right, we're pushing to ourselves!
    this._firestoreProvider.setActualGroup(group.id)
    this.navCtrl.push(HobbyGroupTabsPage);
  }

  showAddGroupModal(){
    let addGroupModal = this._modalCtrl.create('HobbyAddGroupModalPage',{hobbyName:this._title})

    addGroupModal.onDidDismiss(data => {
      if(data!==undefined && data!==null){
        this.navCtrl.push(HobbyGroupTabsPage)
      }
    });

    addGroupModal.present();
  }

  //get groups
  getGroups(){
    this._firestoreProvider.getAllHobbyGroups(this._title).subscribe((hobbyGroupsSnapshot)=>{
      this._groups=[]
      hobbyGroupsSnapshot.forEach((hobbyGroupData:any)=>{
        this._groups.push({
          id:hobbyGroupData.payload.doc.id,
          data:hobbyGroupData.payload.doc.data()
        })
      })
    });
  }

}

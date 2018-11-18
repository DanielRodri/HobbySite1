import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HobbyGroupForumPage } from '../hobby-group-forum/hobby-group-forum';
import { HobbyGroupEventsPage } from '../hobby-group-events/hobby-group-events';
import { FirestoreProvider } from '../../../../providers/firestore/firestore';

/**
 * Generated class for the HobbyGroupTabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hobby-group-tabs',
  templateUrl: 'hobby-group-tabs.html',
})
export class HobbyGroupTabsPage {
  private _title:string
  private tab1Root = HobbyGroupForumPage;
  private tab2Root = HobbyGroupEventsPage;
  private _group:any
  private _joined:boolean=false

  constructor(public navCtrl: NavController, public navParams: NavParams, private _firestoreProvider:FirestoreProvider,) {
    this.getGroup();
    //this._title= this.navParams.get('title');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HobbyGroupTabsPage');
  }

  joinGroup(){
    this._group.members.push(this._firestoreProvider.getActualUser().uid)
    this._firestoreProvider.updateAllHobyGroup(this._group)
  }

  getGroup(){
    this._firestoreProvider.getHobbyGroup().subscribe((data)=>{
      this._group=data
      this._title=this._group.title
      this.checkJoined()
    });
  }
  checkJoined(){
    let userUid=this._firestoreProvider.getActualUser().uid
      if(this._group.members.includes(userUid) || this._group.owner===userUid){
        this._joined=true
      }
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirestoreProvider } from '../../../providers/firestore/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { HobbyGroupTabsPage } from '../../hobby/group/hobby-group-tabs/hobby-group-tabs';
import { UserGroupsTabsPage } from '../user-groups-tabs/user-groups-tabs';

/**
 * Generated class for the UserGroupsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-groups',
  templateUrl: 'user-groups.html',
})
export class UserGroupsPage {
  private _isSearchbarOpened:boolean=false;
  private _groups:Array<any>

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private _firestoreProvider: FirestoreProvider) {

    //this._actualTab=this.navCtrl.parent.getSelected().index
    if(this.navCtrl.parent.getSelected()!==null)
      this.getGroups(this.navCtrl.parent.getSelected().index+1)
    else
      this.getGroups(0)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserGroupsPage');
  }
  onSearch(event){
    console.log(event.target.value)
  }

  itemTapped(event, hobby, group) {
    // That's right, we're pushing to ourselves!
    console.log(group)
    
    this._firestoreProvider.setActualGroup(group.id)
    this._firestoreProvider.setActualHobby(hobby)
    this.navCtrl.parent.parent.push(HobbyGroupTabsPage);
  }

  getGroups(tab){
    this._groups=[]
    let hobbys = ['Sports','Music','Books','Arts']
    if(tab===0){
      this.getAllGroups(hobbys)
    }
    else if(tab===1){
      this.getCreatedGroups(hobbys)
    }
    else{
      this.getJoinedGroups(hobbys)
    }
  }

  getAllGroups(hobbys){
    let index =0;
    hobbys.forEach(element => {
      this._groups.push({uid:element,groups:[]})
      this._firestoreProvider.getAllHobbyGroups(element).subscribe((hobbyGroupsSnapshot)=>{
        hobbyGroupsSnapshot.forEach((hobbyGroupData:any)=>{
          if(hobbyGroupData.payload.doc.data().members.includes(this._firestoreProvider.getActualUser().uid)
            || hobbyGroupData.payload.doc.data().owner===this._firestoreProvider.getActualUser().uid){
            this._groups[index].groups.push({
              id:hobbyGroupData.payload.doc.id,
              data:hobbyGroupData.payload.doc.data()
            })
          }
        })
        index++
      });
    });
  }

  getCreatedGroups(hobbys){
    let index = 0;
    hobbys.forEach(element => {
      this._groups.push({uid:element,groups:[]})
      this._firestoreProvider.getAllHobbyGroups(element).subscribe((hobbyGroupsSnapshot)=>{
        hobbyGroupsSnapshot.forEach((hobbyGroupData:any)=>{
          if(hobbyGroupData.payload.doc.data().owner===this._firestoreProvider.getActualUser().uid){
            this._groups[index].groups.push({
              id:hobbyGroupData.payload.doc.id,
              data:hobbyGroupData.payload.doc.data()
            })
          }
        })
        index++
      });
    });
  }

  getJoinedGroups(hobbys){
    let index = 0;
    hobbys.forEach(element => {
      this._groups.push({uid:element,groups:[]})
      this._firestoreProvider.getAllHobbyGroups(element).subscribe((hobbyGroupsSnapshot)=>{
        hobbyGroupsSnapshot.forEach((hobbyGroupData:any)=>{
          if(hobbyGroupData.payload.doc.data().members.includes(this._firestoreProvider.getActualUser().uid)){
            this._groups[index].groups.push({
              id:hobbyGroupData.payload.doc.id,
              data:hobbyGroupData.payload.doc.data()
            })
          }
        })
        index++
      });
    });
  }

}

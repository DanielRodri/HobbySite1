import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserGroupsPage } from '../user-groups/user-groups';

/**
 * Generated class for the UserGroupsTabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-groups-tabs',
  templateUrl: 'user-groups-tabs.html',
})
export class UserGroupsTabsPage {
  private _isSearchbarOpened:boolean=false;
  private tab1Root = UserGroupsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserGroupsTabsPage');
  }
  onSearch(event){
    console.log(event.target.value)
  }
  itemTapped(event, item) {

  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HobbyGroupForumPage } from '../hobby-group-forum/hobby-group-forum';
import { HobbyGroupEventsPage } from '../hobby-group-events/hobby-group-events';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this._title= this.navParams.get('title');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HobbyGroupTabsPage');
  }

}

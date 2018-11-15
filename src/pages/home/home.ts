import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HobbyGroupsPage } from '../hobby/hobby-groups/hobby-groups'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  goGroups(title){//envia al grupo
    let data = {
      title:title
    }
    this.navCtrl.push(HobbyGroupsPage, data)
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Event } from '../../../../models/event';
import { FirestoreProvider } from '../../../../providers/firestore/firestore';

/**
 * Generated class for the HobbyGroupAddEventModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hobby-group-add-event-modal',
  templateUrl: 'hobby-group-add-event-modal.html'
})
export class HobbyGroupAddEventModalPage {
  private _minDate:string
  private _selectedDate:Date
  private _selectedHour:Date
  private _event:Event

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private _firestoreProvider: FirestoreProvider,
              private _viewCtrl: ViewController) {
    let auxDate = new Date(Date.now())
    auxDate.setDate(auxDate.getDate()+1)
    this._minDate = auxDate.toISOString().split('T')[0];
    this._event = { date:undefined,place:undefined,
                    dateCreated:undefined,
                    willGoOnes:[],interestedOnes:[],
                    title:undefined,description:undefined,
                    owner:this._firestoreProvider.getActualUser().uid
                  }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HobbyGroupAddEventModalPage');
  }


  addEvent(){
    
    if(this._selectedDate !== undefined && this._selectedHour!==undefined && 
      this._event.title!== undefined && this._event.description!==undefined && 
      this._event.place!== undefined){

      this._event.date = new Date(this._selectedDate.toString()+'T'+this._selectedHour.toString())
      this._event.dateCreated = new Date(Date.now())
      this._firestoreProvider.addHobbyGroupEvent(this._event).then(()=>{
        this._viewCtrl.dismiss({})
      });
    }
  }

}

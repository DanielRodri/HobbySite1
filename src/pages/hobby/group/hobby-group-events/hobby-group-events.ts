import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { HobbyGroupAddEventModalPage } from '../hobby-group-add-event-modal/hobby-group-add-event-modal';
import { FirestoreProvider } from '../../../../providers/firestore/firestore';


/**
 * Generated class for the HobbyGroupEventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hobby-group-events',
  templateUrl: 'hobby-group-events.html',
})
export class HobbyGroupEventsPage {
  private _events:Array<any>
  private _postOwner:any={displayName:"Error observable en nombre y photo",photoURL:""}

  constructor( public navCtrl: NavController,
               public navParams: NavParams, 
               private _toastCtrl:ToastController,
               private _modalCtrl:ModalController,
               private _firestoreProvider:FirestoreProvider,
              ){
                this.getEvents()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HobbyGroupEventsPage');
  }
  createEvent(){
    
  }

  getEvents(){
    this._firestoreProvider.getAllHobbyGroupEvents().subscribe((hobbyGroupsSnapshot)=>{
      this._events=[]
      hobbyGroupsSnapshot.forEach((hobbyGroupEventData:any)=>{
        this._events.push({
          id:hobbyGroupEventData.payload.doc.id,
          data:hobbyGroupEventData.payload.doc.data()
        })
      })
    });
    
  }

  checkOption(list){
    if(list.includes(this._firestoreProvider.getActualUser().uid))
      return true
    else
      return false
  }
  changeOptionWillGo(event,eventData){
    let userUid=this._firestoreProvider.getActualUser().uid
    if(eventData.willGoOnes.includes(userUid)){
      eventData.willGoOnes.forEach( (item, index) => {
        if(item === userUid) eventData.willGoOnes.splice(index,1);
      });
    }
    else
      eventData.willGoOnes.push(userUid)
    this._firestoreProvider.updateAllHobbyGroupEvent(event,eventData)

  }
  changeOptionInterested(event,eventData){
    let userUid=this._firestoreProvider.getActualUser().uid
    if(eventData.interestedOnes.includes(userUid)){
      eventData.interestedOnes.forEach( (item, index) => {
        if(item === userUid) eventData.interestedOnes.splice(index,1);
      });
    }
    else
      eventData.interestedOnes.push(userUid)
    this._firestoreProvider.updateAllHobbyGroupEvent(event,eventData)

  }

  showAddEventModal(){
    let writePostModal = this._modalCtrl.create('HobbyGroupAddEventModalPage')
    writePostModal.present()
    //this.navCtrl.present(writePostModal);
  }



  presentToast(message) {
    let toast = this._toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }

}

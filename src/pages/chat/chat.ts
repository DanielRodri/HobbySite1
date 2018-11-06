import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore'
import {Observable } from 'rxjs-compat';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

interface Msj {
  Mensaje: string;
  priority: number;
  id?: string;
}

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  mensajeCollection: AngularFirestoreCollection<Msj>;
  mensaje: Observable<Msj[]>;
  editorMsg: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public asf: AngularFirestore) {
  }

  ionViewDidLoad() {
    this.mensajeCollection = this.asf.collection('Chat',ref => ref.orderBy('Fecha'));
    this.mensaje = this.mensajeCollection.valueChanges();


    console.log('ionViewDidLoad ChatPage');
  }


  sendMsg(){
   if(this.editorMsg!=""){
    this.asf.collection('Chat').add({Mensaje:this.editorMsg, Fecha: new Date().getTime()}).then(newItem => {
      
      console.log("Bien perro");
      
    }).catch(err => {
      console.log(err)
    });
    
  }
    
  this.editorMsg="";
  }

}

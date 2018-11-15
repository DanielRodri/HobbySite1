import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import {AngularFireAuth} from 'angularfire2/auth'
import { HomePage } from '../home/home';
import { AlertController } from 'ionic-angular';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import firebase from 'firebase';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;
  passwordtype:string='password';
  passeye:string ='eye';

  constructor(private alertCtrl: AlertController,private afAuth: AngularFireAuth,
    private _firestoreProvider: FirestoreProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  async register(user: User){
    try{
    const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    if(result){
      this._firestoreProvider.setActualUser(firebase.auth().currentUser)
      this.navCtrl.setRoot(HomePage);
    }  
    }
    catch(e){
      let alert = this.alertCtrl.create({
        title: 'Alert',
        subTitle: e.message,
        buttons: ['OK']
      }); 
      alert.present();
      console.error(e.message);
    }
  }

  managePassword() {
    if(this.passwordtype == 'password'){
      this.passwordtype='text';
      this.passeye='eye-off';
    }else{
      this.passwordtype='password';
      this.passeye = 'eye';
    }
  }
}

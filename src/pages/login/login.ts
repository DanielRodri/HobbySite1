import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import {AngularFireAuth} from 'angularfire2/auth'
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import firebase from 'firebase';
import { AlertController } from 'ionic-angular';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { Facebook} from '@ionic-native/facebook';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  constructor(private alertCtrl: AlertController,private afAutn:AngularFireAuth,
     public navCtrl: NavController,
     public facebook: Facebook,
     public navParams: NavParams,
     private _firestoreProvider: FirestoreProvider) {
  }

  async login(user: User){
   try{
    this.afAutn.auth.signInWithEmailAndPassword(user.email,user.password)
    .then((res)=> {
      this._firestoreProvider.setActualUser(firebase.auth().currentUser)
      this.navCtrl.setRoot(HomePage);

    }).catch((err)=> {
      console.error(err);
      let alert = this.alertCtrl.create({
        title: 'Alert',
        subTitle: "Error iniciando sesion verifique que el email y la contraseña es la correcta",
        buttons: ['OK']
      }); 
      alert.present();
    });}catch(e){
      let alert = this.alertCtrl.create({
        title: 'Alert',
        subTitle: e.message,
        buttons: ['OK']
      }); 
      alert.present();

    }

  }

  register(){
    this.navCtrl.push(RegisterPage);
  }

  async loginWithFacebook(){
    this.facebook.login(['email']).then(res=>{
      const fc=firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken)
      firebase.auth().signInWithCredential(fc).then(fs=>{
        this.navCtrl.setRoot(HomePage);
      }).catch(ferr=>{
        alert("firebase error")
      })
    }).catch(err=>{
      alert(JSON.stringify(err))
    })

  }

  async loginWithGoogle(){
    try{
    const result = await this.afAutn.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider);
    if(result){
      this._firestoreProvider.setActualUser(firebase.auth().currentUser.uid)
      this.navCtrl.setRoot(HomePage)
    }

    }
    catch(e){
      
      console.error(e.message);
    }

  }

}

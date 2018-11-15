import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user';
import {AngularFireAuth} from 'angularfire2/auth'
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import firebase from 'firebase';
import { AlertController } from 'ionic-angular';

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
  constructor(private alertCtrl: AlertController,private afAutn:AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  async login(user: User){
   try{
    this.afAutn.auth.signInWithEmailAndPassword(user.email,user.password)
    .then((res)=> {
      
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

  loginWithFacebook(){
    try{
    const result = this.afAutn.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    if(result){
      this.navCtrl.setRoot(HomePage)
    }

    }
    catch(e){
      
      console.error(e.message);
    }

  }

}

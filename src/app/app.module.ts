import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ChatPage } from '../pages/chat/chat';
import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { RegisterPage } from '../pages/register/register';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

var config = {
  apiKey: "AIzaSyDfoSzhIgB4Ina7RHnOLlvDlyOudU9c5sA",
  authDomain: "hobbysite-7852d.firebaseapp.com",
  databaseURL: "https://hobbysite-7852d.firebaseio.com",
  projectId: "hobbysite-7852d",
  storageBucket: "hobbysite-7852d.appspot.com",
  messagingSenderId: "757754318399"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ChatPage,
    LoginPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp), 
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ChatPage,
    LoginPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

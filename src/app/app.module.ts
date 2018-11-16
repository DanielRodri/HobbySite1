import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ChatPage } from '../pages/chat/chat';
import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { RegisterPage } from '../pages/register/register';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConfigPage } from '../pages/config/config';
import { HobbyGroupsPage } from '../pages/hobby/hobby-groups/hobby-groups';
import { HobbyGroupForumPage } from '../pages/hobby/group/hobby-group-forum/hobby-group-forum';
import { HobbyGroupEventsPage } from '../pages/hobby/group/hobby-group-events/hobby-group-events';
import { HobbyGroupTabsPage } from '../pages/hobby/group/hobby-group-tabs/hobby-group-tabs';
import { UserGroupsPage } from '../pages/user/user-groups/user-groups';
import { UserGroupsTabsPage } from '../pages/user/user-groups-tabs/user-groups-tabs';
import { Facebook} from '@ionic-native/facebook';
import { FirestoreProvider } from '../providers/firestore/firestore';
import { TimeAgoPipe } from 'time-ago-pipe';
import { AngularFireAuthModule } from '@angular/fire/auth';



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
    TimeAgoPipe,
    HomePage,
    ListPage,
    ChatPage,
    ConfigPage,
    HobbyGroupsPage,
    HobbyGroupTabsPage,
    HobbyGroupForumPage,
    HobbyGroupEventsPage,
    //HobbyGroupWriteModalPage,
    UserGroupsPage,
    UserGroupsTabsPage,
    LoginPage,
    RegisterPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp), 
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ChatPage,
    ConfigPage,
    HobbyGroupsPage,
    HobbyGroupTabsPage,
    HobbyGroupForumPage,
    HobbyGroupEventsPage,
    //HobbyGroupWriteModalPage,
    UserGroupsPage,
    UserGroupsTabsPage,
    LoginPage,
    RegisterPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirestoreProvider,
  ]
})
export class AppModule {}

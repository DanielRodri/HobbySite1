import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Observable } from 'rxjs/internal/Observable';
import { FirestoreProvider } from '../../../../providers/firestore/firestore';
import { HobbyGroupWritePostModalPage } from '../hobby-group-write-post-modal/hobby-group-write-post-modal';

/**
 * Generated class for the HobbyGroupForumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hobby-group-forum',
  templateUrl: 'hobby-group-forum.html',
})
export class HobbyGroupForumPage {
  private _title:string
  private _posts:Array<any>

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private _firestoreProvider: FirestoreProvider,
    private _modalCtrl: ModalController) {
      
    this._title= this.navParams.get('title');
    this.getPosts()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HobbyGroupForumPage');
  }

  showWriteModal(){
    let writePostModal = this._modalCtrl.create('HobbyGroupWritePostModalPage')
    writePostModal.present()
    //this.navCtrl.present(writePostModal);
  }

  getPosts(){
    this._firestoreProvider.getAllHobbyGroupPosts().subscribe((hobbyGroupsSnapshot)=>{
      this._posts=[]
      hobbyGroupsSnapshot.forEach((hobbyGroupPostData:any)=>{
        this._posts.push({
          id:hobbyGroupPostData.payload.doc.id,
          data:hobbyGroupPostData.payload.doc.data()
        })
      })
    });
    
  }

  getPostComments(id){
    return this._firestoreProvider.getAllHobbyGroupPostComments(id);
  }

  getDate(date){
    console.log(date)
    return new Date(date)
  }


}

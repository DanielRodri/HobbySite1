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
  private _postOwner:any={displayName:"Error observable en nombre y photo",photoURL:""}

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

  giveLike(post,postData){
    let userUid=this._firestoreProvider.getActualUser().uid
    if(postData.likes.includes(userUid)){
        postData.likes.forEach( (item, index) => {
          if(item === userUid) postData.likes.splice(index,1);
        });
      
    }
    else{
      if(postData.dislikes.includes(userUid)){
        postData.dislikes.forEach( (item, index) => {
          if(item === userUid) postData.dislikes.splice(index,1);
        });
      }
      postData.likes.push(userUid)
    }
    this._firestoreProvider.updateAllHobbyGroupPost(post,postData)
  }
  giveDislike(post,postData){
    let userUid=this._firestoreProvider.getActualUser().uid
    if(postData.dislikes.includes(userUid)){
        postData.dislikes.forEach( (item, index) => {
          if(item === userUid) postData.dislikes.splice(index,1);
        });
    }
    else{
      if(postData.likes.includes(userUid)){
        postData.likes.forEach( (item, index) => {
          if(item === userUid) postData.likes.splice(index,1);
        });
      }
      postData.dislikes.push(userUid)
    }
    this._firestoreProvider.updateAllHobbyGroupPost(post,postData)
  }
  checkOption(list){
    if(list.includes(this._firestoreProvider.getActualUser().uid))
      return true
    else
      return false
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

  getUserData(userUid){
    //console.log(this._firestoreProvider.getUserData(userUid))
    
    this._firestoreProvider.getUserData(userUid).subscribe((data:any)=>{
      //if(data.displayName!==null)
        this._postOwner={displayName:data.displayName,photoURL:data.photoURL}
     // else
       // this._postOwner={displayName:data.email,photoURL:data.photoURL}
    })
  }

}

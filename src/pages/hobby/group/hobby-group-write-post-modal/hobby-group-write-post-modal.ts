import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FirestoreProvider } from '../../../../providers/firestore/firestore';
import { Timestamp } from 'rxjs-compat';
import { Post } from '../../../../models/post';

/**
 * Generated class for the HobbyGroupWritePostModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hobby-group-write-post-modal',
  templateUrl: 'hobby-group-write-post-modal.html',
})
export class HobbyGroupWritePostModalPage {
  private _post:Post

  private _description:string

  constructor(public navCtrl: NavController, public navParams: NavParams,private _firestoreProvider: FirestoreProvider,
    private _viewCtrl:ViewController) {
      this._post={date:null,imgURL:"",likes:[],message:"",
                  /*owner:[this._firestoreProvider.getActualUser().uid,
                        this._firestoreProvider.getActualUser().email,
                        ""]*/
                  owner:{uid:this._firestoreProvider.getActualUser().uid,
                        imgURL:"",
                        displayName:this._firestoreProvider.getActualUser().email}
                };
      console.log(this._firestoreProvider.getActualUser())
    //this._title=""
      //this._description=""
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HobbyGroupWritePostModalPage');
  }
  
  setImg(value) {
    this._post.imgURL = value;
    //console.log(this._title)
  }
  setMessage(value) {
    this._post.message = value;
  }

  addPost(){
    //if(this._title!==""&&this._description!=="")
    this._post.date=new Date(Date.now())
    if(this._post.message!==""||this._post.imgURL!=="")
      this._firestoreProvider.addHobbyGroupPost(this._post).then(()=>{
        this._viewCtrl.dismiss({})
      });
    //  })
  }

}

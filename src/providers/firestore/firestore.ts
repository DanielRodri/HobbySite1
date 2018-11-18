import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import firebase from 'firebase';


/*
  Generated class for the FirestoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirestoreProvider {
  private _actualHobby:string
  private _actualGroup:string
  private _actualUser:any

  constructor(/*public http: HttpClient, */private _firestore: AngularFirestore) {
    console.log('Hello FirestoreProvider Provider');
  }
  //Crea un nuevo servicio
  /*public createCrService(data: {nombre: string, url: string}) {
    return this.firestore.collection('crService').add(data);
  }*/
  public setActualGroup(group){
    this._actualGroup=group
  }
  public setActualHobby(hobby){
    this._actualHobby=hobby
  }
  public getActualUser(){
    return this._actualUser
  }
  public setActualUser(user){
    this._actualUser = {uid:user.uid,email:user.email,displayName:user.displayName,photoURL:user.photoURL}
    if(user.photoURL===null){
      this._actualUser.photoURL='./../../assets/default_user.png'
    }
    if(user.displayName===null){
      this._actualUser.displayName=user.email
    }
    return this._firestore.collection('/Users').doc(user.uid).set({email:this._actualUser.email,displayName:this._actualUser.displayName,photoURL:this._actualUser.photoURL})
  }
  public getUserData(userUid){
    return this._firestore.collection('/Users').doc(userUid).valueChanges();
  }


  //Obtiene un servicio

  public getAllHobbyGroups(documentId: string) {
    this.setActualHobby(documentId)
    return this._firestore.collection('/HobbysData').doc(this._actualHobby).collection('/Groups').snapshotChanges();
  }
  public getHobbyGroup() {
    return this._firestore.collection('/HobbysData').doc(this._actualHobby).collection('/Groups').doc(this._actualGroup).valueChanges();
  }

  public getAllHobbyGroupEvents() {
    return this._firestore.collection('/HobbysData').doc(this._actualHobby).collection('/Groups').
          doc(this._actualGroup).collection('/Events').snapshotChanges();
  }
  public updateAllHobbyGroupEvent(eventId,data){
    return this._firestore.collection('/HobbysData').doc(this._actualHobby).collection('/Groups').
          doc(this._actualGroup).collection('/Events').doc(eventId).set(data).then((ref)=>{
          })
  }

  public getAllHobbyGroupPosts() {
    return this._firestore.collection('/HobbysData').doc(this._actualHobby).collection('/Groups').
          doc(this._actualGroup).collection('/Forum').snapshotChanges();
  }
  public getAllHobbyGroupPostComments(id){
    return this._firestore.collection('/HobbysData').doc(this._actualHobby).collection('/Groups').
          doc(this._actualGroup).collection('/Forum').doc(id).collection('/Comments').valueChanges();
  }
  //Añade un grupo
  public addHobbyGroup(data){
    return this._firestore.collection('/HobbysData').doc(this._actualHobby).collection('/Groups').add(data).then((ref)=>{
      this.setActualGroup(ref.id)
    })
  }
  public updateAllHobyGroup(data){
    return this._firestore.collection('/HobbysData').doc(this._actualHobby).collection('/Groups').
    doc(this._actualGroup).set(data).then((ref)=>{
    })
  }

  public updateAllHobbyGroupPost(postId,data){
    return this._firestore.collection('/HobbysData').doc(this._actualHobby).collection('/Groups').
          doc(this._actualGroup).collection('/Forum').doc(postId).set(data).then((ref)=>{

          })
  }
  
  public addHobbyGroupPost(data){
    return this._firestore.collection('/HobbysData').doc(this._actualHobby).collection('/Groups').
    doc(this._actualGroup).collection('/Forum').add(data).then((ref)=>{

    })
  }
  public addHobbyGroupEvent(data){
    return this._firestore.collection('/HobbysData').doc(this._actualHobby).collection('/Groups').
    doc(this._actualGroup).collection('/Events').add(data).then((ref)=>{

    })
  }

  //Obtiene todos los servicios
  public getAllHobbysGroups() {
    return this._firestore.collection('/HobbysData').snapshotChanges();
  }
  //Actualiza un servicio
  public updateCrService(documentId: string, data: {nombre?: string, url?:string}) {
    return this._firestore.collection('/crService').doc(documentId).set(data);
  }

}

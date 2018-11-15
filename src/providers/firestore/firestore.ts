import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

/*
  Generated class for the FirestoreProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirestoreProvider {
  private _actualHobby:string
  private _actualGroup:string
  private _actualUser:string="uid1"

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
    this._actualUser=user
  }


  //Obtiene un servicio

  public getAllHobbyGroups(documentId: string) {
    this.setActualHobby(documentId)
    return this._firestore.collection('/HobbysData').doc(this._actualHobby).collection('/Groups').snapshotChanges();
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

  //Obtiene todos los servicios
  public getAllHobbysGroups() {
    return this._firestore.collection('/HobbysData').snapshotChanges();
  }
  //Actualiza un servicio
  public updateCrService(documentId: string, data: {nombre?: string, url?:string}) {
    return this._firestore.collection('/crService').doc(documentId).set(data);
  }

}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HobbyAddGroupModalPage } from './hobby-add-group-modal';

@NgModule({
  declarations: [
    HobbyAddGroupModalPage,
  ],
  imports: [
    IonicPageModule.forChild(HobbyAddGroupModalPage),
  ],
})
export class HobbyAddGroupModalPageModule {}

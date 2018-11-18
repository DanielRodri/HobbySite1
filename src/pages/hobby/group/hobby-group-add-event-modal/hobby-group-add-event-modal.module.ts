import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HobbyGroupAddEventModalPage } from './hobby-group-add-event-modal';

@NgModule({
  declarations: [
    HobbyGroupAddEventModalPage,
  ],
  imports: [
    IonicPageModule.forChild(HobbyGroupAddEventModalPage),
  ],
})
export class HobbyGroupAddEventModalPageModule {}

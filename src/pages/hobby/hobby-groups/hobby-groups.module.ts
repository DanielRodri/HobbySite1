import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HobbyGroupsPage } from './hobby-groups';

@NgModule({
  declarations: [
    HobbyGroupsPage,
  ],
  imports: [
    IonicPageModule.forChild(HobbyGroupsPage),
  ],
})
export class HobbyGroupsPageModule {}

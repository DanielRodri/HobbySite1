import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserGroupsTabsPage } from './user-groups-tabs';

@NgModule({
  declarations: [
    UserGroupsTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(UserGroupsTabsPage),
  ],
})
export class UserGroupsTabsPageModule {}

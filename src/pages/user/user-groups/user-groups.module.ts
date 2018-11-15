import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserGroupsPage } from './user-groups';

@NgModule({
  declarations: [
    UserGroupsPage,
  ],
  imports: [
    IonicPageModule.forChild(UserGroupsPage),
  ],
})
export class UserGroupsPageModule {}

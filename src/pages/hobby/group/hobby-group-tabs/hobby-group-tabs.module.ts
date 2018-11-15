import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HobbyGroupTabsPage } from './hobby-group-tabs';

@NgModule({
  declarations: [
    HobbyGroupTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(HobbyGroupTabsPage),
  ],
})
export class HobbyGroupTabsPageModule {}

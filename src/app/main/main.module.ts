import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowseModule} from './browse/browse.module';
import {ProfileModule} from "./profile/profile.module";
import {SearchModule} from "./search/search.module";
import {YourMusicModule} from "./your-music/your-music.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    BrowseModule,
    ProfileModule,
    SearchModule,
    YourMusicModule
  ],
  declarations: [MainComponent],
  exports: [MainComponent]
})
export class MainModule { }

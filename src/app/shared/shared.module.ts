import { ControlPanelComponent } from './control-panel/control-panel.component';
import { MusicPlayerComponent } from './music-player/music-player.component';
import { AddToPlaylistModalComponent } from './modals/add-to-playlist-modal/add-to-playlist-modal.component';
import { EditPlaylistModalComponent } from './modals/edit-playlist-modal/edit-playlist-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

const modules = [
  BrowserModule,
  HttpModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule
];
const compononents = [
  SideNavComponent,
  ControlPanelComponent,
  EditPlaylistModalComponent,
  AddToPlaylistModalComponent,
  MusicPlayerComponent
];
@NgModule({
  imports: [
    CommonModule, modules
  ],
  declarations: [compononents],
  exports: [modules, compononents]
})
export class SharedModule { }

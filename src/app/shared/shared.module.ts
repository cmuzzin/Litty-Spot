import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import { EditPlaylistModalComponent } from './components/edit-playlist-modal/edit-playlist-modal.component';
import { MusicPlayerComponent } from './components/music-player/music-player.component';
import { AddToPlaylistModalComponent } from './components/add-to-playlist-modal/add-to-playlist-modal.component';
import { ActiveSongService } from './components/music-player/active-song.service';
import { SpotifyService } from './services/spotify-services';
import { UtilitiesService } from './services/utilities.service';
import { AddSongToPlaylistService } from './components/add-to-playlist-modal/add-song-to-playlist.service';
import { ControlPanelServiceService } from './components/control-panel/control-panel-service.service';
import { EditPlayListService } from './components/edit-playlist-modal/edit-play-list-service';
import { FilterPipe } from './pipes/filter.pipe';

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

const services = [
  ActiveSongService,
  SpotifyService,
  UtilitiesService,
  AddSongToPlaylistService,
  ControlPanelServiceService,
  EditPlayListService,
];

const pipes = [
  FilterPipe,
];

@NgModule({
  imports: [
    CommonModule, modules
  ],
  declarations: [compononents, pipes],
  exports: [modules, compononents, pipes],
  providers: [services]
})
export class SharedModule { }

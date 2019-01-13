import { AppComponent } from './app.component';
import { CallbackComponent } from './callback/callback.component';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { MainModule } from './main/main.module';
import { ActiveSongService } from './shared/music-player/active-song.service';
import { SpotifyService } from './shared/services/spotify-services';
import { UtilitiesService } from './shared/services/utilities.service';
import { AddSongToPlaylistService } from './shared/modals/add-to-playlist-modal/add-song-to-playlist.service';
import { ControlPanelServiceService } from './shared/control-panel/control-panel-service.service';
import { EditPlayListService } from './shared/modals/edit-playlist-modal/edit-play-list-service';
import { AuthGuard, AuthService } from './auth';
import { AppConfig } from './shared/config/app.config';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-center',
      enableHtml: true,
      closeButton: true,
      progressBar: true,
      newestOnTop: true,
      preventDuplicates: true
    }),
    SharedModule,
    HomeModule,
    MainModule,
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
    ActiveSongService,
    SpotifyService,
    UtilitiesService,
    AddSongToPlaylistService,
    ControlPanelServiceService,
    EditPlayListService,
    {
      provide: 'SpotifyConfig',
      useValue: {
        clientId: '9d7ee30778da43ce8b048be43fb84050',
        redirectUri: 'localhost:4200/callback',
        scope: 'user-follow-modify user-follow-read playlist-read-private playlist-read-collaborative ' +
        'playlist-modify-public playlist-modify-private ' +
        'user-library-read user-library-modify user-read-private user-modify-playback-state',
        authToken: localStorage.getItem('angular2-spotify-token')
      },
    },
     AuthGuard, AuthService, AppConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

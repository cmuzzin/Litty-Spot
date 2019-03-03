import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CallbackComponent } from './callback/callback.component';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { MainModule } from './main/main.module';
import { AuthGuard, AuthService } from './auth';
import { AppConfig } from './app.config';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    CallbackComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
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

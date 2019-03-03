import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from '../../shared/services/spotify-services';
import { ActiveSongService } from 'app/shared/components/music-player/active-song.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(
    public router: Router,
    private activeSong: ActiveSongService,
    public spotifyService: SpotifyService
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  logout() {
    localStorage.clear();
    this.activeSong.currentSong.next('');
    this.router.navigate(['home']);
  }
}

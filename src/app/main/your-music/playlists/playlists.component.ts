import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { SpotifyService } from 'app/shared/services/spotify-services';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  offset = 0;
  user: any;
  playlists: any = [];

  constructor(private spotifyService: SpotifyService,
              private router: Router) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    const options = { limit : 50 };
    this.spotifyService.getUserPlaylists(this.user.id, options).subscribe(
      data => {
        this.playlists = data;
      },
      error => {
        console.log(error);
      }
    );
  }


  loadMorePlaylists() {
    const options = { offset: this.offset += 20 };
    this.spotifyService.getUserPlaylists(this.user.id, options).subscribe(
      data => {
        this.playlists.items = this.playlists.items.concat(data.items);
        document.getElementById('loadMorePlaylists').blur();
      },
      error => {
        console.log(error);
      }
    );
  }

  goToPlaylist(playlist) {
    this.router.navigate(['main/playlist', playlist.owner.id, playlist.id])
  }

  goToUser(playlist) {
    this.router.navigate(['main/owner', playlist.owner.id])
  };

}

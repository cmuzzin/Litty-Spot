import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from 'app/shared/services/spotify-services';
import { UtilitiesService } from 'app/shared/services/utilities.service';
import { ActiveSongService } from 'app/shared/components/music-player/active-song.service';
@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  album: any;
  saved: boolean;
  options: any;
  selected: any;

  constructor(private spotifyService: SpotifyService,
              private router: Router,
              private ar: ActivatedRoute,
              private activeSongService: ActiveSongService,
              private utilities: UtilitiesService) {
  }

  ngOnInit() {
    this.ar.params.subscribe(
      params => {
        this.spotifyService.getAlbum(params.albumId).subscribe(
          data => {
            this.album = data;
            this.spotifyService.userAlbumsContains(this.album.id).subscribe(
              (saved) => {
                this.saved = saved[0];
              },
              error => {
                console.log(error);
              }
            )
          },
          error => {
            console.log(error);
          }
        )
      }
    );
  }

  removeAlbum() {
    this.spotifyService.removeUserAlbums(this.album.id).subscribe(
      () => {
        this.saved = !this.saved;
      },
      error => {
        console.log(error);
      }
    )
  }

  saveAlbum() {
    this.spotifyService.saveUserAlbums(this.album.id).subscribe(
      () => {
        this.saved = !this.saved;
      },
      error => {
        console.log(error);
      }
    )
  }

  goToArtist(artist) {
    this.router.navigate(['main/artist', artist.id])
  };

  setClickedRow(track, i) {
    this.selected = i;
    this.activeSongService.currentSong.next(track);
  };

  formatDuration(duration) {
    return this.utilities.formatDuration(duration);
  }

}

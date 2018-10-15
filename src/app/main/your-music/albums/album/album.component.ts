import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import {SpotifyService} from '../../../../shared/services/spotify-services';
import {ActivatedRoute, Router} from '@angular/router';
import {ActiveSongService} from '../../../music-player/active-song.service';
import {NavigationService} from '../../../../shared/services/navigation.service';
import {UtilitiesService} from "../../../../shared/services/utilities.service";

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  album: any;
  saved: boolean;
  options: any;
  albumTracks: any;
  selected: any;

  constructor(private spotifyService: SpotifyService,
              private router: Router,
              private ar: ActivatedRoute,
              private activeSongService: ActiveSongService,
              private navigationService: NavigationService,
              private utilities: UtilitiesService) {
  }

  ngOnInit() {
    this.ar.params.subscribe(
      params => {
        this.spotifyService.getAlbum(params.albumId).subscribe(
          data => {
            this.album = data;
            this.spotifyService.userAlbumsContains(this.album.id).subscribe(
              data => {
                this.saved = data[0];
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

  saveAlbum(album) {
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
    this.navigationService.goToArtist(artist);
  };

  setClickedRow(track, i) {
    this.selected = i;
    this.activeSongService.currentSong.next(track);
  };

  formatDuration(duration) {
    return this.utilities.formatDuration(duration);
  }

}

import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../../../shared/services/spotify-services';
import {Router} from '@angular/router';
import * as _ from 'lodash';
import {NavigationService} from '../../../shared/services/navigation.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})

export class AlbumsComponent implements OnInit {
  albums: any;
  offset: number = 0;
  options: any;
  albumsTotal: any;

  constructor(private spotifyService: SpotifyService,
              private router: Router,
              private navigationService: NavigationService) {
  }

  ngOnInit() {
    this.spotifyService.getSavedUserAlbums().subscribe(
      data => {
        this.albumsTotal = data.total;
        this.albums = data.items
      },
      error => {console.log(error);
      }
    )
  }

  loadMoreAlbums() {
    this.offset = this.offset + 20;
    this.options = {
      offset: this.offset
    };

    this.spotifyService.getSavedUserAlbums(this.options).subscribe(
      data => {
        this.albums = _.concat(this.albums, data.items);
        document.getElementById('loadMoreAlbums').blur();
      },
      error => {
        console.log(error);
      }
    )
  };

  goToAlbum(album) {
    this.navigationService.goToAlbum(album);
  }

}

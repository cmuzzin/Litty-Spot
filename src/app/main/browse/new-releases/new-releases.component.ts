import { Component, OnInit } from '@angular/core';
import {SpotifyService} from '../../../shared/services/spotify-services';
import {Router} from '@angular/router';
import * as _ from 'lodash';
import { NavigationService } from '../../../shared/services/navigation.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.scss']
})
export class NewReleasesComponent implements OnInit {
  public offset: number = 0;
  public newReleases: any;
  public options: any;
  private album: any;
  constructor(private spotifyService: SpotifyService, private router: Router, private navigationService: NavigationService) { }

  ngOnInit() {
    this.spotifyService.getNewReleases().subscribe(
      data => {
        this.newReleases = data.albums;
      },
      error => {
        console.log(error);
      }
    )
  }
  loadMoreNewReleases() {
    this.options = {
      offset: this.offset + 20,
    };
    this.spotifyService.getNewReleases(this.options).subscribe(
      data => {
        this.newReleases = _.concat(this.newReleases.items, data.albums.items);
        document.getElementById('loadMoreNewReleases').blur();
      },
      error => {
        console.log(error);
      }
    )
  }

  goToAlbum(album) {
    this.spotifyService.getAlbum(album.id).subscribe(
      data => {
        this.album = {
          album: data
        };
        this.navigationService.goToAlbum(this.album);
      },
      error => {
        console.log(error);
      }
    );
  };
}

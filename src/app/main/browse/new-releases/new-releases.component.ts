import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private spotifyService: SpotifyService,
    private router: Router,
    private ar: ActivatedRoute) { }

  ngOnInit() {
    this.ar.params.subscribe();
    this.spotifyService.getNewReleases().subscribe(
      data => {
        console.log(data);
        this.newReleases = data.albums;
      },
      error => {
        console.log(error);
      }
    )
  }
  loadMoreNewReleases() {
    const options = {
      offset: this.offset += 20,
    };
    this.spotifyService.getNewReleases(options).subscribe(
      data => {
        this.newReleases.items = _.concat(this.newReleases.items, data.albums.items);
        document.getElementById('loadMoreNewReleases').blur();
      },
      error => {
        console.log(error);
      }
    )
  }
  goToAlbum(album) {
    this.router.navigate(['main/album', album.id]);
  }
}

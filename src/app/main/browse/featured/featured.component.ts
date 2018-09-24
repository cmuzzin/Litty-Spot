import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../../../shared/services/spotify-services';
import {ActivatedRoute, Router} from '@angular/router';
import {NavigationService} from '../../../shared/services/navigation.service';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {
  public featuredPlaylists: any;

  constructor(public spotifyService: SpotifyService,
              public router: Router,
              private ar: ActivatedRoute,
              private navigationService: NavigationService) {
  }

  ngOnInit() {
    this.ar.params.subscribe(
      () => {
        this.spotifyService.getFeaturedPlaylists().subscribe(
          data => {
            this.featuredPlaylists = data;
          },
          error => console.log(error)
        )
      },
      error => console.log(error)
    );
  }

  goToPlaylist(playlist) {
    this.navigationService.goToPlaylist(playlist);
  };
}

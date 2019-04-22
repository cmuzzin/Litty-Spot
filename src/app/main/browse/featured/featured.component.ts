import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../../shared/services/spotify-services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent implements OnInit {
  featuredPlaylists: any = {message: '', playlists: {}};

  constructor(private spotifyService: SpotifyService,
              private router: Router,
              private ar: ActivatedRoute) {
  }

  ngOnInit() {
        this.spotifyService.getFeaturedPlaylists().subscribe(
          data => {
            this.featuredPlaylists = data;
          },
          error => console.log(error)
        );
  }

  goToPlaylist(playlist) {
    this.router.navigate(['main/playlist', playlist.owner.id, playlist.id])
  };
}

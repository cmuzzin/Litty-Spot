import { Component, OnInit, HostListener} from '@angular/core';
import { SpotifyService } from '../../../shared/services/spotify-services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {
  artists: any = [];
  type = 'artist';

@HostListener('window:scroll', [])
onScroll(): void {
if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && this.artists.items.length < this.artists.total) {
      this.loadMoreArtists();
    }
}

  constructor(public spotifyService: SpotifyService,
              public router: Router) {
  }

  ngOnInit() {
    const options = { limit: 50 };
    this.spotifyService.getFollowedArtists(this.type, options).subscribe(
      data => {
        this.artists = data.artists;
      },
      error => {
        console.log(error);
      }
    )
  }

  loadMoreArtists() {
    const options = {
      limit: 50,
      after: this.artists.cursors.after
    };
    this.spotifyService.getFollowedArtists(this.type, options).subscribe(
      data => {
        this.artists.items = this.artists.items.concat(data.artists.items);
      },
      error => {
        console.log(error);
      }
    );
  };

  goToArtist(artist) {
    this.router.navigate(['main/artist', artist.id])
  };
}

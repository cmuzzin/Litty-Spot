import { Component, Input, OnInit } from '@angular/core';
import { SpotifyService } from '../../../../../shared/services/spotify-services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-related-artists',
  templateUrl: './related-artists.component.html',
  styleUrls: ['./related-artists.component.scss']
})
export class RelatedArtistsComponent implements OnInit {
  @Input() artist: any;
  public relatedArtists: any;

  constructor(private spotifyService: SpotifyService,
              private router: Router) {
  }

  ngOnInit() {
    this.spotifyService.getRelatedArtists(this.artist.id).subscribe(
      data => {
        this.relatedArtists = data.artists;
      },
      error => {
        console.log(error);
      }
    )
  }

  goToArtist(artist) {
    this.router.navigate(['main/artist', artist.id])
  };


}

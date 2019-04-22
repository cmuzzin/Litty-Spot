import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../../shared/services/spotify-services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-most-played',
  templateUrl: './most-played.component.html',
  styleUrls: ['./most-played.component.scss']
})
export class MostPlayedComponent implements OnInit {
  mostPlayed: any;
  type = 'artists';

  constructor(private spotifyService: SpotifyService,
              private router: Router) {
  }

  ngOnInit() {
    this.spotifyService.getUserTopArtistsAndTracks(this.type).subscribe(
      data => {
        this.mostPlayed = data.items;
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

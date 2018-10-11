import {Component, OnInit} from '@angular/core';
import {SpotifyService} from "../../../shared/services/spotify-services";
import {NavigationService} from "../../../shared/services/navigation.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-most-played',
  templateUrl: './most-played.component.html',
  styleUrls: ['./most-played.component.scss']
})
export class MostPlayedComponent implements OnInit {
  mostPlayed: any;
  type: string = 'artists';

  constructor(private spotifyService: SpotifyService,
              private navigationService: NavigationService,
              private ar: ActivatedRoute) {
  }

  ngOnInit() {
    this.ar.params.subscribe(
      params => {
        this.spotifyService.getUserTopArtistsAndTracks(this.type).subscribe(
          data => {
            this.mostPlayed = data.items;
          },
          error => {
            console.log(error);
          }
        )
      }
    );
  }

  goToArtist(artist) {
    this.navigationService.goToArtist(artist);
  };

}

import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../../../../shared/services/spotify-services';
import {UtilitiesService} from '../../../../shared/services/utilities.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss']
})
export class ArtistComponent implements OnInit {
  artist: any;
  type: string = 'artist';
  isFollowing: boolean;
  active: any;
  views: any = [
    {type: 'overview', show: 0},
    {type: 'related', show: 1}
  ];

  constructor(private spotifyService: SpotifyService,
              private utilities: UtilitiesService,
              private ar: ActivatedRoute) {
  }

  ngOnInit() {
    this.ar.params.subscribe(
      params => {
        this.spotifyService.getArtist(params.artistId).subscribe(
          data => {
            this.active = 0;
            this.artist = data;
            this.checkIfUserFollowsArtist(params.artistId)
          },
          error => {
            console.log(error);
          }
        )
      }
    );
  }

  checkIfUserFollowsArtist(id) {
    this.spotifyService.userFollowingContains(this.type, id).subscribe(
      data => {
        this.isFollowing = data[0];
      },
      error => {
        console.log(error);
      }
    )
  };

  followArtist() {
    this.spotifyService.follow(this.type, [this.artist.id]).subscribe(
      () => {
        this.isFollowing = !this.isFollowing
      },
      error => {
        console.log(error);
      }
    )
  }

  unfollowArtist() {
    this.spotifyService.unfollow(this.type, [this.artist.id]).subscribe(
      () => {
        this.isFollowing = !this.isFollowing
      },
      error => {
        console.log(error);
      }
    )
  }

}

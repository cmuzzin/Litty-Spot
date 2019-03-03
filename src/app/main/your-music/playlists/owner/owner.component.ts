import { Component, OnInit } from "@angular/core";
import { SpotifyService } from "../../../../shared/services/spotify-services";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-owner",
  templateUrl: "./owner.component.html",
  styleUrls: ["./owner.component.scss"]
})
export class OwnerComponent implements OnInit {
  user: any;
  playlists: any;
  offset = 0;

  constructor(
    private spotifyService: SpotifyService,
    private router: Router,
    private ar: ActivatedRoute
  ) {}

  ngOnInit() {
    this.ar.params.subscribe(params => {
      const options = { limit: 50 };
      this.spotifyService
        .getUserPlaylists(params.ownerId, options).subscribe(
          data => {
            this.playlists = data;
          },
          error => {
            console.log(error);
          }
        );
      this.spotifyService.getUser(params.ownerId).subscribe(
        data => {
          this.user = data;
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  loadMorePlaylists() {
    const options = {
      limit: 50,
      offset: this.offset += 50
    };
    this.spotifyService.getUserPlaylists(this.user.id, options).subscribe(
      data => {
        this.playlists.items = this.playlists.items.concat(data.items);
        document.getElementById("loadMoreUserPlaylists").blur();
      },
      error => {
        console.log(error);
      }
    );
  }

  goToPlaylist(playlist) {
    this.router.navigate(["main/playlist", playlist.owner.id, playlist.id]);
  }
}

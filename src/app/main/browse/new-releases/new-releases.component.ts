import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { SpotifyService } from "../../../shared/services/spotify-services";
import { Router } from "@angular/router";

@Component({
  selector: "app-new-releases",
  templateUrl: "./new-releases.component.html",
  styleUrls: ["./new-releases.component.scss"]
})
export class NewReleasesComponent implements OnInit {
  private newReleases: any = { albums: { items: [] } };
  private offset: number = 0;
  constructor(private spotifyService: SpotifyService, private router: Router) {}

  ngOnInit() {
    this.spotifyService.getNewReleases().subscribe(
      data => {
        console.log(data);
        this.newReleases = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  loadMoreNewReleases() {
    const options = {offset: this.offset += 20};
    this.spotifyService.getNewReleases(options).subscribe(
      data => {
        this.newReleases.albums.items = this.newReleases.albums.items.concat(data.albums.items);
        document.getElementById("loadMoreNewReleases").blur();
      },
      error => {
        console.log(error);
      }
    );
  }
  goToAlbum(album) {
    this.router.navigate(["main/album", album.id]);
  }
}

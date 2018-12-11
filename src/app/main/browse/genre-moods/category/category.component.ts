import { Component, OnInit } from "@angular/core";
import { SpotifyService } from "../../../../shared/services/spotify-services";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.scss"]
})
export class CategoryComponent implements OnInit {
  category: any = {};
  playlists: any = { items: [], total: "" };
  offset: any = 0;

  constructor(
    private spotifyService: SpotifyService,
    private router: Router,
    private ar: ActivatedRoute
  ) {}

  ngOnInit() {
    this.ar.params.subscribe(params => {
      this.spotifyService.getCategory(params.id).subscribe(data => {
        this.category = data;
        this.spotifyService.getCategoryPlaylists(params.id).subscribe(
          data => {
            this.playlists = data.playlists;
          },
          error => {
            console.log(error);
          }
        );
      });
    });
  }

  loadMoreCategories() {
    const options = {offset: this.offset += 20};
    this.spotifyService
      .getCategoryPlaylists(this.category.id, options)
      .subscribe(
        data => {
          this.playlists.items = this.playlists.items.concat(data.playlists.item);
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

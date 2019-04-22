import { Component, OnInit, HostListener } from '@angular/core';
import { SpotifyService } from '../../../../shared/services/spotify-services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  category: any = {};
  playlists: any = { items: [], total: '' };
  offset: any = 0;

  @HostListener('window:scroll', [])
  onScroll(): void {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && this.playlists.items.length < this.playlists.total) {
      this.loadMoreCategories();
    }
  }

  constructor(
    private spotifyService: SpotifyService,
    private router: Router,
    private ar: ActivatedRoute
  ) {}

  ngOnInit() {
    this.ar.params.subscribe(params => {
      this.spotifyService.getCategory(params.id).subscribe(category => {
        this.category = category;
        const options = { limit: 50 };
        this.spotifyService.getCategoryPlaylists(params.id, options).subscribe(
          categories => {
            this.playlists = categories.playlists;
          },
          error => {
            console.log(error);
          }
        );
      });
    });
  }

  loadMoreCategories() {
    const options = {limit: 50, offset: this.offset += 50 };
    this.spotifyService
      .getCategoryPlaylists(this.category.id, options).subscribe(
        data => {
          this.playlists.items = this.playlists.items.concat(data.playlists.items);
        },
        error => {
          console.log(error);
        }
      );
  }

  goToPlaylist(playlist) {
    this.router.navigate(['main/playlist', playlist.owner.id, playlist.id]);
  }
}

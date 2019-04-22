import { Component, OnInit, HostListener } from '@angular/core';
import { SpotifyService } from '../../../shared/services/spotify-services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.scss']
})
export class NewReleasesComponent implements OnInit {
  newReleases: any = { albums: { items: [] } };
  offset = 0;

  @HostListener('window:scroll', [])
  onScroll(): void {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight &&
    this.newReleases.albums.items.length < this.newReleases.albums.total) {
      this.loadMoreNewReleases();
    }
  }
  constructor(private spotifyService: SpotifyService, private router: Router) {}

  ngOnInit() {
    const options = { limit: 50 };
    this.spotifyService.getNewReleases(options).subscribe(
      data => {
        this.newReleases = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  loadMoreNewReleases() {
    const options = { limit: 50, offset: this.offset += 50 };
    this.spotifyService.getNewReleases(options).subscribe(
      data => {
        this.newReleases.albums.items = this.newReleases.albums.items.concat(data.albums.items);
      },
      error => {
        console.log(error);
      }
    );
  }
  goToAlbum(album) {
    this.router.navigate(['main/album', album.id]);
  }
}

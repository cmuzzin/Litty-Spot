import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpotifyService } from 'app/shared/services/spotify-services';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  albums: any = {items: []};
  offset = 0;

  constructor(private spotifyService: SpotifyService, private router: Router) {}

  ngOnInit() {
    const options = {limit: 50 };
    this.spotifyService.getSavedUserAlbums(options).subscribe(
      data => {
        this.albums = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  loadMoreAlbums() {
    const options = { offset: this.offset += 20 };
    this.spotifyService.getSavedUserAlbums(options).subscribe(
      data => {
        this.albums.items = this.albums.items.concat(data.items);
        document.getElementById('loadMoreAlbums').blur();
      },
      error => {
        console.log(error);
      }
    );
  }

  goToAlbum(album) {
    this.router.navigate(['main/album', album.id]);
  }

  goToArtist(artist) {
    this.router.navigate(['main/artist', artist.id]);
  }
}

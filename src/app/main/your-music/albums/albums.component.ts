import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../../../shared/services/spotify-services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})

export class AlbumsComponent implements OnInit {
  albums: any;
  offset: number = 0;
  options: any;

  constructor(private spotifyService: SpotifyService,
              private router: Router) {
  }

  ngOnInit() {
    this.spotifyService.getSavedUserAlbums().subscribe(
      data => {
        this.albums = data;
      },
      error => {console.log(error);
      }
    )
  }

  loadMoreAlbums() {
    this.offset += 20;
    this.options = {
      offset: this.offset
    };

    this.spotifyService.getSavedUserAlbums(this.options).subscribe(
      data => {
        this.albums.items = this.albums.items.concat(data.items);
        document.getElementById('loadMoreAlbums').blur();
      },
      error => {
        console.log(error);
      }
    )
  };

  goToAlbum(album) {
    this.router.navigate(['main/album', album.id])
  }

}

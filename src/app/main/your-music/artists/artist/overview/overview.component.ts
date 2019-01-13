import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifyService } from 'app/shared/services/spotify-services';
import { UtilitiesService } from 'app/shared/services/utilities.service';
import { ActiveSongService } from 'app/shared/music-player/active-song.service';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  @Input() artist: any;
  user: any = JSON.parse(localStorage.getItem('user'));
  topTracks: any;
  albums: any = [];
  singles: any = [];
  compilations: any = [];
  options: any = {limit: 50, include_groups: 'album,single,compilation'};
  selected: any;

  constructor(private spotifyService: SpotifyService,
              private utilities: UtilitiesService,
              private router: Router,
              private ar: ActivatedRoute,
              private activeSongService: ActiveSongService) {
  }

  ngOnInit() {
      this.spotifyService.getArtistAlbums(this.artist.id, this.options).subscribe(
        data => {
          this.albums = data.items.filter(item => item.album_type === 'album');
          this.singles = data.items.filter(item => item.album_type === 'single');
          this.compilations = data.items.filter(item => item.album_type === 'compilation');
          this.spotifyService.getArtistTopTracks(this.artist.id, this.user.country).subscribe(
            (tracks: any) => {
              this.topTracks = tracks.tracks;
            }
          );
        },
        error => console.log(error)
      );
  }

  goToAlbum(album) {
    this.router.navigate(['main/album', album.id])
  };

  formatDuration(duration) {
    return this.utilities.formatDuration(duration);
  }

  setClickedRow(track, index) {
    this.selected = index;
    this.activeSongService.currentSong.next(track);
  };

}

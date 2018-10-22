import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ActiveSongService} from '../../../../music-player/active-song.service';
import {SpotifyService} from "../../../../../shared/services/spotify-services";
import {UtilitiesService} from "../../../../../shared/services/utilities.service";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  @Input() artist: any;
  user: any = JSON.parse(localStorage.getItem('user'));
  topTracks: any;
  albums: any;
  singles: any;
  compilations; any;
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
            data => {
              this.topTracks = data.tracks;
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

import { Component, OnInit, HostListener } from '@angular/core';
import { SpotifyService } from 'app/shared/services/spotify-services';
import { UtilitiesService } from 'app/shared/services/utilities.service';
import { Router } from '@angular/router';
import { ActiveSongService } from 'app/shared/components/music-player/active-song.service';
import { AddSongToPlaylistService } from 'app/shared/components/add-to-playlist-modal/add-song-to-playlist.service';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {
  trackToAdd: any;
  tracks: any;
  offset = 0;
  selected: boolean;
  songsFilter: string;

@HostListener('window:scroll', [])
onScroll(): void {
if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && this.tracks.items.length < this.tracks.total) {
       this.loadMoreTracks();
    }
}

  constructor(private spotifyService: SpotifyService,
              private activeSongService: ActiveSongService,
              private utilities: UtilitiesService,
              private addSongToPlaylistService: AddSongToPlaylistService,
              private router: Router) {
  }

  ngOnInit() {
    const options = {limit: 50};
    this.spotifyService.getSavedUserTracks(options).subscribe(
      data => {
        this.tracks = data;
      },
      error => {
        console.log(error);
      }
    );
    this.addSongToPlaylistService.songToAddToPlaylist.subscribe(songBeingAdded => {
      this.trackToAdd = songBeingAdded;
    })
  }

  loadMoreTracks() {
    const options = {limit: 50, offset: this.offset += 50};
    this.spotifyService.getSavedUserTracks(options).subscribe(
      data => {
        this.tracks.items = this.tracks.items.concat(data.items);
      },
      error => {
        console.log(error);
      }
    )
  };

  goToArtist(artist) {
    this.router.navigate(['main/artist', artist.id])
  };

  goToAlbum(album) {
    this.router.navigate(['main/album', album.id]);
  };

  toggleAddToPlaylistModal(track) {
    this.addSongToPlaylistService.songToAddToPlaylist.next(track);
    this.addSongToPlaylistService.toggleAddSongToPlaylist.next(true);
  };

  setClickedRow(item, i) {
    this.selected = i;
    this.activeSongService.currentSong.next(item.track);
  };

  formatDuration(duration) {
    return this.utilities.formatDuration(duration);
  }

}

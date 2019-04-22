import { Component, OnInit, HostListener } from '@angular/core';
import { SpotifyService } from '../../shared/services/spotify-services';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilitiesService } from 'app/shared/services/utilities.service';
import { ActiveSongService } from 'app/shared/components/music-player/active-song.service';
import { AddSongToPlaylistService } from 'app/shared/components/add-to-playlist-modal/add-song-to-playlist.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchQuery: string;
  searchInput: FormControl = new FormControl('', Validators.required);
  noResults = false;
  type = 'album,artist,track,playlist';
  artists: any;
  albums: any;
  playlists: any;
  tracks: any;
  album: any;
  offset = 0;
  selected: boolean;

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
    this.searchInput.valueChanges.debounceTime(300).subscribe(
      value => {
        this.searchQuery = value;
        this.spotifyService.search(value, this.type).subscribe(
          data => {
            this.artists = data.artists;
            this.albums = data.albums;
            this.playlists = data.playlists;
            this.tracks = data.tracks;
          },
          error => {
            console.log(error);
          }
        )
      }
    );
  }

  loadMoreTracks() {
    const options = {offset: this.offset += 50};
    this.spotifyService.search(this.searchQuery, this.type, options).subscribe(
      data => {
        console.log(data);
        this.tracks.items = this.tracks.items.concat(data.tracks.items);
      },
      error => {
        console.log(error);
      }
    )
  }

  goToArtist(artist) {
    this.router.navigate(['main/artist', artist.id]);
  };

  goToAlbum(album) {
    this.router.navigate(['main/album', album.id]);
  };

  goToPlaylist(playlist) {
    this.router.navigate(['main/playlist', playlist.owner.id, playlist.id])
  }

  clear() {
    this.artists = null;
    this.albums = null;
    this.playlists = null;
    this.tracks = null;
    this.searchQuery = null;
  };

  setClickedRow(track, i) {
    this.selected = i;
    this.activeSongService.currentSong.next(track)
  };

  formatDuration(duration) {
    return this.utilities.formatDuration(duration);
  }

  toggleAddToPlaylistModal(track) {
    this.addSongToPlaylistService.songToAddToPlaylist.next(track);
    this.addSongToPlaylistService.toggleAddSongToPlaylist.next(true);
  };

}

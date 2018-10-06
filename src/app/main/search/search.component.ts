import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../../shared/services/spotify-services';
import * as _ from 'lodash';
import {ActiveSongService} from '../music-player/active-song.service';
import {NavigationService} from '../../shared/services/navigation.service';
import {AddSongToPlaylistService} from '../../shared/modals/add-to-playlist-modal/add-song-to-playlist.service';
import {UtilitiesService} from "../../shared/utilities/utilities.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchQuery: string;
  noResults: boolean = false;
  type: string = 'album,artist,track,playlist';
  artists: any;
  albums: any;
  playlists: any;
  tracks: any;
  album: any;
  options: any;
  offset: number = 0;

  constructor(private spotifyService: SpotifyService,
              private activeSongService: ActiveSongService,
              private navigationService: NavigationService,
              private utilities: UtilitiesService,
              private addSongToPlaylistService: AddSongToPlaylistService,
              private router: Router) {
  }

  ngOnInit() {
  }

  search() {
    this.spotifyService.search(this.searchQuery, this.type).subscribe(
      data => {
        this.artists = data.artists;
        this.albums = data.albums;
        this.playlists = data.playlists;
        this.tracks = data.tracks;
      },
      error => {console.log(error);}
    )
  }

  loadMoreTracks() {
    this.offset = this.offset + 50;
    this.options = {
      offset: this.offset
    };
    this.spotifyService.search(this.searchQuery, this.type, this.options).subscribe(
      data => {
        this.tracks.items = _.concat(this.tracks.items, data.tracks.items);
        document.getElementById('loadMoreSearchTracks').blur();
      },
      error => {
        console.log(error);
      }
    )
  }

  goToArtist(artist) {
    this.navigationService.goToArtist(artist);
  };

  goToAlbum(album) {
    this.spotifyService.getAlbum(album.id).subscribe(
      data => {
        this.album = {
          album: data
        };
        this.navigationService.goToAlbum(this.album);
      },
      error => {
        console.log(error);
      }
    );
  };

  goToPlaylist(playlist) {
    this.router.navigate(['main/playlist', playlist.owner.id, playlist.id])
  }

  clear() {
    this.artists = [];
    this.albums = [];
    this.playlists = [];
    this.tracks = [];
    this.searchQuery = '';
  };

  setClickedRow(index, track) {this.activeSongService.currentSong.next(track)};

  formatDuration(duration) {
    return this.utilities.formatDuration(duration);
  }

  toggleAddToPlaylistModal(track) {
    this.addSongToPlaylistService.songToAddToPlaylist.next(track);
    this.addSongToPlaylistService.toggleAddSongToPlaylist.next(true);
  };

}

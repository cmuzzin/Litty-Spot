import {Component, OnInit} from '@angular/core';
import {ActiveSongService} from '../../music-player/active-song.service';
import {NavigationService} from '../../../shared/services/navigation.service';
import {AddSongToPlaylistService} from '../../../shared/modals/add-to-playlist-modal/add-song-to-playlist.service';
import {SpotifyService} from "../../../shared/services/spotify-services";
import {UtilitiesService} from "../../../shared/services/utilities.service";

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {
  trackToAdd: any;
  tracks: any;
  options: any;
  offset: number = 0;
  album: any;
  selectedRow: any;

  constructor(private spotifyService: SpotifyService,
              private activeSongService: ActiveSongService,
              private navigationService: NavigationService,
              private utilities: UtilitiesService,
              private addSongToPlaylistService: AddSongToPlaylistService) {
  }

  ngOnInit() {
    this.spotifyService.getSavedUserTracks().subscribe(
      data => {this.tracks = data;},
      error => {console.log(error);
      }
    );
    this.addSongToPlaylistService.songToAddToPlaylist.subscribe(songBeingAdded => { this.trackToAdd = songBeingAdded; })
  }

  loadMoreTracks() {
    this.offset = this.offset + 50;
    this.options = {
      limit: 50,
      offset: this.offset
    };
    this.spotifyService.getSavedUserTracks(this.options).subscribe(
      data => {
        this.tracks.items = this.tracks.items.concat(data.items);
        document.getElementById('loadMoreSongsButton').blur();
      },
      error => {console.log(error);
      }
    )
  };

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
      error => {console.log(error);}
    );
  };

  toggleAddToPlaylistModal(track) {
    this.addSongToPlaylistService.songToAddToPlaylist.next(track);
    this.addSongToPlaylistService.toggleAddSongToPlaylist.next(true);
  };

  setClickedRow(index, track) {
    this.selectedRow = index;
    this.activeSongService.currentSong.next(track.track);
  };

  formatDuration(duration) {
    return this.utilities.formatDuration(duration);
  }

}

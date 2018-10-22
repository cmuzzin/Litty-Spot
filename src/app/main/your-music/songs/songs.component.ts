import {Component, OnInit} from '@angular/core';
import {ActiveSongService} from '../../music-player/active-song.service';
import {NavigationService} from '../../../shared/services/navigation.service';
import {AddSongToPlaylistService} from '../../../shared/modals/add-to-playlist-modal/add-song-to-playlist.service';
import {SpotifyService} from "../../../shared/services/spotify-services";
import {UtilitiesService} from "../../../shared/services/utilities.service";
import {Router} from "@angular/router";

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
  selected: boolean;

  constructor(private spotifyService: SpotifyService,
              private activeSongService: ActiveSongService,
              private navigationService: NavigationService,
              private utilities: UtilitiesService,
              private addSongToPlaylistService: AddSongToPlaylistService,
              private router: Router) {
  }

  ngOnInit() {
    this.spotifyService.getSavedUserTracks().subscribe(
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
    this.offset += 50;
    this.options = {
      limit: 50,
      offset: this.offset
    };
    this.spotifyService.getSavedUserTracks(this.options).subscribe(
      data => {
        this.tracks.items = this.tracks.items.concat(data.items);
        document.getElementById('loadMoreSongsButton').blur();
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

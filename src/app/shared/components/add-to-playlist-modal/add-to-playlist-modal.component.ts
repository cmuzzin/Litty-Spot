import {Component, OnInit, OnDestroy} from '@angular/core';
import {SpotifyService} from '../../services/spotify-services';
import {AddSongToPlaylistService} from './add-song-to-playlist.service';
import {ToastrService} from 'ngx-toastr';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-to-playlist-modal',
  templateUrl: './add-to-playlist-modal.component.html',
  styleUrls: ['./add-to-playlist-modal.component.scss']
})
export class AddToPlaylistModalComponent implements OnInit, OnDestroy {
  trackToAdd: any;
  user: any;
  totalPlaylists: any;
  playlists: Array<any>;
  options: any;
  toggle: boolean;
  playlistFilter: string;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private spotifyService: SpotifyService,
              private addSongToPlaylistService: AddSongToPlaylistService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.loadPlaylists();
    this.addSongToPlaylistService.songToAddToPlaylist.takeUntil(this.destroy$).subscribe(
      songBeingAdded => {
        this.trackToAdd = songBeingAdded;
      }
    );
    this.addSongToPlaylistService.toggleAddSongToPlaylist.takeUntil(this.destroy$).subscribe(
      toggle => {
        this.toggle = toggle;
      }
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  closeAddToPlayListModal() {
    this.addSongToPlaylistService.toggleAddSongToPlaylist.next(false);
  };

  addToPlaylist(playlist) {
    if (playlist.owner.id === this.user.id) {
      this.spotifyService.addPlaylistTracks(playlist.owner.id, playlist.id, this.trackToAdd.uri).subscribe(
        () => {
          this.showSuccess(playlist, this.trackToAdd.name);
          this.closeAddToPlayListModal();
        },
        error => {
          console.log(error);
        }
      )
    } else {
      this.toastr.error('Invalid playlist');
      return false;
    }
  };

  loadPlaylists() {
    this.options = { limit: 50 };
    this.spotifyService.getUserPlaylists(this.user.id, this.options).subscribe(
      data => {
        const playlists = [];
        data.items.forEach(playlist => {
          if (playlist.owner.id === this.user.id) {
            playlists.push(playlist);
          }
        });
        this.playlists = playlists;
        this.totalPlaylists = data.total;
      },
      error => {
        console.log(error);
      }
    )
  };

  showSuccess(playlist, track) {
    this.toastr.success(`${track} successfully added to playlist <span class="bold underline">${playlist.name} </span>`);
  };

}

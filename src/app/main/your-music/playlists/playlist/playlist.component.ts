
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../../../shared/services/spotify-services';
import { UtilitiesService } from '../../../../shared/services/utilities.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveSongService } from 'app/shared/components/music-player/active-song.service';
import { EditPlayListService } from 'app/shared/components/edit-playlist-modal/edit-play-list-service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {
  playlist: any;
  user: any;
  followed: boolean;
  offset = 0;
  selected: boolean;

  constructor(private spotifyService: SpotifyService,
              private activeSongService: ActiveSongService,
              private utilities: UtilitiesService,
              private editPlaylistService: EditPlayListService,
              private ar: ActivatedRoute,
              private router: Router) {
                this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    this.ar.params.subscribe(params => {
      this.spotifyService.getPlaylist(params.ownerId, params.id).subscribe(
        data => {
          this.playlist = data;
        },
        error => {
          console.log(error)
        }
      );
      this.spotifyService.playlistFollowingContains(params.ownerId, params.id, this.user.id).subscribe(
        data => {
          this.followed = data[0];
        },
        error => {
          console.log(error);
        }
      )
    });

    this.editPlaylistService.playlistChanges.subscribe(
      changes => {
        if (changes) {
          this.playlist.name = changes.name;
          this.playlist.description = changes.description;
          this.playlist.public = changes.public;
        }
      }
    );
  };

  loadMoreTracks() {
    const options = {limit: 100, offset: this.offset += 100 };
    this.spotifyService.getPlaylistTracks(this.playlist.owner.id, this.playlist.id, options).subscribe(
      tracks => {
        this.playlist.tracks.items = this.playlist.tracks.items.concat(tracks.items);
        document.getElementById('loadMorePlaylistTracks').blur();
      },
      error => {
        console.log(error);
      }
    );
  };


  followPlaylist() {
    this.spotifyService.followPlaylist(this.playlist.owner.id, this.playlist.id).subscribe(
      () => {
        this.followed = !this.followed;
      },
      error => {
        console.log(error);
      }
    );
  };

  unfollowPlaylist() {
    this.spotifyService.unfollowPlaylist(this.playlist.owner.id, this.playlist.id).subscribe(
      () => {
        this.followed = !this.followed;
      },
      error => {
        console.log(error);
      }
    );
  };

  goToArtist(artist) {
    this.router.navigate(['main/artist', artist.id])
  };

  goToAlbum(album) {
    this.router.navigate(['main/album', album.id]);
  };

  goToUser(playlist) {
    this.router.navigate(['main/owner', playlist.owner.id])
  };

  setClickedRow(item, i) {
    this.selected = i;
    this.activeSongService.currentSong.next(item.track);
  };


  toggleEditModal(playlist) {
    this.editPlaylistService.playlistToBeEdited.next(playlist);
    this.editPlaylistService.toggleEditPlaylist.next(true);
  };

  formatDuration(duration) {
    return this.utilities.formatDuration(duration);
  }

  formatNumberWithCommas(number) {
    return this.utilities.numberWithCommas(number)
  }

}

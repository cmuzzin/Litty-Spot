import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActiveSongService} from './active-song.service';
import {Router} from "@angular/router";
import {Subject} from "rxjs/Subject";
import { SpotifyService } from 'app/shared/services/spotify-services';


@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent implements OnInit, OnDestroy {
  currentSong: any;
  showPlayer: boolean;
  destroy$: Subject<boolean> = new Subject<boolean>();


  constructor(private activeSongService: ActiveSongService,
              private spotifyService: SpotifyService,
              private router: Router) {
  }

  ngOnInit() {
    this.activeSongService.currentSong.takeUntil(this.destroy$).subscribe(track => {
      if (!track) {
        this.showPlayer = false;
        return;
      }
      this.spotifyService.getTrack(track.id).subscribe(
        data => {
          this.showPlayer = true;
          this.currentSong = data;

        },
        error => {
          console.log(error);
        }
      );
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  goToArtist(artist) {
    this.router.navigate(['main/artist', artist.id]);
  };

  close() {
    this.showPlayer = false;
  }

}

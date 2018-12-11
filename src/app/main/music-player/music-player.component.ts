import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActiveSongService} from './active-song.service';
import {SpotifyService} from "../../shared/services/spotify-services";
import {Router} from "@angular/router";
import {ReplaySubject} from "rxjs/ReplaySubject";


@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss']
})
export class MusicPlayerComponent implements OnInit, OnDestroy {
  currentSong: any;
  destroy$: ReplaySubject<boolean> = new ReplaySubject(1);


  constructor(private activeSongService: ActiveSongService,
              private spotifyService: SpotifyService,
              private router: Router) {
  }

  ngOnInit() {
    this.activeSongService.currentSong.takeUntil(this.destroy$).subscribe(track => {
      if (!track) {
        this.currentSong = '';
        return
      }
      this.spotifyService.getTrack(track.id).subscribe(
        data => {
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
    this.activeSongService.currentSong.next('');
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}

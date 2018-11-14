import { ActiveSongService } from './../../main/music-player/active-song.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class NavigationService {
    constructor(private router: Router, private activeSongService: ActiveSongService) {
    }

    goToCategory(category) {
        localStorage.setItem('category', JSON.stringify(category));
        this.router.navigate(['main/category'])

    };
    logout() {
        localStorage.clear();
        this.activeSongService.currentSong.next('');
        this.router.navigate(['home']);
    };

}

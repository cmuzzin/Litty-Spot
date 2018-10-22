import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class NavigationService {
    constructor(private router: Router,
                private userService: UserService) {
    }

    goToAlbum(album) {
        localStorage.setItem('album', JSON.stringify(album));
        this.router.navigate(['main/album'])
    };

    goToArtist(artist) {
        this.router.navigate(['main/artist'])
    };

    goToPlaylist(playlist) {
        localStorage.setItem('playlist', JSON.stringify(playlist));
        this.router.navigate(['main/playlist'])
    };

    goToCategory(category) {
        localStorage.setItem('category', JSON.stringify(category));
        this.router.navigate(['main/category'])

    };

    goToUser(id) {
        this.userService.user.next(id);
        this.router.navigate(['main/user']);
    };

    logout() {
        localStorage.clear();
        this.router.navigate(['home']);
    };

}

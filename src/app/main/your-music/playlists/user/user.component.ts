import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service';
import { SpotifyService } from '../../../../shared/services/spotify-services';
import { UtilitiesService } from '../../../../shared/services/utilities.service';
import { NavigationService } from '../../../../shared/services/navigation.service';
import * as _ from 'lodash';
import {Router} from "@angular/router";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    user: any;
    playlists: any;
    userId: any;
    options: any;
    offset: number = 0;

    constructor(private userService: UserService,
                private spotifyService: SpotifyService,
                private utilities: UtilitiesService,
                private navigationService: NavigationService,
                private router: Router) {
    }

    ngOnInit() {
        this.userService.user.subscribe(
            userId => {
                if (userId) {
                    this.userId = userId;
                    localStorage.setItem('userId', JSON.stringify(this.userId));
                } else {
                    this.userId = JSON.parse(localStorage.getItem('userId'));
                }
              this.spotifyService.getUserPlaylists(this.userId).subscribe(
                data => { this.playlists = data;},
                error => {console.log(error);}
              );

              this.spotifyService.getUser(this.userId).subscribe(
                data => {this.user = data;},
                error => {console.log(error);}
              )
            });
    }

    goToPlaylist(playlist) {
      this.router.navigate(['main/playlist', playlist.owner.id, playlist.id])
    }

    loadMorePlaylists() {
        this.offset += 50;
        this.options = {
            limit: 50,
            offset: this.offset
        };
        this.spotifyService.getUserPlaylists(this.user.id, this.options).subscribe(
            data => {
                this.playlists.items = _.concat(this.playlists.items, data.items);
                document.getElementById('loadMoreUserPlaylists').blur();
            },
            error => {
                console.log(error);
            }
        );
    }

}

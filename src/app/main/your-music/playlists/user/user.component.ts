import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { SpotifyService } from '../../../../shared/spotify/angular2-spotify';
import { UtilitiesService } from '../../../../shared/utilities/utilities.service';
import { NavigationService } from '../../../../shared/navigation/navigation.service';
import {EditPlayListService} from "../../../modals/edit-playlist-modal/edit-play-list-service";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    user: any;
    userPlaylists: any;
    userId: any;
    options: any;

    constructor(private userService: UserService, private spotifyService: SpotifyService, private utilities: UtilitiesService,
                private navigationService: NavigationService, private editPlaylistService: EditPlayListService) {
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
                this.getUserPlaylists();
                this.getUserInfo();
            });
    }

    getUserPlaylists() {
        this.options = {
            limit: 50
        };
        this.spotifyService.getUserPlaylists(this.userId, this.options).subscribe(
            data => {
                this.userPlaylists = data.items;
            },
            error => {
                console.log(error);
            }
        )
    };

    getUserInfo() {
        this.spotifyService.getUser(this.userId).subscribe(
            data => {
                this.user = data;
                this.user.followers.total = this.utilities.numberWithCommas(this.user.followers.total);
            },
            error => {
                console.log(error);
            }
        )
    };

    goToUser(id) {
        this.navigationService.goToUser(id);
    };

    goToPlaylist(playlist) {
        this.navigationService.goToPlaylist(playlist);
        this.editPlaylistService.updated.next(true);
    }

}

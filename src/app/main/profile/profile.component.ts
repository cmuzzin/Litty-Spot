import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SpotifyService} from '../../shared/services/spotify-services';
import {NavigationService} from '../../shared/services/navigation.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(public router: Router,
              public spotifyService: SpotifyService,
              private navigationService: NavigationService) {
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  logout() {
    this.navigationService.logout();
  }

}

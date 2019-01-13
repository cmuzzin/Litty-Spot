import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SpotifyService} from '../shared/services/spotify-services';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  user: any;

  constructor(private router: Router, private spotifyService: SpotifyService) {
  }

  public login() {
    this.spotifyService.login().subscribe(
      () => {
        this.spotifyService.getCurrentUser()
          .subscribe(data => {
              localStorage.setItem('user', JSON.stringify(data));
              this.router.navigateByUrl('main');
            },
            err => console.error(err));
      },
      err => {
        console.error(err);
      },
      () => {
      }
    );
  }
}

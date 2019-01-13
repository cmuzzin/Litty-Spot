import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent {

  constructor(public router: Router) {
    const hash = window.location.hash;
    if (hash) {
      if (window.location.search.substring(1).indexOf('error') !== -1) {
        window.close();
      } else if (hash) {
        const token = window.location.hash.split('&')[0].split('=')[1];
        localStorage.setItem('angular2-spotify-token', token);
      }
    } else {
      window.close();
    }
  }
}

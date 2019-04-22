import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../../shared/services/spotify-services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-genre-moods',
  templateUrl: './genre-moods.component.html',
  styleUrls: ['./genre-moods.component.scss']
})
export class GenreMoodsComponent implements OnInit {
  categories: any = {};

  constructor(
    public spotifyService: SpotifyService,
    public router: Router
  ) {}

  ngOnInit() {
    const options = { limit: 50}
    this.spotifyService.getCategories(options).subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  goToCategory(category) {
    this.router.navigate(['main/category', category.id]);
  }
}

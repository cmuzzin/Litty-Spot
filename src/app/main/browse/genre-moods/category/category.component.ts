import {Component, OnInit} from '@angular/core';
import {SpotifyService} from '../../../../shared/services/spotify-services';
import * as _ from 'lodash';
import { NavigationService } from '../../../../shared/services/navigation.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  category: any;
  categoryPlaylists: any;
  options: any;
  offset: any = 0;

  constructor(private spotifyService: SpotifyService, private navigationService: NavigationService) {
  }

  ngOnInit() {
    this.category = JSON.parse(localStorage.getItem('category'));
    this.spotifyService.getCategoryPlaylists(this.category.id).subscribe(
      data => {
        this.categoryPlaylists = data.playlists;
      },
      error => {
        console.log(error);
      }
    );
  }

  loadMoreCategories() {
    this.options = {
      offset: this.offset + 20
    };
    this.spotifyService.getCategoryPlaylists(this.category.id, this.options).subscribe(
      data => {
        this.categoryPlaylists.items = _.concat(this.categoryPlaylists.items, data.playlists.items);
      },
      error => {
        console.log(error);
      }
    );
  };

  goToPlaylist(playlist) {
    this.navigationService.goToPlaylist(playlist);
  };
}

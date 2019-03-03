import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class EditPlayListService {
  playlistToBeEdited: BehaviorSubject<any> = new BehaviorSubject('');
  playlistChanges: BehaviorSubject<any> = new BehaviorSubject('');
  toggleEditPlaylist: BehaviorSubject<any> = new BehaviorSubject(false);

  constructor() { }

}

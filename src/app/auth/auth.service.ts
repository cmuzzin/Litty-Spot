import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class AuthService {
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  user: BehaviorSubject<any> = new  BehaviorSubject<boolean>(null)

  constructor() {}

}

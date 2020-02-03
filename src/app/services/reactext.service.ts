import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReactextService {

  constructor() { }
  saveReaction(key: string) {
    localStorage.setItem('key', key);
  }
  getReaction() {
    return localStorage.getItem('key');
  }
  removeReaction() {
    localStorage.removeItem('key');
  }

}

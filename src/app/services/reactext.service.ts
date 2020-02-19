import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReactextService {

  constructor() { }
  saveUserId(key: string) {
    localStorage.setItem('key', key);
  }
  getUserId() {
    return localStorage.getItem('key');
  }
  removeUserId() {
    localStorage.removeItem('key');
  }

}

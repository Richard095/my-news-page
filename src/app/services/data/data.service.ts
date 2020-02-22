import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  saveData(posts: string) {
    localStorage.setItem('_data', posts);
  }
  getData() {
    return localStorage.getItem('_data');
  }
  removeData() {
    localStorage.removeItem('_data');
  }

  saveDataRecommend(posts: string) {
    localStorage.setItem('.ad_tkn_recp', posts);
  }
  getDataRecommend() {
    return localStorage.getItem('.ad_tkn_recp');
  }
  removeDataRecommend() {
    localStorage.removeItem('.ad_tkn_recp');
  }

}

import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmmiterService {

  state = new EventEmitter<boolean>();
  constructor() { }

}

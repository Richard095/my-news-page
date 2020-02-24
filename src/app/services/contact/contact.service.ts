import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { contact } from 'src/app/models/Contact';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private URI_API: string = environment.URL;
  constructor(private httpClient: HttpClient) { }
  sendEmail(contact: contact): Observable<any> {
    return this.httpClient.post(this.URI_API + "/contact", contact);
  }
}

import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const host = "http://localhost:3000";
@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private httpClient: HttpClient) { }

  sendEmail(Email: string, subject: string, content: string): Observable<any> {
    const body = { Email, subject, content };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.httpClient.post(`${host}/email/send`, body, { headers });
  }
}

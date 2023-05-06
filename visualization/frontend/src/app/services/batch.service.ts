import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BatchService {

  constructor(private http:HttpClient) { }

  getBatchResult() {
    return this.http.get<any>("http://localhost:3000/batch")
  }
}

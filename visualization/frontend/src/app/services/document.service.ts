import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {  DocumentModel } from 'src/app/models/document.model';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents = this.socket.fromEvent<DocumentModel[]>('documents');
  constructor(private socket: Socket) {
  }

    
  
}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Invite} from "../models/Invite";

const INVITE_API = 'http://localhost:8080/api/invite';

@Injectable({
  providedIn: 'root'
})
export class InviteService {

  constructor(private http: HttpClient) { }

  getInvitesUser(recipientId: number):Observable<Invite[]>{
    return this.http.get<Invite[]>(`${INVITE_API}/all/${recipientId}`)
  }

  getCreateInvitesUser(senderId: number):Observable<Invite[]>{
    return this.http.get<Invite[]>(`${INVITE_API}/allcreated/${senderId}`)
  }

  existInvite(senderId: number, recipientId: number):Observable<boolean>{
    return this.http.get<boolean>(`${INVITE_API}/exist/${senderId}/${recipientId}`)
  }

  createInvite(senderId: number, recipientId: number):Observable<any>{
    return this.http.post(`${INVITE_API}/create`, {senderId, recipientId})
  }

  actionInvite(senderId: number, recipientId: number, action: boolean):Observable<any>{
    return this.http.post(`${INVITE_API}/action/${senderId}/${recipientId}`, action)
  }
}

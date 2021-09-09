import { Injectable } from '@angular/core';

// import * as io from 'socket.io-client' ;
import { io } from 'socket.io-client';

import { observable, Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private url = 'https://chatapi.edwisor.com';
  private socket:any

  constructor(private http: HttpClient) {
    this.socket = io(this.url)
  }

  //  events to be listed
  public verifyUser = () => {
    return new Observable<any>((observer)=>{
      this.socket.on('verifyUser', (data:any) => {
        console.log(data,'y')
        observer.next(data)
    })
    // return new Observable<any>((observer) => {
      
    //   })
    })
  }

  public onLineUserList = () => {
    console.log("sanju")
    return new Observable<any>((observer) => {
      this.socket.on('online-user-list', (userList:any) => {
        console.log(userList)
        observer.next(userList)
      })
    })
  }

  public disconnectedSocket = () => {
    return new Observable<any>((observer) => {
      this.socket.on('disconnect', () => {
        observer.next()
      })
    })
  }

  //  events to be emitted
  public setUser = (authToken: any) => {
    this.socket.emit('set-user', authToken)
    console.log(authToken)
  }


  public MarkChatAsSeen = (userDetails:any) => {
    this.socket.emit('mark-chat-as-seen',userDetails)

  }

  public getChat = (senderId: any, receiverId: any,skip: any) : Observable<any>=>{
    return this.http.get(`${this.url}/api/v1/chat/get/for/user?senderId=${senderId}&receiverId=${receiverId}
    &skip=${skip}&authToken=${Cookie.get('authToken')}`)
    // .do((data: any)=> console.log('Data Received'))
    // catch(this.handelError)

  }


  public chatByUserId = (userId:any) =>{
    return new Observable<any>((observer)=>{
      this.socket.on(userId,(data:any)=>{
        observer.next(data)
      })
    })
  }

  public sendChatMsg = (chatMsgObject:any) =>{
    this.socket.emit('chat-msg', chatMsgObject)
  }

  public exitSocket =()=>{
    this.socket.disconnect()
  }

  private handelError(err: HttpErrorResponse) {
    let errorMsg = ''
    if (err.error instanceof Error) {
      errorMsg = `An error occorred : ${err.error.message}`
    }
    else {
      errorMsg = `Server returned code : ${err.status}, error is : ${err.error.message}`
    }
    console.error(errorMsg)
    return Observable.throw(errorMsg)
  }

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AppService {
  private url = 'https://chatapi.edwisor.com'
  public authToken = 'MzU2NmE1NjFhOTE2ZmY2YzZkZjNiZjdlMmQ4YWIzOGZkM2UzYTIzMTc4OTM5ZGNkYTNiNzExNzFhOGI1MDA3ZDExM2FkNTBjMzZmYjkxZmQ3NTM3MGQ2ZTBiNWZmZjRmMzJlNThkNDUxY2U4NjRmMTYxZTgxYjAwM2QxNjJmYzJhMw=='



  constructor(public http: HttpClient) { }


  public SignUpFunc(data: { firstName: any; lastName: any; mobile: any; email: any; password: any; apiKey: any; }): Observable<any> {
    const params = new HttpParams()
      .set('firstName', data.firstName)
      .set('lastName', data.lastName)
      .set('mobile', data.mobile)
      .set('email', data.email)
      .set('password', data.password)
      .set('apiKey', data.apiKey)
    return this.http.post(`${this.url}/api/v1/users/signup`, params);
  }

  public getUserInfoFromLocalStorage = () => {
    // let data=localStorage.getIntem('userInfo')
    // console.log(data)
    return JSON.parse(JSON.stringify(localStorage.getItem('userInfo')))
  }

  public setUserInfoInLocalStorage = (data: any) => {
    localStorage.setItem('userInfo', JSON.stringify(data))
  }


  public SignInFunc(data: { email: any; password: any; }): Observable<any> {
    const params = new HttpParams()
      .set('email', data.email)
      .set('password', data.password)
    return this.http.post(`${this.url}/api/v1/users/login`, params);
  }

  public logOut(data:{userId:any; authToken:any}):Observable<any>{
    const params = new HttpParams()
    .set('userId',data.userId)
    .set('authToken',data.authToken)
    // const headers = new HttpHeaders()
    
    return this.http.post(`${this.url}/api/v1/users/logout`,params)
  }
}

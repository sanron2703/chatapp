import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Cookie } from 'ng2-cookies';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  public email: any
  public password: any

  constructor(
    public appService: AppService,
    public router: Router,
    public toastr: ToastrManager
  ) { }

  ngOnInit(): void {

  }

  public goToSignUp: any = () => {
    this.router.navigate(['/sign-up'])
  }

  public signInFunc: any = () => {
    if (!this.email) {
      this.toastr.warningToastr("Enter Email")
    }
    else if (!this.password) {
      this.toastr.warningToastr("Enter Password")
    }
    else {
      let data = {
        email: this.email,
        password: this.password
      }
      this.appService.SignInFunc(data).subscribe((apiResponse) => {
        if (apiResponse.status == 200) {
          console.log(apiResponse)
          Cookie.set('authToken', apiResponse.data.authToken)
          Cookie.set('recevierId', apiResponse.data.userDetails.userId)
          Cookie.set('recevierName', apiResponse.data.userDetails.firstName + ' ' + apiResponse.data.userDetails.lastName)
          this.appService.setUserInfoInLocalStorage(apiResponse.data.userDetails)
          this.router.navigate(['/chat'])
        }
        else {
          this.toastr.errorToastr(apiResponse.message)
        }
      }, (err) => {
        console.log(err)
        this.toastr.errorToastr('Some Error Occured')
      })

    }

  }
}

import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public firstName: any
  public lastName: any
  public mobile: any
  public email: any
  public password: any
  public apiKey: any

  constructor(
    public appService: AppService,
    public router: Router,
    public toastr: ToastrManager
  ) { }

  ngOnInit(): void {
  }

  public goToSignIn: any = () => {
    this.router.navigate(['/'])
  }

  public signUpFunc: any = () => {
    if (!this.firstName) {
      this.toastr.warningToastr('Enter first name')
    }
    else if (!this.lastName) {
      this.toastr.warningToastr("Enter last name")
    }
    else if (!this.mobile) {
      this.toastr.warningToastr("Enter mobile")
    }
    else if (!this.email) {
      this.toastr.warningToastr("Enter email")
    }
    else if (!this.password) {
      this.toastr.warningToastr("Enter password")
    }
    else if (!this.apiKey) {
      this.toastr.warningToastr("Enter API key")
    }
    else {
      let data = {
        firstName: this.firstName,
        lastName: this.lastName,
        mobile: this.mobile,
        email: this.email,
        password: this.password,
        apiKey: this.apiKey
      }
      console.log(data)
      this.appService.SignUpFunc(data).subscribe((apiResponse) => {
        console.log(apiResponse)
        if (apiResponse.status == 200) {
          this.toastr.successToastr('Signup Successful')
          setTimeout(() => {
            this.goToSignIn()
          }, 2000)

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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RouterModule,Routes } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ng6-toastr-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppService } from '../app.service';


@NgModule({
  declarations: [
    LogInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule, ToastrModule.forRoot(),
    RouterModule.forChild([
      {path:'sign-up',component:SignUpComponent}
    ])
  ],
  providers:[AppService]
  
})
export class UserModule { }

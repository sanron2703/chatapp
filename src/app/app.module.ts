import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { RouterModule } from '@angular/router';
import { LogInComponent } from './user/log-in/log-in.component';
import { ToastrModule } from 'ng6-toastr-notifications';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    ChatModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule, ToastrModule.forRoot(),
    RouterModule.forRoot([
      {path:'log-in',component:LogInComponent,pathMatch:'full'},
      {path:'',redirectTo:'log-in',pathMatch:'full'},
      {path:'*',component:LogInComponent},
      {path:'**',component:LogInComponent},
      // {path:'sign-up', component:SignUpComponent,pathMatch:'full'},
      // {path:'',redirectTo:'sign-up',pathMatch:'full'}

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { }

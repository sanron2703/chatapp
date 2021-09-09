import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ng6-toastr-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FirstCharComponent } from './first-char/first-char.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FirstCharComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule, ToastrModule.forRoot()
  ],
  exports: [FirstCharComponent,UserDetailsComponent,
    FormsModule,CommonModule]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { RouterModule,Router } from '@angular/router';
import { ToastrModule } from 'ng6-toastr-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import { pipe } from '../shared/pipe/pipe';


@NgModule({
  declarations: [
    ChatBoxComponent, pipe
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule, SharedModule,
    RouterModule.forChild([
      {path:'chat',component:ChatBoxComponent}
    ])
  ]
})
export class ChatModule { }

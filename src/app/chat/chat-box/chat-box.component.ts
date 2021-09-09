import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { AppService } from 'src/app/app.service';
import { SocketService } from 'src/app/socket.service';
import { Cookie } from 'ng2-cookies';
import { Router } from '@angular/router';
import { Toastr, ToastrManager } from 'ng6-toastr-notifications';
import { ChatMessage } from './chat';


@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css'],
  providers: []
})
export class ChatBoxComponent implements OnInit {

  @ViewChild('scrollMe' , {read:ElementRef})
  // public scrollMe : ElementRef

  public authToken: any
  public userInfo: any
  public recevierId: any
  public recevierName: any
  public userList: any = []
  public disconnectedSocket!: Boolean;
  public textMsg:any=[]
  public scrollToChatTop: Boolean = false; 
  public previousChatList:any=[]
  public msgList:any=[]
  public pageValue:number=0
  public loadingpreviousChat!:Boolean
 public userId:any



  constructor(
    public appService: AppService, public SocketService: SocketService,
    public router: Router, public tostr: ToastrManager
  ) {
    
    this.recevierName = Cookie.get('recevierName')
    this.userInfo = this.appService.getUserInfoFromLocalStorage()
    // console.log(this.userInfo)
  }

  ngOnInit(): void {
    
      this.authToken = Cookie.get('authToken')
    this.recevierId = Cookie.get('recevierId')
    this.recevierName=Cookie.get('recevierName')
    // console.log(this.recevierName,this.recevierId,this.authToken)
    

    
   

    if(this.recevierId!=null && this.recevierId!=undefined && this.recevierId!= '')
    {
      this.userSelectedToChat(this.recevierId,this.recevierName)
    }
    this.checkStatus()
    
    this.verifyUserConfirmation()
    this.getonLineUserList()
    this.getMsgFromUser()
    
  }

  public checkStatus: any = () => {
    if (Cookie.get('authToken') === undefined || Cookie.get('authToken') === '' || Cookie.get('authToken') === null) {
      this.router.navigate(['/'])
      return false
    }
    else {
      return true
    }
  }

  public verifyUserConfirmation: any = () => {
    // this.SocketService.verifyUser().subscribe((data: any) => {
    //   console.log(data,'yes')
     
    // })
    this.disconnectedSocket = false
    this.SocketService.setUser(this.authToken)
    this.getonLineUserList()


    console.log("text")


  }

  public getonLineUserList: any = () => {
    this.SocketService.onLineUserList().subscribe((userList: any) => {
      this.userList = []
      console.log(userList)
      for (let x in userList) {
        let temp = { 'userId': x, 'name': userList[x], 'unread': 0, 'chating': false }
        this.userList.push(temp)
      }
      console.log(this.userList,"ron")
    })
  }

  //to send text msg
  public sendMsgUsingKey:any = (event:any)=>{
    if(event.keyCode == 13)
    this.sendMsg()
  }

  public sendMsg:any = () =>{
    if(this.textMsg){
      let chatMsgObject:ChatMessage={
        senderName: this.userInfo.firstName + " "+ this.userInfo.lastName,
        senderId: this.userInfo.userId,
        recevierName : Cookie.get('recevierName'),
        recevierId : Cookie.get('recevierId'),
        message : this.textMsg,
        createdOn : new Date()
      }
      console.log(chatMsgObject)
      this.SocketService.sendChatMsg(chatMsgObject)
      this.pushToChatWindow(chatMsgObject)

    }
    else{
      this.tostr.warningToastr("text msg cannot be empty")
    }
  }

  public pushToChatWindow:any= (data:any) =>{
    this.textMsg=" "
    this.msgList.push(data)
    this.scrollToChatTop = false

  }
  //end of text msg

  //To recevie msg
  public getMsgFromUser:any =() =>{
    this.SocketService.chatByUserId(this.userInfo.userId).subscribe((data)=>{
      (this.recevierId==data.senderId)?this.msgList.push(data):''
      this.tostr.successToastr(`${data.senderName} says : ${data.msg}`)
      this.scrollToChatTop=false
    })
  }
  //end to receive msg


  public userSelectedToChat: any = (id:any,name:any)=>{
    console.log('setting user as active')
    this.userList.map((user:any)=>{
      if(user.userId==id){
        user.chatting=true
      }
      else{
        user.chatting=false
      }
    })
    Cookie.set('recevierId',id)
    Cookie.set('recevierName', name)
    this.recevierId=id
    this.recevierName=name
    this.msgList=[]
    this.pageValue=0
    let chatDetails={
      userId: this.userInfo.userId, 
      senderId:id
    }
    this.SocketService.MarkChatAsSeen(chatDetails)
    this.getPreviousChatWithUser()
  }

  public getPreviousChatWithUser : any =() =>{
    let previousData = (this.msgList.length > 0 ? this.msgList.slice():[])
    this.SocketService.getChat(this.userInfo.userId, this.recevierId, this.pageValue*10)
    .subscribe((apiResponse)=>{
      console.log(apiResponse)
      if(apiResponse.status==200){
        this.msgList = apiResponse.data.concat(previousData)
      }
      else{
        this.msgList = previousData
        this.tostr.warningToastr('No Msg Available')
      }
    })
  }

  public loadEarlierPageOfChat : any = () =>{
    this.loadingpreviousChat=true
    this.pageValue++
    this.scrollToChatTop=true
    this.getPreviousChatWithUser()
  }

  public logOut : any =()=>{

    let data={
      userId:this.recevierId,
      authToken:Cookie.get('authToken')
    }
    console.log(data)
    
    this.appService.logOut(data).subscribe((apiResponse)=>{
      if(apiResponse.status==200){
        console.log('logout')
        Cookie.delete('authToken')
        Cookie.delete('recevierId')
        Cookie.delete('recevierName')
        this.SocketService.exitSocket()
        this.router.navigate(['/'])
      }
      else{
        this.tostr.errorToastr(apiResponse.message)
      } 
    },(err:any)=>{
      this.tostr.errorToastr('Some Error Occored')
    })
  } 

  public showUserName = (name:string)=>{
    this.tostr.successToastr('Your chating with' +name)
  }
}

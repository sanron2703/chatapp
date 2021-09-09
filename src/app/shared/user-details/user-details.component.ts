import { Component, OnInit, OnChanges, EventEmitter,Input, Output} from '@angular/core';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  @Input() userfirstName: any
  @Input() userlastName : any
  @Input() userStatus :any
  @Input() messageRead : any
  @Input() userColor : any
  @Input() userBg : any
 
  public firstChar!: string;
  constructor() { }

  ngOnInit(): void {
    this.firstChar= this.userfirstName[0]
  }

}

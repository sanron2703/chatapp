import { Component, OnInit, EventEmitter, Input, Output, SimpleChange, OnChanges } from '@angular/core';

@Component({
  selector: 'first-char',
  templateUrl: './first-char.component.html',
  styleUrls: ['./first-char.component.css']
})
export class FirstCharComponent implements OnInit {
  @Input() name:any
  @Input() userBg: any
  @Input() userColor:any

  public firstChar!: string;
  private _name: string = ''

  constructor() { }

 @Output() 
  notify : EventEmitter<string> = new EventEmitter<string>()

  ngOnInit(): void {
    this._name = this.name
    this.firstChar = this._name[0]

  }

  ngOnChanges(changes : SimpleChange) : void { 
    // let name = changes.name
    // this._name = name.currentvalue
    // this.firstChar = this._name[0]

  }

  nameClicked(){
    this.notify.emit(this._name)
  }


}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataShareService } from '../data-share.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private data: DataShareService) { }
  private lineWidth;
  currentColor:string='red';
  ngOnInit(): void {
    this.data.lineWidth.subscribe(dt=>this.lineWidth=dt);
    this.data.pencilColor.subscribe(dt=>this.currentColor=dt);
  }
  changeLineWidth(event){
   // console.log(event.target.value);
    this.data.changeLineWidth(event.target.value);
  }
  colorPick(event){
   // console.log(event.target.value)
   this.currentColor=event.target.value;
   this.data.changePencilColor(event.target.value);
  }
}

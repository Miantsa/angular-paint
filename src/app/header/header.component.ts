import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as Bootstrap from 'bootstrap';
import { DataShareService } from '../data-share.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private lineWidth;
  private toolOption: number = 1;
  public currentColor: string = 'red';

  constructor(private data: DataShareService) { }
  @Output() saveImage = new EventEmitter();

  ngOnInit(): void {
    this.data.lineWidth.subscribe(dt => this.lineWidth = dt);
    this.data.pencilColor.subscribe(dt => this.currentColor = dt);
    this.data.toolOption.subscribe(dt => this.toolOption = dt);
  //  this.toolTips();
  }
  changeLineWidth(event) {
    // console.log(event.target.value);
    this.data.changeLineWidth(event.target.value);
  }
  colorPick(event) {
    // console.log(event.target.value)
    this.currentColor = event.target.value;
    this.data.changePencilColor(event.target.value);
  }
  saveImageEvent() {
    this.saveImage.emit('save');
  }
  chooseTool(event) {
    let toolsOption = document.querySelectorAll('.tool-option');
    toolsOption.forEach((item) => {
      console.log(item)
      item.classList.remove('active')
    });
    event.target.classList.add('active')
    this.data.changeToolOption(event.target.alt);

  }
  noAction() {
    alert('no event yet!');
  }
  toolTips() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new Bootstrap.Tooltip(tooltipTriggerEl)
    })
  }
}

import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { timer } from 'rxjs';
import { DataShareService } from '../data-share.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit,OnChanges {
  private canvas: any;
  private isDrawing: boolean = false;
  public ctx: any;
  private mouseX: number = 0;
  private mouseY: number = 0;
  private boundings;
  private strokeColor:string='black';
  @Input() isSave: boolean;
  @Output() saveImageFinish=new EventEmitter();
  constructor(private data:DataShareService) { }
  ngOnChanges(changes: SimpleChanges): void {
    //console.log("nisy niova")
    console.log(changes)
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        let change = changes[propName];
        switch (propName) {
          case 'isSave': {
            this.doSomething(change.currentValue)
          }
        }
      }
    }
  }
  doSomething(currentValue: any) {
    if(currentValue){
      this.saveImageToFile();
      setTimeout(()=>{
        this.saveImageFinish.emit(true);

      },1000);
     
    }
  
  }
   lineWidth;
  ngOnInit() {
    this.data.lineWidth.subscribe(dt=>this.lineWidth=dt);
    this.data.pencilColor.subscribe(dt=>this.strokeColor=dt);
   // this.allAboutResizing();
    this.canvas=document.getElementById('myCanvas');
    this.ctx = this.canvas.getContext("2d");
    this.startDrawing();
  }
  saveImageToFile(){
    let imageName = prompt('Please enter image name');
    let canvasDataURL = this.canvas.toDataURL();
    let a = document.createElement('a');
    a.href = canvasDataURL;
    a.download = imageName || 'drawing';
    a.click();
  }
  allAboutResizing() {
    const ele = document.getElementById('resizeMe');
    // The current position of mouse
    let x = 0;
    let y = 0;
    // The dimension of the element
    let w = 0;
    let h = 0;
    // Handle the mousedown event
    // that's triggered when user drags the resizer
    const mouseDownHandler =  (e)=> {
      // Get the current mouse position
      x = e.clientX;
      y = e.clientY;
      // Calculate the dimension of element
      const styles = window.getComputedStyle(ele);
      w = parseInt(styles.width, 10);
      h = parseInt(styles.height, 10);
      // Attach the listeners to `document`
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    };
    const mouseMoveHandler = (e)=> {
      // How far the mouse has been moved
      const dx = e.clientX - x;
      const dy = e.clientY - y;
      // Adjust the dimension of element
      ele.style.width = `${w + dx}px`;
      ele.style.height = `${h + dy}px`;
    };

    const mouseUpHandler =  () =>{
      // Remove the handlers of `mousemove` and `mouseup`
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };
    // Query all resizers
    const resizers = ele.querySelectorAll('.resizer');

    // Loop over them
    [].forEach.call(resizers,  (resizer)=> {
      resizer.addEventListener('mousedown', mouseDownHandler);
    });
  }
  //////////////////////////////////////////////////
  public startDrawing() {
    this.canvas.width=this.canvas.offsetWidth;
    this.canvas.height=this.canvas.offsetHeight;
   
    this.ctx.strokeStyle = this.strokeColor; // initial brush color
    this.ctx.lineWidth = this.lineWidth; // ini
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'brushstyle';
    this.boundings = this.canvas.getBoundingClientRect();
    //mouseDown
        this.canvas.addEventListener('mousedown',  (event)=>{
         
        //  console.log(this.lineWidth)
         this.setMouseCoordinates(event);
          this.isDrawing = true;
          // Start Drawing
          this.ctx.beginPath();
          this.ctx.moveTo(this.mouseX, this.mouseY);
    });
    //mouseMove
    this.canvas.addEventListener('mousemove', (event) =>{
      this.ctx.lineWidth = this.lineWidth;
      this.ctx.strokeStyle = this.strokeColor;
      this.setMouseCoordinates(event);
    if(this.isDrawing){
     
      this.ctx.lineTo(this.mouseX, this.mouseY);
      this.ctx.stroke();
    }
    });
    //mouseUp
    this.canvas.addEventListener('mouseup', (event) =>{
      this.setMouseCoordinates(event);
      this.isDrawing = false;
    });
  }
   setMouseCoordinates(event): void {
    this.mouseX = event.clientX - this.boundings.left;
    this.mouseY = event.clientY - this.boundings.top; 
    console.log("X:"+ this.boundings.left + "//" + this.mouseX)
    console.log("Y:"+ this.boundings.top + "//" + this.mouseY)
  }
  /*saveImageTreatment(){

    console.log("raikitra ary ehh")
  }*/
}
/*
 */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() { }
  paint: Paint;
globalCanvas:any;
  ngOnInit(): void {
    
   // this.allAboutResizing();
    this.globalCanvas=document.getElementById('myCanvas');
 
    this.paint = new Paint(this.globalCanvas);
    this.paint.startDrawing();
  }
  allAboutResizing() {
    // Query the element
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
     /* this.globalCanvas.width=ele.style.width;
      this.globalCanvas.height=ele.style.height;*/
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
}
class Paint {
  private canvas: any;
  private isDrawing: boolean = false;
  public ctx: any;
  private mouseX: number = 0;
  private mouseY: number = 0;
  private boundings;
  constructor(cvs) {
  //  let cvs=document.getElementById('myCanvas');
    this.canvas = cvs;
    this.canvas.width=this.canvas.offsetWidth;
    this.canvas.height=this.canvas.offsetHeight;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.strokeStyle = 'black'; // initial brush color
    this.ctx.lineWidth = 1; // ini
    //this.ctx.lineWidth = lineWidthRange();
		this.ctx.lineJoin = 'round';
		this.ctx.lineCap = 'brushstyle';
    this.boundings = this.canvas.getBoundingClientRect();

    
  }

  public startDrawing() {
   
    //mouseDown
        this.canvas.addEventListener('mousedown',  (event)=>{
         // this.setMouseCoordinates(event);
          this.isDrawing = true;
      
          // Start Drawing
          this.ctx.beginPath();
          this.ctx.moveTo(this.mouseX, this.mouseY);
    });
    //mouseMove
    this.canvas.addEventListener('mousemove', (event) =>{
      this.setMouseCoordinates(event);
      console.log("Drawing X: "+this.mouseX +"Y: "+this.mouseY);
      console.log(this.ctx)
      /*this.canvas.width=this.canvas.offsetWidth;
    this.canvas.height=this.canvas.offsetHeight;*/
    if(this.isDrawing){
     
      this.ctx.lineTo(this.mouseX, this.mouseY);
      this.ctx.stroke();
    }
    });
    //mouseUp
    this.canvas.addEventListener('mouseup', (event) =>{
     // this.setMouseCoordinates(event);
      this.isDrawing = false;
    });
  }
  onPaint(){
    this.ctx.lineTo(this.mouseX,this.mouseY);
    this.ctx.stroke();
  }
   setMouseCoordinates(event): void {
    /* this.mouseX=this.getPosition(event,can).X;
     this.mouseY=this.getPosition(event,can).Y;*/
    /* this.mouseX=event.pageX + 500;
     this.mouseY=event.pageY + 500;*/
     
    this.mouseX = event.clientX - this.boundings.left;
    this.mouseY = event.clientY - this.boundings.top; 
    console.log("X:"+ this.boundings.left + "//" + this.mouseX)
    console.log("Y:"+ this.boundings.top + "//" + this.mouseY)
  }
  getPosition(mouseEvent, sigCanvas) {
    let x, y;
    if (mouseEvent.pageX != undefined && mouseEvent.pageY != undefined) {
       x = mouseEvent.pageX;
       y = mouseEvent.pageY;
    } else {
       x = mouseEvent.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
       y = mouseEvent.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    return { X: x - sigCanvas.offsetLeft, Y: y - sigCanvas.offsetTop };
 }
}
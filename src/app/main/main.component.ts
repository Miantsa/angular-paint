import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor() { }
  paint:Paint;
  ngOnInit(): void {
    this.paint=new Paint();
    this.allAboutResizing();

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
    const mouseDownHandler = function (e) {
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

    const mouseMoveHandler = function (e) {
      // How far the mouse has been moved
      const dx = e.clientX - x;
      const dy = e.clientY - y;

      // Adjust the dimension of element
      ele.style.width = `${w + dx}px`;
      ele.style.height = `${h + dy}px`;
    };

    const mouseUpHandler = function () {
      // Remove the handlers of `mousemove` and `mouseup`
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };
    // Query all resizers
    const resizers = ele.querySelectorAll('.resizer');

    // Loop over them
    [].forEach.call(resizers, function (resizer) {
      resizer.addEventListener('mousedown', mouseDownHandler);
    });
  }
}
class Paint{



}
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  private lineWidthSource=new BehaviorSubject(1);
  private pencilColorSource=new BehaviorSubject('black')
  lineWidth=this.lineWidthSource.asObservable();
  pencilColor=this.pencilColorSource.asObservable();
  constructor() { }
  changeLineWidth(value){
    this.lineWidthSource.next(value);
  }
  changePencilColor(value){
    this.pencilColorSource.next(value);
  }
}

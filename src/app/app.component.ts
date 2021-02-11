import { Component ,OnInit} from '@angular/core';
//import '~bootstrap/scss/bootstrap';
import Bootstrap from 'bootstrap/dist/js/bootstrap';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isSave:boolean=false;
  ngOnInit(): void {
    var triggerTabList = [].slice.call(document.querySelectorAll('#myTab a'))
triggerTabList.forEach(function (triggerEl) {
  var tabTrigger = new Bootstrap.Tab(triggerEl)

  triggerEl.addEventListener('click', function (event) {
    event.preventDefault()
    tabTrigger.show()
  })
})
  }
  title = 'paint';

 saveImageTreatment(){
   
  this.isSave=true;
    console.log("raikitra ary ehh")
  }
  saveRefresh(value){
    if(value)
    this.isSave=false;
  }
}

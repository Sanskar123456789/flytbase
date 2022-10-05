import { Component } from '@angular/core';
import {  interval,  Subscription,  timer } from 'rxjs';
import { utils, read }  from 'xlsx';

interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
  time:number;
}


@Component({
  selector: 'flytbase-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  // to store data
  markers: marker[] = [];
  markerCopy: marker[] = [];

  //html settings
  zoom = 8;
  disabled= false;

  // data to add
  time=0;
  longitude=0;
  lattitude=0;

  // for logic
  timer=0;
  obs$ = interval(1000);
  max=0;
  subs$:Subscription=new Subscription();
  count=0;
  i=0;
  

  // add location
  addlocation(): void{
    if(!this.lattitude || !this.longitude || !this.time){
      alert('Please enter all the fields');
    }else{
      if(this.markerCopy.length!=0){
        this.markers = this.markerCopy;
      }
      this.markers.push(
        {
          lat: this.lattitude,
          lng: this.longitude,
          draggable: true,
          time:this.time
        }
      );
    }

    this.markerCopy = this.markers;
    this.timer=0;
    this.max=0;
    this.count=0;
    this.i=0;
    
  }

  // play
  disable(){
    this.disabled=true;
    
    if(this.max==0){
      this.markerCopy.map(item => {this.max =item.time+this.max})
    }

    this.subs$ = this.obs$.subscribe(async (obs) => {

      if(this.timer==0){
        this.markers=[];
      }
      
      if(this.max<=this.timer){
        await timer(1000).toPromise().then(() => {
          this.i=0;
          this.count=0;
          this.i=0;
          this.timer=0;
          this.markers=[];
        })
      }

      if(this.i>(this.markerCopy.length-1)){
        await timer(1000).toPromise().then(() => {
          this.i=0;
          this.count=0;
          this.i=0;
          this.timer=0;
          this.markers=[];
        })
      }
       

      this.timer++;
      this.count++;

      if(this.markerCopy[this.i].time==this.count){        
        this.count=0;
        this.markers.push(this.markerCopy[this.i]);
        this.i++;
      }
    })


  }

  // pause
  notdisable(){
    this.disabled=false;
    this.subs$.unsubscribe();
  }

  getfile(event :any){
    const file = event.currentFiles[0];
    let exceldata:marker[]=[];

    const fileReader = new FileReader();
    fileReader.readAsBinaryString(file);

    fileReader.onload=(e)=> {
      const workbook = read(fileReader.result,{type: "binary"});
      const sheetname = workbook.SheetNames;
      exceldata = utils.sheet_to_json(workbook.Sheets[sheetname[0]]);
      exceldata.map(loc=>{
        this.markers.push(loc);
        console.log(loc);
      })
  
      this.markerCopy = this.markers;
      console.log(this.markerCopy,this.markers);
    }

    

  }

  
  
  
}


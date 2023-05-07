import { Component, OnInit } from '@angular/core';
import { BatchService } from 'src/app/services/batch.service';

@Component({
  selector: 'app-batch-result',
  templateUrl: './batch-result.component.html',
  styleUrls: ['./batch-result.component.css']
})
export class BatchResultComponent implements OnInit {

  batchResult = ""
  batchResultArr = [""]
  yearCount = [[""]]
  message="Still Processing the Map/Reduce job ... please wait"
  stillWorking= true
  constructor(private batchService:BatchService) {}

    ngOnInit(): void {
        this.batchService.getBatchResult().subscribe({
          next: data => {
            
            this.batchResult = data.data
            
            this.batchResultArr = this.batchResult.split('\n')
            for(let i=1 ; i<13 ; i++) {
              const formattedI = i<10? "0" + i : i
              const rexExp = new RegExp("(2018-"+formattedI+"-)\\w+")
              this.yearCount[i-1] = this.batchResultArr.filter((element)=> rexExp.test(element))
               
            }
           this.message = "Finally the Results"
           this.stillWorking= false
          },
         
        })
    }
}

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
  constructor(private batchService:BatchService) {}

    ngOnInit(): void {
        this.batchService.getBatchResult().subscribe({
          next: data => {
            //console.log(data)
            this.batchResult = data.data
            //console.log(this.batchResult.split('\n'))
            this.batchResultArr = this.batchResult.split('\n')
            for(let i=1 ; i<13 ; i++) {
              const formattedI = i<10? "0" + i : i
              const rexExp = new RegExp("(2018-"+formattedI+"-)\\w+")
              this.yearCount[i-1] = this.batchResultArr.filter((element)=> rexExp.test(element))
               console.log(this.yearCount)
            }
           //this.JanuaryCount= this.batchResultArr.filter((element )=> /(2018-01-)\w+/.test(element))
            //console.log(this.JanuaryCount)
          }
        })
    }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, delay, distinctUntilChanged } from 'rxjs';
import { DocumentModel } from 'src/app/models/document.model';

import { DocumentService } from 'src/app/services/document.service';
import { Chart, ChartData, ChartDataset, ChartOptions } from 'chart.js/auto';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit , OnDestroy {
  documents!: Observable<DocumentModel[]>;
  chart: Chart | undefined;
  data: ChartData<'line'> | undefined;
  charData: number[] = [];
  labels: string[] = [];
  constructor(private documentService: DocumentService) {
   
  }
  ngOnInit(): void {
   
    this.documents = this.documentService.documents;
    this.documents.subscribe((val) => {
      this.chart?.destroy()
      this.charData = []
      this.labels = []
    //this.chart = undefined
    console.log(val)
    //console.log(val[0]._id , val[0].average_delay , val[0])
      val.map((element) => {
        const { _id, average_delay } = element;
        this.charData.push(average_delay);
        this.labels.push(_id);
      });

      this.data = {
        labels: this.labels,
        datasets: [
          {
            label: 'Avergae Delay',
            data: this.charData,
          },
        ],
      };
        console.log(this.labels.length , this.charData.length)
        this.chart = new Chart('myChart', {
          type: 'line',
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: 'Real Time Chart',
              },
            },
          },
          data: this.data,
        });
      
      
      
      
    });

   
    
  }

  ngOnDestroy(): void {
        this.chart?.destroy()
      //  document.getElementById('myChart')?.remove()
       
      
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForeignmapComponent } from './foreignmap.component';
import { NgxEchartsModule } from 'ngx-echarts';




@NgModule({
  declarations: [ForeignmapComponent],
  imports: [
    CommonModule,
    NgxEchartsModule
  ],
  exports: [ForeignmapComponent]
})
export class ForeignmapModule { }

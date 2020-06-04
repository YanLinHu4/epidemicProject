import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChinamapComponent } from './chinamap.component';
import { NgxEchartsModule } from 'ngx-echarts';



@NgModule({
  declarations: [ChinamapComponent],
  imports: [
    CommonModule,
    NgxEchartsModule
  ],
  exports: [ChinamapComponent]
})
export class ChinamapModule { }

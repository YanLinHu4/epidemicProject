import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  // 用于存储国内疫情以及新闻数据
  newslist: any = {};
  // 用于存储国内现有及累计确诊人数数据
  cityPeoplelist: any = {};
 
  
}

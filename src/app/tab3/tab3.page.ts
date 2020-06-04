import { Component } from '@angular/core';
declare let $: any;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor() {}

  ngOnInit(): void {
    let _this = this;
    // 更新国外数据
    // $.get("http://api.tianapi.com/txapi/ncov/index?key=fa63572e04fc04d2534dc83c9a3ee96a",
    // function(data,status){
    //   console.log(data)
      
    // });
  }

}

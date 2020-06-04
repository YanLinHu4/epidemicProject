import { Component, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { CommonService } from '../services/common.service';
import { IonContent, ToastController, NavController } from '@ionic/angular';
declare let $: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  @ViewChild(IonContent) content: IonContent;
  constructor(private commonService: CommonService, public renderer2: Renderer2 ,public elementRef: ElementRef) {}

  textInfo: any = "现有确诊病例数，排除治愈、死亡";

  // 用于存储海外疫情数据
  newslist: any = {};
  // 用于存储数据最后更新时间
  modifyTime: any = '';
  // 用于存储总计现有确诊

  // 用于存储现有确诊人数或者累计确诊
  currentConfirmedCountList: any = [];
  // 用于存储国外现有及累计人数数据
  cityPeoplelist: any = {};

  // 国外各地区疫情数据
  countryListTopTen: any = [];
  countryList: any = [];
  countryAll: any = [];

  showFlag: any = true;
  showTitle: any = '展开全部 ∨';

  // 现有确诊
  currentConfirmedCount: any = 0;
  // 累计确诊
  suspectedCount: any = 0;
  // 累计治愈
  seriousCount: any = 0;
  // 累计死亡
  confirmedCount: any = 0;

  elContent: any;
  elBackTop: any;


  ngOnInit(): void {
      // 切换btn样式
      this.changeBtn();

      let _this = this;
      // 更新国外数据
      // $.get("http://api.tianapi.com/txapi/ncovabroad/index?key=fa63572e04fc04d2534dc83c9a3ee96a",
      // function(data,status){
      //   console.log(data)
      //   _this.newslist = data;
      //   _this.modifyTime = _this.setTimes(_this.newslist.newslist[0].modifyTime);
      //   _this.cityPeoplelist = data;
      //   _this.countryList = data.newslist;
      //   _this.countryAll = data.newslist;
      //   _this.countryListTopTen = _this.countryList.slice(0,10);
      //   _this.selectAllCount();
      // });


      setTimeout(() => {
        this.currentConfirmedCountFun();
      }, 600);
    
  }

  // ionic生命周期函数
  ionViewDidEnter() {
    this.elContent = this.elementRef.nativeElement.querySelector('#content');
    this.elBackTop = this.elementRef.nativeElement.querySelector('#BackTop');
  }

  // 页面滑动监听事件
  ionScroll() {
    const scrollElement: Promise<HTMLElement> = this.elContent.getScrollElement() ;
    scrollElement.then((Element) => {
      if (Element.scrollTop > 450) { // 设置当滚动条距离顶部的距离为110时返回顶部按钮显示
        this.renderer2.removeAttribute(this.elBackTop, 'hidden');
        // $(".title-thead").css({"top":"0","position":"fixed"});
      } else if (Element.scrollTop === 0) { // 设置当滚动条距离顶部的距离为0时返回顶部按钮隐藏
        this.renderer2.setAttribute(this.elBackTop, 'hidden', 'true');
      }
    });
  }

  // 返回顶部事件
  backContentTop() {
    this.content.scrollToTop(300);
  }

  // 统计全部数据信息
  selectAllCount() {
    for(let i = 0; i < this.countryAll.length; i++) {
      this.currentConfirmedCount = this.currentConfirmedCount + this.countryAll[2].currentConfirmedCount;
      this.suspectedCount += this.countryAll[i].confirmedCount;
      this.seriousCount += this.countryAll[i].curedCount;
      this.confirmedCount += this.countryAll[i].deadCount;
    }
  }

  // 时间补零函数
  setDb(num) {
    //补零操作
    if (num < 10) {
      return '0' + num;
    } else {
      return '' + num;
    }
  }
  // 格式化时间数据
  setTimes(timer) {
    var time = new Date(timer);
    var year = time.getFullYear();//年
    var mon = this.setDb(time.getMonth() + 1);//0 
    var day = this.setDb(time.getDate());//24
    var hour = this.setDb(time.getHours());//时
    var min = this.setDb(time.getMinutes());//分
    var sec = this.setDb(time.getSeconds());//秒
    return `${year}.${mon}.${day} ${hour}:${min}:${sec}`;
  }

  // 切换btn样式
  changeBtn() {
    let _this = this;
    $(".guonei-map>.header-wrap>span").on("click", function() {
      $(this).addClass('change-btn');
      $(this).siblings('span').removeClass('change-btn');
      if($(this).text() == '累计确诊') {
        _this.textInfo = '累计确诊病例数，包含治愈、死亡';
        _this.confirmedCountFun();
      }else {
        _this.textInfo = "现有确诊病例数，排除治愈、死亡";
        _this.currentConfirmedCountFun();
      }
    });
  }

  // 现有确诊数据
  currentConfirmedCountFun() {
    console.log(this.cityPeoplelist.newslist)
    this.currentConfirmedCountList = $.map(this.cityPeoplelist.newslist, function(value) {
      return { name: value.provinceName, value: value.currentConfirmedCount};
    });
    console.log(this.currentConfirmedCountList)
  }
  // 累计确诊数据
  confirmedCountFun() {
    this.currentConfirmedCountList = $.map(this.cityPeoplelist.newslist, function(value) {
      return { name: value.provinceName, value: value.confirmedCount};
    });
  }

  // 展开全部数据
  showAll() {
    if(this.showFlag == true) {
      this.countryListTopTen = this.countryList;
      this.showTitle = "收起全部 ∧";
      this.showFlag = false;
    }else {
      this.countryListTopTen = this.countryListTopTen.slice(0, 10);
      this.showTitle = "展开全部 ∨";
      this.showFlag = true;
    }
  }

}

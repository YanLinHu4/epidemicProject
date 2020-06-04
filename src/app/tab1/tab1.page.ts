import { Component, ViewChild, Renderer2, ElementRef } from '@angular/core';
import { CommonService } from '../services/common.service';
import { IonContent, ToastController, NavController } from '@ionic/angular';

declare let $: any;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild(IonContent) content: IonContent;
  constructor(private commonService: CommonService, public renderer2: Renderer2 ,public elementRef: ElementRef) {}

  // 用于存储国内疫情以及新闻数据
  newslist: any = {};
  // 用于存储数据最后更新时间
  modifyTime: any = '';
  // 保存现存确诊人数
  currentConfirmedCount: any;
  // 保存相比昨天现存确诊人数
  currentConfirmedIncr: any;
  // 保存现存疑似人数
  suspectedCount: any;
  // 保存相比昨天现存确诊人数
  suspectedIncr: any;
  // 	现存重症人数
  seriousCount: any;
  // 	相比昨天现存重症人数
  seriousIncr: any;
  // 累计确诊人数
  confirmedCount: any;
  // 相比昨天累计确诊人数
  confirmedIncr:any;
  // 累计治愈人数
  curedCount: any;
  // 相比昨天新增治愈人数
  curedIncr: any;
  // 累计死亡人数
  deadCount: any;
  // 相比昨天新增死亡人数
  deadIncr: any;

  /** ----------------------------------------------------------------------------------- */
  textInfo: any = "现有确诊病例数，排除治愈、死亡";
  // 用于存储国内现有及累计人数数据
  cityPeoplelist: any = {};
  // 用于存储现有确诊人数或者累计确诊
  currentConfirmedCountList: any = [];

  // 各省份疫情数据列表
  cityList: any = [];
  // 显示各省份前十条数据
  cityListTopTen: any = [];
  // 展开收起提示
  showTitle: any = '展开全部 ∨';
  // 标识符
  showFlag: any = true;
  showTrFlag: any = true;

  elContent: any;
  elBackTop: any;


  ngOnInit(): void {

    // this.seriousCountFun();

    // let _this = this;
    // // 更新国内数据
    // $.get("http://api.tianapi.com/txapi/ncov/index?key=fa63572e04fc04d2534dc83c9a3ee96a",
    // function(data,status){
    //   _this.newslist = data;
    //   _this.modifyTime = _this.setTimes(_this.newslist.newslist[0].desc.modifyTime);
    //   _this.currentConfirmedCount = _this.newslist.newslist[0].desc.currentConfirmedCount;
    //   _this.currentConfirmedIncr = _this.newslist.newslist[0].desc.currentConfirmedIncr >= 0 ? `+${_this.newslist.newslist[0].desc.currentConfirmedIncr}` : _this.newslist.newslist[0].desc.currentConfirmedIncr;
    //   _this.suspectedCount = _this.newslist.newslist[0].desc.suspectedCount;
    //   _this.suspectedIncr = _this.newslist.newslist[0].desc.suspectedIncr >= 0 ? `+${_this.newslist.newslist[0].desc.suspectedIncr}` : _this.newslist.newslist[0].desc.suspectedIncr;
    //   _this.seriousCount = _this.newslist.newslist[0].desc.seriousCount;
    //   _this.seriousIncr = _this.newslist.newslist[0].desc.seriousIncr >= 0 ? `+${_this.newslist.newslist[0].desc.seriousIncr}` : _this.newslist.newslist[0].desc.seriousIncr;
    //   _this.confirmedCount = _this.newslist.newslist[0].desc.confirmedCount
    //   _this.confirmedIncr = _this.newslist.newslist[0].desc.confirmedIncr >= 0 ? `+${_this.newslist.newslist[0].desc.confirmedIncr}` : _this.newslist.newslist[0].desc.confirmedIncr;
    //   _this.curedCount = _this.newslist.newslist[0].desc.curedCount;
    //   _this.curedIncr = _this.newslist.newslist[0].desc.curedIncr >= 0 ? `+${_this.newslist.newslist[0].desc.curedIncr}` : _this.newslist.newslist[0].desc.curedIncr;
    //   _this.deadCount = _this.newslist.newslist[0].desc.deadCount;
    //   _this.deadIncr = _this.newslist.newslist[0].desc.deadIncr >= 0 ? `+${_this.newslist.newslist[0].desc.deadIncr}` : _this.newslist.newslist[0].desc.deadIncr;
    // });

    // // 各省份疫情数据
    // $.get("http://api.tianapi.com/txapi/ncovcity/index?key=fa63572e04fc04d2534dc83c9a3ee96a",
    // function(data,status){
    //   _this.cityList = data.newslist;
    //   _this.cityListTopTen = _this.cityList.slice(0,10);
    // });

    // // 切换btn样式
    // this.changeBtn();

    // setTimeout(() => {
    //   this.currentConfirmedCountFun();
    // }, 500);
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

  // 全国现有及累计数据
  seriousCountFun() {
    let _this = this;
    $.get("http://api.tianapi.com/txapi/ncovcity/index?key=fa63572e04fc04d2534dc83c9a3ee96a",
    function(data,status){
      _this.cityPeoplelist = data;
    });
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
    this.currentConfirmedCountList = $.map(this.cityPeoplelist.newslist, function(value) {
      return { name: value.provinceShortName, value: value.currentConfirmedCount};
    });
  }
  // 累计确诊数据
  confirmedCountFun() {
    this.currentConfirmedCountList = $.map(this.cityPeoplelist.newslist, function(value) {
      return { name: value.provinceShortName, value: value.confirmedCount};
    });
  }

  // 展开全部数据
  showAll() {
    if(this.showFlag == true) {
      this.cityListTopTen = this.cityList;
      this.showTitle = "收起全部 ∧";
      this.showFlag = false;
    }else {
      this.cityListTopTen = this.cityListTopTen.slice(0, 10);
      this.showTitle = "展开全部 ∨";
      this.showFlag = true;
    }
  }

  // 展开剩余的tr
  showTr(event) {
    if(this.showTrFlag == true) {
      $(event.target).parents("tr").siblings().css("display", "table-row");
      this.showTrFlag = false;
    }else {
      $(event.target).parents("tr").siblings().css("display", "none");
      this.showTrFlag = true;
    }
    
  }
}

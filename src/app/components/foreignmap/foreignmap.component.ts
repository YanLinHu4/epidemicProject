import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import 'echarts/map/js/world.js';

@Component({
  selector: 'app-foreignmap',
  templateUrl: './foreignmap.component.html',
  styleUrls: ['./foreignmap.component.scss'],
})
export class ForeignmapComponent implements OnInit {

  constructor() { }

  infoList: any = {};
  options: any = {};
  @Input() currentConfirmedCountList;

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    this.infoList = this.currentConfirmedCountList;
    this.options = {
      title: {
          text: '',
      },
      tooltip: {
          trigger: 'item',
          position: function (point, params, dom, rect, size) {
              //其中point为当前鼠标的位置，size中有两个属性：viewSize和contentSize，分别为外层div和tooltip提示框的大小
              var x = point[0];//
              var y = point[1];
              var viewWidth = size.viewSize[0];
              var viewHeight = size.viewSize[1];
              var boxWidth = size.contentSize[0];
              var boxHeight = size.contentSize[1];
              var posX = 0;//x坐标位置
              var posY = 0;//y坐标位置
              if (x < boxWidth) {//左边放不开
                  posX = 5;
              } else {//左边放的下
                  posX = x - boxWidth;
              }
              if (y < boxHeight) {//上边放不开
                  posY = 5;
              } else {//上边放得下
                  posY = y - boxHeight;
              }
              return [posX, posY];
          },
          formatter: '地区：{b} <br/> 确诊：{c}'
      },
      visualMap: {
          min: 0,
          max: 10000,
          left: '0',
          bottom: '0',
          splitNumber: 5,
          itemWidth: 10,
          itemHeight: 10,
          itemGap:1,
          textGap: 1,
         
          color: [ '#8A0808', '#B80909', '#E64546', '#F57567', '#FF9985', '#FFC4B3', '#FFE5DB', '#FFFFFF'],
          pieces: [
              {min: 100000},
              {min: 10000, max: 99999},
              {min: 1000, max: 10000},
              {min: 1000, max: 9999},
              {min: 100, max: 999},
              {min: 50, max: 99},
              {min: 10, max: 49},
              {min: 1, max: 9},
              {min: 0, max: 0}
          ]
      },
      nameMap: {
        Afghanistan: '阿富汗',
        Singapore: '新加坡',
        Angola: '安哥拉',
        Albania: '阿尔巴尼亚',
        'United Arab Emirates': '阿联酋',
        Argentina: '阿根廷',
        Armenia: '亚美尼亚',
        'French Southern and Antarctic Lands':
            '法属南半球和南极领地',
        Australia: '澳大利亚',
        Austria: '奥地利',
        Azerbaijan: '阿塞拜疆',
        Burundi: '布隆迪',
        Belgium: '比利时',
        Benin: '贝宁',
        'Burkina Faso': '布基纳法索',
        Bangladesh: '孟加拉国',
        Bulgaria: '保加利亚',
        'The Bahamas': '巴哈马',
        'Bosnia and Herzegovina': '波斯尼亚和黑塞哥维那',
        Belarus: '白俄罗斯',
        Belize: '伯利兹',
        Bermuda: '百慕大',
        Bolivia: '玻利维亚',
        Brazil: '巴西',
        Brunei: '文莱',
        Bhutan: '不丹',
        Botswana: '博茨瓦纳',
        'Central African Republic': '中非共和国',
        Canada: '加拿大',
        Switzerland: '瑞士',
        Chile: '智利',
        China: '中国',
        'Ivory Coast': '象牙海岸',
        Cameroon: '喀麦隆',
        'Dem. Rep. Congo': '刚果（金）',
        'Republic of the Congo': '刚果共和国',
        Colombia: '哥伦比亚',
        'Costa Rica': '哥斯达黎加',
        Cuba: '古巴',
        'Northern Cyprus': '北塞浦路斯',
        Cyprus: '塞浦路斯',
        'Czech Republic': '捷克共和国',
        Germany: '德国',
        Djibouti: '吉布提',
        Denmark: '丹麦',
        'Dominican Republic': '多明尼加共和国',
        Algeria: '阿尔及利亚',
        Ecuador: '厄瓜多尔',
        Egypt: '埃及',
        Eritrea: '厄立特里亚',
        Spain: '西班牙',
        Estonia: '爱沙尼亚',
        Ethiopia: '埃塞俄比亚',
        Finland: '芬兰',
        Fiji: '斐',
        'Falkland Islands': '福克兰群岛',
        France: '法国',
        Gabon: '加蓬',
        'United Kingdom': '英国',
        Georgia: '格鲁吉亚',
        Ghana: '加纳',
        Guinea: '几内亚',
        Gambia: '冈比亚',
        'Guinea Bissau': '几内亚比绍',
        Greece: '希腊',
        Greenland: '格陵兰',
        Guatemala: '危地马拉',
        'French Guiana': '法属圭亚那',
        Guyana: '圭亚那',
        Honduras: '洪都拉斯',
        Croatia: '克罗地亚',
        Haiti: '海地',
        Hungary: '匈牙利',
        Indonesia: '印度尼西亚',
        India: '印度',
        Ireland: '爱尔兰',
        Iran: '伊朗',
        Iraq: '伊拉克',
        Iceland: '冰岛',
        Israel: '以色列',
        Italy: '意大利',
        Jamaica: '牙买加',
        Jordan: '约旦',
        Japan: '日本',
        Kazakhstan: '哈萨克斯坦',
        Kenya: '肯尼亚',
        Kyrgyzstan: '吉尔吉斯斯坦',
        Cambodia: '柬埔寨',
        Kosovo: '科索沃',
        Kuwait: '科威特',
        Laos: '老挝',
        Lebanon: '黎巴嫩',
        Liberia: '利比里亚',
        Libya: '利比亚',
        'Sri Lanka': '斯里兰卡',
        Lesotho: '莱索托',
        Lithuania: '立陶宛',
        Luxembourg: '卢森堡',
        Latvia: '拉脱维亚',
        Morocco: '摩洛哥',
        Moldova: '摩尔多瓦',
        Madagascar: '马达加斯加',
        Mexico: '墨西哥',
        Macedonia: '马其顿',
        Mali: '马里',
        Myanmar: '缅甸',
        Montenegro: '黑山',
        Mongolia: '蒙古',
        Mozambique: '莫桑比克',
        Mauritania: '毛里塔尼亚',
        Malawi: '马拉维',
        Malaysia: '马来西亚',
        Namibia: '纳米比亚',
        'New Caledonia': '新喀里多尼亚',
        Niger: '尼日尔',
        Nigeria: '尼日利亚',
        Nicaragua: '尼加拉瓜',
        Netherlands: '荷兰',
        Norway: '挪威',
        Nepal: '尼泊尔',
        'New Zealand': '新西兰',
        Oman: '阿曼',
        Pakistan: '巴基斯坦',
        Panama: '巴拿马',
        Peru: '秘鲁',
        Philippines: '菲律宾',
        'Papua New Guinea': '巴布亚新几内亚',
        Poland: '波兰',
        'Puerto Rico': '波多黎各',
        'North Korea': '北朝鲜',
        Portugal: '葡萄牙',
        Paraguay: '巴拉圭',
        Qatar: '卡塔尔',
        Romania: '罗马尼亚',
        Russia: '俄罗斯',
        Rwanda: '卢旺达',
        'Western Sahara': '西撒哈拉',
        'Saudi Arabia': '沙特阿拉伯',
        Sudan: '苏丹',
        'South Sudan': '南苏丹',
        Senegal: '塞内加尔',
        'Solomon Islands': '所罗门群岛',
        'Sierra Leone': '塞拉利昂',
        'El Salvador': '萨尔瓦多',
        Somaliland: '索马里兰',
        Somalia: '索马里',
        'Republic of Serbia': '塞尔维亚',
        Suriname: '苏里南',
        Slovakia: '斯洛伐克',
        Slovenia: '斯洛文尼亚',
        Sweden: '瑞典',
        Swaziland: '斯威士兰',
        Syria: '叙利亚',
        Chad: '乍得',
        Togo: '多哥',
        Thailand: '泰国',
        Tajikistan: '塔吉克斯坦',
        Turkmenistan: '土库曼斯坦',
        'East Timor': '东帝汶',
        'Trinidad and Tobago': '特里尼达和多巴哥',
        Tunisia: '突尼斯',
        Turkey: '土耳其',
        'United Republic of Tanzania': '坦桑尼亚',
        Uganda: '乌干达',
        Ukraine: '乌克兰',
        Uruguay: '乌拉圭',
        'United States': '美国',
        Uzbekistan: '乌兹别克斯坦',
        Venezuela: '委内瑞拉',
        Vietnam: '越南',
        Vanuatu: '瓦努阿图',
        'West Bank': '西岸',
        Yemen: '也门',
        'South Africa': '南非',
        Zambia: '赞比亚',
        Korea: '韩国',
        Tanzania: '坦桑尼亚',
        Zimbabwe: '津巴布韦',
        Congo: '刚果',
        'Central African Rep.': '中非',
        Serbia: '塞尔维亚',
        'Bosnia and Herz.': '波黑',
        'Czech Rep.': '捷克',
        'W. Sahara': '西撒哈拉',
        'Lao PDR': '老挝',
        'Dem.Rep.Korea': '朝鲜',
        'Falkland Is.': '福克兰群岛',
        'Timor-Leste': '东帝汶',
        'Solomon Is.': '所罗门群岛',
        Palestine: '巴勒斯坦',
        'N. Cyprus': '北塞浦路斯',
        Aland: '奥兰群岛',
        'Fr. S. Antarctic Lands': '法属南半球和南极陆地',
        Mauritius: '毛里求斯',
        Comoros: '科摩罗',
        'Eq. Guinea': '赤道几内亚',
        'Guinea-Bissau': '几内亚比绍',
        'Dominican Rep.': '多米尼加',
        'Saint Lucia' : '圣卢西亚',
        Dominica: '多米尼克',
        'Antigua and Barb.': '安提瓜和巴布达',
        'U.S. Virgin Is.': '美国原始岛屿',
        Montserrat: '蒙塞拉特',
        Grenada: '格林纳达',
        Barbados: '巴巴多斯',
        Samoa: '萨摩亚',
        Bahamas: '巴哈马',
        'Cayman Is.': '开曼群岛',
        'Faeroe Is.': '法罗群岛',
        'IsIe of Man': '马恩岛',
        Malta: '马耳他共和国',
        Jersey: '泽西',
        'Cape Verde': '佛得角共和国',
        'Turks and Caicos Is.': '特克斯和凯科斯群岛',
        'St. Vin. and Gren.': '圣文森特和格林纳丁斯'
      },
      series: [
          {
              name: '',
              type: 'map',
              mapType: 'world',
              zoom: 1, //当前视角的缩放比例
              roam: true, //是否开启平游或缩放
              x:10,
              y:10,
              x2:10,
              y2:0,
              scaleLimit: { //滚轮缩放的极限控制
                min: 1,
                max: 3
              },          
              label: {
                  normal: {
                      show: false,
                      textStyle:{
                          fontSize: []
                      }
                  },
                  emphasis: {
                      show: true,
                      textStyle:{
                          fontSize:10
                      }
                  }
              },
              itemStyle: {
                  normal: {
                      borderColor: '#bc987e',
                      areaColor: '#c7fffd',
                      borderWidth: 1,
                  },//正常样式
                  emphasis: {
                      areaColor: '#c7fffd',
                      borderWidth: 1,
                      borderColor: '#bc987e',
                  }//鼠标事件区块样式
              },
              data: this.infoList
          }
      ]
  }
}

}

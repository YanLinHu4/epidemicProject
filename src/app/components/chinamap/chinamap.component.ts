import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import 'echarts/map/js/china.js';

@Component({
    selector: 'app-chinamap',
    templateUrl: './chinamap.component.html',
    styleUrls: ['./chinamap.component.scss'],
})
export class ChinamapComponent implements OnInit {

    constructor() { }

    options: any = {};

    @Input() currentConfirmedCountList;
    infoList: any = {};

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
                itemGap:0,
                textGap: 1,
                color: ['#610105', '#8e0d08', '#d12d2e', '#fd796a', '#ffad81', '#ffffff'],
                pieces: [
                    {min: 10000},
                    {min: 1000, max: 10000},
                    {min: 100, max: 999},
                    {min: 10, max: 99},
                    {min: 1, max: 9},
                    {min: 0, max: 0}
                ]
            },
            series: [
                {
                    name: '',
                    type: 'map',
                    mapType: 'china',
                    x:10,
                    y:10,
                    x2:10,
                    y2:0,
                    label: {
                        normal: {
                            show: true,
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

    ngOnInit() {
    
    }

}

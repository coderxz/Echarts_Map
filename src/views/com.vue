<!--
 * @version: 
 * @Author: LHF
 * @Date: 2021-05-18 09:25:33
 * @LastEditors: LHF
 * @LastEditTime: 2021-05-21 10:15:04
-->
<template>
  <div id="city" :class="[isshow?'demo':'demo1']"  style="width: 1000px; height: 800px;margin-left: 60px;
    position: relative;
    top: -50px;"></div>
</template>

<script>
import axios from "axios";
const china = require("@/assets/map/json/china.json");
echarts.registerMap("china", china);
//控制点的位置
var points = [
       {value: [118.8062, 31.9208],itemStyle:{color:'#4ab2e5'}}
      , {value: [127.9688, 45.368],itemStyle:{color:'#4fb6d2'}}
      , {value: [110.3467, 41.4899],itemStyle:{color:'#52b9c7'}}
      , {value: [125.8154, 44.2584],itemStyle:{color:'#5abead'}}
      , {value: [116.4551, 40.2539],itemStyle:{color:'#f34e2b'}}
      , {value: [123.1238, 42.1216],itemStyle:{color:'#f56321'}}
      , {value: [114.4995, 38.1006],itemStyle:{color:'#f56f1c'}}
      , {value: [117.4219, 39.4189],itemStyle:{color:'#f58414'}}
      , {value: [112.3352, 37.9413],itemStyle:{color:'#f58f0e'}}
      , {value: [109.1162, 34.2004],itemStyle:{color:'#f5a305'}}
      , {value: [103.5901, 36.3043],itemStyle:{color:'#e7ab0b'}}
      , {value: [106.3586, 38.1775],itemStyle:{color:'#dfae10'}}
      , {value: [101.4038, 36.8207],itemStyle:{color:'#d5b314'}}
      , {value: [103.9526, 30.7617],itemStyle:{color:'#c1bb1f'}}
      , {value: [108.384366, 30.439702],itemStyle:{color:'#b9be23'}}
      , {value: [113.0823, 28.2568],itemStyle:{color:'#a6c62c'}}
      , {value: [102.9199, 25.46639],itemStyle:{color:'#96cc34'}}
      , {value: [113.8953, 22.901],itemStyle:{color:'red'}}
      , {value:[87.610478, 43.831501],itemStyle:{color:'#17e1dd'}}
]
var pointsx = [
      {value: [118.814396, 32.070938],itemStyle:{color:'#4ab2e5'}}
      , {value: [118.814396, 32.070938],itemStyle:{color:'#4fb6d2'}}
      , {value: [102.9199, 25.4663],itemStyle:{color:'#52b9c7'}}
      // , {value: [123.448242, 41.818461],itemStyle:{color:'#5abead'}}
      , {value: [123.448242, 41.818461],itemStyle:{color:'#f34e2b'}}
      // , {value: [123.1238, 42.1216],itemStyle:{color:'#f56321'}}
      , {value: [110.190537, 20.055958],itemStyle:{color:'#f56f1c'}}
      , {value: [123.448242, 41.818461],itemStyle:{color:'#f58414'}}
      , {value: [117.115404, 36.66073],itemStyle:{color:'#f58f0e'}}
      , {value: [106.556137, 29.557686],itemStyle:{color:'#f5a305'}}
      , {value: [114.4995, 38.1006],itemStyle:{color:'#e7ab0b'}}
      // , {value: [106.3586, 38.1775],itemStyle:{color:'#dfae10'}}
      // , {value: [101.4038, 36.8207],itemStyle:{color:'#d5b314'}}
      // , {value: [103.9526, 30.7617],itemStyle:{color:'#c1bb1f'}}
      // , {value: [108.384366, 30.439702],itemStyle:{color:'#b9be23'}}
      // , {value: [113.0823, 28.2568],itemStyle:{color:'#a6c62c'}}
      // , {value: [102.9199, 25.46639],itemStyle:{color:'#96cc34'}}
      , {value: [119.5313, 29.8773]}
]
var provincesText = [
  "上海市",
  "河北省",
  "山西省",
  "内蒙古自治区",
  "辽宁省",
  "吉林省",
  "黑龙江省",
  "江苏省",
  "浙江省",
  "安徽省",
  "福建省",
  "江西省",
  "山东省",
  "河南省",
  "湖北省",
  "湖南省",
  "广东省",
  "广西省",
  "海南省",
  "四川省",
  "贵州省",
  "云南省",
  "西藏自治区",
  "陕西省",
  "甘肃省",
  "青海省",
  "宁夏省",
  "新疆维吾尔自治区",
  "北京市",
  "天津市",
  "重庆省",
  "香港特别行政区",
  "澳门别行政区",
  "台湾省",
];
var provinces = [
  "shanghai",
  "hebei",
  "shanxi",
  "neimenggu",
  "liaoning",
  "jilin",
  "heilongjiang",
  "jiangsu",
  "zhejiang",
  "anhui",
  "fujian",
  "jiangxi",
  "shandong",
  "henan",
  "hubei",
  "hunan",
  "guangdong",
  "guangxi",
  "hainan",
  "sichuan",
  "guizhou",
  "yunnan",
  "xizang",
  "shanxi1",
  "gansu",
  "qinghai",
  "ningxia",
  "xinjiang",
  "beijing",
  "tianjin",
  "chongqing",
  "xianggang",
  "aomen",
  "taiwan",
];
let geoCoordMap = {
  // 新疆: [87.610478, 43.831501],
  // 山西: [112.556728, 37.8714],
  // 上海: [121.4648, 31.2891],
  // 广东: [113.8953, 22.901],
  // 乌鲁木齐: [87.9236, 43.5883],
  // 兰州: [103.5901, 36.3043],
  // 北京: [116.4551, 40.2539],
  // 南京: [118.8062, 31.9208],
  // 南昌: [116.0046, 28.6633],
  // 厦门: [118.1689, 24.6478],
  // 合肥: [117.29, 32.0581],
  // 呼和浩特: [111.4124, 40.4901],
  // 哈尔滨: [127.9688, 45.368],
  // 天津: [117.4219, 39.4189],
  // 太原: [112.3352, 37.9413],
  // 广州: [113.5107, 23.2196],
  // 成都: [103.9526, 30.7617],
  // 拉萨: [91.1865, 30.1465],
  // 昆明: [102.9199, 25.4663],
  杭州: [119.5313, 29.8773],
  // 武汉: [114.3896, 30.6628],
  // 沈阳: [123.1238, 42.1216],
  // 济南: [117.1582, 36.8701],
  // 深圳: [114.5435, 22.5439],
  // 温州: [120.498, 27.8119],
  // 石家庄: [114.4995, 38.1006],
  // 福州: [119.4543, 25.9222],
  // 绍兴: [120.564, 29.7565],
  // 苏州: [120.6519, 31.3989],
  // 西安: [109.1162, 34.2004],
  // 郑州: [113.4668, 34.6234],
  // 重庆: [107.7539, 30.1904],
  // 长沙: [113.0823, 28.2568],
  // 青岛: [120.4651, 36.3373],
  // 宁夏: [106.183394, 38.501957],
  // 陕西: [108.7149, 34.330438],
  // 湖北: [114.3896, 30.6628],
  // 安徽: [117.233378, 31.823435],
  江苏: [118.814396, 32.070938],
  福建: [118.814396, 32.070938],
  云南: [102.9199, 25.4663],
  辽宁: [123.448242, 41.818461],
  黑龙江: [126.719099, 45.7944],
  吉林: [123.448242, 41.818461],
  海南: [110.190537, 20.055958],
  江西: [123.448242, 41.818461],
  山东: [117.115404, 36.66073],
  重庆: [106.556137, 29.557686],
  河北: [114.4995, 38.1006],
}
export default {
  data() {
    return {
      FlyingLine:{
                type: "lines",
                zlevel: 2,
                effect: {
                  show: true,
                  period: 4, //箭头指向速度，值越小速度越快
                  trailLength: 0.4, //特效尾迹长度[0,1]值越大，尾迹越长重
                  symbol: "arrow", //箭头图标
                  symbolSize: 7, //图标大小
                },
                lineStyle: {
                  normal: {
                      color: "#1DE9B6",
                      width: 1, //线条宽度
                      opacity: 0.1, //尾迹线条透明度
                      curveness: 0.3, //尾迹线条曲直度
                  },
                },
                data:[
                  {
                    coords: [
                      [113.8953, 22.901],
                      [118.8062, 31.9208],
                    ],
                    lineStyle: { color: "#4ab2e5" },
                  },
                  {
                    coords: [
                      [113.8953, 22.901],
                      [127.9688, 45.368],                     
                    ],
                    lineStyle: { color: "#4fb6d2" },
                  },
                  {
                    coords: [
                      [113.8953, 22.901],
                      [110.3467, 41.4899],
                    ],
                    lineStyle: { color: "#52b9c7" },
                  },
                  {
                    coords: [
                      [113.8953, 22.901],
                      [125.8154, 44.2584],
                    ],
                    lineStyle: { color: "#5abead" },
                  },
                  {
                    coords: [
                      [113.8953, 22.901],
                      [116.4551, 40.2539],
                    ],
                    lineStyle: { color: "#f34e2b" },
                  },
                  {
                    coords: [
                      [113.8953, 22.901],
                      [123.1238, 42.1216],
                    ],
                    lineStyle: { color: "#f56321" },
                  },
                  {
                    coords: [
                      [113.8953, 22.901],
                      [114.4995, 38.1006],
                    ],
                    lineStyle: { color: "#f56f1c" },
                  },
                  {
                    coords: [
                      [113.8953, 22.901],
                      [117.4219, 39.4189],
                    ],
                    lineStyle: { color: "#f58414" },
                  },
                  {
                    coords: [
                      [113.8953, 22.901],
                      [112.3352, 37.9413],
                    ],
                    lineStyle: { color: "#f58f0e" },
                  },
                  {
                    coords: [
                      [113.8953, 22.901],
                      [109.1162, 34.2004],
                    ],
                    lineStyle: { color: "#f5a305" },
                  },
                  {
                    coords: [
                      [113.8953, 22.901],
                      [103.5901, 36.3043],
                    ],
                    lineStyle: { color: "#e7ab0b" },
                  },
                  {
                    coords: [
                      [113.8953, 22.901],
                      [106.3586, 38.1775],
                    ],
                    lineStyle: { color: "#dfae10" },
                  },
                  {
                    coords: [
                      [113.8953, 22.901],
                      [101.4038, 36.8207],
                    ],
                    lineStyle: { color: "#d5b314" },
                  },
                  {
                    coords: [
                      [113.8953, 22.901],
                      [103.9526, 30.7617],
                    ],
                    lineStyle: { color: "#c1bb1f" },
                  },
                  {
                    coords: [
                      [113.8953, 22.901],
                      [108.384366, 30.439702],
                    ],
                    lineStyle: { color: "#b9be23" },
                  },
                  {
                    coords: [
                      [113.8953, 22.901],
                      [113.0823, 28.2568],
                    ],
                    lineStyle: { color: "#a6c62c" },
                  },
                  {
                    coords: [
                      [113.8953, 22.901],
                      [102.9199, 25.46639],
                    ],
                    lineStyle: { color: "#96cc34" },
                  },
                  //[87.610478, 43.831501]
                  {
                    coords: [
                      [113.8953, 22.901],
                      [87.610478, 43.831501],
                    ],
                    lineStyle: { color: "#17e1dd" },
                  },
                ]
              },
      pointLocation:{
                type: "effectScatter",
                coordinateSystem: "geo",
                showEffectOn: "render",
                zlevel: 1,
                rippleEffect: {
                  period: 15,
                  scale: 4,
                  brushType: "fill",
                },
                hoverAnimation: true,
                label: {
                  normal: {
                    formatter: "{b}",
                    position: "right",
                    offset: [15, 0],
                    color: "#1DE9B6",
                    show: true,
                  },
                },
                itemStyle: {
                  normal: {
                    //飞线图中心点颜色
                    color:"#1DE9B6",
                    shadowBlur: 10,
                    shadowColor: "#333",
                  },
                },
                symbolSize: 12,
                data: points,
              },
      isshow:false,
      dom: null,
      flag: false,
      city:'',
      HZData:[
        [{ name: "杭州" }, { name: "河北", value: 95, lineStyle: '#4ab2e5'}],
        [{ name: "杭州" }, { name: "重庆", value: 90,lineStyle: '#4fb6d2' }],
        [{ name: "杭州" }, { name: "山东", value: 85 ,lineStyle: '#52b9c7' }],
        [{ name: "杭州" }, { name: "江西", value: 80 ,lineStyle: '#5abead' }],
        [{ name: "杭州" }, { name: "海南", value: 75 ,lineStyle: '#f34e2b' }],
        [{ name: "杭州" }, { name: "吉林", value: 70 ,lineStyle: '#f56321' }],
        [{ name: "杭州" }, { name: "黑龙江", value: 65,lineStyle: '#f56f1c' }],
        [{ name: "杭州" }, { name: "辽宁", value: 60 ,lineStyle: '#f58414' }],
        [{ name: "杭州" }, { name: "云南", value: 55 ,lineStyle: '#f56f1c' }],
        [{ name: "杭州" }, { name: "福建", value: 50 ,lineStyle: '#f56321' }],
        [{ name: "杭州" }, { name: "江苏", value: 45 ,lineStyle: '#4ab2e5' }],
      ]
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.startIonMap();
      this.dom = document.getElementById("city");
      this.dom.addEventListener('transitionend', this.handle, false)

      this.myChart = echarts.init(this.dom);
      
        this.myChart.on("dblclick", (params) => {
          this.isshow = true
          event.stopPropagation();
          let proviceIndex = provincesText.findIndex((x) => {
            return params.name === x;
          });
          if (proviceIndex === -1) return;
          let provinceAlphabet = provinces[proviceIndex];
          this.city = provinceAlphabet
      })
      this.myChart.on("click", (params) => {
          event.stopPropagation();
          let proviceIndex = provincesText.findIndex((x) => {
            return params.name === x;
          });
          if (proviceIndex === -1) return;
          let provinceAlphabet = provinces[proviceIndex];
          this.city = provinceAlphabet
          console.log(this.city);
          if(this.city==='xinjiang'){
            this.$set(this.FlyingLine,{
                type: "lines",
                zlevel: 2,
                effect: {
                  show: true,
                  period: 4, //箭头指向速度，值越小速度越快
                  trailLength: 0.4, //特效尾迹长度[0,1]值越大，尾迹越长重
                  symbol: "arrow", //箭头图标
                  symbolSize: 7, //图标大小
                },
                lineStyle: {
                  normal: {
                      color: "#1DE9B6",
                      width: 1, //线条宽度
                      opacity: 0.1, //尾迹线条透明度
                      curveness: 0.3, //尾迹线条曲直度
                  },
                },
                data:[
                  {
                    coords: [
                      [87.610478, 43.831501],
                      [118.8062, 31.9208],
                    ],
                    lineStyle: { color: "#4ab2e5" },
                  },
                  {
                    coords: [
                      [87.610478,43.831501],
                      [127.9688, 45.368],                     
                    ],
                    lineStyle: { color: "#4fb6d2" },
                  },
                  {
                    coords: [
                      [87.610478,43.831501],
                      [110.3467, 41.4899],
                    ],
                    lineStyle: { color: "#52b9c7" },
                  },
                  {
                    coords: [
                      [87.610478,43.831501],
                      [125.8154, 44.2584],
                    ],
                    lineStyle: { color: "#5abead" },
                  },
                  {
                    coords: [
                      [87.610478,43.831501],
                      [116.4551, 40.2539],
                    ],
                    lineStyle: { color: "#f34e2b" },
                  },
                  {
                    coords: [
                      [87.610478,43.831501],
                      [123.1238, 42.1216],
                    ],
                    lineStyle: { color: "#f56321" },
                  },
                  {
                    coords: [
                      [87.610478,43.831501],
                      [114.4995, 38.1006],
                    ],
                    lineStyle: { color: "#f56f1c" },
                  },
                  {
                    coords: [
                      [87.610478,43.831501],
                      [117.4219, 39.4189],
                    ],
                    lineStyle: { color: "#f58414" },
                  },
                  {
                    coords: [
                      [87.610478,43.831501],
                      [112.3352, 37.9413],
                    ],
                    lineStyle: { color: "#f58f0e" },
                  },
                  {
                    coords: [
                      [87.610478,43.831501],
                      [109.1162, 34.2004],
                    ],
                    lineStyle: { color: "#f5a305" },
                  },
                  {
                    coords: [
                      [87.610478,43.831501],
                      [103.5901, 36.3043],
                    ],
                    lineStyle: { color: "#e7ab0b" },
                  },
                  {
                    coords: [
                      [87.610478,43.831501],
                      [106.3586, 38.1775],
                    ],
                    lineStyle: { color: "#dfae10" },
                  },
                  {
                    coords: [
                      [87.610478,43.831501],
                      [101.4038, 36.8207],
                    ],
                    lineStyle: { color: "#d5b314" },
                  },
                  {
                    coords: [
                      [87.610478,43.831501],
                      [103.9526, 30.7617],
                    ],
                    lineStyle: { color: "#c1bb1f" },
                  },
                  {
                    coords: [
                      [87.610478,43.831501],
                      [108.384366, 30.439702],
                    ],
                    lineStyle: { color: "#b9be23" },
                  },
                  {
                    coords: [
                      [87.610478,43.831501],
                      [113.0823, 28.2568],
                    ],
                    lineStyle: { color: "#a6c62c" },
                  },
                  {
                    coords: [
                      [87.610478,43.831501],
                      [102.9199, 25.46639],
                    ],
                    lineStyle: { color: "#96cc34" },
                  },
                  //[87.610478, 43.831501]
                  {
                    coords: [
                      [87.610478,43.831501],
                      [87.610478, 43.831501],
                    ],
                    lineStyle: { color: "#17e1dd" },
                  },
                ]
              })
        
              console.log(this.option1);
              this.myChart.setOption(this.option1, true);
          }
      })
    });
  },
  methods: {
    handle(){
      this.FlyingLine = [{
        type: "lines",
                zlevel: 2,
                effect: {
                  show: true,
                  period: 4, //箭头指向速度，值越小速度越快
                  trailLength: 0.4, //特效尾迹长度[0,1]值越大，尾迹越长重
                  symbol: "arrow", //箭头图标
                  symbolSize: 7, //图标大小
                },
                lineStyle: {
                  normal: {
                      color: "#1DE9B6",
                      width: 1, //线条宽度
                      opacity: 0.1, //尾迹线条透明度
                      curveness: 0.3, //尾迹线条曲直度
                  },
                },
                data:[
                  {
                    coords: [
                      [113.8953, 22.901],
                      [118.8062, 31.9208],
                    ],
                    lineStyle: { color: "#4ab2e5" },
                  },
                ]
      }]
      this.pointLocation = null
      this.myChart.setOption(this.option1, true);
      this.getProvinceMapOpt(this.city)
      this.isshow = false


    },
    startIonMap(isGO = false, shen = false, istext) {
      console.log(isGO,shen,istext);
      let loadedDataURL = `./map/china.json`;
      let cityCode = "china";
      // this.myChart.showLoading();
      // debugger
      let mapName = cityCode;
      if (shen) { // 选择了 省市两级 只展示市
        // cityCode = (cityCodeArr[1]).toString().slice(0,4) + '00'; // 市级城市json码 4位 后面+00
        // loadedDataURL = `./province/${provinceAlphabet}.json`;
        loadedDataURL = ''
      }else if (false) {// 只选择省
        // cityCode = (cityCodeArr[0]).toString().slice(0,2); // 省json只有前两位数字
        // loadedDataURL = `./map/geometryProvince/${cityCode}.json`;
      }else {
        loadedDataURL = `./map/china.json`;
        // cityCode = 'china';
      }
      if(shen){
        // 进入省
        console.log(this.FlyingLine);
        console.log('进入省了');
           this.option2 = {
            backgroundColor: "#000",
            geo: {
              map: shen ? istext :"china",
              aspectScale: 0.75, //长宽比
              zoom: 1.1,
              roam: false,
              itemStyle: {
                normal: {
                  borderColor: "#8fd1d3",//省线的颜色
                  borderWidth: 1,
                  // shadowColor: "rgb(160 223 230)",
                  shadowColor: "rgb(142 249 253)",
                  //省地图颜色
                  areaColor:'#051931',
                },
                emphasis: {
                  //高亮地图颜色
                  areaColor: "#79b0e6",
                  // 边界宽
                  borderWidth: 1,
                  // 高亮文字颜色
                  color: "#b7b90e",
                  label: {
                    show: false,
                  },
                },
              },
            },
          };
          this.myChart.setOption(this.option2, true);       
      }else{
        $.getJSON(loadedDataURL, (geoJson) => {
          echarts.registerMap("china", geoJson);
          // this.myChart.hideLoading();
          this.mapTick=[];
          if(isGO){
            this.mapTick =  this.SwitchingSites()
          }else{
            this.mapTick = [{
                type: "map",
                roam: false,
                label: {
                  normal: {
                    show: true,
                    textStyle: {
                      //地图字体颜色
                      color: "#1DE9B6",
                    },
                    formatter: (p) => {
                    switch (p.name) {
                      case "内蒙古自治区":
                        p.name = "内蒙古";
                        break;
                      case "西藏自治区":
                        p.name = "西藏";
                        break;
                      case "新疆维吾尔自治区":
                        p.name = "新疆";
                        break;
                      case "宁夏回族自治区":
                        p.name = "宁夏";
                        break;
                      case "广西壮族自治区":
                        p.name = "广西";
                        break;
                      case "香港特别行政区":
                        p.name = "香港";
                        break;
                      case "澳门特别行政区":
                        p.name = "澳门";
                        break;
                      default:
                        break;
                    }
                    return p.name;
                  },
                  },
                  emphasis: {
                    //地图高亮时字体颜色
                    areaColor:'#051931',
                    shadowColor:'rgb(12,25,50)',
                    textStyle: {
                      color: "rgb(183,185,14)",
                    },
                  },
                },
                //地图区域的多边形 图形样式。
                itemStyle: {
                  normal: {
                    borderColor: "rgb(171 247 245)", //线的颜色
                      // areaStyle:{color:'green'},
                    borderWidth: 1,
                    //地图颜色
                    areaColor: '#051931',
                  },
                  emphasis: {
                    //高亮下省的颜色
                    areaColor: "#79b0e6",
                      shadowColor: 'rgb(12,25,50)',
                    borderWidth: 1.4,
                  },
                },
                zoom: 1.1,
                //     roam: false,
                map: "china", //使用
              },

              //排位点设置
              this.pointLocation
              , 
              //地图线的动画效果
              this.FlyingLine
            ]
          }
          // debugger
          this.option1 = {
          //   backgroundColor: "rgb(46 59 63 / 65%)",
            geo: {
              map: "china",
              aspectScale: 0.75, //长宽比
              zoom: 1.1,
              roam: false,
              itemStyle: {
                normal: {
                  // areaColor: {
                  //   type: "radial",
                  //   x: 0.5,
                  //   y: 0.5,
                  //   r: 0.8,
                  //   colorStops: [
                  //     {
                  //       offset: 0,
                  //       color: "#09132c", // 0% 处的颜色
                  //     },
                  //     {
                  //       offset: 1,
                  //       color: "#274d68", // 100% 处的颜色
                  //     },
                  //   ],
                  //   globalCoord: false, // 缺省为 false
                  // },
                  // areaColor: "red",
                  opacity: '0.3',
                  borderColor: "rgb(171 247 245)",
                  borderWidth: 3,
                  // shadowColor: "rgb(160 223 230)",
                  shadowColor: "rgb(142 249 253)",
                  // areaColor: 'rgb(127 176 186)',
                  // shadowOffsetX: 2,
                  // shadowOffsetY: 7,
                  shadowOffsetX: 4,
                  shadowOffsetY: 8
                },
                emphasis: {
                  areaColor: "#000",
                  borderWidth: 1,
                  color: "green",
                  label: {
                    show: false,
                  },
                },
              },
              regions: [
                {
                  name: "南海诸岛",
                  itemStyle: {
                    areaColor: "#051931",
  
                    borderColor: "rgba(0, 10, 52, 1)",
                    normal: {
                      opacity: 0,
                      label: {
                        show: false,
                        color: "#009cc9",
                      },
                    },
                  },
                },
              ],
            },
  
            series: this.mapTick,
          };
          this.myChart.setOption(this.option1, true);
        });
      }

    },

    // SwitchingSites(){
    //   let series = [];
    //   // var color = ["red", "#a6c84c", "#ffa022"];
    //   // var planePath ="path://M.6,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705";
    //   [["杭州", this.HZData]].forEach((item, i)=> {
    //     series.push(
    //       {
    //         type: "map",
    //         roam: false,
    //         label: {
    //           normal: {
    //             show: true,
    //             textStyle: {
    //               color: "#1DE9B6",
    //             },
    //           },
    //           emphasis: {
    //             textStyle: {
    //               color: "rgb(183,185,14)",
    //             },
    //           },
    //         },

    //         itemStyle: {
    //           normal: {
    //             borderColor: "rgb(171 247 245)", //线的颜色
    //               // areaStyle:{color:'green'},
    //             borderWidth: 2,
    //             areaColor: '#051931',
    //           //   opacity: '0.5'
    //           //   areaColor: {
    //           //     type: "radial",
    //           //     x: 0.5,
    //           //     y: 0.5,
    //           //     r: 0.8,
    //           //     colorStops: [
    //           //       {
    //           //         offset: 0,
    //           //         color: "#09132c", // 0% 处的颜色
    //           //       },
    //           //       {
    //           //         offset: 1,
    //           //         color: "#274d68", // 100% 处的颜色
    //           //       },
    //           //     ],
    //           //     globalCoord: true, // 缺省为 false
    //           //   },
    //           },
    //           emphasis: {
    //             areaColor: "#051931",
    //               shadowColor: 'rgb(12,25,50)',
    //             borderWidth: 1.4,
    //           },
    //         },
    //         zoom: 1.1,
    //         //     roam: false,
    //         map: "china", //使用
    //         // data: this.difficultData //热力图数据   不同区域 不同的底色
    //       },
    //       {
    //         type: "lines",
    //         zlevel: 2,
    //         effect: {
    //           show: true,
    //           period: 4, //箭头指向速度，值越小速度越快
    //           trailLength: 0.4, //特效尾迹长度[0,1]值越大，尾迹越长重
    //           symbol: "arrow", //箭头图标
    //           symbolSize: 7, //图标大小
    //         },
    //         lineStyle: {
    //           normal: {
    //               color: "#1DE9B6",
    //               width: 1, //线条宽度
    //               opacity: 0.1, //尾迹线条透明度
    //               curveness: 0.3, //尾迹线条曲直度
    //           },
    //         },
    //         data: this.convertData(item[1]),
    //       },
    //       {
    //         type: "lines",
    //         zlevel: 2,
    //         effect: {
    //           show: true,
    //           period: 4, //箭头指向速度，值越小速度越快
    //           trailLength: 0.4, //特效尾迹长度[0,1]值越大，尾迹越长重
    //           symbol: "arrow", //箭头图标
    //           symbolSize: 7, //图标大小
    //         },
    //         lineStyle: {
    //           normal: {
    //               color: "#1DE9B6",
    //               width: 1, //线条宽度
    //               opacity: 0.1, //尾迹线条透明度
    //               curveness: 0.3, //尾迹线条曲直度
    //           },
    //         },
    //         data: this.convertData(item[1]),
    //       },
    //       {
    //         type: "effectScatter",
    //         coordinateSystem: "geo",
    //         showEffectOn: "render",
    //         zlevel: 1,
    //         rippleEffect: {
    //           period: 15,
    //           scale: 4,
    //           brushType: "fill",
    //         },
    //         hoverAnimation: true,
    //         label: {
    //           normal: {
    //             formatter: "{b}",
    //             position: "right",
    //             offset: [15, 0],
    //             color: "#1DE9B6",
    //             show: true,
    //           },
    //         },
    //         itemStyle: {
    //           normal: {
    //             color:"#1DE9B6",
    //             shadowBlur: 10,
    //             shadowColor: "#333",
    //           },
    //         },
    //         symbolSize: 12,
    //         data: pointsx
    //       }, //地图线的动画效果
    //     );
    //   });
    //   // debugger
    //   return series
    // },

    // convertData(data) {
    //   var res = [];
    //   for (var i = 0; i < data.length; i++) {
    //     var dataItem = data[i];
    //     var fromCoord = geoCoordMap[dataItem[0].name];
    //     var toCoord = geoCoordMap[dataItem[1].name];
    //     var lineStyle = dataItem[1].lineStyle;
    //     if (fromCoord && toCoord) {
    //       res.push([{ coord: fromCoord, lineStyle:{ color:lineStyle }}, { coord: toCoord , lineStyle:{ color:lineStyle }}]);
    //     }
    //   }
    //   return res;
    // },


    getProvinceMapOpt(provinceAlphabet) {
      // ret
      axios.get("/province/" + provinceAlphabet + ".json").then((res) => {
        // console.log("res==>",res);
        // debugger
        echarts.registerMap(provinceAlphabet, res.data);
        this.startIonMap(provinceAlphabet, true, provinceAlphabet);
      });
    },
  },
};
</script>

<style>
.demo{
  transition: 1s;
  transform: scale(0);
}
.demo1 {
  transition: 1s;
  transform: scale(1);
}
</style>
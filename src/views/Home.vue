<template>
  <div
    class="content row-flex-start"
    style="min-width: 1500px; ovorflow-x: auto"
  >
    <div class="left_map" id="left_map" @click="showChinaMap"></div>
    <div class="right_opetate row-center" id="right_opetate"></div>
  </div>
</template>

<script>
// import echarts from "echarts";
import axios from "axios";
// 注册中国地图
const china = require("@/assets/map/json/china.json");
//debugger
echarts.registerMap("china", china);
console.log(china)
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
var provincesText = [
  "上海",
  "河北",
  "山西",
  "内蒙古",
  "辽宁",
  "吉林",
  "黑龙江",
  "江苏",
  "浙江",
  "安徽",
  "福建",
  "江西",
  "山东",
  "河南",
  "湖北",
  "湖南",
  "广东",
  "广西",
  "海南",
  "四川",
  "贵州",
  "云南",
  "西藏",
  "陕西",
  "甘肃",
  "青海",
  "宁夏",
  "新疆",
  "北京",
  "天津",
  "重庆",
  "香港",
  "澳门",
  "台湾",
];
export default {
  name: "Home",
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.initMap();
    });
  },
  data() {
    return {
      map: {},
      cityOpt: [],
      mapForm: {},
      mapData: [{ name: "海门", value: 100 }],
      mapOpt: [],
    };
  },
  methods: {
    getMapOpt(place) {
      let geoCoordMap = {
        新疆: [87.610478, 43.831501],
        山西: [112.556728, 37.8714],
        上海: [121.4648, 31.2891],
        广东: [113.8953, 22.901],
        乌鲁木齐: [87.9236, 43.5883],
        兰州: [103.5901, 36.3043],
        北京: [116.4551, 40.2539],
        南京: [118.8062, 31.9208],
        南昌: [116.0046, 28.6633],
        厦门: [118.1689, 24.6478],
        合肥: [117.29, 32.0581],
        呼和浩特: [111.4124, 40.4901],
        哈尔滨: [127.9688, 45.368],
        天津: [117.4219, 39.4189],
        太原: [112.3352, 37.9413],
        广州: [113.5107, 23.2196],
        成都: [103.9526, 30.7617],
        拉萨: [91.1865, 30.1465],
        昆明: [102.9199, 25.4663],
        杭州: [119.5313, 29.8773],
        武汉: [114.3896, 30.6628],
        沈阳: [123.1238, 42.1216],
        济南: [117.1582, 36.8701],
        深圳: [114.5435, 22.5439],
        温州: [120.498, 27.8119],
        石家庄: [114.4995, 38.1006],
        福州: [119.4543, 25.9222],
        绍兴: [120.564, 29.7565],
        苏州: [120.6519, 31.3989],
        西安: [109.1162, 34.2004],
        郑州: [113.4668, 34.6234],
        重庆: [107.7539, 30.1904],
        长沙: [113.0823, 28.2568],
        青岛: [120.4651, 36.3373],
        宁夏: [106.183394, 38.501957],
        陕西: [108.7149, 34.330438],
        湖北: [114.3896, 30.6628],
        安徽: [117.233378, 31.823435],
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
      };
      var HZData = [
        [{ name: "杭州" }, { name: "湖北", value: 95 }],
        [{ name: "杭州" }, { name: "山西", value: 90 }],
        [{ name: "杭州" }, { name: "辽宁", value: 85 }],
        [{ name: "杭州" }, { name: "黑龙江", value: 80 }],
        [{ name: "杭州" }, { name: "广东", value: 75 }],
        [{ name: "杭州" }, { name: "河北", value: 70 }],
        [{ name: "杭州" }, { name: "上海", value: 65 }],
        [{ name: "杭州" }, { name: "江苏", value: 60 }],
        [{ name: "杭州" }, { name: "福建", value: 55 }],
        [{ name: "杭州" }, { name: "宁夏", value: 50 }],
        [{ name: "杭州" }, { name: "北京", value: 45 }],
        [{ name: "杭州" }, { name: "陕西", value: 40 }],
        [{ name: "杭州" }, { name: "海南", value: 35 }],
        [{ name: "杭州" }, { name: "新疆", value: 30 }],
        [{ name: "杭州" }, { name: "云南", value: 25 }],
        [{ name: "杭州" }, { name: "重庆", value: 20 }],
        [{ name: "杭州" }, { name: "吉林", value: 15 }],
        [{ name: "杭州" }, { name: "安徽", value: 5 }],
      ];
      var planePath =
        "path://M.6,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705";
      console.log(geoCoordMap);
      var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i];
          var fromCoord = geoCoordMap[dataItem[0].name];
          var toCoord = geoCoordMap[dataItem[1].name];
          if (fromCoord && toCoord) {
            res.push([{ coord: fromCoord }, { coord: toCoord }]);
          }
        }
        return res;
      };
      //飞线颜色，可写一种或多种，下方的颜色选择在这些中选一种
      var color = ["#000", "#a6c84c", "#ffa022"];
      var series = [];
      // 遍历所有路线
      debugger
      [["杭州", HZData]].forEach(function (item, i) {
        series.push(
          {
            type: "lines",
            zlevel: 1,
            // 线特效配置
            effect: {
              show: true,
              // 特效动画的时间，单位为 s
              period: 6,
              // 特效尾迹的长度。取从 0 到 1 的值，数值越大尾迹越长
              trailLength: 0.7,
              color: "#ccc",
              // 特效标记的大小
              symbolSize: 3,
            },
            lineStyle: {
              normal: {
                color: color[i],
                width: 0,
                curveness: 0.2,
              },
            },
            data: convertData(item[1]),
          },
          {
            type: "lines",
            zlevel: 2,
            effect: {
              show: true,
              period: 6,
              trailLength: 0,
              symbol: planePath,
              symbolSize: 15,
            },
            lineStyle: {
              normal: {
                color: color[i],
                width: 1,
                opacity: 0.4,
                curveness: 0.2,
              },
            },
            data: convertData(item[1]),
          },
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 2,
            rippleEffect: {
              brushType: "stroke",
            },
            label: {
              normal: {
                show: true,
                position: "right",
                formatter: "{b}",
              },
            },
            symbolSize: function (val) {
              return val[2] / 8;
            },
            itemStyle: {
              normal: {
                color: color[i],
              },
            },
            data: item[1].map(function (dataItem) {
              return {
                name: dataItem[1].name,
                value: geoCoordMap[dataItem[1].name].concat([
                  dataItem[1].value,
                ]),
              };
            }),
          }
        );
      });
      let option = {
        backgroundColor: "white",
        tooltip: {
          trigger: "item",
        },
        geo: {
          map: "china",
          //鼠标移入是否显示省份
          label: {
            emphasis: {
              show: true,
            },
          },
          roam: true,
          regions: [
            // 省份颜色与界线颜色的修改
            {
              name: "新疆", //此处的名称在geoCoordMap中也必须有
              itemStyle: {
                normal: {
                  opacity: 1, // 透明度
                  borderColor: "#fff", // 省份界线颜色
                  borderWidth: 2, // 省份界线的宽度
                  areaColor: "#2660ff", // 整个省份的颜色
                },
              },
            },
            {
              name: "湖北",
              itemStyle: {
                normal: {
                  opacity: 1,
                  borderColor: "#fff",
                  borderWidth: 2,
                  areaColor: "#2660ff",
                },
              },
            },
            {
              name: "宁夏",
              itemStyle: {
                normal: {
                  opacity: 1,
                  borderColor: "#fff",
                  borderWidth: 2,
                  areaColor: "#2660ff",
                },
              },
            },
            {
              name: "陕西",
              itemStyle: {
                normal: {
                  opacity: 1,
                  borderColor: "#fff",
                  borderWidth: 2,
                  areaColor: "#2660ff",
                },
              },
            },
            {
              name: "湖北",
              itemStyle: {
                normal: {
                  opacity: 1,
                  borderColor: "#fff",
                  borderWidth: 2,
                  areaColor: "#2660ff",
                },
              },
            },
            {
              name: "广东",
              itemStyle: {
                normal: {
                  opacity: 1,
                  borderColor: "#fff",
                  borderWidth: 2,
                  areaColor: "#2660ff",
                },
              },
            },
            {
              name: "黑龙江",
              itemStyle: {
                normal: {
                  opacity: 1,
                  borderColor: "#fff",
                  borderWidth: 2,
                  areaColor: "#2660ff",
                },
              },
            },
            {
              name: "山西",
              itemStyle: {
                normal: {
                  opacity: 1,
                  borderColor: "#fff",
                  borderWidth: 2,
                  areaColor: "#2660ff",
                },
              },
            },
            {
              name: "安徽",
              itemStyle: {
                normal: {
                  opacity: 1,
                  borderColor: "#fff",
                  borderWidth: 2,
                  areaColor: "#2660ff",
                },
              },
            },
            {
              name: "福建",
              itemStyle: {
                normal: {
                  opacity: 1,
                  borderColor: "#fff",
                  borderWidth: 2,
                  areaColor: "#2660ff",
                },
              },
            },
            {
              name: "吉林",
              itemStyle: {
                normal: {
                  opacity: 1,
                  borderColor: "#fff",
                  borderWidth: 2,
                  areaColor: "#2660ff",
                },
              },
            },
            {
              name: "云南",
              itemStyle: {
                normal: {
                  opacity: 1,
                  borderColor: "#fff",
                  borderWidth: 2,
                  areaColor: "#2660ff",
                },
              },
            },
            {
              name: "河北",
              itemStyle: {
                normal: {
                  opacity: 1,
                  borderColor: "#fff",
                  borderWidth: 2,
                  areaColor: "#2660ff",
                },
              },
            },
            {
              name: "北京",
              itemStyle: {
                normal: {
                  opacity: 1,
                  borderColor: "#fff",
                  borderWidth: 2,
                  areaColor: "#2660ff",
                },
              },
            },
            {
              name: "上海",
              itemStyle: {
                normal: {
                  opacity: 1,
                  borderColor: "#fff",
                  borderWidth: 2,
                  areaColor: "#2660ff",
                },
              },
            },
            {
              name: "海南",
              itemStyle: {
                normal: {
                  opacity: 1,
                  borderColor: "#fff",
                  borderWidth: 2,
                  areaColor: "#2660ff",
                },
              },
            },
            {
              name: "江西",
              itemStyle: {
                normal: {
                  opacity: 1,
                  borderColor: "#fff",
                  borderWidth: 2,
                  areaColor: "#2660ff",
                },
              },
            },
            {
              name: "重庆",
              itemStyle: {
                normal: {
                  opacity: 1,
                  borderColor: "#fff",
                  borderWidth: 2,
                  areaColor: "#2660ff",
                },
              },
            },
            {
              name: "山东",
              itemStyle: {
                normal: {
                  opacity: 1,
                  borderColor: "#fff",
                  borderWidth: 2,
                  areaColor: "#2660ff",
                },
              },
            },
            {
              name: "浙江",
              itemStyle: {
                normal: {
                  opacity: 1,
                  borderColor: "#fff",
                  borderWidth: 2,
                  areaColor: "#2660ff",
                },
              },
            },
            {
              name: "辽宁",
              itemStyle: {
                normal: {
                  opacity: 1,
                  borderColor: "#fff",
                  borderWidth: 2,
                  areaColor: "#2660ff",
                },
              },
            },
          ],
          itemStyle: {
            normal: {
              //设置地图背景色
              areaColor: "#c6c6c6",
              borderColor: "#ffffff",
            },
            //鼠标移入当前省份背景颜色变蓝
            emphasis: {
              areaColor: "#1761d8",
            },
          },
        },
        series: series
      };
      return option;
    },
    // 显示中国地图
    showChinaMap() {
      let option = this.getMapOpt();
      debugger
      this.map.setOption(option, true);
    },
    // 显示省份地图
    getProvinceMapOpt(provinceAlphabet) {
      axios.get("/province/" + provinceAlphabet + ".json").then((res) => {
        // console.log("res==>",res);
        
        echarts.registerMap(provinceAlphabet, res.data);
        let option = this.getMapOpt(provinceAlphabet);
        this.map.setOption(option, true);
      });
    },
    // 初始化地图数据
    initMap() {
      var dom = document.getElementById("left_map");
      this.map = echarts.init(dom);
      //debugger
      let option = this.getMapOpt();
      debugger
      if (option && typeof option === "object") {

        this.map.setOption(option, true);
      }
      this.map.on("click", (params) => {
        //debugger;
        // console.log(111);
        event.stopPropagation();
        let proviceIndex = provincesText.findIndex((x) => {
          return params.name === x;
        });
        if (proviceIndex === -1) return;
        let provinceAlphabet = provinces[proviceIndex];
        console.log(provinceAlphabet);

        // 重新渲染各省份地图
        this.getProvinceMapOpt(provinceAlphabet)
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.left_map {
  width: 1200px;
  height: 600px;
}
.right_opetate {
  flex: 1;
  height: 100%;
  background: #404a59;
}
.map_form {
}
</style>

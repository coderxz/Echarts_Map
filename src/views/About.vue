<template>
  <div>
    <div class="chart-wrapper" id="city" style="width: 1000px;height:900px;"></div>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      myChart: null,
      cityCodeArr: [],
      allAreaData:[],
      dom: null
    };
  },
  created() {

  },
  mounted() {
    // this.$nextTick(()=>{
      this.dom = document.getElementById("city");
      // debugger
      // var geoCoordMap = {//市区坐标
      //     '黑龙江': [127.9688, 45.368],
      //     '内蒙古': [110.3467, 41.4899],
      //     "吉林": [125.8154, 44.2584],
      //     '北京市': [116.4551, 40.2539],
      //     "辽宁": [123.1238, 42.1216],
      //     "河北": [114.4995, 38.1006],
      //     "天津": [117.4219, 39.4189],
      //     "山西": [112.3352, 37.9413],
      //     "陕西": [109.1162, 34.2004],
      //     "甘肃": [103.5901, 36.3043],
      //     "宁夏": [106.3586, 38.1775],
      //     "青海": [101.4038, 36.8207],
      //     "新疆": [87.9236, 43.5883],
      //     "西藏": [91.11, 29.97],
      //     "四川": [103.9526, 30.7617],
      //     "重庆": [108.384366, 30.439702],
      //     "山东": [117.1582, 36.8701],
      //     "河南": [113.4668, 34.6234],
      //     "江苏": [118.8062, 31.9208],
      //     "安徽": [117.29, 32.0581],
      //     "湖北": [114.3896, 30.6628],
      //     "浙江": [119.5313, 29.8773],
      //     "福建": [119.4543, 25.9222],
      //     "江西": [116.0046, 28.6633],
      //     "湖南": [113.0823, 28.2568],
      //     "贵州": [106.6992, 26.7682],
      //     "云南": [102.9199, 25.4663],
      //     "广东": [113.12244, 23.009505],
      //     "广西": [108.479, 23.1152],
      //     "海南": [110.3893, 19.8516],
      //     '上海': [121.4648, 31.2891]

      // };
      // var chinaDatas = [//柱子数据
      //     [{
      //         name: '黑龙江',
      //         value: 100
      //     }],
      //     [{
      //         name: '内蒙古',
      //         value: 300
      //     }],
      //     [{
      //         name: '吉林',
      //         value: 300
      //     }],
      //     [{
      //         name: '辽宁',
      //         value: 300
      //     }],
      //     [{
      //         name: '河北',
      //         value: 300
      //     }],
      //     [{
      //         name: '天津',
      //         value: 300
      //     }],
      //     [{
      //         name: '山西',
      //         value: 300
      //     }],
      //     [{
      //         name: '陕西',
      //         value: 300
      //     }],
      //     [{
      //         name: '甘肃',
      //         value: 300
      //     }],
      //     [{
      //         name: '宁夏',
      //         value: 300
      //     }],
      //     [{
      //         name: '青海',
      //         value: 300
      //     }],
      //     [{
      //         name: '新疆',
      //         value: 300
      //     }],
      //     [{
      //         name: '西藏',
      //         value: 300
      //     }],
      //     [{
      //         name: '四川',
      //         value: 300
      //     }],
      //     [{
      //         name: '重庆',
      //         value: 300
      //     }],
      //     [{
      //         name: '山东',
      //         value: 300
      //     }],
      //     [{
      //         name: '河南',
      //         value: 300
      //     }],
      //     [{
      //         name: '江苏',
      //         value: 300
      //     }],
      //     [{
      //         name: '安徽',
      //         value: 300
      //     }],
      //     [{
      //         name: '湖北',
      //         value: 300
      //     }],
      //     [{
      //         name: '浙江',
      //         value: 300
      //     }],
      //     [{
      //         name: '福建',
      //         value: 300
      //     }],
      //     [{
      //         name: '江西',
      //         value: 300
      //     }],
      //     [{
      //         name: '湖南',
      //         value: 300
      //     }],
      //     [{
      //         name: '贵州',
      //         value: 300
      //     }],
      //     [{
      //         name: '广西',
      //         value: 300
      //     }],
      //     [{
      //         name: '海南',
      //         value: 300
      //     }],
      //     [{
      //         name: '上海',
      //         value: 1300
      //     }]
      // ];
      // var convertData = function (data) {
      //     var res = [];
      //     for (var i = 0; i < data.length; i++) {
      //         var geoCoord = geoCoordMap[data[i][0].name];
      //         if (geoCoord) {
      //             res.push({
      //                 name: data[i][0].name,
      //                 value: geoCoord.concat(data[i][0].value)
      //             });
      //         }
      //     }
      //     return res;
      // };
      this.setCityChart()
    // })
  },
  methods: {
    setCityChart() {
      let that = this;
      debugger
      let geoCoordMaps = {
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
      console.log(geoCoordMaps);
      var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i];
          var fromCoord = geoCoordMaps[dataItem[0].name];
          var toCoord = geoCoordMaps[dataItem[1].name];
          if (fromCoord && toCoord) {
            res.push([{ coord: fromCoord }, { coord: toCoord }]);
          }
        }
        return res;
      };
      debugger
      var color = ["red", "#a6c84c", "#ffa022"];
      var series = [];
      [["杭州", HZData]].forEach(function (item, i) {
        series.push(
          {
            type: "lines3D",
            coordinateSystem: 'globe',
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
            type: "lines3D",
            coordinateSystem: 'globe',
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
          // {
          //   type: "effectScatter",
          //   coordinateSystem: "geo",
          //   zlevel: 2,
          //   rippleEffect: {
          //     brushType: "stroke",
          //   },
          //   label: {
          //     normal: {
          //       show: true,
          //       position: "right",
          //       formatter: "{b}",
          //     },
          //   },
          //   symbolSize: function (val) {
          //     return val[2] / 8;
          //   },
          //   itemStyle: {
          //     normal: {
          //       color: color[i],
          //     },
          //   },
          //   data: item[1].map(function (dataItem) {
          //     return {
          //       name: dataItem[1].name,
          //       value: geoCoordMaps[dataItem[1].name].concat([
          //         dataItem[1].value,
          //       ]),
          //     };
          //   }),
          // }
        );
      });
      var option = {
          backgroundColor: '#ddd',
          visualMap: [{
              type: 'continuous',
              show: false,
              seriesIndex: 0,
              text: ['bar3D'],
              calculable: true,
              max: 300,
              inRange: {
                  color: ["#105389", "#3a8abc", "#0D96F1"]
              },
              
          }],
          geo3D: {
              map: 'china',
              roam: false,
              boxDepth: 70,
              shading: 'realistic',
              regionHeight: 1.5,
              realisticMaterial: {
                detailTexture: '#fff', // 纹理贴图
                textureTiling: 1, // 纹理平铺，1是拉伸，数字表示纹理平铺次数
                roughness: 0, // 材质粗糙度，0完全光滑，1完全粗糙
                metalness: 0, // 0材质是非金属 ，1金属
                roughnessAdjust: 0
              },
              // 环境贴图，支持純颜色值，渐变色，全景贴图的 url。默认为 'auto'，在配置有 light.ambientCubemap.texture 的时候会使用该纹理作为环境贴图。否则则不显示环境贴图。
              // environment: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{      // 配置为垂直渐变的背景
              //   offset: 0, color: '#00aaff' // 天空颜色           
              // }, {
              //   offset: 0.7, color: '#998866' // 地面颜色
              // }, {
              //   offset: 1, color: '#998866' // 地面颜色
              // }], false),
              itemStyle: {
                  areaColor: 'rgba(65,142,156,0.7)',
                  opacity: 0.5,
                  borderWidth: 1.2,
                  borderColor: '#fff',
              },
              label: {
                  show: false,
              },
              // postEffect: {
              //   enable: true,
              //   bloom: {
              //     enable: true
              //   },
              // },
              // temporalSuperSampling:{
              //   enable: 'auto'
              // },
              emphasis: { //当鼠标放上去  地区区域是否显示名称
                  label: {
                      show: true,
                      textStyle: {
                          color: '#fff',
                          fontSize: 3,
                          backgroundColor: 'rgba(0,23,11,0)'
                      }
                  }
              },
              groundPlane: {			// 地面可以让整个组件有个“摆放”的地方，从而使整个场景看起来更真实，更有模型感。
                show: false,				// 是否显示地面。[ default: false ]
                color: '#aaa'			// 地面颜色。[ default: '#aaa' ]
              },
              light: {
                  main: {
                      color: '#fff', //光照颜色
                      intensity: 1.2, //光照强度
                      shadowQuality: 'high', //阴影亮度
                      shadow: false, //是否显示阴影
                      //                        alpha: 55,
                      intensity: 1,

                  },
                  ambient: {
                      intensity: 0.3
                  }
              }
          },
          series: series
          //     name: 'bar3D',
          // series: [{
          //     name: 'lines3D',
          //     type: "lines3D",
          //     coordinateSystem: 'geo3D',
          //     barSize: 1, //柱子粗细
          //     shading: 'lambert',
          //     opacity: 0.1,
          //     //                bevelSize: 0.3,
          //     label: {
          //           show: false,
          //         formatter: function (data) {
          //               //                        console.log(data)
          //             var res = data.name + " " + data.value[2]
          //             return res
          //         }
          //     },
          //     data: convertData(chinaDatas),
          // }]
      }
      debugger
      // echarts.registerMap('tongren', chinaDatas);
      that.myChart = echarts.init(that.dom);
      that.myChart.setOption(option, true);
    }
  }
};
</script>

<style lang="scss">
// .o-echarts {
//   min-width: 30px;
//   min-height: 30px;
//   width: 100%;
//   height: 900px;
// }
</style>

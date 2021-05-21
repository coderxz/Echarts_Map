<template>
  <div>
    <div class="chart-wrapper" id="chart-city"></div>
  </div>
</template>

<script>
// import echarts from "echarts";
// import JSON from "../assets/map/chongqing.json";
// import echarts from "echarts";
// 注册中国地图
const china = require("@/assets/map/json/china.json");
// echarts.registerMap("china", china);
console.log(china)
export default {
  name: "About",
  data() {
    return {
      myChart: null,
      cityCodeArr: [],
      allAreaData:[]
    };
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.setCityChart();
    });
  },
  methods: {
    setCityChart() {
      let { cityCodeArr } = this;
      let that = this;
      // this.myChart = echarts.init(document.getElementById("chart-city"));
      var dom = document.getElementById("chart-city");
      this.myChart = echarts.init(dom);
      var loadedDataURL = "";
      let cityCode = "";

      if (cityCodeArr.length == 2) {
        // 选择了 省市两级 只展示市
        cityCode = cityCodeArr[1].toString().slice(0, 4) + "00"; // 市级城市json码 4位 后面+00
        loadedDataURL = `./map/geometryCouties/${cityCode}.json`;
      } else if (cityCodeArr.length == 1) {
        // 只选择省
        cityCode = cityCodeArr[0].toString().slice(0, 2); // 省json只有前两位数字
        loadedDataURL = `./map/geometryProvince/${cityCode}.json`;
      } else {
        loadedDataURL = `./map/china.json`;
        cityCode = "china";
      }

      this.myChart.showLoading();
      let mapName = cityCode;
      $.getJSON(loadedDataURL, function (geoJson) {
        const data = geoJson.features.map((item, index) => {
          const geoAreaName = item.properties.name; // geo文件中的地理名称
          const currentArea = that.allAreaData.find((item) => {
            return item.name == geoAreaName;
          });
          let taskNumber = index,
            volunteerNumber = index;
          if (currentArea) {
            taskNumber = currentArea.taskNumber;
            volunteerNumber = currentArea.volunteerNumber;
          }
          return {
            name: geoAreaName,
            value: volunteerNumber,
            taskNumber: taskNumber, // 活动总数
            volunteerNumber: volunteerNumber * 10, // 志愿者总数
            // coord: item.properties.center,
            coord: item.properties.centroid,
            selected: true,
            // x: 150,
            // y: 150
          };
        });
        console.log("geoJson:", geoJson);
        // 注册地图名字(tongren)和数据(geoJson)
        debugger
        // echarts.registerMap(mapName, geoJson);
        // echarts.registerMap("china", china);
        // 隐藏动画加载效果。
        // that.myChart.hideLoading();
        // 图表配置项
        var option = {
          // title: { // 标题
          //   top: '2%',
          //   text: '3D地图',
          //   subtext: '',
          //   x: 'center',
          //   textStyle: {
          //     color: '#ccc'
          //   }
          // },
          selectedMode: "multiple", // 选中效果固话
          tooltip: {
            // 提示框
            show: true,
            trigger: "item",
            formatter: function (params) {
              return params.name;
            },
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
          series: [
            {
              name: "map3D",
              type: "map3D", // map3D / map
              map: mapName,
              label: {
                // 标签的相关设置
                show: true, // (地图上的城市名称)是否显示标签 [ default: false ]
                // distance: 5, // 标签距离图形的距离，在三维的散点图中这个距离是屏幕空间的像素值，其它图中这个距离是相对的三维距离
                //formatter:, // 标签内容格式器
                textStyle: {
                  // 标签的字体样式
                  color: "#ffffff", // 地图初始化区域字体颜色
                  fontSize: 14, // 字体大小
                  opacity: 1, // 字体透明度
                  backgroundColor: "rgba(0,23,11,0.5)", // 字体背景色
                },
                // normal:{
                //   show:true,
                //   formatter:function(params){ //标签内容
                //     // console.log(params)
                //     return  params.name;
                //   },
                //   // lineHeight: 20,
                //   backgroundColor:'rgba(255,255,255,.9)',
                //   borderColor:'#80cffd',
                //   borderWidth:'1',
                //   padding:[5,15,4],
                //   color:'#000000',
                //   fontSize: 12,
                //   fontWeight:'normal',
                // },
                emphasis: {
                  show: true,
                },
              },
              tooltip: {
                //提示框组件。
                alwaysShowContent: true,
                hoverAnimation: true,
                trigger: "item", //触发类型 散点图
                enterable: true, //鼠标是否可进入提示框
                transitionDuration: 1, //提示框移动动画过渡时间
                triggerOn: "click",
                formatter: function (params) {
                  // console.log(params.name, 'params.name')
                  if (params.name) {
                    var str = `
                  <div class="map-tooltip">
                    <div class="city-name">${params.name}</div>
                    <div class="city-info">志愿者人数：<span class="city-num">${params.data.volunteerNumber}</span></div>
                    <div class="city-info">活动总数：<span class="city-num">${params.data.taskNumber}</span></div>
                  </div>
                  `;
                    return str;
                  }
                },
                // backgroundColor: 'rgba(30, 54, 124,1)',
                // backgroundColor: '#01FEDD',
                borderWidth: "1px",
                borderRadius: "4",
                borderColor: "#00B2AC",
                textStyle: {
                  color: "rgba(255,255,255,1)",
                },
                padding: [5, 10],
              },
              itemStyle: {
                // 三维地理坐标系组件 中三维图形的视觉属性，包括颜色，透明度，描边等。
                // areaColor: 'rgba(95,158,160,0.5)', // 地图板块的颜色
                areaColor: "#10786c", // 地图板块的颜色
                opacity: 0.3, // 图形的不透明度 [ default: 1 ]
                borderWidth: 2, // (地图板块间的分隔线)图形描边的宽度。加上描边后可以更清晰的区分每个区域 [ default: 0 ]
                borderColor: "#5CFFE0", // 图形描边的颜色。[ default: #333 ]
              },
              data: data,
            },
          ],
        };
        // 设置图表实例的配置项以及数据，万能接口，所有参数和数据的修改都可以通过setOption完成，ECharts 会合并新的参数和数据，然后刷新图表。
        // setTimeout(()=>{
          debugger
          that.myChart.setOption(option, true);
        // })
        // 动态显示tootip /*map3D中 不生效*/
        // setTimeout(() => {
        //   console.log('dispatchAction');
        //   myChart.dispatchAction({
        //     type: 'showTip',
        //     seriesIndex: 0,
        //     dataIndex: 1
        //   });
        // }, 3000);
      });
      // debugger
    },
  },
  // data() {
  //   return {
  //     id: "echarts_" + new Date().getTime() + Math.floor(Math.random() * 1000),
  //     echartObj: null,
  //     radioList: {
  //       A: "年度总项目数据查询",
  //       B: "军转干部在岗培训项目",
  //       C: "专技人员公需科目项目",
  //       D: "专技人员新取得中级职称岗前培训项目",
  //       E: "事业单位新进人员岗前培训项目"
  //     },
  //     radioActive: "A",
  //     option: {
  //       title: {
  //         text: "选择所要查询的数据维度",
  //         top: "3%",
  //         left: "5%",
  //         textStyle: {
  //           fontSize: 18,
  //           fontWeight: 300,
  //           color: "#b6d7ff"
  //         }
  //       },
  //       tooltip: {
  //         padding: 0,
  //         backgroundColor: "transparent",
  //         formatter: params => {
  //           // params.data
  //           return `<table class="map__tooltip o_font20">
  //                                   <thead>
  //                                     <tr>
  //                                         <th>总购买人数</th>
  //                                         <th>本年度总购买人数</th>
  //                                         <th>本月度总购买人数</th>
  //                                         <th>总完成人数</th>
  //                                     </tr>
  //                                   </thead>
  //                                   <tbody>
  //                                     <tr>
  //                                         <th>${params.data.obj.a}</th>
  //                                         <th>${params.data.obj.b}</th>
  //                                         <th>${params.data.obj.c}</th>
  //                                         <th>${params.data.obj.d}</th>
  //                                       </tr>
  //                                   </tbody>
  //                               </table>`;
  //         }
  //       },
  //       legend: {
  //         orient: "vertical",
  //         top: "9%",
  //         left: "5%",
  //         icon: "circle",
  //         data: [],
  //         selectedMode: "single",
  //         selected: {},
  //         itemWidth: 12,
  //         itemHeight: 12,
  //         itemGap: 30,
  //         inactiveColor: "#b6d7ff",
  //         textStyle: {
  //           color: "#ec808d",
  //           fontSize: 14,
  //           fontWeight: 300,
  //           padding: [0, 0, 0, 15]
  //         }
  //       },
  //       visualMap: {
  //         min: 0,
  //         max: 500,
  //         show: false,
  //         splitNumber: 5,
  //         inRange: {
  //           color: [
  //             "#FACD91",
  //             "#74DFB2",
  //             "#81D3F8",
  //             "#768FDE",
  //             "#e9969f"
  //           ].reverse()
  //         },
  //         textStyle: {
  //           color: "#fff"
  //         }
  //       },
  //       geo: {
  //         map: "重庆",
  //         label: {
  //           normal: {
  //             show: true,
  //             color: "#000"
  //           },
  //           emphasis: {
  //             show: true,
  //             color: "#fff"
  //           }
  //         },
  //         roam: false,
  //         itemStyle: {
  //           normal: {
  //             areaColor: "#8db200",
  //             borderColor: "#6367ad",
  //             borderWidth: 1
  //           },
  //           emphasis: {
  //             areaColor: "#feb6aa" // hover效果
  //           }
  //         },
  //         left: "5%",
  //         right: "5%",
  //         top: "5%",
  //         bottom: "5%"
  //       },
  //       series: [{
  //         name: "年度总项目数据查询",
  //         type: "map",
  //         geoIndex: 0, // 不可缺少，否则无tooltip 指示效果
  //         data: []
  //       }]
  //     }
  //   };
  // },
  // mounted() {
  //   this.echartObj = echarts.init(document.getElementById(this.id));
  //   echarts.registerMap("重庆", JSON);
  //   this.echartObj.setOption(this.getOptions(), true);
  //   this.echartObj.on("legendselectchanged", params => {
  //     this.radioActive = Object.keys(this.radioList).filter(
  //       item => this.radioList[item] === params.name
  //     )[0];
  //     this.echartObj.clear();
  //     this.echartObj.setOption(this.getOptions());
  //   });
  //   window.addEventListener("resize", () => {
  //     if (this.echartObj && this.echartObj.resize) {
  //       this.echartObj.resize();
  //     }
  //   });
  // },
  // methods: {
  //   getOptions() {
  //     this.setOptions("legend", {
  //       data: Object.values(this.radioList),
  //       selected: (list => {
  //         const obj = {};
  //         Object.keys(list).map((item, index) => {
  //           console.log(index)
  //           obj[list[item]] = item === this.radioActive;
  //         });
  //         return obj;
  //       })(this.radioList)
  //     });
  //     this.setOptions(
  //       "series",
  //       (() => {
  //         const arr = [];
  //         Object.values(this.radioList).map((item, index) => {
  //           console.log(index)
  //           arr[this.radioList[this.radioActive] === item ? "unshift" : "push"]({
  //             name: item,
  //             type: "map",
  //             geoIndex: 0, // 不可缺少，否则无tooltip 指示效果
  //             data: this.getSeriesData(item)
  //           });
  //         });
  //         return arr;
  //       })()
  //     );
  //     return this.option;
  //   },
  //   getSeriesData(item) {
  //     return this.radioList[this.radioActive] === item ?
  //       JSON.features.map(item => {
  //         return {
  //           name: item.properties.name,
  //           value: Math.ceil(Math.random() * 500),
  //           obj: {
  //             a: Math.ceil(Math.random() * 500),
  //             b: Math.ceil(Math.random() * 500),
  //             c: Math.ceil(Math.random() * 500),
  //             d: Math.ceil(Math.random() * 500)
  //           }
  //         };
  //       }) : [];
  //   },
  //   setOptions(objKey, objVal) {
  //     if (
  //       this.option[objKey] &&
  //       typeof this.option[objKey] === "object" &&
  //       !Array.isArray(this.option[objKey])
  //     ) {
  //       this.option[objKey] = Object.assign(this.option[objKey], objVal);
  //     } else {
  //       this.option[objKey] = objVal;
  //     }
  //     this.$set(this.option, objKey, this.option[objKey]);
  //   }
  // }
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

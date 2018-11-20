function test(obj,fun){
    console.log(obj, fun())
}
/**
 * echarts调色盘颜色
 * */
var colorArr = ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3']
/**
 * 数组是否存在
 * */
Array.prototype.contains = function (obj) {
    // console.log(obj)
    // console.log(this)
    var i = this.length;
    while (i--){
        if(this[i] === obj){
            return true;
        }
    }
    // console.log(i)
    return false

}
var MyEcharts = {
    EchartsDataFormate: {
        //整理数据没有分组类型的，适合饼图
        NoGroupFormate: function (data) {
            // category 的数据存储
            var categorys = [];
            // data 的数据存储
            var datas = [];
            // 遍历
            for (var i = 0; i < data.length; i++) {
                categorys.push(data[i].name || '');
                //定义一个中间变量
                var temp_data = {
                    name: data[i].name || '',
                    value: data[i].value || 0
                }
                datas.push(temp_data)
            }
            return {
                categorys: categorys,
                data: datas
            }
        },
        //整理数据有分组类型的，适合折线图、柱形图（分组，堆积）
        //数据格式：group：XXX，name：XXX，value：XXX
        /**
         * @param data : json数据
         * @param type : 图表类型
         * var data1 = [
         *	  { group:'类型1' , name: '1月', value: 10 },
         *    { group:'类型2' , name: '1月', value: 15 },
         *    { group:'类型1' , name: '2月', value: 25 },
         *    { group:'类型2' , name: '2月', value: 12 },
         *    { group:'类型1' , name: '3月', value: 22 },
         *    { group:'类型2' , name: '3月', value: 12 }
         *    ];
         */
        GroupFormate: function (data, type) {
            //用于存储类型名称
            var groups = new Array();
            //用于存储data.name数据
            var names = new Array();
            //存储返回series数据(一个或者多个)
            var series = new Array();

            for(var i = 0; i < data.length;i++) {
                //判断data[i].group是否存在数租groups中
                if(!groups.contains(data[i].group)) {
                    groups.push(data[i].group)
                    // console.log('s=====>',groups)
                }
                //判断name数据是否存在,数组names中
                if(!names.contains(data[i].name)) {
                    names.push(data[i].name)
                    // console.log('names=====>',names)
                }
            }
            //series 遍历分类
            for (var i =0; i< groups.length; i++) {
                // 定义一个series中间变量
                var temp_series = {};
                // 定义series.data 数据存储
                var temp_data = [];

                // 遍历所有数据
                for (var j = 0; j < data.length; j++) {
                    // console.log(data[j])
                    for (var k = 0; k < names.length; k++) {
                        if(groups[i] == data[j].group && names[k] == data[j].name) {
                            // console.log(data[j].value)
                            temp_data.push(data[j].value)
                        }
                    }
                }
                temp_series = {
                    name: groups[i],
                    type: type,
                    data: temp_data
                }
                series.push(temp_series)
            }
            console.log(series)
            return {
                groups: groups,
                category: names,
                series:series
            }
        }
    },
    // 生成图形option
    EchartsOption: {
        /**
         * bar
         * @param data: json 数据
         * @param opts  配置
         */
        bar: function (data, opts) {
            var settings = {
                title: '', // 标题
                subtext: '' // 副标题
            };
            $.extend(settings,opts);
            // console.log(data)
            var datas = MyEcharts.EchartsDataFormate.GroupFormate(data, 'bar');

            option = {
                title: {
                    text: settings.title,
                    subtext: settings.subtext
                },
                tooltip: {
                    show: true,
                    trigger: 'item',
                    formatter: "{a}<br/>{b} : {c}"
                },
                legend: {
                    data:datas.groups
                },
                xAxis: {
                    data: datas.category
                },
                yAxis: {},
                series: datas.series
            };
            return option
        },
        /**
         * bar
         * @param data: json 数据
         * @param opts  配置
         */
        line: function (data, opts) {
            var settings = {
                title: '', // 标题
                subtext: '', // 副标题
                smooth: false // 是否平滑曲线显示
            };
            $.extend(settings,opts);
            // console.log(data)
            var datas = MyEcharts.EchartsDataFormate.GroupFormate(data, 'line');
            console.log(datas.series)

            // 是否平滑曲线显示
            if (settings.smooth) {
                for (var i = 0; i < datas.series.length ; i++) {
                    datas.series[i]['smooth']=settings.smooth
                }
            }

            // 是否面积图显示
            if (settings.areaStyle !== undefined) {
                for (var i = 0; i < datas.series.length ; i++) {
                    console.log(datas.series[i]['areaStyle']=settings.areaStyle)
                }
            }


            if (settings.stack !== undefined) {
                console.log(settings.stack)
                for (var i = 0; i < datas.series.length ; i++) {
                    datas.series[i]['stack']=settings.stack
                }

            }
            option = {
                title: {
                    text: settings.title,
                    subtext: settings.subtext
                },
                tooltip: {
                    show: true,
                    trigger: 'axis',
                    formatter: "{a}<br/>{b} : {c}"
                },
                legend: {
                    data:datas.groups
                },
                xAxis: {
                    data: datas.category
                },
                yAxis: {},
                series: datas.series,
                color: colorArr
            };
            return option
        },
        /**
         * 饼图
         * @param data: json 数据
         * @param opts 配置
         */
        pie: function (data, opts) {
            var settings = {
                title: '', // 标题
                subtext: '' // 副标题
            };
            $.extend(settings,opts);
            // 数据格式
            var datas = MyEcharts.EchartsDataFormate.NoGroupFormate(data);
            option = {
                //标题
                title: {
                    text: settings.title,
                    subtext: settings.subtext,
                    x: 'center'
                },
                // 提示
                tooltip: {
                    show: true,
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                // 图例
                legend: {
                    orient: 'horizontal',
                    bottom: '5%',
                    data: datas.categorys
                },
                series: [
                    {
                        name: settings.title,
                        type: 'pie',
                        radius: '50%',
                        center: ['50%', '50%'],
                        data: data,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true,
                                length: 2,
                            }
                        }
                    }
                ]
            }
            return option
        },
        /**
         *  @param option : option
         *  @param echartId : 图表的id 需要加引号
         */
        initChart: function (option, echartId) {
            var container = eval('document.getElementById("' + echartId + '")');
            var myChart = echarts.init(container)

            myChart.setOption(option);
            MyEcharts.adaptionWindows(myChart)
            return myChart
        },

    },
    /**
     * Echarts自适应屏幕
     * @param chartName
     */
    adaptionWindows: function(chartName) {
        window.addEventListener('resize',function () {
            chartName.resize();
        });
    }
}

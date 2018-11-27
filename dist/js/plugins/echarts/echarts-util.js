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
};
/**
 * 堆叠，数组添加stack
 *
 * */
Array.prototype.stack = function (obj) {
    // console.log(obj, this)
    if (obj !== undefined) {
        for (var i = 0; i < this.length ; i++) {
            this[i]['stack'] = obj
        }
    }
    // console.log(this)
    return this
};
/**
 * 设置双x，y轴
 * */
function axisSiteRight (data, obj, AxisIndexType) {
    // console.log(data, obj)
    if(obj !== undefined) {
        // console.log(settings.axisSiteRight)
        // console.log(series)
        for (var j = 0; j < obj.length; j++) {
            for (var i = 0; i < data.length; i++) {
                // console.log(settings.axisSiteRight[j])
                if(data[i].name == obj[j]){
                    // console.log(series[i].name)
                    data[i][AxisIndexType] = 1
                }
            }
        }
    }
    return data
}
/**
 * 柱状图+折线图
 * */
function showLine(data, obj) {
    console.log(data, obj)
    if (obj !== undefined) {
        for (var j = 0; j < obj.length; j++) {
            for (var i = 0; i < data.length; i++) {
                // console.log(settings.axisSiteRight[j])
                if (data[i].name == obj[j]) {
                    console.log(data[i].name)
                    console.log(data[i].type = 'line')
                    // series[i]['yAxisIndex'] = 1
                }
            }
        }
    }
}
/**
 * 标记点-最大值和最小值
 * */
Array.prototype.markPointMaxMin = function (obj) {
    console.log(this, obj);
    var getMarkPoint = obj.markPoint;
    if(obj !== undefined) {
        // console.log(settings.series.markPoint)
        if (getMarkPoint) {
            if (getMarkPoint === true) {
                for (var i = 0; i < this.length ; i++) {
                    this[i]['markPoint'] = {
                        data : [
                            {type : 'max', name: '最大值'},
                            {type : 'min', name: '最小值'}
                        ]
                    }
                }
            } else {
                for (var i = 0; i < this.length ; i++) {

                }
            }
        }
    }
    return this
};
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
         * @param data json数据
         * @param type 图表类型
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
        },
        //整理从data数组转成series格式，适合折线图、柱形图
        //数据格式：无，自定义
        /**
         * @param data:  json数据
         * @param type:  图表类型
         *
         */
        SeriesFormate: function (data, type) {
            // console.log(data, type);
            var temp_series = {};
            var temp_data = [];
            for (var i = 0; i < data.groups.length;i++) {
                temp_series= {
                    name: data.groups[i],
                    type: type,
                    data: data.data[i]
                };
                temp_data.push(temp_series)
            }
            return temp_data
        },
        RadarFormate: function (data, type) {
            //存储最大值数组
            var indicators = new Array();
            //定义data.value数据存储
            var dataValues = [];
            // 遍历分类
            for (var i =0; i <data.groups.length;i++) {
                dataValues.push({name:data.groups[i], value:data.data[i]})
            }
            indicators = {
                type : 'radar',
                data:dataValues
            };
            return indicators
        },
        //整理从data数组转成series格式，适合通用仪表盘
        //数据格式：{
        //         groups: ['温度'],
        //         data: [
        //             {name: '温度', value: 25},
        //         ]
        //     }
        /**
         * @param data:  json数据
         * @param type:  图表类型
         *
         */
        /*GaugeFormate: function (data, type) {
            var temps_datas = data.data
            var arr = []
            arr.push({
                name: '业务指标',
                type: 'gauge',
                detail: {formatter: '{value}%'},
                data: temps_datas
            })
            console.log(arr)
            return arr
        }*/
    },
    // 生成图形option
    EchartsOption: {
        /**
         * histogram 柱状图
         * @param data: json 数据
         * @param opts  配置
         */
        histogram: function (data, opts) {
            var settings = {
                title: '', // 标题
                subtext: '', // 副标题
                yAxis: [{
                    type: 'value'
                }]
            };
            $.extend(settings,opts);
            // console.log(data)
            var series = MyEcharts.EchartsDataFormate.SeriesFormate(data, 'bar');

            // 调用堆叠
            if (settings.stack !== undefined) {
                series.stack(settings.stack)
            }
            // 调用标记点-最大值和最小值
            if(settings.series !== undefined) {
                series.markPointMaxMin(settings.series)
            }
            /*if(settings.series !== undefined) {
                // console.log(settings.series.markPoint)
                if (settings.series.markPoint) {
                    if (settings.series.markPoint === true) {
                        for (var i = 0; i < series.length ; i++) {
                            series[i]['markPoint'] = {
                                data : [
                                    {type : 'max', name: '最大值'},
                                    {type : 'min', name: '最小值'}
                                ]
                            }
                        }
                    } else {
                        for (var i = 0; i < series.length ; i++) {

                        }
                    }
                }
            }*/
            // 设置双y轴
            if(settings.axisSiteRight !== undefined) {
                axisSiteRight(series, settings.axisSiteRight, 'yAxisIndex')
            }
            /*if(settings.axisSiteRight !== undefined) {
                // console.log(settings.axisSiteRight)
                // console.log(series)
                for (var j = 0; j < settings.axisSiteRight.length; j++) {
                    for (var i = 0; i < series.length; i++) {
                        // console.log(settings.axisSiteRight[j])
                        if(series[i].name == settings.axisSiteRight[j]){
                            // console.log(series[i].name)
                            series[i]['yAxisIndex'] = 1
                        }
                    }
                }
            }*/
            // 调用柱状图+折线图
            if(settings.showLine !== undefined) {
                showLine(series, settings.showLine)
            }
           /* if(settings.showLine !== undefined) {
                console.log(settings.showLine)
                for (var j = 0; j < settings.showLine.length; j++) {
                    for (var i = 0; i < series.length; i++) {
                        // console.log(settings.axisSiteRight[j])
                        if(series[i].name == settings.showLine[j]){
                            console.log(series[i].name)
                            console.log(series[i].type = 'line')
                            // series[i]['yAxisIndex'] = 1
                        }
                    }
                }
            }*/

            option = {
                title: {
                    text: settings.title,
                    subtext: settings.subtext
                },
                toolbox: {
                    feature: {
                        magicType: {
                            type: ['stack', 'tiled']
                        }
                    }
                },
                tooltip: {
                    show: true,
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                    // formatter: "{a}<br/>{b} : {c}"
                },
                legend: {
                    data:data.groups
                },
                xAxis: [
                    {
                        type : 'category',
                        data: data.category
                    }
                ],
                yAxis: settings.yAxis,
                series: series,
                color: colorArr
            };
            return option
        },
        /**
         * bar 条形图
         * @param data: json 数据
         * @param opts  配置
         */
        bar: function (data, opts) {
            var settings = {
                title: '', // 标题
                subtext: '', // 副标题
                xAxis: [{
                    type: 'value'
                }]
            };
            $.extend(settings,opts);
            // console.log(data)
            var series = MyEcharts.EchartsDataFormate.SeriesFormate(data, 'bar');

            // 调用堆叠
            if (settings.stack !== undefined) {
                series.stack(settings.stack)
            }

            // 调用设置双x轴
            if(settings.axisSiteRight !== undefined) {
                axisSiteRight(series, settings.axisSiteRight, 'xAxisIndex')
            }

            // 调用柱状图+折线图
            if(settings.showLine !== undefined) {
                showLine(series, settings.showLine)
            }

            // 调用标记点-最大值和最小值
            if(settings.series !== undefined) {
                series.markPointMaxMin(settings.series)
            }

            option = {
                title: {
                    text: settings.title,
                    subtext: settings.subtext
                },
                toolbox: {
                    feature: {
                        magicType: {
                            type: ['stack', 'tiled']
                        }
                    }
                },
                tooltip: {
                    show: true,
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                    // formatter: "{a}<br/>{b} : {c}"
                },
                legend: {
                    data:data.groups
                },
                xAxis: settings.xAxis,
                yAxis: {
                    type : 'category',
                    data: data.category
                },
                series: series,
                color: colorArr
            };
            return option
        },
        /**
         * line
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
            // var datas = MyEcharts.EchartsDataFormate.GroupFormate(data, 'line');
            // console.log(datas)
            var series = MyEcharts.EchartsDataFormate.SeriesFormate(data,'line')
            console.log(series)
            // 是否平滑曲线显示
            if (settings.smooth) {
                for (var i = 0; i < series.length ; i++) {
                    series[i]['smooth']=settings.smooth
                }
            }

            // 是否面积图显示
            if (settings.areaStyle !== undefined) {
                for (var i = 0; i < series.length ; i++) {
                    console.log(series[i]['areaStyle']=settings.areaStyle)
                }
            }

            // 调用堆叠
            if (settings.stack !== undefined) {
                series.stack(settings.stack)
            }

            option = {
                title: {
                    text: settings.title,
                    subtext: settings.subtext
                },
                tooltip: {
                    show: true,
                    trigger: 'axis',
                    // formatter: "{a}<br/>{b} : {c}"
                },
                legend: {
                    data:data.groups
                },
                xAxis: {
                    data: data.category
                },
                yAxis: {},
                series: series,
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
                subtext: '', // 副标题
                roseType: false, // 玫瑰图
                radius: '50%',
                center: ['50%', '50%']
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
                    // formatter: "{a} <br/>{b} : {c} ({d}%)"
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
                        roseType: settings.roseType,
                        radius: settings.radius,
                        center:settings.center,
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
                                length: 10,
                            }
                        }
                    }
                ],
                color: colorArr
            }
            return option
        },
        /**
         * radar    雷达图
         * @param data: json 数据
         * @param opts  配置
         */
        radar: function (data, opts) {
            var settings = {
                title: '', // 标题
                subtext: '', // 副标题
                radius: '50%',
                center: ['50%', '50%']
            };
            $.extend(settings,opts);
            // 数据格式
            var series = MyEcharts.EchartsDataFormate.RadarFormate(data);
            option = {
                title: {
                    text: settings.title,
                    subtext: settings.subtext
                },
                tooltip: {},
                legend: {
                    data: data.groups
                },
                radar: {
                    // shape: 'circle',
                    name: {
                        textStyle: {
                            color: '#fff',
                            backgroundColor: '#999',
                            borderRadius: 3,
                            padding: [3, 5]
                        }
                    },
                    indicator: data.indicator,
                    radius: settings.radius,
                    center: settings.center
                },
                series: series
            };
            return option
        },
        /**
         * gauge    仪表盘
         * @param data: json 数据
         * @param opts  配置
         */
        gauge: function (data, opts) {

            var settings = {
                title: '', // 标题
                subtext: '', // 副标题
                radius: '75%',
                center: ['50%', '50%'],
                // min:0,
                // max:100,
            };
            $.extend(settings,opts);
            // if(opts.series[0] === undefined) return false
            var series = [
                {
                    name: data.groups,
                    type: 'gauge',
                    radius: settings.radius,
                    center: settings.center,
                    detail: {
                        formatter: '{value}'
                    },
                    data: data.data
                }
            ];
            if (opts.series) {
                $.extend(series[0], opts.series[0]);
            }

            // 数据格式
            // var series = MyEcharts.EchartsDataFormate.GaugeFormate(data);
            // console.log(series)
            option = {
                title: {
                    text: settings.title,
                    subtext: settings.subtext
                },
                tooltip : {
                    formatter: "{a} <br/>{b} : {c}%"
                },
                series: series
            };
            return option
        },
        /**
         *  @param option: option
         *  @param echartId: 图表的id 需要加引号
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

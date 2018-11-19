var MyEcharts = {
    EchartsDataFormate: {
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
                    value: data[i].value || 0,
                    name: data[i].name || ''
                }
                datas.push(temp_data)
            }
            return {
                categorys: categorys,
                data: datas
            }
        }
    },
    // 生成图形option
    EchartsOption: {
        /**
         * bar
         * @param title: 标题
         * @param subtext: 副标题
         * @param data: json 数据
         */
        bar: function (title,subtext, data) {
            console.log(data)
            var datas = MyEcharts.EchartsDataFormate.NoGroupFormate(data);
            console.log(datas)
            var arr = []
            for (var i =0;i < datas.data.length;i++){
                arr.push(datas.data[i])
            }
            option = {
                title: {
                    text: title,
                    subtext: subtext
                },
                tooltip: {},
                legend: {
                    data:['销量']
                },
                xAxis: {
                    data: datas.categorys
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: arr
                }]
            };
            return option
        },
        /**
         * 饼图
         * @param title: 标题
         * @param subtext: 副标题
         * @param data: json 数据
         */
        pie: function (title, subtext, data) {
            // 数据格式
            var datas = MyEcharts.EchartsDataFormate.NoGroupFormate(data);
            // console.log(datas)
            option = {
                //标题
                title: {
                    text: title || '', //标题
                    subtext: subtext || '', // 副标题
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
                        name: title || '',
                        type: 'pie',
                        radius: '50%',
                        center: ['50%', '50%'],
                        data: datas.data,
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
            return myChart
        },

    }
}

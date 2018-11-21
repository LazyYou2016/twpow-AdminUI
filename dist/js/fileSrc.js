var filesSrc = {
  cssPath: 'dist/css/',
  jsPath: 'dist/js/',
  plugins: 'dist/js/plugins/'
};

//扩展
var fnExtend = {
  includFile: function (g, c) {
    for (var f = "string" == typeof c ? [c] : c, d = 0; d < f.length; d++) {
      var b = f[d].replace(/^\s|\s$/g, ""),
        a = b.split("."),
        e = "css" == a[a.length - 1].toLowerCase(),
        a = e ? "link" : "script",
        h = e ? " type='text/css' rel='stylesheet' " : " ",
        b = (e ? "href" : "src") + "='" + g + b + "'";

      // console.log("<" + a + h + b + "></" + a + ">");
      0 == document.write("<" + a + h + b + "></" + a + ">")
    }
  }
};

//插入css文件
fnExtend.includFile(filesSrc.cssPath, ['bootstrap.min.css', 'style.css']);
//插入js文件
fnExtend.includFile(filesSrc.jsPath, [
  'jquery.min.js',
  'bootstrap.min.js',
  'date.js',
  'common.js'
]);
fnExtend.includFile(filesSrc.plugins, [
  'layer/layer.js', //layer对话框
  'liMarquee/jquery.liMarquee.js', //走马灯无缝滚动插件
  'dataTables/jquery.dataTables.min.js', //表格插件
  'dataTables/dataTables.bootstrap.min.js', //表格插件
  'dataTables/table.js', //表格公共插件
  'select2/select2.min.js', //select2
  'echo/echo.min.js', //图片懒加载
  'zcircleMove/zcircleMove.js',
  'bootstrap-datetimepicker/bootstrap-datetimepicker.min.js', //日期插件
  'bootstrap-datetimepicker/bootstrap-datetimepicker.zh-CN.js', //日期插件
  'My97DatePicker/WdatePicker.js' //百度上传控件
])
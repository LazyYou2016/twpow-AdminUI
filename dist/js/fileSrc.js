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
fnExtend.includFile(filesSrc.jsPath, ['jquery.min.js', 'bootstrap.min.js', 'common.js']);
fnExtend.includFile(filesSrc.plugins, [
  'layer/layer.js',
  'dataTables.bootstrap/dataTables.bootstrap.min.js',
  'select2/select2.min.js',
  'bootstrap-datetimepicker/bootstrap-datetimepicker.min.js',
  'bootstrap-datetimepicker/bootstrap-datetimepicker.zh-CN.js',
  'My97DatePicker/WdatePicker.js'
])
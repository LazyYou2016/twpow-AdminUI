var filesSrc = {
  cssPath: 'dist/css/',
  jsPath: 'dist/js/',
  isLayer: 'dist/js/layer/',
    plugins: 'dist/js/plugins/'
}

//扩展
var fnExtend = {
  includFile: function (g, c) {
    for (var f = "string" == typeof c ? [c] : c, d = 0; d < f.length; d++) {
      var b = f[d].replace(/^\s|\s$/g, ""),
        a = b.split("."),
        e = "css" == a[a.length - 1].toLowerCase(),
        a = e ? "link" : "script",
        h = e ? " type='text/css' rel='stylesheet' " : " ",
        b = (e ? "href" : "src") + "='" + g + b + "'"
      console.log("<" + a + h + b + "></" + a + ">")
      0 == document.write("<" + a + h + b + "></" + a + ">")
      // document.head.appendChild("<" + a + h + b + "></" + a + ">")
      // document.body.appendChild("<" + a + h + b + "></" + a + ">")
      // console.log(document.body);

    }
  }
};

//插入css文件
fnExtend.includFile(filesSrc.cssPath, ['bootstrap.min.css', 'style.css'])
//插入js文件
fnExtend.includFile(filesSrc.jsPath, ['jquery.min.js', 'bootstrap.min.js', 'dataTables.bootstrap.min.js', 'select2.min.js', 'common.js'])
fnExtend.includFile(filesSrc.isLayer, ['layer.js'])
fnExtend.includFile(filesSrc.plugins, ['bootstrap-datetimepicker/bootstrap-datetimepicker.min.js','bootstrap-datetimepicker/bootstrap-datetimepicker.zh-CN.js', 'My97DatePicker/WdatePicker.js'])

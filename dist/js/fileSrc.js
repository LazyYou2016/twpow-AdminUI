      // console.log(document.body);
﻿var csspath = "dist/css/";
var jspath = "dist/js/";
var jsfiles = ['jquery.min.js', 'bootstrap.min.js', 'dataTables.bootstrap.min.js', 'select2.min.js', 'common.js', 'layer/layer.js']
var cssfiles = ['bootstrap.min.css', 'style.css']

function addcss() {
  for (var i = 0; i < cssfiles.length; i++) {
    var s = document.createElement("link");
    s.rel = "stylesheet"
    s.href = csspath + cssfiles[i];
    document.getElementsByTagName("head")[0].appendChild(s);
  }
}

function addjs() {
  for (var i = 0; i < jsfiles.length; i++) {
    var s = document.createElement("script");
    s.src = jspath + jsfiles[i];
    document.getElementsByTagName("head")[0].appendChild(s);
  }
}
addcss();
addjs();
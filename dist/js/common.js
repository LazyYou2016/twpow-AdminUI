// (function (window) {
//   var theUA = window.navigator.userAgent.toLowerCase();
//   if ((theUA.match(/msie\s\d+/) && theUA.match(/msie\s\d+/)[0]) || (theUA.match(/trident\s?\d+/) && theUA.match(/trident\s?\d+/)[0])) {
//     var ieVersion = theUA.match(/msie\s\d+/)[0].match(/\d+/)[0] || theUA.match(/trident\s?\d+/)[0];
//     if (ieVersion < 10) {
//       document.write('<div class="ie-main"><div class="ie-header"><h1>对不起，您当前的浏览器版本太古老了，<em>存在安全风险！</em></h1></div><div class="browser-list clearfix"><ul class="list-unstyled"><li><a href="https://www.google.com/chrome" title="Google Chrome"><div class="ie-icon chrome"></div><h2>Google Chrome</h2><p class="info">“Google 全新推出的高速浏览器。”</p><p class="website">浏览官方网站</p></a></li><li><a href="https://www.firefox.com/" title="Mozilla Firefox"><div class="ie-icon firefox"></div><h2>Mozilla Firefox</h2><p class="info">“Firefox 注重您的信息安全。汇聚各种全新特性，给你更好的上网体验！”</p><p class="website">浏览官方网站</p></a></li><li><a href="http://se.360.cn/" title="Apple Safari"><div class="ie-icon ie360"></div><h2>360浏览器</h2><p class="info">“360安全浏览器是360安全中心推出的一款基于IE和Chrome双内核的浏览器。”</p><p class="website">浏览官方网站</p></a></li></ul></div><div class="ie-footer"></div></div>');
//     }
//   }
// })(window);

function e_preventDefault() {
  var e = event || window.event;
  if (e.preventDefault) {
    e.preventDefault();
  } else {
    e.returnValue = false;
  }
}

function reloadPage() {
  window.location.reload()
}

function goIndex(i) {
  window.parent.parenttest(i);
}

//bootstrap S
$(function () {
  $('[data-toggle="popover"]').popover()
  $('[data-toggle="tooltip"]').tooltip()
  $(".metismenu").addClass("metismenu-amin")
})
//bootstrap E

// index S
$('#metisMenu').metisMenu();
$("#navtoggle").click(function () {
  $(this).toggleClass("active")
  $(this).parents(".index").toggleClass("index-mini")
})
var getHref = $($("#metisMenu>li>a")[0]).attr("href");
$("#iframe").attr("src", getHref);
$("#metisMenu a").click(function () {
  e_preventDefault()
  var getHref = $(this).attr("href");
  if (getHref != 'javascript:void(0)') {
    $("#iframe").attr("src", getHref);
    $("#metisMenu a").removeClass("active");
    $(this).addClass("active");
  }
});
$('.navbar-right .dropdown').hover(function () {
  $(this).addClass('open').siblings().removeClass('open');
}, function () {
  $('.navbar-right .dropdown').removeClass("open")
})
// index S
// 修改密码 点击“眼睛”隐藏显示 S
$("body").delegate(".eye i", "click", function () {
  var eyeicon = $(this).siblings('[type="password"]').attr('type');
  var eyeinput = $(this).siblings('input');
  if (eyeicon == 'password') {
    eyeinput.attr('type', 'text');
    $(this).removeClass('fa-eye').addClass('fa-eye-slash')
  } else {
    eyeinput.attr('type', 'password');
    $(this).removeClass('fa-eye-slash').addClass('fa-eye');
  }
});
// 修改密码 点击“眼睛”隐藏显示 E
// 文本框字数限制 S
function textAreaCount(textArea) {
  var max = $(textArea).find(".textarea-max").text(),

    textAreaContent = textArea.find("textarea");
  textAreaContent.on('input propertychange', function () {
    var textAreaText = $(this).parent("div").find(".wordwrap span");
    textAreaText.text($(this).val().length);
    console.log(Number(max));

    if ($(this).val().length > Number(max)) {

      layer.msg('字数已超出限制');
      $(this).val($(this).val().substr(0, max))
      textAreaText.text($(this).val().length);
      return false;
    }
  });
}
/*
textAreaCount($(".wordCount"));
在textarea结束标签下插入以下：
<div class="wordwrap">
  <span>0</span>/<var class="textarea-max">300</var>
</div>
*/
// 文本框字数限制 E


// layer S
function layerW() {
  return "750px"
}
var winH = $(window).height(),
  layerH;

function layerH() {
  if (winH > 720) {
    layerH = "600px";
  } else if (winH <= 720) {
    layerH = "400px";
  }
  return layerH;
}
// layer E

//dataTables S
function tableFull() {
  return winH - 210 + 'px'
}
//dataTables E
/**
 * 排版系统日历依懒
 * */
function uuid(len, radix) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [],
    i;
  radix = radix || chars.length;
  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
  } else {
    // rfc4122, version 4 form
    var r;
    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }


  return uuid.join('');
}
/* 数字汉字 */
function Numbers_to_Chinese(num) {
  var num_name = {
    1: "一",
    2: "二",
    3: "三",
    4: "四",
    5: "五",
    6: "六",
    7: "七",
    8: "八",
    9: "九",
    10: "十"
  };
  return num_name[num];
}
/**
 * 排版系统日历依懒 end
 * */
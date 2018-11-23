function e_preventDefault() {
  var e = event || window.event;
  if (e.preventDefault) {
    e.preventDefault();
  } else {
    e.returnValue = false;
  }
}

//bootstrap S
$(function () {
  $('[data-toggle="popover"]').popover()
  $('[data-toggle="tooltip"]').tooltip()
})
//bootstrap E

// index S
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
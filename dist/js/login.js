function Login() {
  var userName = $("#userName").val(); //用户名
  var userPassword = $("#userPassword").val(); //用户密码
  var hintText = $('.error .popover-content');
  if (!userName) {
    hintText.html('请输入手机号!');
  }
  if (!userPassword) {
    hintText.html('请填写密码!');
  }
  setTimeout("hintText.html('')", 5000);
}

var InterValObj; //timer变量，控制时间
var count = 5; //间隔函数，1秒执行
var curCount; //当前剩余秒数
var code = ""; //验证码
var codeLength = 6; //验证码长度
function sendMessage() {
  curCount = count;
  var dealType; //验证方式
  //产生验证码
  for (var i = 0; i < codeLength; i++) {
    code += parseInt(Math.random() * 9).toString();
  }
  //设置button效果，开始计时
  $("#btnSendCode").attr("disabled", "true");
  $("#btnSendCode").text(+curCount + "秒再获取");
  InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
  //向后台发送处理数据
  //          $.ajax({
  //              type: "POST", //用POST方式传输
  //              dataType: "text", //数据格式:JSON
  //              url: 'Login.ashx', //目标地址
  //              data: "dealType=" + dealType +"&uid=" + uid + "&code=" + code,
  //              error: function (XMLHttpRequest, textStatus, errorThrown) { },
  //              success: function (msg){ }
  //          });
}
//timer处理函数
function SetRemainTime() {
  if (curCount == 0) {
    window.clearInterval(InterValObj); //停止计时器
    $("#btnSendCode").removeAttr("disabled"); //启用按钮
    $("#btnSendCode").text("重新发送验证码").attr('code-id', '0');
    code = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效
  } else {
    curCount--;
    $("#btnSendCode").text(curCount + "秒再获取");
  }
}
var re = /^1[3|4|5|7|8][0-9]\d{4,8}$/i; //验证手机正则(输入前7位至11位)
var getTel = "18642792161";

function checkMobile(str) {
  if (!$(".login-box .error").is(':visible')) {
    setTimeout(function () {
      $(".login-box .error").hide();
    }, 4000);
  }
  var tel = $("#sjkeleyi").val();
  if ($("#sjkeleyi").val() == "") {
    $(".login-box .error").show()
    $('.error .popover-content').html("请输入手机号！");
    $("#sjkeleyi").focus()
    return false;
  } else if ($("#sjkeleyi").val().length < 11) {
    $(".login-box .error").show()
    $('.error .popover-content').html("手机号码格式不正确！");
    $("#sjkeleyi").focus()
    return false;
  } else if (!re.test($("#sjkeleyi").val())) {
    $(".login-box .error").show()
    $('.error .popover-content').html("手机号码格式不正确！");
    $("#sjkeleyi").focus()
    return false;
  } else if (re.test(str)) {
    if (tel == getTel) {
      sendMessage();
      $("#btnSendCode").attr('code-id', '1');
    } else {
      alert("对不起，您暂时没有浏览权限，请与技术管理部门联系")
    }
  }
  $("#code_text").focus()
}

function Login() {
  checkMobile()
  if (!$(".login-box .error").is(':visible')) {
    setTimeout(function () {
      $(".login-box .error").hide();
    }, 4000);
  }
  var codeId = $("#btnSendCode").attr('code-id');
  var phone = $("#sjkeleyi").val();
  var code = $("#code_text").val();
  if (!phone) {
    $(".login-box .error").show()
    $('.error .popover-content').html('请输入手机号！');
    $("#sjkeleyi").focus()
    return false;
  } else if (codeId == 0) {
    $(".login-box .error").show()
    $('.error .popover-content').html('请获取验证码！');
    return false;
  } else if (code == "") {
    $(".login-box .error").show()
    $('.error .popover-content').html('请输入验证码！');
    return false;
  } else if (codeId == 1) {
    $("loginForm").submit();
  }
}
document.onkeydown = function (event) {
  e = event ? event : (window.event ? window.event : null);
  if (e.keyCode == 13) {
    Login();
  }
}
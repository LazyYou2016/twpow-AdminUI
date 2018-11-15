var re = /^1[3|4|5|7|8][0-9]\d{4,8}$/i; //验证手机正则(输入前7位至11位)
var getTel = "18642792161";
var tipsTime = 5000; //错误提示事件
var InterValObj; //timer变量，控制时间
var count = 5; //间隔函数，1秒执行
var curCount; //当前剩余秒数
var code = ""; //验证码
var codeLength = 6; //验证码长度
var btnCode = $("#btnSendCode");
var errorTips = $('.error-tips');
var errorTipsPhone = $('.error-tips-phone');
var backstageCode = 1234; //获取后台正确验证码
// var pho
function sendMessage() {
  setTimeout(function () {
    errorTipsPhone.html('')
  }, tipsTime);
  var tel = $("#phone");
  var telVal = tel.val();
  if (telVal == "") {
    $(".login-box .error").show()
    errorTipsPhone.html('请输入手机号');
    tel.focus()
    return false;
  } else if (telVal.length < 11 || !re.test(telVal)) {
    errorTipsPhone.html('手机号码格式不正确');
    tel.focus()
    return false;
  } else if (telVal == getTel) {
    btnCode.attr('code-id', '1');
  }
  curCount = count;
  var dealType; //验证方式
  //产生验证码
  for (var i = 1; i < codeLength; i++) {
    code += parseInt(Math.random() * 9).toString();
  }
  //设置button效果，开始计时
  btnCode.attr("disabled", "true");
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
  if (curCount == 1) {
    window.clearInterval(InterValObj); //停止计时器
    btnCode.removeAttr("disabled"); //启用按钮
    btnCode.text("重新发送验证码").attr('code-id', '0');
    code = ""; //清除验证码。如果不清除，过时间后，输入收到的验证码依然有效
  } else {
    curCount--;
    btnCode.text(curCount + "秒再获取");
  }
}

function LoginPhone() {
  var user = $("#phone"); //用户名
  var userVal = user.val();
  var codeId = btnCode.attr('code-id');
  var phoneCode = $("#phoneCode");
  var phoneCodeVal = $("#phoneCode").val();
  setTimeout(function () {
    errorTipsPhone.html('')
  }, tipsTime);
  if (!userVal) {
    errorTipsPhone.html('请输入手机号');
    user.focus();
    return false;
  } else if (codeId == 0) {
    errorTipsPhone.html('请获取验证码');
    phoneCode.focus();
    return false;
  } else if (phoneCodeVal == "") {
    errorTipsPhone.html('请输入验证码');
    return false;
  } else if (codeId == 1 && phoneCodeVal != backstageCode) {
    errorTipsPhone.html('验证码错误');
    phoneCode.focus();
    return false;
  } else if (codeId == 1 && phoneCodeVal == backstageCode) {
    layer.alert("登录成功")
    // 发送后台事件
  }
}

function Login() {
  var user = $("#user"); //用户名
  var userVal = user.val();
  var password = $("#userPassword");
  var passwordVal = password.val();
  setTimeout(function () {
    errorTips.html('')
  }, tipsTime);
  if (!userVal) {
    errorTips.html('请输入用户名');
    user.focus();
    return false;
  } else if (!$("#veryCode").val()) {
    errorTips.html('请输入验证码');
    password.focus();
    return false;
  } else if (passwordVal == "") {
    errorTips.html('请输入密码');
    password.focus();
    return false;
  } else if (passwordVal != 123456) {
    errorTips.html('密码错误');
    password.focus();
    return false;
  } else {
    layer.alert("登录成功")
    // 发送后台事件
  }
}
document.onkeydown = function (event) {
  e = event ? event : (window.event ? window.event : null);
  if (e.keyCode == 13) {
    if (!$(".login-tab-loginbtn").is(":block").attr("login-id") == 1) {
      Login();
    } else {
      LoginPhone();
    }
  }
}
function runCircle(settings) {
  var defaultSetting = {
    obj: '',
    percent: 1,
    circleBottomColor: "#f2f2f2",
    innerColorStart: '#4a92ff',
    innerColorEnd: '#1773ff'
  };
  var option = $.extend({}, defaultSetting, settings);
  var obj = option.obj;
  var percent = option.percent;
  var innerColorStart = option.innerColorStart;
  var innerColorEnd = option.innerColorEnd;
  var circleBottomColor = option.circleBottomColor;
  var preA = Math.PI / 180;
  var canvasC = document.getElementById(obj);
  var context = canvasC.getContext('2d');
  var windowW = parseInt($(canvasC).parent().width());
  var lineW1 = 10;
  var lineW0 = 5;
  var R0, R1;
  if (windowW > 500) {
    lineW1 = 36;
    lineW0 = 10;
  }
  var canvasW = windowW * 0.76;
  R = parseInt(canvasW / 2 - 2 * lineW1 - 2 * lineW0 - 10);
  R0 = parseInt(canvasW / 2 - lineW0 - 4);
  R1 = parseInt(canvasW / 2 - lineW1 - lineW0 - 10);
  var ra = parseInt(canvasW / 2 - lineW0 / 2 - 5);
  var canvasH = canvasW;
  var rotateAngle = percent * 360;
  var anotherA = 0;
  if (percent > 0.5) {
    anotherA = (percent - 0.5) * 360 * preA;
  }
  var rotataRadians = preA * rotateAngle;
  canvasC.width = canvasW;
  canvasC.height = canvasH;
  var x = canvasC.width / 2;
  var y = canvasC.height / 2;
  var startAa = -Math.PI / 2;
  var startA = 0;
  var Timer;
  var preSceond = 100 / (Math.PI * 2)

  function CanvasApp() {
    var loading = 0;
    canvasC.setAttribute("data-run", "1")

    function drawScreen() {
      if (startA < rotataRadians) {
        startA += 0.1;
      }
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvasC.width, canvasC.height);
      context.save();
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvasC.width, canvasC.height);
      context.translate(x, y);
      context.rotate(-Math.PI / 2);
      context.beginPath();
      var gradient1 = context.createLinearGradient(R1, 0, -R1, 0);
      context.strokeStyle = circleBottomColor;
      context.lineWidth = lineW1;
      context.arc(0, 0, R1, 0, Math.PI * 2, false);
      context.stroke();
      context.closePath();
      context.beginPath();
      var gradient2 = context.createLinearGradient(R1, 0, -R1, 0);
      gradient2.addColorStop(0, innerColorStart);
      gradient2.addColorStop(1, innerColorEnd);
      context.lineCap = "round";
      context.strokeStyle = gradient2;
      context.lineWidth = lineW1;
      context.arc(0, 0, R1, 0, startA, false);
      context.stroke();
      context.closePath();
      context.beginPath();
      context.strokeStyle = circleBottomColor;
      context.fillStyle = innerColorEnd;
      loading += (10 / (Math.PI * 2));
      var num = loading.toFixed(2);
      if (num > percent * 100) {
        num = percent * 100;
      };
      context.closePath();
      if (startAa < rotataRadians - Math.PI / 2) {
        startAa += 0.1;
        canvasC.setAttribute("data-run", "1")
      } else {
        clearInterval(Timer);
        canvasC.setAttribute("data-run", "0")
      }
      context.save();
      context.setTransform(1, 0, 0, 1, 0, 0);
      var ax = ra * Math.cos(startAa);
      var ay = ra * Math.sin(startAa);
      context.translate(x + ax, y + ay);
      context.rotate(startAa);
      context.restore();
    }
    drawScreen();
    Timer = setInterval(drawScreen, 20)
  }
  CanvasApp()
}
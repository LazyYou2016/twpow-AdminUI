var gulp = require('gulp'); //gulp自身  
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var dist = 'dist/js/'
var plugins = 'dist/js/plugins/'

var paths = [
  dist + 'jquery.js',
  dist + 'bootstrap.js',
  plugins + 'liMarquee/jquery.liMarquee.js', //走马灯无缝滚动插件
  plugins + 'dataTables/jquery.dataTables.min.js', //表格插件
  plugins + 'dataTables/dataTables.bootstrap.min.js', //表格插件
  plugins + 'dataTables/table.js', //表格公共插件
  plugins + 'bootstrap-datetimepicker/bootstrap-datetimepicker.min.js', //日期插件
  plugins + 'bootstrap-datetimepicker/bootstrap-datetimepicker.zh-CN.js', //日期插件
  plugins + 'clipboard/clipboard.min.js', //剪切复制
  plugins + 'echarts/echarts.js', //echarts
  plugins + 'echarts/echarts-util.js', //echarts
  plugins + 'echo/echo.min.js', //图片懒加载
  plugins + 'metisMenu/metisMenu.min.js',
  plugins + 'select2/select2.full.min.js', //select2
  plugins + 'zTree/jquery.ztree.min.js', //树形菜单
  plugins + 'zcircleMove/zcircleMove.js', //圆形进度条
  dist + 'date.js',
  dist + 'common.js'
]


gulp.task('default', function () {
  return gulp.src(paths) //找到项目下paths变量所定义的script文件  
    .pipe(concat('main.min.js')) //输入到all.min.js中  
    .pipe(uglify()) //压缩  
    .pipe(gulp.dest('dist/js/')); //指定目录  
});

// gulp.task('minjs', function () {
//   return gulp.src("dist/js/all.js") //找到项目下paths变量所定义的script文件  
//     .pipe(uglify()) //压缩  
//     .pipe(concat('main.min.js')) //输入到all.min.js中  
//     .pipe(gulp.dest('dist/js/')); //指定目录  
// });

// fnExtend.includFile(filesSrc.plugins, [
// 'layer/layer.js', //layer对话框
// 'liMarquee/jquery.liMarquee.js', //走马灯无缝滚动插件
// 'dataTables/jquery.dataTables.min.js', //表格插件
// 'dataTables/dataTables.bootstrap.min.js', //表格插件
// 'dataTables/table.js', //表格公共插件
// 'select2/select2.min.js', //select2
// 'echo/echo.min.js', //图片懒加载
// 'zcircleMove/zcircleMove.js',
// 'bootstrap-datetimepicker/bootstrap-datetimepicker.min.js', //日期插件
// 'bootstrap-datetimepicker/bootstrap-datetimepicker.zh-CN.js', //日期插件
// 'My97DatePicker/WdatePicker.js', //百度上传控件
// 'zTree/jquery.ztree.min.js' //树形菜单
// ])
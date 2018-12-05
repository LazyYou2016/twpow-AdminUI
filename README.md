# twpow-admin-ui

> twpow-admin-ui 是基于Bootstrap框架, 拓维盛通公司后台管理系统模板, 提炼了典型的业务模型，提供了丰富的功能组件，css提取作为公共代码，百度echarts的二次封装等，它可以帮助你快速搭建企业级中后台产品原型。

## 浏览器支持

现代浏览器和IE 9+。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE9,IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions

## 功能/插件

| 名称 | 版本 | 官方网址 | 备注 |
| --- |--- | --- | --- |
| [Bootstrap](http://www.bootcss.com/) | v3.3.7 | http://www.bootcss.com/ |
| [JQuery](http://jquery.com/) | v1.11.3 |http://jquery.com/| jquery下载所有版本：http://www.jq22.com/jquery-info122
| [JQuery-ui](https://jqueryui.com/) | v1.12.1 | https://jqueryui.com/ | jquery-ui 定制交互部件（Interactions），配合fullcalendar日历拖拽事件
| [DataTables](https://datatables.net/)| ? | https://datatables.net/ | 中文文档：http://www.datatables.club/
| [echarts](http://echarts.baidu.com/) | v4.x | http://echarts.baidu.com/ | 
| [fullcalendar](https://fullcalendar.io/) | v3.8.0 | https://fullcalendar.io/ | 中文文档：https://www.helloweba.net/javascript/445.html
| [lightgallery](http://sachinchoolur.github.io/lightGallery/) | v1.6.11 | http://sachinchoolur.github.io/lightGallery/ | 适用于jQuery的可定制，模块化，响应式灯箱库插件。
| [My97DatePicker](http://www.my97.net/) | v4.8 | http://www.my97.net/ | My97日期控件 

## 目录结构
```
├─dist                  // 静态资源
│  ├─css                // css文件
│  │  ├─base            // 基本
│  │  ├─components      // css组件
│  │  ├─plugins         // 插件css
│  ├─fonts              // 字体
│  │  ├─lightGallery    // lightGallery字体
│  │  └─webfonts        // fontawesome
│  ├─imgs               // 图片
│  │  ├─light           // 灯箱库插件相关图片
│  │  ├─login           // 登陆相关图片
│  │  ├─other           // 其它
│  │  ├─webuploader     // 百度上传相关图片
│  │  └─zTree           // 树插件
│  ├─js                 // JS脚本
│  │  └─plugins         // 插件
│  └─json               // JSON
├─liMarquee             // 无缝滚动插件liMarquee演示
├─zTree                 // zTree DEMO
├─.eslintrc.js          // eslint 配置项
├─.gitignore            // git 忽略项
├─.stylelintrc          // stylelint 配置项
├─favicon.ico           // favicon图标
├─package.json          // package.json
├─index.html            // index.html
└─*.html                // 静态页面
```

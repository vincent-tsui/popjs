# POPJS
`popjs` 是一款开源的基于zepto的移动端弹层组件，可快速开发网站的弹窗效果。

## Basic Usage
1. 引入样式表到你的页面的 `<head>`标签中

    ```html
    <head>
        <link rel="stylesheet" href="animate.min.css">
    </head>
    ```
2. 在zepto之后引入js文件

    ```html
    <script type="text/javascript" src="zepto.min.js"></script>
	<script type="text/javascript" src="pop.min.js"></script>
    ```
3. 现在你可以调用如下列表中的POPJS的API了：
    * pop.alert()
    * pop.confirm()
    * pop.error()
    * pop.loading()
    * pop.clear()

> 本插件支持引入daneden的[animate.css](https://github.com/daneden/animate.css)，使入场方式更自然美观

## API
### 提示框：pop.alert()
```javascript
pop.alert(title, desc, option, fn)
```
* title： 必填，string，提示框的标题
* desc： 必填，string，提示框的描述
* option： 选填，object，提示框的配置文件
    * btnName： 选填，string，按钮的名称
    * className： 选填，string，入场效果的CSS类名，默认为'animated bounceIn'
* fn：选填，function，提示框确认后的回调函数
###### 实例：
```javascript
pop.alert('This is an alert', 'Hi guys', {btnName: 'Hi there', className: 'animated fadeIn'}, function(){
    console.log('You clicked the alert.')
})
```

### 询问框：pop.confirm()
```javascript
pop.confirm(title, desc, option, fn)
```
* title： 必填，string，询问框的标题
* desc： 必填，string，询问框的描述
* option： 选填，object，询问框的配置文件
    * btnName： 选填，array，两个按钮的名称，例如：['我是确定', '我是取消']
    * className： 选填，string，入场效果的CSS类名，默认为'animated bounceIn'
* fn：选填，function，询问框确认后的回调函数，如果用户选择确定则返回true，反之选择取消则返回false
###### 实例：
```javascript
pop.confirm('This is a confirm', 'R U okey?', {btnName : ['Ok', 'No'], className: 'animated fadeIn'}, function(res){
    console.log('You clicked the ' + (res ? 'Ok' : 'No'))
})
```

### 错误信息：pop.error()
```javascript
pop.error(text, option, fn)
```
* text： 必填，string，错误信息内容
* option： 选填，object，错误信息的配置文件
    * sec： 选填，integer，错误信息显示时间，单位秒，默认3秒
    * className： 选填，string，入场效果的CSS类名，默认为'animated flipInX'
* fn：选填，function，错误信息的回调函数，错误信息隐藏后执行
###### 实例：
```javascript
pop.error('This is an error', {sec: 1, className: 'animated fadeIn'},function(){
    console.log('The error is closed.')
})
```

### 加载中：pop.loading()
```javascript
pop.loading(text, option)
```
* text： 必填，string，加载中提示内容
* option： 选填，object，加载中的配置文件
    * className： 选填，string，入场效果的CSS类名，默认为'animated flipInX'
###### 实例：
```javascript
pop.loading('This is a loading', {className: 'animated fadeIn'})
```

### 清除弹层：pop.clear()
```javascript
pop.clear()
```

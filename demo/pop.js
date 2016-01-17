/*

 @Name：pop 移动端弹层组件
 @Author：Vincent Tsui
 @version：0.1
 @Date：2016-01-13
        
 */

window.pop = {
    /*提示框
     *@param title string 确认提示标题
     *@param desc string 确认提示描述
     *@param option object 配置文件(选填)。btnName:按钮的名字(选填),例如:'我是确定'。className:入场效果css类名,默认使用animate.css中的animated bounceIn
     *@param fn function 确认后回调函数(选填)
    */
    alert: function(title, desc, option, fn) {

        var _body = $('body');
        var popShadow = $('<div class="shadow"></div>');
        var popWrap = $('<div class="pop-wrap"></div>');
        var popContent = $('<div class="pop-content"></div>')
            .html('<p class="pop-title">' + title + '</p><p class="pop-describe">' + desc + '</p>')
            .appendTo(popWrap);

        var popButtonBox = $('<div class="pop-button-box"></div>');

        var btnName = '好的',
            className = 'animated bounceIn';
        if (typeof option === 'object') {
            btnName =  option.btnName ? option.btnName : btnName;
            className = option.className ? option.className : className;
        };
        var callback = typeof btnName === 'function' ? btnName : typeof fn === 'function' ? fn : '';

        $('<span class="pop-button pop-button-close pop-button-single">' + btnName + '</span>').on('click', function(){
                pop.clear();
                callback && callback();
            })
            .appendTo(popButtonBox);

        popButtonBox.appendTo(popWrap);
        showPop(popWrap, className, 1);
    },

    /*询问框
     *@param title string 确认提示标题
     *@param desc string 确认提示描述
     *@param option object 配置文件(选填)。btnName:两个按钮的名字,例如:['我是确定', '我是取消']。className:入场效果css类名,默认使用animate.css中的animated bounceIn
     *@param fn function 确认后回调函数(选填)
     *@return boolean 确认:true, 取消:false
    */
    confirm: function(title, desc, option, fn) {

        var popWrap = $('<div class="pop-wrap"></div>');
        var popContent = $('<div class="pop-content"></div>')
            .html('<p class="pop-title">' + title + '</p><p class="pop-describe">' + desc + '</p>')
            .appendTo(popWrap);

        var popButtonBox = $('<div class="pop-button-box"></div>');

        var btnName = ['确认', '取消'],
            className = 'animated bounceIn';
        if (typeof option === 'object') {
            btnName =  option.btnName ? option.btnName : btnName;
            className = option.className ? option.className : className;
        };
        var callback = typeof option === 'function' ? option : typeof fn === 'function' ? fn : '';

        $('<span class="pop-button pop-button-close pop-button-double">' + btnName[0] + '</span>').on('click', function(){
                pop.clear();
                callback && callback(true);
            })
            .appendTo(popButtonBox);

        $('<span class="pop-button pop-button-close pop-button-double">' + btnName[1] + '</span>').on('click', function(){
                pop.clear();
                callback && callback(false);
            })
            .appendTo(popButtonBox);

        popButtonBox.appendTo(popWrap);
        showPop(popWrap, className, 1);
    },

    /*错误信息提示
     *@param text string 错误信息文本
     *@param option object 配置文件(选填)。sec:错误信息显示时间，单位秒，默认3秒。className:入场效果css类名,默认使用animate.css中的animated flipInX
     *@param fn function 错误信息关闭后执行的回调函数
    */
    error: function (text, option, fn) {
        var _body = $('body');
        var popError = $('<div class="pop-wrap-error">' + text + '</div>');
        $('.pop-wrap-error').remove();
        var sec = 3,
            className = 'animated flipInX';
        if (typeof option === 'object') {
            sec =  option.sec ? option.sec : sec;
            className = option.className ? option.className : className;
        };
        var callback = typeof option === 'function' ? option : typeof fn === 'function' ? fn : '';
        showPop(popError, className);
        setTimeout(function() {
            popError.remove();
            callback && callback();
        },sec * 1000);
    },

    /*加载中信息提示
     *@param text string 读取中提示信息
     *@param option object 配置文件(选填)。className:入场效果css类名,默认使用animate.css中的animated flipInX
    */
    loading: function (text, option) {
        var _body = $('body');
        var popLoading = $('<div class="pop-loading"></div>');
        var popContent = $('<p>' + text + '</p>');
        var popLoadingEffect = $('<div class="pop-loading-effect"><i class="bounce1"></i><i class="bounce2"></i><i class="bounce3"></i><i class="bounce4"></i><i class="bounce5"></i><i class="bounce6"></i></div>');
        var className = 'animated flipInX';
        if (typeof option === 'object') {
            className = option.className ? option.className : className;
        };
        popLoading.append(popContent).append(popLoadingEffect);
        showPop(popLoading, className);
    },

    /*
     *清除所有pop弹层
    */
    clear: function () {
        $('.shadow, .pop-wrap, .pop-wrap-error, .pop-loading').remove();
    }

};

/*
 *修正元素的定位，使之绝对定位于页面中间
 *@param e object 目标元素
*/
function popOffset (e){
    var popHeight = e.height();
    var popWidth = e.width();
    e.css({'margin-top': -popHeight / 2, 'margin-left': -popWidth / 2});
}
/*
 *返回元素距离页面顶端的距离和左边的距离
 *@param e object 目标元素
 *@return array [左边距，顶边距]
*/
function getElementOffset(e){
    return [e.offset().left,e.offset().top];
}
/*
 *显示弹窗
 *@param obj object 目标元素
 *@param className string 动画类名,例如:'animated bounceIn'
 *@param needShadow boolean 是否需要阴影遮盖,需要:true,不需要:false
*/
function showPop(obj, className, needShadow){
    var popShadow = $('<div class="shadow"></div>'),
        _body = $('body');
    needShadow && popShadow.appendTo(_body).show().addClass('animated fadeIn');
    obj.appendTo(_body).show();
    popOffset(obj);
    obj.addClass(className);
}

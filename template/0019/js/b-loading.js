 
//获取浏览器页面可见高度和宽度
var _PageHeight = document.documentElement.clientHeight,
    _PageWidth = document.documentElement.clientWidth;
//计算loading框距离顶部和左部的距离（loading框的宽度为140px，高度为140px）
var _LoadingTop = _PageHeight > 140 ? (_PageHeight - 140) / 2 : 0,
    _LoadingLeft = _PageWidth > 140 ? (_PageWidth - 140) / 2 : 0;
//在页面未加载完毕之前显示的loading Html自定义内容
// var _LoadingHtml = '<div id="loadingDiv" style="position:absolute;left:0;width:100%;height: 100% ;top:0;background:rgba(30, 30, 40, 0.98);opacity:1;filter:alpha(opacity=80);z-index:999999;"><div style="text-align: center;padding: 0;margin: 0;position: relative;width: 100%;height: 100%;color: #fff;"><img style="" src="static/images/headloading.gif"></div></div>';
//呈现loading效果
// document.write(_LoadingHtml);
 
//window.onload = function () {
//    var loadingMask = document.getElementById('loadingDiv');
//    loadingMask.parentNode.removeChild(loadingMask);
//};
var meet_time = localStorage.getItem("meet_time");
var flag = false;
if(meet_time == null || new Date().getTime() - meet_time.time > 1000 * 60 * 30) { // 大于三十分钟则重新进入
    flag = true;
}
meet_time = {
    "time" : new Date().getTime()
}
localStorage.setItem("meet_time",meet_time);
//监听加载状态改变
document.onreadystatechange = completeLoading;
 
//加载状态为complete时移除loading效果
function completeLoading() {
    if (document.readyState == "complete" || flag) {
        if(flag) {
            setTimeout("remove_mask()", 3000);
        }else {
            remove_mask();
        }
    }
}

function remove_mask() {
    var loadingMask = document.getElementById('loadingDiv');
    loadingMask.parentNode.removeChild(loadingMask);
}
// JavaScript Document
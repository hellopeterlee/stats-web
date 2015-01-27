$(function () {

});

//获得浏览器参数
$.extend({
    getUrlVars: function () {
        var vars = [],
            hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function (name) {
        return $.getUrlVars()[name];
    }
});

//封装浏览器参数
var composeUrlParams = function () {
    var param = '';
    $.each($.getUrlVars(),
        function (i, item) {
            if (item != 'p') {
                var val = $.getUrlVar(item);
                if (val) param += "&" + item + "=" + val;
            }
        });
    return param;
}

var renderChart = function(chartType){
    var myChart = new FusionCharts("/javascripts/FusionCharts/"+chartType+".swf", "myChartId", "100%", "500",0);
    myChart.setJSONData(chartData);
    myChart.render("chartContainer");
}

var renderChartEx = function(chartType,chartContainer,charJSONData,w,h){
    var myChart = new FusionCharts("/javascripts/FusionCharts/"+chartType+".swf", "myChartId", w, h,0);
    myChart.setJSONData(charJSONData);
    myChart.render(chartContainer);
}
$(function(){
    var myChart = new FusionCharts("/javascripts/FusionCharts/Line.swf", "myChartId", "100%", "500",0);
    myChart.setJSONData(chartData);
    myChart.render("chartContainer");
});
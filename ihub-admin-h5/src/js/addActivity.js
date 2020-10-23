/*
 * @Author: LiuGuangMing 
 * @Date: 2018-08-27 14:43:31 
 * @Last Modified by: LiuGuangMing
 * @Last Modified time: 2018-09-13 17:04:32
 */
require('./template');

require('../css/addActivity.scss');

var WdatePicker =  require('../plugins/WdatePicker/WdatePicker');

$(function(){
    
    //时间控件
    $(".timeList").on("click",".WdatePickerYY",function(){
        
        WdatePicker.WdatePicker({dateFmt: "yyyy-MM-dd HH:mm:ss"});
    });

    $(".timeList").on("click",".WdatePickerHH",function(){
        
        WdatePicker.WdatePicker({dateFmt: "HH:mm:ss"});
    });

    //时间段选择
    $(".timeChecked").on("click","button",function(){
    
        var index = $(this).index();

        $(this).siblings().removeClass("on");

        $(this).addClass("on");
        
        if($(this).parent("div").hasClass("type")){

            return false;
        }
        
        if(index!=2){

            $(this).closest("div.list-item").next("div").slideDown();

        }else{

            $(this).closest("div.list-item").next("div").slideUp();

            return;
        }
        if(index == 0){

            $(".hh").hide();

            $(".yy").show();

            $(".timeList .list-item:eq(1)").slideUp();

        }else if(index==1){

            $(".yy").hide();

            $(".hh").show();

            $(".timeList .list-item:eq(1)").slideDown();
        }
        
        $(".timePicker input:eq(0)").val("开始日期    时间");

        $(".timePicker input:eq(1)").val("结束日期    时间");
    });

    //添加时间段
    $(".timeList").on("click",".addTime",function(){

        var len = $(this).parent(".timePicker").index()+1;

        var el = $(this).closest("div").clone();
        
        el.find("input:eq(0)").attr("name","activity_time["+len+"][begin_time]");

        el.find("input:eq(1)").attr("name","activity_time["+len+"][end_time]");

        el.hide();

        $(this).closest("div").after(el);

        el.slideDown();
    });

    //删除时间
    $(".timeList").on("click",".delTime",function(){
        
        $(this).closest("div").slideUp(function(){

            $(this).remove();
        });
    });

    //周选择展开
    $(".timePicker.week").on("click",function(e){
        
        $(".dataList ul li").removeClass();
        
        $(".dataList").slideDown(200);

        $.each($(".timePicker.week span"),function(){

            $this = $(this);

            $.each($(".dataList ul li"),function(){

                if($(this).text()==$this.text()){
                    
                    $(this).addClass("on");
                }
            });
        });

        e.stopPropagation();
    });

    //周选择删除
    $(".timePicker.week").on("click","span i",function(){
        
        $(this).parent("span").remove();
    });

    //周选择创建
    $(".timeList .dataList").on("click","li",function(e){

        var text = $(this).text();

        try{
            $.each($(".timePicker.week span"),function(){

                if($(this).attr("name")==text){
    
                    throw "";
                }
            });
        }
        catch(err){
            
            return false;
        }
        
        $(".timePicker.week").append("<span name="+text+">"+text+"<i></i></span>");

        $(this).addClass("on");
        
        e.stopPropagation();
    });

    //添加步骤
    $(".addActivity").on("click","span",function(){

       var len = $(".stepList").length;

       var el = $(".stepList:eq(0)").clone();

       el.find("input[type='hidden']:eq(0)").attr("name","flows["+len+"][type]");

       el.find("input[type='hidden']:eq(1)").attr("name", "flows[" + len + "][tmp_id]");

       el.find("input").val("");

       el.find("label").find("i").text($(".stepList").length+1);

       el.hide();

       $(".items.select").append(el);

       el.slideDown();
    });
    
    //展开下拉列表
    $(".items.select").on("click","li input",function(e){
        
        $(".items.select .dataList").stop(true,false);
        
        //$(".items.select .dataList").slideUp();

        $(this).next(".dataList").slideToggle();

        if($(this).parent("li").hasClass("on")){

            $(this).parent("li").removeClass("on");
        }
        else{

            $(this).parent("li").addClass("on");
        }
        e.stopPropagation();
    });

    //下拉列表项
    $(".items.select").on("click",".dataList li",function(){

       $(this).parent("ul").prev("input").val($(this).text());
    });

    //设置步骤删除
    $(".select").on("click",".stepList .del",function(){
        
        var $this = $(this);
        
        $(this).closest(".stepList").slideUp(function(){

            $this.closest(".stepList").remove();

            $.each($(".stepList"),function(){
                
                $(this).find("label").find("i").text($(this).index());
            });
        });
    });
});
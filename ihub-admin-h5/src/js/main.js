/*
 * @Author: LiuGuangMing 
 * @Date: 2018-04-11 11:17:54 
 * @Last Modified by: LiuGuangMing
 * @Last Modified time: 2018-10-15 10:29:21
 */
//引入pjax
//require("../plugins/jquery.pjax");
//公共css
import '../css/main.scss';

window.$ = require("jquery");

window.HOST = ""; //https://ihubwg.smgtech.net

$(function () {
    //用户信息
    $(".userName").on("click", function (e) {

        $(".organi").stop(false, true);

        if ($(".organi").css("display") == "block") {

            $(this).find("i").css({
                "transform": "rotate(0deg)"
            });

            $(this).closest("div").removeClass("on");

        } else {

            $(this).find("i").css({

                "transform": "rotate(180deg)"
            });

            $(this).closest("div").addClass("on");
        }
        $(".organi").slideToggle(300);

        e.stopPropagation();
    });
    $(document).on("click", function () {

        $(".userName i").css({
            
            "transform": "rotate(0deg)"
        });

        $(".organi").slideUp(300);

        $(".userNav").removeClass("on");

        $(".flow-item").fadeOut();

        $(".dataList").slideUp(200);

        $(".items.select .stepList li").removeClass("on");
    });
    $(".organi").on("click", function (e) {

        e.stopPropagation();
    });
    //组织信息
    $(".organi").on("mouseover", ".content .dep div", function () {

        $(this).closest("dl").siblings().removeClass("on");

        $(this).closest("dl").addClass("on");
    });
    $(".organi").on("mouseout", ".content .dep div", function () {

        $(".content dl").removeClass("on");
    });
    //设置and退出
    $(".setting").on("click", "li", function () {

        $(".organi span,.setting li").removeClass("on");

        $(this).addClass("on");

    });
    //菜单开关
    $(".menu").on("click", function () {

        if ($("aside").css("margin-left") == 0 + "px") {

            $("aside").animate({
                "margin-left": -190 + "px"
            });

            $("article").animate({
                "margin-left": 0
            });

            $(this).addClass("on");
        } else {

            $("aside").animate({
                "margin-left": 0 + "px"
            });

            $("article").animate({
                "margin-left": 190 + "px"
            });

            $(this).removeClass("on");
        }
    });
    //菜单点击样式
    $("aside").on("click", ".menus li span", function () {

        $(".menus li").removeClass("on");

        var $this = $(this).next("dl");

        if ($this.length > 0) {

            $(this).parent("li").addClass("slide on");

            $this.slideToggle(300, function () {

                if ($this.css("display") == "none") {

                    $this.parent("li").removeClass("slide");

                    return false;
                }
            });
        } else {
            $(".menus li dl li").removeClass("on");

            $(this).closest("li").addClass("on");

            $(this).closest(".slide").addClass("on");
        }
    });
    //添加图片操作
    $(".pjax").on("click", ".list-item .handled span,.list-item .setupButtn span", function () {
        
        $(this).next("input[type=file]").val("");

        $(this).next("input").click();
    });
    //添加背景图
    $(".pjax").on("click", ".upBg span", function () {

        $(this).next("input[type=file]").val("");

        $(this).next("input").click();
    });
    //输入统计
    $(".pjax").on("keyup", ".list-item>li>input,.list-item>li>textarea", function () {

        if ($(this).next("i").length > 0) {

            $(this).next("i").text($(this).val().length + "/35");
        }

        $(this).closest(".list-item").removeClass("on");
    });
    //通用radio选择
    $(".pjax").on("click", ".checked", function () {
       
        $(this).parent("li").find("span").removeClass("on");

        $(this).parent("li").find("span").find("input").prop("checked", false);

        $(this).addClass("on");

        $(this).find("input").prop("checked", true);

        if ($(this).next("input").length > 0) {

            $(this).next("input").attr("disabled", false);

            $(this).next("input").addClass("on");

        } else {

            $(this).parent("li").find("input[type=text]").attr("disabled", true);

            $(this).parent("li").find("input[type=text]").removeClass("on");
        }
    });
    //通用checkbox
    $(".pjax").on("click", ".opt", function () {

        if ($(this).find("input").attr("checked")) {

            $(this).find("input").attr("checked", false);

            $(this).removeClass("on");

        } else {

            $(this).find("input").attr("checked", true);

            $(this).addClass("on");
        }
    });
    //按钮yes or no
    $(".pjax").on("click", ".showBtn span", function () {

        if ($(this).hasClass("on")) {

            $(this).removeClass("on");

            if ($(this).hasClass("rule")) {

                $(this).closest(".list-item").next(".list-item").slideUp();
            }

        } else {
            $(this).addClass("on");

            if ($(this).hasClass("rule")) {

                $(this).closest(".list-item").next(".list-item").slideDown();
            }
        }
    });
    //颜色选择
    $(".pjax").on("keyup", ".setColor input", function () {

        $(this).css("color", $(this).val());
        
        $(this).next("i").css("background", $(this).val());
    });
    //window提示窗
    window.dialog = function(text,boolean){

        $(".dialog.window").remove();
        
        $("article").append('<div class="dialog window">' +
            '<div class="content">' +
            '<h4>提示 <span class="exit"></span></h4>' +
            '<div class="text">' +
            '<span>' + text + '</span>' +
            '</div>' +
            '<div class="d-foot">' +
            '<button class="enter">确认</button>' +
            '<button class="off exit">取消</button>' +
            '</div>' +
            '</div>' +
            '</div>');

        $("body").unbind().on("click",".window .d-foot button",function(){

            if($(this).hasClass("enter")){

                boolean(true);

            }else{

                boolean(false);
            }

            $(".dialog.window").fadeOut();
        });
    };
});
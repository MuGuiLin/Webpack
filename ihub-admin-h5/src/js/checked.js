/*
 * @Author: LiuGuangMing 
 * @Date: 2018-06-12 10:35:41 
 * @Last Modified by: LiuGuangMing
 * @Last Modified time: 2018-10-15 16:44:35
 */
import {
    interfaceConfig
} from './InterfaceConfig';
//公共JS
import './main';
//审核css
import '../css/checked.scss';
//引入vue
import Vue from "vue";
//引入jquery.qrcode
import qrcode from 'jquery.qrcode';
// 引入富文本
require("../plugins/Ueditor/ueditor.config.js");

require("../plugins/Ueditor/ueditor.all.min.js");
//get参数
var getString = function (name) {

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");

    var r = window.location.search.substr(1).match(reg);

    if (r != null) return unescape(r[2]);

    return null;
}
var fileName = getString("type");

window.initialUEditor = function (id, text) {

    var ue = UE.getEditor(id, {

        toolbars: [

            //['bold', 'italic', 'underline', 'forecolor']
        ],

        autoFloatEnabled: false,

        autoHeightEnabled: false,

        elementPathEnabled: false,

        wordCount: false,

        maximumWords: 1000,

        readonly: true
    });

    ue.ready(function () {

        if (text) {

            ue.setContent(text);
        }
        // $("#editor-" + id).slideUp();
    });
}

//审核列表
var getCheckedList = null;

var menu = new Vue({

    el: "#menu",

    data: {

        menuPending: null
    }
})
var app = new Vue({

    el: ".pjax",

    data: {

        listData: null,

        host: null,

        flowInfo: null,

        checkedId: null,

        checkedType: null,

        checkedRemark: null,

        qrcode: null,

        side_status: null,

        searchInfo: null,

        pageCount: null,

        pages: 1
    },
    mounted: function () {
        //获取审核列表
        getCheckedList = function (type, page, key) {

            $.ajax({

                url: interfaceConfig.checked,

                type: "POST",

                dataType: "JSON",

                data: {

                    status: type,

                    keyword: key,

                    page: page
                },
                success: function (res) {

                    app.listData = res.list;

                    app.host = res.baseUrl;

                    app.pageCount = res.pageCount;

                    app.pages = page;
                },
                error: function (XMLHttpRequest,textStatus,errorThrown) {

                    console.log("错误:" + XMLHttpRequest+";"+textStatus+";"+errorThrown);
                }
            });
        }
        //初始化列表
        this.side_status = $("#side_status").val();
        
        getCheckedList(this.side_status,1);
    },
    methods: {

        getFlowInfo: function (t, id) {
            //获取流程信息
            $.ajax({

                url: interfaceConfig.getFlowInfo,

                type: "POST",

                dataType: "JSON",

                data: {

                    type: t,

                    tmp_id: id
                },
                success: function (res) {

                    app.flowInfo = res.dom;
                },
                error: function (XMLHttpRequest,textStatus,errorThrown) {

                    console.log("错误:" + XMLHttpRequest+";"+textStatus+";"+errorThrown);
                }
            });
        },

        postId: function (id, n) {

            app.checkedId = id;

            app.checkedType = n;
        },
        checkedPost: function () {

            if (app.checkedType == 0) {

                if (!app.checkedRemark) {

                    $(".dialog .info").text("该项为必填项，请填写审核意见").addClass("red");

                    return;
                }
            }
            //审核通过
            $.ajax({

                url: interfaceConfig.checkedPost,

                type: "POST",

                dataType: "JSON",

                data: {

                    activityId: app.checkedId,

                    remark: app.checkedRemark,

                    status: app.checkedType
                },
                success: function (res) {

                    if (res.state == 0) {

                        alert(res.message);

                        return;
                    }

                    $(".exit").click();

                    getCheckedList(app.side_status);
                },
                error: function (XMLHttpRequest,textStatus,errorThrown) {

                    console.log("错误:" + XMLHttpRequest+";"+textStatus+";"+errorThrown);
                }
            });
        },
        //预览
        toPreview: function (str) {

            app.qrcode = str;

            $("#qrcode").empty();

            $('#qrcode').qrcode({

                width: 128,

                height: 128,

                text: str
            });
        },
        //上线下线操作
        onlineOroffline: function (id) {

            dialog("确认通过?", function (str) {

                if (!str) {

                    return;

                } else {

                    $.ajax({

                        url: interfaceConfig.onlineOrOffline,

                        type: "POST",

                        dataType: "JSON",

                        data: {

                            activityId: id
                        },
                        success: function (res) {

                            if (res.state == 0) {

                                alert(res.message);

                                return;
                            }

                            getCheckedList(app.side_status);
                        },
                        error: function (XMLHttpRequest,textStatus,errorThrown) {

                            console.log("错误:" + XMLHttpRequest+";"+textStatus+";"+errorThrown);
                        }
                    });
                }
            });
        },
        //活动提交审核
        operatePost: function(id){
            
            dialog("确认提交?", function (str) {

                if (!str) {

                    return;

                } else {

                    $.ajax({

                        url: interfaceConfig.operatePost,

                        type: "POST",

                        dataType: "JSON",

                        data: {

                            activityId: id
                        },
                        success: function (res) {

                            if (res.state == 0) {

                                alert(res.message);

                                return;
                            }

                            getCheckedList(app.side_status);
                        },
                        error: function (XMLHttpRequest,textStatus,errorThrown) {

                            console.log("错误:" + XMLHttpRequest+";"+textStatus+";"+errorThrown);
                        }
                    });
                }
            });
        },
        operateDel: function(id){

            dialog("确认删除?", function (str) {

                if (!str) {

                    return;

                } else {

                    $.ajax({

                        url: interfaceConfig.operateDel,

                        type: "POST",

                        dataType: "JSON",

                        data: {

                            activityId: id
                        },
                        success: function (res) {

                            if (res.state == 0) {

                                alert(res.message);

                                return;
                            }

                            getCheckedList(app.side_status);
                        },
                        error: function (XMLHttpRequest,textStatus,errorThrown) {

                            console.log("错误:" + XMLHttpRequest+";"+textStatus+";"+errorThrown);
                        }
                    });
                }
            });
        },
        operateLook: function(id){
            //获取查看信息
            $.ajax({

                url: interfaceConfig.operateLook,

                type: "POST",

                dataType: "JSON",

                data: {

                    activityId: id
                },
                success: function (res) {

                    app.flowInfo = res.dom;
                },
                error: function (XMLHttpRequest,textStatus,errorThrown) {

                    console.log("错误:" + XMLHttpRequest+";"+textStatus+";"+errorThrown);
                }
            });
        },
        //搜索
        search: function () {

            getCheckedList(app.side_status, 1,app.searchInfo);
        },
        //上一页
        prev: function(){

            if(app.pages <= 1){

                return;

            }else{

                app.pages--;

                getCheckedList(app.side_status, app.pages,app.searchInfo);
            }
        },
        //下一页
        next: function(){

            if(app.pages >= app.pageCount){

                return;

            }else{

                app.pages++;

                getCheckedList(app.side_status, app.pages,app.searchInfo);
            }
        },
        //跳转
        inset: function(el){

            var page = $(el.target).prev("input").val();
            
            if(!page || page<=1 || page>app.pageCount){

                return;
            }
            getCheckedList(app.side_status, page,app.searchInfo);
        }
    },
    watch:{

        listData: function(){

            this.$nextTick(function(){
            //监控菜单数据提醒
                $.ajax({

                    url: interfaceConfig.getPending,

                    type: "POST",

                    dataType: "JSON",

                    success: function(res){

                        if(res.state==0){

                            return;
                        }
                        menu.menuPending = res.pending;
                    },
                    error: function (XMLHttpRequest,textStatus,errorThrown) {

                        console.log("错误:" + XMLHttpRequest+";"+textStatus+";"+errorThrown);
                    }
                })
            });
        }
    }
});

$(function () {
    //搜索
    $(".pjax").on("keydown",".search input",function(ev){

        if(ev.keyCode == 13){

            app.search();
        }
    });
    var dialog = function (str) {

        var $this = $(".operation");

        $this.find(".t").text(str.t);

        $this.find(".info").text(str.i);

        $this.find("#post").text(str.b);

        $this.removeClass().addClass("dialog operation");

        $this.addClass(str.s);

        $this.fadeIn();
    };
    //待审核
    $(".pjax").on("click", ".search i", function () {

        $(this).prev("input").val("");
    });
    //通过操作
    $(".pjax").on("click", ".success", function () {

        dialog({
            "t": "确认通过",
            "i": "选填",
            "b": "通过",
            "s": "s"
        });

        $(".operation").attr("id", $(this).closest("dl").attr("data-id"));
    });
    //退回操作
    $(".pjax").on("click", ".list-item span .exit", function () {

        dialog({
            "t": "确认退回",
            "i": "必填",
            "b": "退回",
            "s": "e"
        });

        $(".operation").attr("id", $(this).closest("dl").attr("data-id"));
    });
    //数据预览
    $(".pjax").on("click", ".toData", function () {

        var el = $(this).closest("span").prev(".btnFlow").html();

        $(".dataFlow").html(el);
        
        $(".dataFlow button:eq(0)").addClass("on");
        
        $(".dialog.data").fadeIn();
    });
    $(".dataFlow").on("click","button",function(){

        $(this).siblings("button").removeClass("on");

        $(this).addClass("on");
        
        var url = $(this).attr("url");

        $("#dataFlow").attr("src",url);
    });
    //预览
    $(".pjax").on("click", ".toPreview", function () {
       
        var el = $(this).closest(".btnFlow").clone();

        el.find("span").remove();

        $(".preview .tp").html(el.html());

        $(".preview").fadeIn();
    });
    //弹窗操作
    $(".pjax").on("click", ".dialog .exit", function () {
        
        //$('.video').get(0).pause();

        $(".dialog").fadeOut(function () {

            $("#checkedText").val("");

            $(".info").removeClass("red");

            $("#checkedText").next("span").find("i").text(0);
        });
    });
    //审核意见文字统计
    $(".pjax").on("keyup", "#checkedText", function () {

        $(".dialog.e .info").removeClass("red").text("必填");

        if ($(this).val().length > 108) {

            //var num = $(this).val().substr(0, 108);

            //$("#checkedText").val(num);

            $(this).addClass("warning");
        }else{
            
            $(this).removeClass("warning");
        }
        $(this).next("span").find("i").text($(this).val().length);
    });
    //获取焦点
    $(".pjax").on("focus", "#checkedText", function () {

        $(this).addClass("on");
    });
    $(".pjax").on("blur", "#checkedText", function () {

        $(this).removeClass("on");
    });
    //确认退回
    $(".pjax").on("click", "#post", function () {

        if (!$(".operation").hasClass("s")) {

            if ($("#checkedText").val().length < 1) {

                $(".dialog .info").addClass("red").text("该项为必填项，请填写审核意见");

                return false;
            }
        }
    });
    //显示流程
    var windowHeight = $(window).height();

    $(".pjax").on("mouseover", ".flow", function () {

        var $this = $(this).closest("dl").find(".flow-item");

        $this.stop(true, true);

        var OI = $this.find(".top").find("div").find("i");

        var OLi = $this.find(".top").find("dl").find("li");

        var OLiOn = $this.find(".top").find("dl").find("li.on");

        if (OI.width() == 0) {
            
            OI.css("width", $this.width() / OLi.length * OLiOn.length - $this.width() / OLi.length / 2);
        }
        //底部显示调整
        var scrollTop = $(this).offset().top;

        var itemHeight = $(this).closest("dl").find(".flow-item").height() + 20;

        if (windowHeight - scrollTop - 30 <= itemHeight) {

            $(this).closest("dl").find(".flow-item").addClass("on");
        }

        $this.fadeIn();
    });
    $(".pjax").on("mouseout", ".flow", function () {

        var $this = $(this).closest("dl").find(".flow-item");

        $this.fadeOut();
    });
    //审核流程预览
    $(".pjax").on("click", ".btnFlow>button,.toSetting", function () {

        $(".dialog.flow h3 span:eq(0)").text($(this).text());

        $(".dialog.flow").fadeIn();
    });
});
/*
 * @Author: LiuGuangMing 
 * @Date: 2018-06-12 10:33:01 
 * @Last Modified by: LiuGuangMing
 * @Last Modified time: 2018-10-15 17:01:21
 */
import {
    interfaceConfig
} from './InterfaceConfig';
//公共JS
import './main';
//模板css
import '../css/template.scss';
// 引入富文本
require("../plugins/Ueditor/ueditor.config");

require("../plugins/Ueditor/ueditor.all.min");

require("../plugins/jquery-colpick/css/colpick.css");

require("../plugins/jquery-colpick/js/colpick");

$(function () {

    window.setColor = function(){

        $(".setColor").colpick({

            layout: 'hex',
    
            submit: 0,
    
            onChange: function (hsb, hex, rgb, el) {
				
				let name = $(el).find("input").attr("name");
				
				$(el).find("input").remove();
				
				$(el).append("<input type='text' name='"+name+"'/>");
				
                $(el).find("input").val("#" + hex);
    
                $(el).find("input").css("color", "#" + hex);

                $(el).find("i").css("background", "#" + hex);
            }
        });
    };
    
    setColor();
    //注册添加选项
    $(".regMode").on("click", ".add", function () {

        $.each($(".regMode .item"), function () {

            var $thisId = $(this).attr("data-id");

            $.each($(".dialog .d-center li"), function () {

                if ($(this).attr("data-id") == $thisId) {

                    $(this).hide();
                }
            });
        });

        $(this).closest("li").addClass("in");

        $(".dialog").fadeIn();

        setTimeout(()=>{

            window.setColor();
        },500)
    });
    //删除
    $(".regMode").on("click", ".del", function () {

        $(this).closest("li").slideUp(function () {

            $(this).remove();
        });
    });
    //向下移动
    $(".regMode").on("click", ".down", function () {

        var $this = $(this).closest("li").clone();

        $this.hide();

        $(this).closest("li").slideUp(function () {

            $(this).closest("li").next("li").after($this);

            $(this).remove();

            $this.slideDown();
        });
    });
    //向上移动
    $(".regMode").on("click", ".up", function () {

        var $this = $(this).closest("li").clone();

        $this.hide();

        $(this).closest("li").slideUp(function () {

            $(this).closest("li").prev("li").before($this);

            $(this).remove();

            $this.slideDown();
        });
    });

    var dialogReset = function () {

        $(".dialog .d-center li label").removeClass("on");

        $(".dialog .d-center li input").prop("checked", false);

        $(".regMode .item").removeClass("in");

        $(".dialog .d-center li").show();
    }
    //确认
    $(".enter").click(function () {
        //创建新增
        $.each($(".dialog .d-center li label.on"), function () {

            $(".regMode .item.in").after('<li class="item" data-id=' + $(this).closest("li").attr("data-id") + '>' +
                '<label>' + $(this).next("span").text() + '</label>' +
                '<span class="checked on"><input type="radio" checked value="1" name=' + $(this).find("input").attr("name") + '></span>' +
                '<span class="checked"><input type="radio" value="2" name=' + $(this).find("input").attr("name") + '></span>' +
                '<span>' +
                '<i class="add"></i>' +
                '<i class="del"></i>' +
                '<i class="up"></i>' +
                '<i class="down"></i>' +
                '</span>' +
                '</li>');
        });

        $(".dialog").fadeOut(function () {

            dialogReset();
        });
    });
    //关闭弹窗
    $(".pjax").on("click", ".dialog .close", function () {

        $(".dialog").fadeOut(function () {

            $("#video").trigger("pause");

            dialogReset();
        });
    });
    //选项checked 模拟
    $(".checkbox").on("change", "input", function () {

        if ($(this).prop("checked") == true) {

            $(this).parent("label").addClass("on");
        } else {
            $(this).parent("label").removeClass("on");
        }
    });
    //颜色选择
    //$(".setColor").append("<i></i>");
    //上传图片
    $(".pjax").on("change", ".imgFile", function () {

        var $this = $(this);
        
        fileUpLoad($(this), function (str) {

            $this.value = str;
			
			let name = $this.next("input").attr("name");
			
			$this.next("input").remove();
			
			$this.after("<input type='text' name='"+name+"'/>");
			
            $this.next("input").val(str);

            $this.closest(".handled").prev("li").find("img").remove();
            
            $this.closest(".handled").prev("li").append("<img src='' />");
            
            $this.closest(".handled").prev("li").find("img").attr("src", HOST + str);

            $this.closest(".handled").prev("li").addClass("img");
        });
    });
});
//富文本
window.initialUEditor = function (id, text, tool) {

    var tools = [
        ['bold', 'italic', 'underline', 'forecolor']
    ];

    if (tool == 7) {

        tools = [
            ['bold', 'italic', 'underline', 'forecolor', 'justifyleft', 'justifycenter', 'justifyright']
        ];
    }
    if (tool == 38) {

        tools = [
            [
                'fullscreen', 'undo', 'redo', '|',
                'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                'directionalityltr', 'directionalityrtl', 'indent', '|',
                'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
                'imageleft', 'imagecenter', 'imageright', 'imagenone', '|',
                'simpleupload', 'music', 'insertvideo', 'insertimage'
            ]
        ];
    }
    var ue = UE.getEditor("editor-" + id, {

        toolbars: tools,

        autoFloatEnabled: false,

        autoHeightEnabled: false,

        elementPathEnabled: false,

        wordCount: false,

        maximumWords: 1000
    });

    ue.ready(function () {

        if (text) {

            ue.setContent(text);
        }
        // $("#editor-" + id).slideUp();
    });
}

//上传文件
window.fileUpLoad = function (el, url) {

    var $this = el;

    var fs = $this.get(0).files[0];

    var formData = new FormData($('form')[0]);

    formData.append('file', fs);

    $.ajax({

        url: interfaceConfig.postImage,

        type: "POST",

        dataType: "json",

        processData: false,

        contentType: false,

        data: formData,

        success: function (str) {

            if (str.status == 0) {

                alert("图片上传失败,请重新上传");

                return false;
            }

            return url(str.saveUrl);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            console.log("错误:" + XMLHttpRequest+";"+textStatus+";"+errorThrown);
        }
    });
}
//字母过滤器
export var lowerCase = function(n){

    var string = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

    return string[n];
}
//数字过滤器
var numberCase = function(n){

    var number = ["一","二","三","四","五","六","七","八","九","十"];
}
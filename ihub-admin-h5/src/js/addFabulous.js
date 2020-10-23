/*
 * @Author: LiuGuangMing 
 * @Date: 2018-07-30 16:49:47 
 * @Last Modified by: LiuGuangMing
 * @Last Modified time: 2018-10-10 11:08:10
 */
import {interfaceConfig} from './InterfaceConfig';
//引入vue
import Vue from 'vue';
//模板公共模块
import './template';

//get参数
function getString(name) {

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");

    var r = window.location.search.substr(1).match(reg);

    if (r != null) return unescape(r[2]);

    return null;
}

//点赞项
var app = new Vue({

    el: "#fabulous",

    data: {

        fabulousData: null,

        host: null
    },
    watch: {

        fabulousData: function () {

            this.$nextTick(function () {

                $.each(this.fabulousData, function (j, obj) {

                    initialUEditor(j + 1, obj.introduce_details);
                });

                setTimeout(()=>{

                    window.setColor();
                },500)
            });
        }
    }
});

$(function () {
    //点赞初始化
    var modelId = $("#model_id").val();

    $.ajax({

        url: interfaceConfig.thumbsUp,

        type: "POST",

        dataType: "JSON",

        data: {

            id: modelId
        },

        success: function (str) {
            
            if (str.status == 0) {

                return false;
            }

            app.host = str.baseUrl;
            
            app.fabulousData = str.list;

            if(app.fabulousData.length ==0){
                
                for(var i=0; i<2; i++){
                   
                    app.fabulousData.push({

                        id: "",
            
                        title_name: "",
            
                        title_img: "",
            
                        title_video: "",
            
                        title_color: "",
            
                        introduce_details: ""
                    });
                }
            }
        },
        error: function (str) {

            console.log("错误:" + str);
        }
    });
    //初始化富文本
    if ($(".editor").length > 0) {

        initialUEditor(0);
    }

    //添加点赞项
    $(".addFabulous,.addVote").on("click", "span", function () {

        app.fabulousData.push({

            id: "",

            title_name: "",

            title_img: "",

            title_video: "",

            title_color: "",

            introduce_details: ""
        });
    });
    //删除
    $(".article").on("click", ".del", function () {

        var index = $(this).closest(".items").attr("data-index");
        
        app.fabulousData.splice(index, 1);
    });
    //视频预览
    $(".article").on("click", ".video-start", function () {

        $("#video").attr("src", $(this).attr("video-src"));

        $(".dialog").fadeIn();
    });

    //点赞项展开收起
    $(".article").on("click", ".upDown", function () {

        var $this = $(this).closest(".list-item");

        if ($this.hasClass("setUp")) {

            $this.removeClass("setUp");

            $this.next(".bt").removeClass("setUp");

            $this.find("textarea").prop("disabled", false);

            $(this).text("收起");

        } else {

            $this.addClass("setUp");

            $this.next(".bt").addClass("setUp");

            $this.find("textarea").prop("disabled", true);

            $(this).text("编辑");
        }
    });
    //上传视频
    $(".fabulous").on("change", ".videoFile", function () {

        var $this = $(this);

        var fs = $this.get(0).files[0];

        var formData = new FormData($('form')[0]);

        formData.append('file', fs);

        $.ajax({

            url: interfaceConfig.postVideo,

            type: "POST",

            dataType: "json",

            processData: false,

            contentType: false,

            data: formData,

            success: function (str) {

                if (str.status == 0) {

                    alert("视频上传失败,请重新上传");

                    return false;
                }

                $this.value = str.saveUrl;

                $this.next("input").val(str.saveUrl);
                
                $this.parent("div").find(".video-start").attr("video-src", HOST + str.saveUrl);

                $this.closest(".handled").addClass("onVideo");
            },
            error: function (str) {

                console.log("错误:" + str);
            }
        });
    });
});
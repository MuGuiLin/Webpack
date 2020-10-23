/*
 * @Author: LiuGuangMing 
 * @Date: 2018-09-12 15:19:27 
 * @Last Modified by: LiuGuangMing
 * @Last Modified time: 2018-10-15 17:39:35
 */
import {
    interfaceConfig
} from './InterfaceConfig';
//引入vue
import Vue from 'vue';

import {
    lowerCase
} from './template';

import '../css/answer.scss';

var app = new Vue({

    el: ".pjax",

    data: {

        answerData: new Array({
            id: null,
            name: null,
            name_color: null,
            question_img: null,
            type: 0,
            option: [
                {
                    id: null,
                    name: null,
                    name_color: null,
                    name_img: null,
                    right: null
                },
                {
                    id: null,
                    name: null,
                    name_color: null,
                    name_img: null,
                    right: null
                }
            ]
        }),
        
        host: "",
        
        options: false,

        checkedRadio: true
    },
    methods: {
        //添加项
        addAnswer: function () {

            this.answerData.push({
                id: null,
                name: null,
                name_color: null,
                question_img: null,
                type: 0,
                option: [
                    {
                        id: null,
                        name: null,
                        name_color: null,
                        name_img: null,
                        right: null
                    },
                    {
                        id: null,
                        name: null,
                        name_color: null,
                        name_img: null,
                        right: null
                    }
                ]
            });
        },
        //删除项
        optionDel: function (index) {

            this.answerData.splice(index, 1);
        },
        //删除选项
        selectDel: function (index, n) {

            this.answerData[index].option.splice(n, 1);
        },
        //添加选项
        addSelect: function (index, n) {

            if (n >= 25) {

                return;
            }
            
            this.answerData[index].option.push({
                id: null,
                name: null,
                name_color: null,
                name_img: null,
                right: null
            });
            setTimeout(()=>{

                window.setColor();
            },500)
        },
        lower: function (n) {

            return lowerCase(n);
        },
        //混合选择
        option: function (n) {
			console.log(n)

            if (n == 0) {

                this.checkedRadio = true;

                this.options = false;

            } else if (n == 1) {

                this.options = false;

                this.checkedRadio = false;

            } else {

                this.options = true;
            }
        },
        sonOption: function (index, n) {

            this.answerData[index].type = n;
        }
    },
    watch: {

        answerData: function () {
          
            setTimeout(()=>{

                window.setColor();
            },500)  
        }
    }
});
$(function () {
    var modelId = $("#model_id").val();
    //投票选项初始化
    $.ajax({

        url: interfaceConfig.getAnswer,

        type: "POST",

        dataType: "JSON",

        data: {

            id: modelId
        },

        success: function (str) {

            app.answerData = str.list;

            app.host = str.host;

            if(str.type == 2){

                app.checkedRadio = false;
            }
			
			app.option(str.type)
        },

        error: function (XMLHttpRequest, textStatus, errorThrown) {

            console.log("错误:" + toString(XMLHttpRequest) + ";" + textStatus + ";" + errorThrown);
        }
    });
    //投票项显示隐藏
    $(".addList").on("click", ".showDel .up", function () {

        if ($(this).text() == "收起") {

            $(this).text("编辑");
        } else {
            $(this).text("收起");
        }
        $(this).closest(".list-item").next(".list-content").slideToggle();
    });
    //单选框
    $(".pjax").on("click", ".listRadio", function () {

        $(this).closest(".list-content").find(".listRadio").removeClass("on");

        $(this).addClass("on");
    });
    //复选框
    $(".pjax").on("click", ".listChecked", function () {

        if ($(this).find("input").prop("checked")) {

            $(this).find("input").prop("checked", false);

            $(this).removeClass("on");

        } else {

            $(this).find("input").prop("checked", true);

            $(this).addClass("on");
        }
    });
});
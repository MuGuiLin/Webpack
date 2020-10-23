/*
 * @Author: LiuGuangMing 
 * @Date: 2018-08-06 10:09:59 
 * @Last Modified by: LiuGuangMing
 * @Last Modified time: 2018-10-10 11:12:02
 */
import { interfaceConfig } from './InterfaceConfig';

import Vue from 'vue';

import './template';
//主持人数据
var app = new Vue({
    
    el: "#chatRoom",

    data: {

        nameData: null
    },
    methods: {

        manager: function(id,name){
            
            $("#manager_id").val(id);

            $("#searchName").val(name);
            
            this.nameData = null;
        }
    }
});
$(function () {
    //等待审核提示
    initialUEditor(0);

    //主持人名称获取
    var searchName = function (text) {

        $.ajax({

            url: interfaceConfig.chat,

            type: "POST",

            dataType: "JSON",

            data: {

                nickname: text
            },  
            success: function (str) {

                console.log(str)

                app.nameData = str.userInfo;
            },

            error: function (str) {

                console.log("错误：" + str.status);
            }
        });
    }

    

    $("#searchName").on("keyup",function(){
       
        searchName($(this).val());
    });
});
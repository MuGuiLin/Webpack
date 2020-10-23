/*
 * @Author: LiuGuangMing 
 * @Date: 2018-09-11 14:21:40 
 * @Last Modified by: LiuGuangMing
 * @Last Modified time: 2018-10-10 11:11:08
 */
import { interfaceConfig } from './InterfaceConfig';

import Vue from 'vue';

import './addActivity';
//主持人数据
var app = new Vue({
    
    el: "#addLive",

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

$(function(){

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
/*
 * @Author: LiuGuangMing 
 * @Date: 2018-08-03 11:23:49 
 * @Last Modified by: LiuGuangMing
 * @Last Modified time: 2018-10-10 11:11:25
 */
import { interfaceConfig } from './InterfaceConfig';
//引入vue
import Vue from 'vue';

import './template';

var app = new Vue({

    el: ".pjax",

    data: {
        
        voteData: new Array(),

        options: false
    },
    methods: {
        //添加投票项
        addVote: function(){

            this.voteData.push({
                title_type: 1,
                option: [{},{}]
            });

            setTimeout(()=>{

                window.setColor();
            },500)
        },
        //删除投票项
        optionDel: function(index){

           this.voteData.splice(index,1);
        },
        //删除投票选项
        selectDel: function(index,n){
            
            this.voteData[index].option.splice(n,1);
        },
        //添加投票选项
        addSelect: function(index,n){
            
            this.voteData[index].option.splice(n+1,0,{});

            setTimeout(()=>{

                window.setColor();
            },500)
        },
        //混合选项
        blendSwitch: function(b){

            if(b==3){

                this.options = true;
            }
            else{

                this.options = false;
            }
        },
        double: function(n){

            return parseInt(n+1)
        }
    },
    watch: {
        
        voteData: function(){

            setTimeout(()=>{

                window.setColor();
            },500)
        }
    },
});
$(function(){
    var modelId = $("#model_id").val();
    //投票选项初始化
    $.ajax({

        url: interfaceConfig.voteOptions,

        type: "POST",

        dataType: "JSON",

        data: {

            id: modelId
        },

        success: function(str){

            app.voteData = str.list;

            if(str.type==3){

                app.options = true;
            }
        },

        error: function(str){
            
            console.log("错误:"+str);
        }
    });
    //投票项显示隐藏
    $(".addList").on("click",".showDel .up",function(){

        if($(this).text() == "收起"){

            $(this).text("编辑");
        }else{
            $(this).text("收起");
        }
        $(this).closest(".list-item").next(".list-content").slideToggle();
    });
    //投票项删除
    // $(".addList").on("click",".showDel .del",function(){

    //     $(this).closest(".items").slideUp(function(){

    //         $(this).remove();
    //     });
    // });
    //投票选项删除
    // $(".addList").on("click",".handled .del",function(){

    //     $(this).closest(".list-item").slideUp(function(){

    //         $(this).remove();
    //     });
    // });
});
/*
 * @Author: LiuGuangMing 
 * @Date: 2018-07-12 15:54:10 
 * @Last Modified by: LiuGuangMing
 * @Last Modified time: 2018-08-08 11:03:45
 */
import './main';

import '../css/list.scss';

$(function(){
    
    $(".list-item").on("click",".sort",function(){
        
        if($(this).hasClass("on")){

            $(this).css({"transform":"rotate(0deg)"});

            $(this).removeClass("on");
            
        }else{

            $(this).css({"transform":"rotate(180deg)"});

            $(this).addClass("on");
        } 
    });
});
/*
 * @Author: LiuGuangMing 
 * @Date: 2018-07-12 10:22:47 
 * @Last Modified by: LiuGuangMing
 * @Last Modified time: 2018-09-06 16:47:57
 */
import './main';

import '../css/notice.scss';

$(function(){
    
    $(".list-item").on("click","h4",function(){

        var $this = $(this).closest("li");

        $this.find("div").stop(false,true);
        
        $this.siblings().find("div").slideUp();

        $this.siblings().find("i").css({"transform":"rotate(0deg)"});

        if($this.find("div").css("display") == "block"){

            $(this).find("i").css({"transform":"rotate(0deg)"});

        }else{
            
            $(this).find("i").css({"transform":"rotate(180deg)"});
        } 
        
        $this.addClass("on");
        
        $this.find("div").slideToggle();  
    });
});
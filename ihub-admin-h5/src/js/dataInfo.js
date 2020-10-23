/*
 * @Author: LiuGuangMing 
 * @Date: 2018-08-29 17:37:25 
 * @Last Modified by: LiuGuangMing
 * @Last Modified time: 2018-10-10 11:13:07
 */
require('./main');

require('../css/dataInfo.scss');

window.iframeAutoHeight = function (iframe) {

    if (iframe) {

        var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;

        if (iframeWin.document.body) {

            iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;

        }
    }
};

window.onload = function () {

    iframeAutoHeight($("#iframe"));
};

//get参数
function getString(name) {

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");

    var r = window.location.search.substr(1).match(reg);

    if (r != null) return unescape(r[2]);

    return null;
}

var iframeURL = getString("url");

$(function () {

    $("#iframe").attr("src",iframeURL);
});
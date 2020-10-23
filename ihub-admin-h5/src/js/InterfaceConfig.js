/*
 * @Author: LiuGuangMing 
 * @Date: 2018-08-08 09:49:04 
 * @Last Modified by: LiuGuangMing
 * @Last Modified time: 2018-10-15 10:29:13
 */
//接口地址
var HOST = ""; //

export var interfaceConfig = {
    //点赞项初始化
    thumbsUp: HOST + "/index.php/thumbsUp/thumbsUp2/twoIndex",
    //上传视频
    postVideo: HOST + "/index.php/common/uploadVideo",
    //上传图片
    postImage: HOST + "/index.php/common/uploadImg",
    //投票初始化
    voteOptions: HOST + "/vote/vote2/options",
    //主持人信息获取
    chat: HOST + "/index.php/chat/chat2/search",
    //活动列表
    checked: HOST + "/index.php/activityReview/list",
    //获取流程信息
    getFlowInfo: HOST + "/index.php/activityReview/template",
    //审核通过、拒绝
    checkedPost: HOST + "/index.php/activityReview/review",
    //运营列表上线/下线操作
    onlineOrOffline: HOST + '/index.php/activityReview/line',
    //活动提交审核
    operatePost: HOST + "/index.php/activityConfig2/addReview",
    //活动删除
    operateDel: HOST + "/index.php/activityConfig2/del",
    //活动查看
    operateLook: HOST + "/index.php/activityConfig2/look",
    //菜单小气泡
    getPending: HOST + "/index.php/activityReview/getPending",
    //答题初始化
    getAnswer: HOST + "/answer/answer2/getList"

}
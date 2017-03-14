/**
 * Created by wangjin on 16/11/27.
 */


function get(url,data,success,complete) {
    var options = {
        url: url,
        type: 'get',
        dataType: 'json',
        timeout: 10000,
        data: data,
        success: function (data, status) {
            success(data,status);
        },
        complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
            complete(status);
        }
    };
    $.ajax(options);
}

function post(url,data,success,complete) {
    var options = {
        url: url,
        type: 'post',
        dataType: 'json',
        timeout: 10000,
        data: data,
        success: function (data, status) {
            success(data,status);
        },
        complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
            complete(status);
        }
    };
    $.ajax(options);
}
function getStyle(e) {
    if (e == 1)
        return "单选";
    else if (e == 2)
        return "多选";
    else if (e == 3)
        return "问答";
    else if (e == 4)
        return "评分";
    return false;
}

function getCookie() {
    name = "userId";
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        if (unescape(arr[2]) == "undefined")
            return "";
        else
            return unescape(arr[2]);
    else
        return "";
}
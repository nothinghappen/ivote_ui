import request from 'axios'

let root = '/proxyPrefix'

let store = {}

export default store

store.get = (url, query) => {
	return request.get(`${root}${url}`, {
		params: query
	}).then(response=>response.data)
}

store.post = (url, query) => {
	return request.post(`${root}${url}`).then(response=>response.data)
}

store.getCookie = (name) => {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        if (unescape(arr[2]) == "undefined")
            return "";
        else
            return unescape(arr[2]);
    else
        return "";
}

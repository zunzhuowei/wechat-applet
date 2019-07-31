var md5 = require('../utils/md5.js');
var netApi = require('netApi.js');

var HttpRequest;
(function () {
    HttpRequest = {
        javaSecrect: "ZXgZz*L8WiLW%8jXKbom0NmB9%UAaJMP",
        send: function (url, params) {
            //debugger
            var parameters = Object.assign({}, {}, params);
            parameters.signCode = Date.parse(new Date()) / 1000;
            var reqMid = wx.getStorageSync("reqMid");
            if (reqMid) {
                parameters.reqMid = reqMid;
            }

            var obj = Object.assign({}, parameters, params);

            var sdic = Object.keys(obj).sort();
            var sortStr = "";
            for (var ki in sdic) {
                sortStr += sdic[ki] + "=" + obj[sdic[ki]] + "&";
            }
            var sortParamsStr = sortStr + "key=" + this.javaSecrect;
            var md5Str = md5.hex_md5(sortParamsStr);
            console.log("sortParamsStr ----:: " + sortParamsStr);
            console.log("md5Str ----:: " + md5Str);
            console.log("url ------:: " + url + "\n");
            parameters.sign = md5Str.toUpperCase();
            return new Promise(function (resolve, reject) {
                wx.request({
                    url: url,
                    data: parameters,
                    method: "POST",
                    header: {
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                        token: wx.getStorageSync("token"),
                        reqMid: wx.getStorageSync("reqMid"),
                    },
                    success: function (res) {
                        //console.log("success")
                        resolve(res)
                    },
                    fail: function (res) {
                        reject(res)
                        //console.log("failed")
                    },
                    complete:function (res) {

                    }
                });
            })
        },
    };
})();

module.exports = {
    HttpRequest: HttpRequest,
    netApi: netApi,
};
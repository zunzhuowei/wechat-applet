var index = require('../data/data_index.js')
var index_next = require('../data/data_index_next.js')
var discovery = require('../data/data_discovery.js')
var discovery_next = require('../data/data_discovery_next.js')
var md5 = require('md5.js')

function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function getData(url, params) {
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: params,
      method: "POST",
      header: {
        //'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("success")
        resolve(res)
      },
      fail: function (res) {
        reject(res)
        console.log("failed")
      }
    });
  })
}

function getData2(){
  return index.index;
}

function getNext(){
  return index_next.next;
}

function getDiscovery(){
  return discovery.discovery;
}

function discoveryNext(){
  return discovery_next.next;
}

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
      console.log("sortParamsStr ----::\n" + sortParamsStr);
      console.log("md5Str ----::\n" + md5Str);
      console.log(url + "------------------------------------------------\n");
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
  formatTime: formatTime,
  getData: getData,
  getData2: getData2,
  getNext: getNext,
  getDiscovery: getDiscovery,
  discoveryNext: discoveryNext,
  HttpRequest: HttpRequest,
};





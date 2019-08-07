var index = require('../data/data_index.js');
var index_next = require('../data/data_index_next.js');
var discovery = require('../data/data_discovery.js');
var discovery_next = require('../data/data_discovery_next.js');

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

/**
 *  强制数字截取位数
 * @param value 数字值
 * @param sub_len 截取的数字长度
 * @returns {string} 截取到的长度
 */
function subNumber(value, sub_len) {
  return value.replace(/[^\d]/g, '').substr(0, sub_len);
}

//  TimeDown("show", "2013-11-25 8:00:45");

/*
时间倒计时插件
TimeDown.js
*/
function TimeDown(endDateStr, cb) {
  //结束时间
  var endDate = new Date(endDateStr);
  //当前时间
  var nowDate = new Date();
  //相差的总秒数
  var totalSeconds = parseInt((endDate - nowDate) / 1000);
  //天数
  var days = Math.floor(totalSeconds / (60 * 60 * 24));
  //取模（余数）
  var modulo = totalSeconds % (60 * 60 * 24);
  //小时数
  var hours = Math.floor(modulo / (60 * 60));
  modulo = modulo % (60 * 60);
  //分钟
  var minutes = Math.floor(modulo / 60);
  //秒
  var seconds = modulo % 60;
  console.log("seconds " + seconds);
  //输出到页面
  //document.getElementById(id).innerHTML = "还剩:" + days + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒";
  cb.call(days, hours, minutes, seconds);
  //延迟一秒执行自己
  setTimeout(function () {
    TimeDown(endDateStr, cb);
  }, 1000)
}

module.exports = {
  formatTime: formatTime,
  getData: getData,
  getData2: getData2,
  getNext: getNext,
  getDiscovery: getDiscovery,
  discoveryNext: discoveryNext,
  subNumber: subNumber,
  TimeDown: TimeDown,
};





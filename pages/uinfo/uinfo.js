// pages/uinfo/uinfo.js
var util = require('../../utils/util.js');
var netApi = require('../../net/netApi.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    member: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var token = wx.getStorageSync("token");
    if (!token) {
      this.go2LoginPage();
      return;
    }
    this.initUInfoData(token);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var token = wx.getStorageSync("token");
    if (!token) {
      this.go2LoginPage();
      return;
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log("------------------------------用户点击右上角分享---------------------------------------")
  },

  /**
   *  初始化用户数据
   */
  initUInfoData: function (token) {
    var that = this;
    var params = {
      token: token,
    };

    var index_api = netApi.api.host + netApi.api.uri.get_members_infos;
    util.HttpRequest.send(index_api, params)
        .then(function (data) {
          var content = data.data.content;
          console.log(content);
          that.setData({
            member: content.members,
          });
        });
  },

  /**
   *  前往登录页
   */
  go2LoginPage: function () {
    wx.navigateTo({
      url: '../index/index'
    })
  }
})
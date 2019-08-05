var net = require('../../net/net.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menus: [],
    showTopTips: false,
    errTipsInfo: null,
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
   *  显示异常
   * @param param 校验的参数
   * @param errTipsInfo 提示异常信息
   * @returns {boolean} 是否显示异常
   */
  showErr: function (param, errTipsInfo) {
    var that = this;
    if (!param) {
      this.setData({
        showTopTips: true,
        errTipsInfo: errTipsInfo,
      });
      setTimeout(function () {
        that.setData({
          showTopTips: false,
          errTipsInfo: null,
        });
      }, 2000);
      return true;
    }
    return false;
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var host = net.netApi.host;
    var url = net.netApi.api.get_role_permissions_apis;
    net.HttpRequest.send(url, {})
        .then(function (data) {
          var content = data.data.content;
          var uriPrefix = content.uriPrefix;
          var uris = content.uris;
          var temp = [];
          for (var key in uris) {
            var uri = uris[key];
            // 去除菜单地址
            if (that.str_contain(url, uri)) {
              continue;
            }

            var menu = {};
            menu.api = host + uriPrefix + uri;
            menu.url = uri;
            that.generateInfo(menu, uri);

            temp.unshift(menu); // 放进数组里
          }
          that.setData({
            menus: temp,
          });
        })
        .catch(function (data) {
          console.log(data);
          that.showErr(null, data.errMsg);
          wx.clearStorage();
          wx.reLaunch({
            url: '../index/index'
          });
        });
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

  },

  /**
   *  导航到目标页面
   * @param option 点击中的目标
   */
  nav2Target: function (option) {
    var id = option.currentTarget.id;
    var menu = this.data.menus[id];
    console.log(menu);
    wx.navigateTo({
      url: menu.page,
    });
  },

  /**
   * @param string 字符串
   * @param item 校验是否包含的字符串
   * @returns {boolean} 是否包含
   */
  str_contain: function (string, item) {
    return string.indexOf(item) !== -1;
  },

  /**
   *  构建菜单
   * @param menu 菜单对象
   * @param uri 请求 uri
   */
  generateInfo: function (menu, uri) {
    menu.name = "菜单:" + uri;
    menu.descr = "描述:" + uri;
    menu.page = "";
    var api = menu.api;

    // 前往用户信息界面
    if (this.str_contain(net.netApi.api.get_members_infos, uri)) {
      menu.name = "用户信息";
      menu.descr = "描述用户信息";
      menu.page = "../uinfo/uinfo?http=" + api;
    }
    // 前往菜单界面
    else if (this.str_contain(net.netApi.api.get_role_permissions_apis, uri)) {
      menu.name = "菜单";
      menu.descr = "描述菜单";
      menu.page = "../menu/menu?http=" + api;
    }
    // 前往重置密码界面
    else if (this.str_contain(net.netApi.api.reset_phone_login_password_by_old, uri)) {
      menu.name = "重置密码";
      menu.descr = "描述重置密码";
      menu.page = "../menu/menu?http=" + api;
    }
    // 前往登出界面
    else if (this.str_contain(net.netApi.api.member_phone_logout, uri)) {
      menu.name = "登出";
      menu.descr = "描述登出";
      menu.page = "../menu/menu?http=" + api;
    }
  }

})
//index.js
//获取应用实例


Page({
  data: {
    motto: 'Hello World',
    toView: 'red',
    scrollTop: 100,
    items:[
      {name:"shangpinq"},
      { name: "shangpinq" },
      { name: "shangpinq" },
    ]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

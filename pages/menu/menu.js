// pages/menu/menu.js
var net = require('../../net/net.js');
var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        grids: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        menus: [],
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
                    var menu = {};
                    var uri = uris[key];
                    menu.api = host + uriPrefix + uri;
                    menu.url = uri;

                    temp.unshift(menu);
                }
                that.setData({
                    menus: temp,
                });
            })
            .catch(function (data) {
                console.log(data);
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
        var uri = menu.url;
        var api = menu.api;

        if (net.netApi.api.get_members_infos.indexOf(uri) !== -1) {
            wx.navigateTo({
                url: '../uinfo/uinfo?http=' + api
            });
        }
    },
})
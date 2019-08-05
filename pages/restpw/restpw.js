// pages/restpw/restpw.js
var net = require('../../net/net.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        email: "",
        member: {},
        showTopTips: false,
        errTipsInfo: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var token = wx.getStorageSync("token");
        if (!token) {
            this.logout();
            return;
        }

        var that = this;
        var params = {
            token: token,
        };

        var index_api = net.netApi.api.get_members_infos;
        net.HttpRequest.send(index_api, params)
            .then(function (data) {
                var content = data.data.content;
                that.setData({
                    member: content.members,
                });
            })
            .catch(function (data) {
                console.log(data);
                that.showErr(null, data.errMsg)
            });
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
     *  登出
     */
    logout: function () {
        wx.clearStorage();
        wx.reLaunch({
            url: '../index/index'
        });
    },

    bindVcodeInput: function () {

    },

    getVcode: function () {


    },

    bindPasswordInput: function () {


    },

    bindConfirmPasswordInput: function () {


    },

    resetAccount: function () {


    }

})
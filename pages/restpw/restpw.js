// pages/restpw/restpw.js
var net = require('../../net/net.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        member: {},
        showTopTips: false,
        errTipsInfo: null,
        vcode: null,
        password: null,
        confirmPassword: null,
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
     *  登出
     */
    logout: function () {
        wx.clearStorage();
        wx.reLaunch({
            url: '../index/index'
        });
    },

    bindVcodeInput: function (e) {
        this.setData({
            vcode: e.detail.value
        });
        if (!this.data.vcode) {
            this.setData({
                password: null,
                confirmPassword: null,
            });
        }
    },

    getVcode: function () {
        var that = this;
        var params = {};

        var index_api = net.netApi.api.send_reset_password_check_code;
        net.HttpRequest.send(index_api, params)
            .then(function (data) {
                console.log(data);
                console.log(data.content)
            })
            .catch(function (data) {
                console.log(data);
                that.showErr(null, data.errMsg)
            });
    },

    bindPasswordInput: function (e) {
        this.setData({
            password: e.detail.value
        })
    },

    bindConfirmPasswordInput: function (e) {
        this.setData({
            confirmPassword: e.detail.value
        })
    },

    resetAccount: function () {
        var that = this;
        var params = {
            confirmPassword: that.data.confirmPassword,
            password: that.data.password,
            checkCode: that.data.vcode,
        };

        if (this.showErr(params.checkCode, "验证码不能为空！")) {
            return;
        }
        if (this.showErr(params.password, "密码不能为空！")) {
            return;
        }
        if (this.showErr(params.confirmPassword, "确认密码不能为空！")) {
            return;
        }
        if (this.showErr(params.confirmPassword === params.password, "两次密码不一致！")) {
            return;
        }

        var index_api = net.netApi.api.reset_phone_login_password_by_email;
        net.HttpRequest.send(index_api, params)
            .then(function (data) {
                that.setData({});
                if (data.data.success) {
                    wx.redirectTo({
                        url: '../msg/msg?title=操作成功&desc=点击确定返回&bt1=确定&bt1url1=../mmore/mmore'
                    });
                } else {
                    that.showErr(null, data.data.code)
                }
            })
            .catch(function (data) {
                console.log(data);
                that.showErr(null, data.errMsg)
            });
    }

})
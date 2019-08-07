// pages/resetpasswd/restpasswd.js
var net = require('../../net/net.js');
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: ["邮箱修改", "旧密码修改"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0,

        // 邮箱修改参数
        member: {},
        showTopTips: false,
        errTipsInfo: null,
        vcode: null,
        password: null,
        confirmPassword: null,

        // 旧密码修改参数
        password2: null,
        confirmPassword2: null,
        srcpassword2: null,

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        // 获取设备信息
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
            }
        });


        var token = wx.getStorageSync("token");
        if (!token) {
            this.logout();
            return;
        }

        // 邮箱修改参数 请求用户信息
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
     *  点击 tab 事件
     * @param e
     */
    tabClick: function (e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
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

    // 方式一： 邮箱验证码修改
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

    bindSrcPasswordInput: function (e) {
        this.setData({
            srcpassword: e.detail.value
        });
        if (!this.data.srcpassword) {
            this.setData({
                password: null,
                confirmPassword: null,
            });
        }
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
    },




// 方式二： 旧密码修改
    bindSrcPasswordInput2: function (e) {
        this.setData({
            srcpassword2: e.detail.value
        });
        if (!this.data.srcpassword2) {
            this.setData({
                password2: null,
                confirmPassword2: null,
            });
        }
    },

    bindPasswordInput2: function (e) {
        this.setData({
            password2: e.detail.value
        })
    },

    bindConfirmPasswordInput2: function (e) {
        this.setData({
            confirmPassword2: e.detail.value
        })
    },

    resetAccount2: function () {
        var that = this;
        var params = {
            confirmPassword: that.data.confirmPassword2,
            newPassword: that.data.password2,
            srcPassword: that.data.srcpassword2,
        };

        if (this.showErr(params.srcPassword, "密码不能为空！")) {
            return;
        }
        if (this.showErr(params.newPassword, "密码不能为空！")) {
            return;
        }
        if (this.showErr(params.confirmPassword, "确认密码不能为空！")) {
            return;
        }
        if (this.showErr(params.newPassword === params.confirmPassword, "两次密码不一致！")) {
            return;
        }

        var index_api = net.netApi.api.reset_phone_login_password_by_old;
        net.HttpRequest.send(index_api, params)
            .then(function (data) {
                that.setData({});
                console.log(data);
                if (data.data.success) {
                    wx.redirectTo({
                        url: '../msg/msg?title=操作成功&desc=点击确定返回&bt1=确定&bt1url1=../mmore/mmore'
                    });
                    //wx.clearStorageSync();
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
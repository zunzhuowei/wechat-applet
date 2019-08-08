// pages/register.js
var util = require('../../utils/util.js');
var net = require('../../net/net.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        email: null,
        phone: null,
        vcode: null,
        password: null,
        confirmPassword: null,
        isAgree: false,
        showTopTips: false,
        errTipsInfo: null,
        footer:{
            company: "WeUI注册",
            copyright: "2008-2016 weui.",
        },
        getCodeText: "获取验证码",
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
     *  返回登录界面
     */
    bindLoginTap: function () {
        wx.navigateBack(-1);
    },

    /**
     * 绑定统一条款
     * @param e
     */
    bindAgreeChange: function (e) {
        this.setData({
            isAgree: !!e.detail.value.length
        });
    },

    /**
     *  绑定邮箱
     * @param e
     */
    bindEmailInput: function(e) {
        this.setData({
            email: e.detail.value
        })
    },

    /**
     *  绑定手机号
     * @param e
     */
    bindPhoneInput: function(e) {
        this.setData({
            phone: e.detail.value
        });
    },

    /**
     * 绑定验证吗
     * @param e
     */
    bindVcodeInput: function(e) {
        this.setData({
            vcode: e.detail.value
        });
    },

    /**
     *  绑定密码
     * @param e
     */
    bindPasswordInput: function(e) {
        this.setData({
            password: e.detail.value
        });
    },

    /**
     *  绑定确认密码
     * @param e
     */
    bindConfirmPasswordInput: function(e) {
        this.setData({
            confirmPassword: e.detail.value
        });
    },

    /**
     *  获取验证码
     */
    getVcode:function () {
        //util.TimeDown("2019-08-07 23:22:22", function (d, h, m, s) {
        //    console.log("d,h,m,s ---:: d:" + d + ",h:" + h + ",m:" + m + ",s:" + s);
       // });
        //getCodeText
        //return;

        var that = this;
        var params = {
            phone: that.data.phone,
            email: that.data.email,
        };

        if (this.showErr(params.phone, "手机号不能为空！")) {
            return;
        }
        if (this.showErr(params.email, "邮箱号不能为空！")) {
            return;
        }

        var index_api = net.netApi.api.register_check_code;
        net.HttpRequest.send(index_api, params)
            .then(function (data) {
                that.setData({

                });
                console.log(data);
                console.log(data.content)
            })
            .catch(function (data) {
                console.log(data);
                that.showErr(null, data.errMsg)
            });
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
     *  注册账号
     */
    regAccount: function () {
        var that = this;
        var params = {
            phone: that.data.phone,
            email: that.data.email,
            confirmPasswd: that.data.confirmPassword,
            passwd: that.data.password,
            checkCode: that.data.vcode,
            isAgree: that.data.isAgree,
        };

        if (this.showErr(params.isAgree, "请勾选同意条款！")) {
            return;
        }
        if (this.showErr(params.phone, "手机号不能为空！")) {
            return;
        }
        if (this.showErr(params.email, "邮箱号不能为空！")) {
            return;
        }
        if (this.showErr(params.checkCode, "验证码不能为空！")) {
            return;
        }
        if (this.showErr(params.passwd, "密码不能为空！")) {
            return;
        }
        if (this.showErr(params.confirmPasswd, "确认密码不能为空！")) {
            return;
        }
        if (this.showErr(params.confirmPasswd === params.passwd, "两次密码不一致！")) {
            return;
        }

        var index_api = net.netApi.api.phone_register;
        net.HttpRequest.send(index_api, params)
            .then(function (data) {
                that.setData({});
                if (data.success) {

                }
                //console.log(data);
            })
            .catch(function (data) {
                console.log(data);
                that.showErr(null, data.errMsg)
            });
    }
})
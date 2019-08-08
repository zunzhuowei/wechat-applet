var net = require('../../net/net.js');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        member: {},
        showTopTips: false,
        errTipsInfo: null,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        showAuth: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        // 查看是否授权
        wx.getSetting({
            success (res){
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                        success: function (res) {
                            console.log(res);
                            that.setData({
                                showAuth: false,
                            });
                        },

                        fail: function (res) {
                            console.log(res);
                            that.setData({
                                showAuth: true,
                            });
                        },

                        complete: function (res) {
                            //console.log(res);
                        },

                        // 默认 false
                        // 是否带上登录态信息。当 withCredentials 为 true 时，要求此前有调用过 wx.login 且登录态尚未过期，
                        // 此时返回的数据会包含 encryptedData, iv 等敏感信息；当 withCredentials 为 false 时，不要求有登录态，
                        // 返回的数据不包含 encryptedData, iv 等敏感信息。
                        //withCredentials: true,

                        //显示用户信息的语言,默认 en
                        lang: "en",//zh_CN,zh_TW
                    });
                } else {
                    that.setData({
                        showAuth: true,
                    });
                    console.log(res);
                }
            },

            fail(res) {
                console.log("fail");
                console.log(res);
            },

            complete(res) {
                console.log("complete");
                console.log(res);
            },

        })
    },

    bindGetUserInfo(e) {
        console.log(e.detail.userInfo)
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
        var token = wx.getStorageSync("token");
        if (!token) {
            this.logout();
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
     * @param string 字符串
     * @param item 校验是否包含的字符串
     * @returns {boolean} 是否包含
     */
    str_contain: function (string, item) {
        return string.indexOf(item) !== -1;
    },

    /**
     *  重设密码
     */
    resetPw: function () {
        wx.navigateTo({
            url: "../resetpasswd/restpasswd",
        });
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

    /**
     *  初始化用户数据
     */
    initUInfoData: function (token) {
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

})
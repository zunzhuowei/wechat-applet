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
        list: [
            {
                id: 'resetpw',
                name: '重置密码',
                open: false,
                pages: ['button', 'list',]
            },
        ],

    },

    kindToggle: function (e) {
        var id = e.currentTarget.id, list = this.data.list;
        for (var i = 0, len = list.length; i < len; ++i) {
            if (list[i].id == id) {
                list[i].open = !list[i].open
            } else {
                list[i].open = false
            }
        }
        this.setData({
            list: list
        });
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
                            console.log(res.userInfo)
                            that.setData({
                                showAuth: false,
                            });
                        },

                        fail:function (res) {
                            that.setData({
                                showAuth: true,
                            });
                        },

                        complete:function (res) {

                        }
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
     *  重设密码2
     */
    resetPw2: function () {
        wx.navigateTo({
            url: "../restpw2/restpw",
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
//index.js

var util = require('../../utils/util.js');
var netApi = require('../../net/netApi.js');

var app = getApp()
Page({
    // onReady: function(){
    //     wx.navigateTo({
    //         url: '../register/register'
    //     })
    // },
    data: {
        feed: [],
        feed_length: 0,
        showTopTips: false,
        isAgree: false,
        account: 12345698745,
        password: 123456,
        isShow: true,
    },
    //事件处理函数
    bindItemTap: function () {
        wx.navigateTo({
            url: '../answer/answer'
        })
    },
    bindQueTap: function () {
        wx.navigateTo({
            url: '../question/question'
        })
    },
    onLoad: function () {
        console.log('onLoad')
        var that = this
        //调用应用实例的方法获取全局数据
        this.getData();
        //this.getData2();
        // this.getData3();
    },

    /**
     *  绑定到 用户信息页面
     */
    bindUInfoTap: function () {
        wx.navigateTo({
            url: '../uinfo/uinfo'
        })
    },

    onShow: function () {
        this.go2UInfoPage();
    },

    /**
     *  前往用户信息页面
     */
    go2UInfoPage: function () {
        var token = wx.getStorageSync("token");
        if (token) {
            console.log("---------------token:" + token);
            this.bindUInfoTap();
        } else {
            this.setData({
                isShow: true
            });
        }
    },

    upper: function () {
        wx.showNavigationBarLoading()
        this.refresh();
        console.log("upper");
        setTimeout(function () {
            wx.hideNavigationBarLoading();
            wx.stopPullDownRefresh();
        }, 2000);
    },

    lower: function (e) {
        wx.showNavigationBarLoading();
        var that = this;
        setTimeout(function () {
            wx.hideNavigationBarLoading();
            that.nextLoad();
        }, 1000);
        console.log("lower")
    },
    //scroll: function (e) {
    //  console.log("scroll")
    //},

    //网络请求数据, 实现首页刷新
    refresh0: function () {
        var index_api = '';
        util.getData(index_api)
            .then(function (data) {
                //this.setData({
                //
                //});
                console.log(data);
            });
    },
    getData2: function () {
        var params = {sesskey: "aa"};
        var index_api = 'http://192.168.1.128:8080/happybeardapp/api/login.do';
        util.getData(index_api, params)
            .then(function (data) {
                //this.setData({
                //
                //});
                console.log(data);
            });
    },
    getData3: function () {
        var params = {
            code: "ogl_xwj7_WbHzC_yViAk6WFZH6nU",
            type: 0,
            gp: 102,
            channel: 1000,
            site: 1,
            deviceid: "1adfadfadf",
            sitemid: "1adfadfadf",
        };

        var index_api = 'http://192.168.1.128:8080/happybeardapp/api/login.do';
        util.HttpRequest.send(index_api, params)
            .then(function (data) {
            //this.setData({
            //
            //});
            console.log(data);
        });
    },

    //使用本地 fake 数据实现刷新效果
    getData: function () {
        var feed = util.getData2();
        console.log("loaddata");
        var feed_data = feed.data;
        this.setData({
            feed: feed_data,
            feed_length: feed_data.length
        });
    },
    refresh: function () {
        wx.showToast({
            title: '刷新中',
            icon: 'loading',
            duration: 3000
        });
        var feed = util.getData2();
        console.log("loaddata");
        var feed_data = feed.data;
        this.setData({
            feed: feed_data,
            feed_length: feed_data.length
        });
        setTimeout(function () {
            wx.showToast({
                title: '刷新成功',
                icon: 'success',
                duration: 2000
            })
        }, 3000)

    },

    //使用本地 fake 数据实现继续加载效果
    nextLoad: function () {
        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 4000
        })
        var next = util.getNext();
        console.log("continueload");
        var next_data = next.data;
        this.setData({
            feed: this.data.feed.concat(next_data),
            feed_length: this.data.feed_length + next_data.length
        });
        setTimeout(function () {
            wx.showToast({
                title: '加载成功',
                icon: 'success',
                duration: 2000
            })
        }, 3000)
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
            }, 3000);
            return true;
        }
        return false;
    },

    /**
     *  绑定同意
     * @param e
     */
    bindAgreeChange: function (e) {
        this.setData({
            isAgree: !!e.detail.value.length
        });
    },

    /**
     *  绑定账号
     * @param e
     */
    bindAccountInput: function(e) {
        this.setData({
            account: e.detail.value
        })
    },

    /**
     *  绑定密码
     * @param e
     */
    bindPasswordInput: function(e) {
        this.setData({
            password: e.detail.value
        })
    },

    /**
     *  跳转到注册页面
     */
    bindRegTap:function () {
        wx.navigateTo({
            url: '../register/register'
        })
    },

    /**
     *  执行登录
     */
    doLogin: function(){
        var that = this;
        var params = {
            phone: that.data.account,
            password: that.data.password,
        };

        if (this.showErr(params.phone, "手机号不能为空！")) {
            return;
        }

        if (this.showErr(params.password, "密码不能为空！")) {
            return;
        }

        var index_api = netApi.api.host + netApi.api.uri.phone_login;
        util.HttpRequest.send(index_api, params)
            .then(function (data) {
                var content = data.data.content;
                var token = content.token;
                var reqMid = content.mid;
                wx.setStorageSync("token", token);
                wx.setStorageSync("reqMid", reqMid);
                that.setData({
                    account: null,
                    password: null,
                    isShow: false,
                });
                that.go2UInfoPage();
            });
    },

})

// pages/msg/msg.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: null,
        desc: null,
        bt1: null,
        bt2: null,
        bt1url1: null,
        bt1url2: null,
        isWarn: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            title: options.title,
            desc: options.desc,
            bt1: options.bt1,
            bt2: options.bt2,
            bt1url1: options.bt1url1,
            bt1url2: options.bt1url2,
            isWarn: options.warn,
        });
        this.setData({
            isWarn: options.error,
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

    openbt1: function () {
        // var that = this;
        // wx.redirectTo({
        //     url: that.data.bt1url1,
        // });
        //
        wx.navigateBack({
            delta: 2,
            success: function () {

            },
            fail: function () {

            },
            complete: function () {

            }
        });
    },

    openbt2: function () {
        // var that = this;
        // wx.redirectTo({
        //     url: that.data.bt1url2,
        // });

        wx.navigateBack({
            delta: 2,
            success: function () {

            },
            fail: function () {

            },
            complete: function () {

            }
        });

    }
})
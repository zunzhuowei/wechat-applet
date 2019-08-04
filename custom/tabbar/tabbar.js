Component({
    data: {
        selected: 0,
        color: "#7A7E83",
        selectedColor: "#0068C4",
        list: [
            {
                pagePath: "/pages/index/index",
                iconPath: "/images/index.png",
                selectedIconPath: "/images/index_focus.png",
                text: "主页"
            }, {
                pagePath: "/pages/index/index",
                iconPath: "/images/discovery.png",
                selectedIconPath: "/images/discovery_focus.png",
                text: "发现"
            }, {
                pagePath: "/pages/index/index",
                iconPath: "/images/ring.png",
                selectedIconPath: "/images/ring_focus.png",
                text: "通知"
            }, {
                pagePath: "/pages/index/index",
                iconPath: "/images/chat.png",
                selectedIconPath: "/images/chat_focus.png",
                text: "私信"
            }, {
                pagePath: "/pages/uinfo/uinfo",
                iconPath: "/images/burger.png",
                selectedIconPath: "/images/burger_focus.png",
                text: "更多"
            }
        ]
    },

    // 页面创建时执行
    attached() {
        console.info('Page loaded!')
    },

    // 页面销毁时执行
    detached: function () {
        console.info('Page unloaded!')
    },

    methods: {
        switchTab(e) {
            const data = e.currentTarget.dataset
            const url = data.path
            wx.switchTab({url:url})
            this.setData({
                selected: data.index
            })
        }
    },

})
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
                pagePath: "/pages/discovery/discovery",
                iconPath: "/images/discovery.png",
                selectedIconPath: "/images/discovery_focus.png",
                text: "发现"
            }, {
                pagePath: "/pages/notify/notify",
                iconPath: "/images/ring.png",
                selectedIconPath: "/images/ring_focus.png",
                text: "通知"
            }, {
                pagePath: "/pages/chat/chat",
                iconPath: "/images/chat.png",
                selectedIconPath: "/images/chat_focus.png",
                text: "私信"
            }, {
                // pagePath: "/pages/uinfo/uinfo",
                pagePath: "/pages/mmore/mmore",
                iconPath: "/images/burger.png",
                selectedIconPath: "/images/burger_focus.png",
                text: "更多"
            }
        ]
    },

    lifetimes: {
        // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
        attached: function () {
        },
        moved: function () {
        },
        detached: function () {
        },
    },

    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    // 此处attached的声明会被lifetimes字段中的声明覆盖
    attached: function () {
        console.info('Page loaded!')
    },

    ready: function () {
    },

    pageLifetimes: {
        // 组件所在页面的生命周期函数
        show: function () {
            this.setData({
                selected: this.data.indexId,
            });
        },
        hide: function () {
        },
        resize: function () {
        },
    },

    // 页面销毁时执行
    detached: function () {
        console.info('Page unloaded!')
    },
    properties: {
        // 这里定义了innerText属性，属性值可以在组件使用时指定
        indexId: {
            type: Number,
            value: 0,
        }
    },
    methods: {
        switchTab(e) {
            const data = e.currentTarget.dataset;
            const url = data.path;
            // 跳转到新页面，然而再使用组件的时候并没有把 index 传到新页面
            wx.switchTab({url: url});
            // this.setData({
            //     selected: data.index,
            // });
        }
    },

})
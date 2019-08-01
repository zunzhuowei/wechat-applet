Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
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
        iconPath: "/images/chat.png",
        selectedIconPath: "/images/chat_focus.png",
        text: "私信"
      }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})
Component({
    data: {
        selected: 0,
        color: "#7A7E83",
        selectedColor: "#0068C4",
        list: []
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
    },

})
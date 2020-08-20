Component({
  data: {
    color: "#515151",
    selectedColor: "#DAA520",
    backgroundColor: "#ffffff",
    list: [
      {
        pagePath: "/pages/index/index",
        text: "流水",
        iconPath: "/img/income.png",
        selectedIconPath: "/img/income-select.png"
      },
      {
        pagePath: "/pages/chart/chart",
        text: "图表",
        iconPath: "/img/chart.png",
        selectedIconPath: "/img/chart-select.png"
      },
      {
        pagePath: "/pages/record/record",
        bulge:true,
        iconPath: "/img/post.png",
        selectedIconPath: "/img/post-select.png"
      },
      {
        pagePath: "/pages/message/message",
        text: "消息",
        iconPath: "/img/message.png",
        selectedIconPath: "/img/message-select.png"
      },
      {
        pagePath: "/pages/home/home",
        text: " 我家",
        iconPath: "/img/home.png",
        selectedIconPath: "/img/home-select.png"
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url}) 
    }
  }
})
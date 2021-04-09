const app = getApp()

Page({
  data: {
    height: 200,
    width: 300,
    series: [
      {
        name: "早午晚餐",
        value: 575,
        showValue: "575",
        color: "#3CB371",
        percent: 0.7107540173053152
      },
      {
        name: "交通",
        value: 575,
        showValue: "575",
        color: "#230370",
        percent: 0.1107540173053152
      },
      {
        name: "其他",
        value: 575,
        showValue: "575",
        color: "#890F70",
        percent: 0.2107540173053152
      }
    ]
  },
  onLoad() {
    
  },
  onShow() {
    this.draw()
  },
  draw: function (series = this.data.series) {
    const query = wx.createSelectorQuery().in(this)
    query.select('#canvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res[0] || !res[0].node) {
           return;
        }
        console.log(series)

        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
        const dpr = 2
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        // 圆心
        const pieCenter = { x: canvas.width / 2.0, y: canvas.height / 2.0 };
        // 半径
        const radius = canvas.width / 4;
        var start = -0.5 * Math.PI;
        // 先清空画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);  
        ctx.font= 12 * dpr + "px WeChat Sans Std";
        let preLineEndY;
        let preLineEndX;
        let drawLine = true;
        series.forEach(function (val, index) {
          ctx.beginPath();
          // 得到每个类别的份角度：2 * PI * 类别值 / 总值
          // arc()画圆弧
          ctx.arc(pieCenter.x, pieCenter.y, radius, start, start + val.percent * 2 * Math.PI, false);
          ctx.lineWidth = 2;
          ctx.lineTo(pieCenter.x, pieCenter.y);
          ctx.strokeStyle = "#FFFFFF";
          ctx.fillStyle = val.color;
          ctx.fill();
          ctx.closePath();
          ctx.stroke();
          if (drawLine && val.value > 0) {
            let arc = 2 * Math.PI - (start + 2 * Math.PI * val.percent / 2);
            let lineStartX = pieCenter.x + Math.cos(arc) * radius;
            let lineStartY = pieCenter.y - Math.sin(arc) * radius;
            let lineEndX = pieCenter.x + Math.cos(arc) * (radius + 10 * dpr);
            let lineEndY = pieCenter.y - Math.sin(arc) * (radius + 10 * dpr);
            let lineEndX2 = lineEndX > pieCenter.x ? (canvas.width - 10 * dpr) : 10 * dpr;
            let lineEndY2 = lineEndY;
            if(preLineEndX && preLineEndX == lineEndX2 && Math.abs(lineEndY - preLineEndY) < 30 * dpr) {
              drawLine = false
            } else {
              let nameX = lineEndX2;
              let nameY = lineEndY + (14 * dpr);
              let moneyY = lineEndY - 4 * dpr;
              ctx.beginPath();
              ctx.lineWidth = 2 * dpr;
              ctx.moveTo(lineStartX, lineStartY);
              ctx.strokeStyle = val.color;
              ctx.lineTo(lineEndX, lineEndY);
              ctx.lineTo(lineEndX2, lineEndY2);
              ctx.textAlign = lineEndX > pieCenter.x ? "right" : "left";
              ctx.fillText("￥" + val.showValue, nameX, moneyY);
              ctx.fillText(val.name, nameX, nameY);
              ctx.stroke();
            }
            preLineEndY = lineEndY;
            preLineEndX = lineEndX2;
          }
          start += val.percent * 2 * Math.PI;
        })
        ctx.beginPath();
        ctx.fillStyle = '#FFFFFF';
        ctx.moveTo(pieCenter.x, pieCenter.y);
        ctx.arc(pieCenter.x, pieCenter.y, radius * 0.5, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
      })
  }
})

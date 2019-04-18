// pages/index/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clientY:0,
    slidingDistance:0,
    height:50,
    courierInfor:null,
    current: 'index'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.hideTabBar()
    var that = this
    var cache = app.getCache("userCache")
    if (cache) {
      that.setData({
        courierInfor: cache
      })
    } else {

    }
  },
  handleChange ({ detail }) {
    if (detail.key === "index"){
      this.onShow()
    }else{
      wx.switchTab({
        url:"../historys/historys"
      })
    }
},
  handleConfirm:function(e){
    var courierId = e.detail.value
    console.log(courierId)
    var that = this
    that.requestCourierInfor(courierId)
  },
  requestCourierInfor: function (courierId){
    var that = this
    wx.request({
      url: 'https://www.kuaidi100.com/autonumber/autoComNum?text=75141259828535',
      method: "POST",
      success(res) {
        // console.log(res.data.auto[0].comCode)
        var res = res.data.auto[0].comCode

        wx.request({
          url: 'https://p.kuaidi100.com/rss/weixin/query.do?token=20B02D23AB9B6DB5D508B1CED8E9E816&com='+res+'&num=75141259828535',
          method: "POST",
          success(res){
            console.log(res.data)
            var courierInfor = []

            var cache = app.getCache("userCache")
            
            if(cache){
              courierInfor = cache
              courierInfor.push({time:app.getCurrentTime(),data:res.data})
              app.setCache("userCache", courierInfor)
              that.setData({
                courierInfor: courierInfor
              })
              wx.navigateTo({
                url: '../content/content?courierId=' + courierId,
              })
            }else{
              courierInfor.push(res.data)
              app.setCache("userCache",courierInfor)
            }
            
          }
        })
      }
    })
  }
  
})
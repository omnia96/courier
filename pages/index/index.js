
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
    // var cache = app.getCache("userCache")
    // if (cache) {
    //   that.setData({
    //     courierInfor: cache
    //   })
    // } else {

    // }
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
    // console.log(courierId)
    var that = this
    //75141259828535
    wx.navigateTo({
      url: '../content/content?courierId=' + courierId,
    })
  },
  handleScanning:function(e){
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ['barCode'],
      success: (result) => {
        var courierId = result.result
        wx.navigateTo({
          url: '../content/content?courierId=' + courierId,
        })
      },
      fail: () => {},
      complete: () => {}
    });
      
  }
  
})
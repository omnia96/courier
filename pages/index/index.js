
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
    current: 'index',
    courierId:null
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
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  handleChange ({ detail }) {
    if (detail.key === "index"){
      this.onShow()
    }else if(detail.key === "historys"){
      wx.switchTab({
        url:"../historys/historys"
      })
    }else if(detail.key === "remind"){
      wx.switchTab({
        url:"../remind/remind"
      })
    }
},
  handleConfirm:function(e){
    if (e.detail.value != ""){
      var courierId = e.detail.value
      // console.log(courierId)
      var that = this
      that.setData({
        courierId: courierId
      })
      wx.navigateTo({
        url: '../content/content?courierId=' + e.detail.value,
      })
    }
  },
  handleblur:function(e){
    if (e.detail.value != "") {
    var courierId = e.detail.value
    // console.log(courierId)
    var that = this
    that.setData({
      courierId:courierId
    })
    }
  },
  handleSearch:function(){
    var that = this

    var courierId = that.data.courierId
    if(courierId != null){
      wx.navigateTo({
        url: '../content/content?courierId=' + courierId,
      })
      that.setData({
        courierId:null
      })
    }
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
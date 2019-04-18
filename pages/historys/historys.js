// pages/historys/historys.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'historys'
  },
  handleChange ({ detail }) {
    if (detail.key === "historys"){
      this.onShow()
    }else{
      wx.switchTab({
        url:"../index/index"
      })
    }
},
handletap:function(courierId){
  wx.navigateTo({
    url: '../content/content?courierId=' + courierId,
  })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    wx.hideTabBar()
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

  }
})
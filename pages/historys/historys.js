// pages/historys/historys.js
const app =  getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'historys',
    courierInfor:null,
    visible:false,
    deleteId:null
  },
  handleChange ({ detail }) {
    if (detail.key === "historys"){
      this.onShow()
    }else if(detail.key === "remind"){
      wx.switchTab({
        url:"../remind/remind"
      })
    }else if(detail.key === "index"){
      wx.switchTab({
        url:"../index/index"
      })
    }
},
handleOpen (e) {
  console.log(e)
  this.setData({
      visible: true,
      deleteId:e.target.id
  });
},

handleClose () {
  this.setData({
      visible: false
  });
},
handleDelete(e){

  console.log(e.target.id)
  var array = {}
  var newArray = {}
  array = app.getCache("userCache")
  for(var index in array){
    if(index != e.target.id){
      newArray[index] = array[index]
    }
  }
  console.log(array)
console.log(newArray)
  app.setCache("userCache",newArray)
  this.setData({
    visible: false
});
this.onShow()
},
handletap:function(e){
  console.log(e.currentTarget.id)
  wx.navigateTo({
    url: '../content/content?courierId=' + e.currentTarget.id,
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
    var cache = []
    cache = app.getCache("userCache")
    var that = this
    console.log(cache)
    that.setData({
      courierInfor:cache
    })
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
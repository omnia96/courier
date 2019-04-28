
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
    var inquireNum = app.getCache("inquireNum")
    if(inquireNum != false){
      var timeDifference = app.TimeDifference(inquireNum.upDataTime,app.getCurrentTime())
      if(timeDifference < 720){

      }else{
        that.scoresMinus(inquireNum,"+")
      }
    }else{
      var data = {
        upDataTime:app.getCurrentTime(),
        scores:10
      }
      app.setCache("inquireNum",data)
    }
  },
  scoresMinus(array,type){
    var upDataTime = array.upDataTime
    var scores = Number
    if(type == "+"){
      scores = array.scores + 1
    }else{
      scores = array.scores - 1
    }
    var data = {
          upDataTime:app.getCurrentTime(),
          scores:scores
    }
    app.setCache("inquireNum",data)
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
      var scores = app.getCache("inquireNum")
      if(scores.scores >0){
        wx.navigateTo({
          url: '../content/content?courierId=' + courierId,
        })
        that.scoresMinus(scores,"-")
      }else{
        that.setData({
          visible: true
        })
      }
      
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
  handleInput(e){
    var that = this
    var courierId = e.detail.value
    console.log(e.detail)
    that.setData({
      courierId: courierId
    })
  },
  handleSearch:function(){
    var that = this

    var courierId = that.data.courierId
    if(courierId != null){
      var scores = app.getCache("inquireNum")
      if(scores.scores >0){
        wx.navigateTo({
          url: '../content/content?courierId=' + courierId,
        })
        that.scoresMinus(scores,"-")
      }else{
        that.setData({
          visible: true
        })
      }
    }
    that.setData({
      courierId:null
    })
  },
  handleClose(){
    var that = this
    that.setData({
      visible:false
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
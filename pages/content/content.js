const app = getApp();
var md5 = require("../../utils/md5")
var base64 = require("../../utils/base64")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 2,
    verticalCurrent: 0,
    courierInfor: null,
    orderInfo: null,
    spinShow: true,
  },
  handleClick() {
    const addCurrent = this.data.current + 1;
    const current = addCurrent > 2 ? 0 : addCurrent;
    this.setData({
      'current': current
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.courierId)
    var that = this
    // that.requestCourierInfor(options.courierId)
    that.requestOrderCom(options.courierId, that.requestOrderInfo)
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

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onSwitchChange() {
    var value = this.data.spinShow
    this.setData({
      spinShow: !value
    });
  },
  requestCourierInfor: function (courierId) {

  },
  requestOrderCom: function (id, callback) {
    var that = this
    var ReqURL = "https://api.kdniao.com/Ebusiness/EbusinessOrderHandle.aspx"
    var EBusinessID = "1469691"
    var AppKey = "ed83126f-cc12-4d31-84ff-75e166b89cef"
    var requestData = {
      LogisticCode: id
    }
    requestData = JSON.stringify(requestData)
    var data = {
      EBusinessID: EBusinessID,
      RequestType: "2002",
      RequestData: encodeURIComponent(requestData),
      DataType: "2"
    }
    var dataSign = encodeURI(base64.toBase64(md5.hex_md5(requestData + AppKey)))
    data["DataSign"] = dataSign

    wx.request({
      url: ReqURL,
      data: data,
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      success(res) {
        console.log(res)
        // console.log(res.data.Shippers[0].ShipperCode)
        var shipperCode = res.data.Shippers[0].ShipperCode
        var shipperName = res.data.Shippers[0].ShipperName
        that.setData({
          orderInfo:{
            id:id,
            name:shipperName
          }
        })
        callback(id, shipperCode)
      }
    })
  },
  requestOrderInfo: function (courierId, com) {
    // courierId = "75141259828535"
    var that = this
    var EBusinessID = "1469691"
    var AppKey = "ed83126f-cc12-4d31-84ff-75e166b89cef"
    var ReqURL = "https://api.kdniao.com/Ebusiness/EbusinessOrderHandle.aspx"

    var requestData = {
      OrderCode: "",
      ShipperCode: com,
      LogisticCode: courierId
    }
    requestData = JSON.stringify(requestData)
    console.log(requestData)
    var data = {
      EBusinessID: EBusinessID,
      RequestType: "1002",
      RequestData: encodeURIComponent(requestData),
      DataType: "2"
    }
    console.log(data)

    var sign = md5.hex_md5(requestData + AppKey)
    var signn = base64.toBase64(sign)
    var signnn = encodeURIComponent(signn)
    console.log(sign)
    console.log(signn)
    console.log(signnn)

    data['DataSign'] = signnn

    wx.request({
        url: ReqURL,
        data: data,
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        },
        success(res) {
          that.onSwitchChange()
          console.log(res)
          var comName = that.data.orderInfo.name
          var arr = res.data.Traces
          var res  = arr.reverse()
          console.log(res)
          that.setData({
            courierInfor: res
          })
          var courierInfor = []
          var cache = app.getCache("userCache")
          if (cache) {
            courierInfor = cache
            var courierIdIf = false
            for (var i = 0; i < courierInfor.length; i++) {
              if (courierInfor[i].courierId === courierId) {
                courierIdIf = true
                courierInfor[i].data = res
              }
            }
            app.setCache("userCache", courierInfor)
            if (courierIdIf == false) {
              courierInfor.push({
                comName: comName,
                courierId: courierId,
                time: app.getCurrentTime(),
                data: res
              })
              app.setCache("userCache", courierInfor)
            }
          } else {
            courierInfor.push({
              comName: comName,
              courierId: courierId,
              time: app.getCurrentTime(),
              data: res
            })
            app.setCache("userCache", courierInfor)
          }
        }
    })
}
})
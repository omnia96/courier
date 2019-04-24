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

    var courierInfor =  app.getCache("userCache")
    if(courierInfor != false){
      var cacheTime = courierInfor[options.courierId].time
      var cha = app.TimeDifference(cacheTime,app.getCurrentTime())
      if(cha < 60){
        that.setData({
          orderInfo:{
            id:options.courierId,
            name:courierInfor[options.courierId].comName
          },
          courierInfor:courierInfor[options.courierId].data
        })
        that.onSwitchChange()
      }else{
        that.requestCourierInfor(options.courierId)
      }
    }else{
      that.requestCourierInfor(options.courierId)
    }
    // that.requestOrderCom(options.courierId, that.requestOrderInfo)
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
    var appcode = 'c8ba01acfc514a85ba29efac1ce66377'
    var that = this
    wx.request({
      url: "https://wuliu.market.alicloudapi.com/kdi",
      data: {
        no: courierId,
        Type: ""
      },
      header: {
        "Authorization": 'APPCODE ' + appcode
      },
      success(res) {
        console.log(res.data)

        switch (res.data.status) {
          case "0":
            console.log("成功")
            that.setData({
              courierInfor: res.data.result.list
            })
            that.setData({
              orderInfo:{
                name:res.data.result.expName,
                id:courierId
              }
            })
            var comName = res.data.result.expName
            var courierInfor = {}
            var cache = app.getCache("userCache")
            if(cache != false){
              courierInfor = cache
              courierInfor[courierId] = {
                comName:comName,
                courierId:courierId,
                time:app.getCurrentTime(),
                data:res.data.result.list
              }
              app.setCache("userCache",courierInfor)
            }else{
              courierInfor[courierId] = {
                comName:comName,
                courierId:courierId,
                time:app.getCurrentTime(),
                data:res.data.result.list
              }
              app.setCache("userCache",courierInfor)
            }
            that.onSwitchChange()
            break;
          case "201":
            console.log("快递单号错误")
            break;
          case "203":
            console.log("快递公司不存在")
            break;
          case "204":
            console.log("快递公司识别失败")
            break;
          case "205":
            console.log("没有信息")
            break;
          case "207":
            console.log("该单号被限制，错误单号")
            break;
          default:
            break;
        }
      }
    })
  },
  requestOrderCom: function (id, callback) {
    var that = this
    var ReqURL = "http://wuliu.market.alicloudapi.com/getExpressList"
    var appCode = ""
    var quer
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
          orderInfo: {
            id: id,
            name: shipperName
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
        console.log(res)
        var arr = res.data.Traces
        var res = arr.reverse()
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
        that.onSwitchChange()
      }
    })
  }
})
const app = getApp();
var md5 = require("../../utils/md5")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 2,
    verticalCurrent: 0,
    courierInfor: null,
    comName:null,
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
    console.log(options)
    var that = this
    that.requestCourierInfor(options.courierId)
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
  onSwitchChange () {
    var value = this.data.spinShow
    this.setData({
        spinShow: !value
    });
},
  requestCourierInfor: function (courierId) {
    var that = this
    wx.request({
      url: 'https://www.kuaidi100.com/autonumber/autoComNum?text=' + courierId,
      method: "POST",
      success(res) {
        var res = res.data.auto[0].comCode
        var key = "qJKUuYiN7448"
        var customer = "BE828956D82E1D71D98625FE39685BB5"
        var param = {
          "com": res,
          "num": courierId,
          "phone": "",
          "from": "",
          "to": "",
          "resultv2": "1"
        }
        var sign = md5.hex_md5(JSON.stringify(param) + key + customer)
        // console.log(JSON.stringify(param) + key +customer)
        sign = sign.toUpperCase()
        var data = "customer=" + customer + "&sign=" + sign + "&param=" + JSON.stringify(param)
        // console.log(data)
        var com = res
        var reqTask = wx.request({
          url: 'https://p.kuaidi100.com/mobile/mobileapi.do?method=Initialize&version=0',
          data: {},
          header: {'content-type':'application/json'},
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: (result) => {
            console.log(result.data.companyList)
            var array = []
            array = result.data.companyList
            var arr = array.filter(function(item){
              // var reg = new RegExp(com)
              // return reg.test(item["number"])
              if(item["number"] == com){
                return item
              }
            })
            var comName = arr[0].name
            console.log(comName)
            that.setData({
              comName:comName
            })
            wx.request({
              url: 'https://poll.kuaidi100.com/poll/query.do',
              data: data,
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: "POST",
              success(res) {
                var res = res.data
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
                      comName:comName,
                      courierId: courierId,
                      time: app.getCurrentTime(),
                      data: res
                    })
                    app.setCache("userCache", courierInfor)
                  }
                } else {
                  courierInfor.push({
                    comName:comName,
                    courierId: courierId,
                    time: app.getCurrentTime(),
                    data: res
                  })
                  app.setCache("userCache", courierInfor)
                }
                that.onSwitchChange()
              }
            
            })

          },
          fail: () => {},
          complete: () => {}
        })
      }
    })
  }
})
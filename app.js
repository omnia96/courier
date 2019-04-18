//app.js
App({
  onLaunch: function () {
    wx.hideTabBar()
  },
  globalData: {
  },
  getCurrentTime: function () {
    var date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    if (month < 10) {
      month = '0' + month
    } else {
      month = month
    }
    if (day < 10) {
      day = '0' + day
    } else {
      day = day
    }
    if (hour < 10) {
      hour = '0' + hour
    } else {
      hour = hour
    }
    if (minute < 10) {
      minute = '0' + minute
    } else {
      minute = minute
    }
    let new_date = year + '-' + month + '-' + day + ' ' + hour + ':' + minute
    return new_date
  },
  setCache: function (key, value) {
    try {
      wx.setStorageSync(key, value)
      console.log("创建缓存:" + key + "成功")
      console.log(value)

    } catch (e) {
      console.log(e + "创建缓存失败")
    }
  },
  getCache: function (cache) {

    try {
      const value = wx.getStorageSync(cache)
      if (value) {
        console.log("读取到缓存" + cache)
        return value
      } else {
        console.log("没有读取到缓存")
        return false

      }
    } catch (e) {
      console.log(e + "读取缓存失败")
    }
  }
})
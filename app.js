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
  TimeDifference: function (time1, time2) {
    //计算时间差，返回值为分钟数
    //定义两个变量time1,time2分别保存开始和结束时间
    // var time1 = "2009-12-02 12:25";
    // var time2 = "2010-1-02 12:35";
    //判断开始时间是否大于结束日期
    if (time1 > time2) {
      // alert("开始时间不能大于结束时间！");
      return false;
    }
    //截取字符串，得到日期部分"2009-12-02",用split把字符串分隔成数组
    var begin1 = time1.substr(0, 10).split("-");
    var end1 = time2.substr(0, 10).split("-");

    //将拆分的数组重新组合，并实例成化新的日期对象
    var date1 = new Date(begin1[1] + - +begin1[2] + - +begin1[0]);
    var date2 = new Date(end1[1] + - +end1[2] + - +end1[0]);

    //得到两个日期之间的差值m，以分钟为单位
    //Math.abs(date2-date1)计算出以毫秒为单位的差值
    //Math.abs(date2-date1)/1000得到以秒为单位的差值
    //Math.abs(date2-date1)/1000/60得到以分钟为单位的差值
    var m = parseInt(Math.abs(date2 - date1) / 1000 / 60);
    //小时数和分钟数相加得到总的分钟数
    //time1.substr(11,2)截取字符串得到时间的小时数
    //parseInt(time1.substr(11,2))*60把小时数转化成为分钟
    var min1 = parseInt(time1.substr(11, 2)) * 60 + parseInt(time1.substr(14, 2));
    var min2 = parseInt(time2.substr(11, 2)) * 60 + parseInt(time2.substr(14, 2));
    //两个分钟数相减得到时间部分的差值，以分钟为单位
    var n = min2 - min1;
    //将日期和时间两个部分计算出来的差值相加，即得到两个时间相减后的分钟数
    var minutes = m + n;
    console.log(minutes)
    return minutes
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
//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    meta_infos:{},
    // done:false
  },
  onLoad: function () {
    //判断用户缓存信息
    if (!wx.getStorageSync('user')) {
      console.log('验证是否授权');
      wx.navigateTo({
        url: '../auth/auth'
      })
      return;
    } else {
      console.log('已授权')
    }

    this.getMeta();
    wx.showToast({ title: '玩命加载中', icon: 'loading' })
    
    this.getUserInfo()
  },
  getUserInfo:function(){
    const user = wx.getStorageSync('user')
    console.log(user)
    this.setData({
      userInfo: user
    })
  },
  // getUserInfo: function(e) {
  //   console.log(e)
  //   app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },
  getMeta: function () {
    var url = app.apiUrl
    var params = {
      // type: 'zhongtong', 
      //   postid : '424621263550',
    }
    //@todo 网络请求API数据
    app.request.requestGetApi(url, params, this, this.successFun, this.failFun)
  },
  successFun: function (res, selfObj) {
    console.log(res)
    selfObj.setData({
      meta_infos: res.meta_infos,
    })
  },
  failFun: function (res, selfObj) {
    console.log('failFun', res)
  },

  //图片加载出错，替换为默认图片

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.setNavigationBarTitle({
      title: 'WeChat'
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that=this;
    wx.showLoading({
      title: '玩命加载中~~~',
    })

    setTimeout(function(){
      // 隐藏加载框
      wx.hideLoading();
      that.setData({ done: true })
    },5000)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})

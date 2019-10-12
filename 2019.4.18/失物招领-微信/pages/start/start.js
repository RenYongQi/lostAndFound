// pages/start/start.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      remind : '加载中',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  //  goToIndex: function(){
  //     wx.switchTab({
  //       url: '/pages/index/index',
  //     })
  //  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
  //  wx.getSetting({
  //     success: function (res) {
  //       if (res.authSetting['scope.userInfo']) {
  //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称
  //         wx.getUserInfo({
  //           success: function (res) {
  //             console.log(res.userInfo)
  //           }
  //         })
  //       }
        
  //     }
  //   })
  },

  bindGetUserInfo: function (e) {
    // console.log(e.detail.userInfo)
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          wx.authorize({
            scope: 'scope.userInfo',
          })
        }
          wx.switchTab({
            url: '../index/index',
          })
        
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
     var that = this;
     setTimeout(function(){
       that.setData({
         remind : ''
       });
     },1500);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },
  onShow: function () {
    
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
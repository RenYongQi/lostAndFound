// pages/notice/notice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     toke:'',
     noticeList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.getStorage({
      key: 'key',
      success: function(res) {
        that.setData({
          toke: res.data
        })
      },
    })
    wx.request({
      url: 'https://renyongqi.com/api/outAdminFbNotice.php',
      method:'POST',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res){
        //console.log(res);
        if(res.data.code==200){
          let arr = res.data.list;
          that.setData({
            noticeList: arr
          })
          //console.log(that.data.noticeList);
        }
      }
    })
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
    this.onLoad();
    wx.stopPullDownRefresh();
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

  },
  insertNotice(){
    let that = this;
    wx.request({
      url: 'https://renyongqi.com/api/checkUserIsAdmin.php',
      data:{
        toke: that.data.toke
      },
      method: 'POST',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res){
         //console.log(res);
         if(res.data==1){
           wx.navigateTo({
             url: '/pages/fbnotice/fbnotice',
           })
         }else{
           wx.showToast({
             title: '仅管理员可以发布公告',
             icon: 'none'
           })
         }
      }
    })
  }
})
// pages/fbnotice/fbnotice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
   noticeTitle:'',
   noticeContent:''
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

  },
  getNoticeTitle(res){
   //console.log(res.detail.value);
   this.setData({
     noticeTitle: res.detail.value
   })
  },
  getNoticeContent(res){
    this.setData({
      noticeContent: res.detail.value
    })
  },
  sendNotice(){
    let that = this;
    if(that.data.noticeTitle==''){
        wx.showToast({
          title: '请输入标题',
          icon: 'none'
        })
    }else if(that.data.noticeContent==''){
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      })
    }else{
      wx.request({
        url: 'https://renyongqi.com/api/insertNotice.php',
        data: {
          title: that.data.noticeTitle,
          content: that.data.noticeContent
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success(res) {
         //console.log(res);
         if(res.data==1){
           wx.showToast({
             title: '发布成功',
             icon: 'none'
           })
         }else{
           wx.showToast({
             title: '发布失败，请反馈',
             icon: 'none'
           })
         }
        },
        complete(){
          that.setData({
            noticeContent: '',
            noticeTitle: ''
          })
        }
      })
    }


    
  }
})
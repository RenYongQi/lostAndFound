// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {    
   getEmail:'',
   getTextarea:'',
   inputValue:'',
   textareaValue:''
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
  getEmail(res){
   //console.log(res.detail.value);
   this.setData({
     getEmail: res.detail.value
   })
  },
  getTextarea(res){
    //console.log(res.detail.value);
    this.setData({
      getTextarea: res.detail.value
    })
  },
  sendEmail(){
    let that = this;
    let reg = /^\w+@\w+\.com$/;
    if(this.data.getEmail==''){
        wx.showToast({
          title: '邮箱不能为空',
          icon: 'none'
        })
    }else if(!reg.test(this.data.getEmail)){
      wx.showToast({
        title: '邮箱格式错误',
        icon: 'none'
      })
    }else if(this.data.getTextarea==''){
       wx.showToast({
         title: '内容不能为空',
         icon: 'none'
       })
    }else{
      wx.request({
        url: 'https://renyongqi.com/api/sendEmail.php',
        data:{
          email: this.data.getEmail,
          content: this.data.getTextarea
        },
        method:'POST',
        header:{
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success:function(res){
          //console.log(res);
          if(res.data==1){
            wx.showToast({
              title: '提交成功',
              icon: 'none'
            })
          }else if(res.data==2){
            wx.showToast({
              title: '邮箱格式错误',
              icon: 'none'
            })
          }else{
            wx.showToast({
              title: '提交失败，请尝试重新提交！',
              icon: 'none'
            })
          }
          that.setData({
            inputValue: '',
            textareaValue: ''
          })
        }
      })
    }
  }

})
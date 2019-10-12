// pages/Me/Me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     userImg : '',
     userName : '',
     userMale : '',
     userCity : '',
     userProvince : ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let that = this;
    new Promise (resolve=>{
       wx.getStorage({
         key: 'key',
         success: function(res) {
           resolve(res);
         },
       })
    }).then(res=>{
       //console.log(res);
       wx.request({
         url: 'https://renyongqi.com/api/outUserIconName.php',
         data:{
           toke: res.data
         },
         method:'POST',
         header: {
           'content-type': 'application/x-www-form-urlencoded' // 默认值
         },
         success:function(res){
          // console.log(res);
           that.setData({
             userImg: res.data.usericon,
             userName: res.data.username,
             userCity: res.data.usercity,
             userProvince: res.data.userprovince
           })
 
         }
       })
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
// pages/Search/Search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInputValue:'',//用户输入查询值
      searchList:[],//后台返回结果
    stateColor: '#59dd24',//状态颜色
    stateColor1: '#ff008c',//状态颜色
  },
//请求用户输入的信息与数据库匹配
  tabSearch(){
    let that = this;
   // console.log(that.data.userInputValue);
   wx.request({
     url: 'https://renyongqi.com/api/searchUserFbInformation.php',
     data:{
       userInputValue: that.data.userInputValue,
     },
     method:'POST',
     header:{
       'content-type': 'application/x-www-form-urlencoded' // 默认值
     },success(res){       
       //console.log(res.data.code);
       if (res.data.code==0){
         wx.showToast({
           title: '没有找到相关记录',
           icon: 'none'
         })
         that.onLoad();
       }else{
         let arr = res.data.list;
          //console.log(arr);
         that.setData({
         searchList: arr
       })
       }
      
     }
   })
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
  userInputValue(res){
    //console.log(res.detail.value);
    this.setData({
      userInputValue: res.detail.value
    })
  },
  imgYulan(res) {
    // console.log(res.currentTarget.dataset.src);
    wx.previewImage({
      // 当前显示图片的http链接
      urls: [res.currentTarget.dataset.src] // 需要预览的图片http链接列表
    })
  },
  callTel(res) {//打电话
    //console.log(res.target.dataset.tel);
    wx.makePhoneCall({
      phoneNumber: res.target.dataset.tel // 仅为示例，并非真实的电话号码
    })
  }
})
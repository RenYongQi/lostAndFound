// pages/myfb/myfb.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     toke: '',
     myFbList:[],
    stateColor: '#59dd24',//状态颜色
    stateColor1: '#ff008c',
    cont:'',
    name:'',
    tel:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    new Promise(resolve => {
      wx.getStorage({
        key: 'key',
        success: function (res) {
          //console.log(res);
          resolve(res);
        },
      })
    }).then(res => {
      that.setData({
        toke: res.data
      })
      wx.request({
        url: 'https://renyongqi.com/api/meFbInformation.php',
        data:{
          toke: that.data.toke
        },
        method:'POST',
        header:{
          'content-type': 'application/x-www-form-urlencoded'
        },success(res){
           //console.log(res);
           if(res.data.code==200){
             let arr = res.data.list;
             //console.log(arr);
             that.setData({
               myFbList: arr
             })
           }else{
             wx.showToast({
               title: '您还没有发布的内容',
               icon: 'none'
             })
           }
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
  },
  //删除记录--已舍去
  // delrecord(res){
  // let that = this;
  // that.setData({
  //   cont: res.target.dataset.cont,
  //   name: res.target.dataset.name,
  //   tel: res.target.dataset.tel
  // })
  // new Promise(resolve=>{
  //   wx.getStorage({
  //     key: 'key',
  //     success: function(res) {
  //       resolve(res);
  //     },
  //   })
  // }).then(res=>{
  //   console.log(res);
  //   wx.request({
  //     url: 'https://renyongqi.com/api/delUserRecord.php',
  //     data:{
  //       toke: res.data,
  //       cont: that.data.cont,
  //       name: that.data.name,
  //       tel: that.data.tel
  //     },
  //     method:'POST',
  //     header:{
  //       'content-type': 'application/x-www-form-urlencoded' // 默认值
  //     },
  //     success(res){

  //     }
  //   })
  // })
  // }
})
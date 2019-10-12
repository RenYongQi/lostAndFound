// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userImg: '',//获取用户的信息
    userName: '',//获取用户的信息
    userMale: '',//获取用户的信息
    state: '丢失',//状态
    state1: '拾到',//状态
    stateColor: '#59dd24',//状态颜色
    stateColor1: '#ff008c',//状态颜色
    inForContent: '黑钱包，里有校卡身份证',
    place: '地点地点',
    imgs: [//轮播图图片
      '/img/photo-1.png',
     // '/img/photo-2.png',
      '/img/photo-3.png',
      '/img/photo-4.png',
      '/img/photo-5.png'
    ],
    current: 0,//当前轮播图片
    theImg: '/img/Me.png',//图片，获取数据库图片后删除
    userProvince:'',//用户位置
    userCity:'',//用户位置
    // stateShow1:'block',
    // stateShow2:'none',
    contentList:[],//接受后台传输的数组,
  },

  change(e) {
    let that = this;
    //console.log(e); 
    that.setData({
      current: e.detail.current
    })
  },
  imgYulan(res) {
   // console.log(res.currentTarget.dataset.src);
     wx.previewImage({
       // 当前显示图片的http链接
       urls: [res.currentTarget.dataset.src] // 需要预览的图片http链接列表
     })
  },

  /**
   * 生命周期函数--监听页面加载
   */


  onLoad: function() {
    let that = this;

    wx.request({
      url: 'https://renyongqi.com/api/outUserFbInformation.php',
      method:'POST',
      header:{
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res){
        //console.log(res.data.list);
        let arr=res.data.list;
        //console.log(arr);
        that.setData({
           contentList:arr
        })
      }
    })
    new Promise(resolve => {
          wx.getSetting({
            success(res){
              resolve(res);
            }
          })
    }).then(res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              lang: "zh_CN",
              success: function(res) {
                //console.log(res)
                //console.log(res.userInfo.avatarUrl);
                that.setData({
                  userImg: res.userInfo.avatarUrl,
                  userName: res.userInfo.nickName,
                  userMale: res.userInfo.gender,
                  userCity: res.userInfo.city,
                  userProvince: res.userInfo.province
                })
                return new Promise(resolve => {
                  //console.log(that.data.userImg);
                  wx.getStorage({
                    key: 'key',
                    success: function(res) {
                      //console.log(res);
                      resolve(res);
                    },
                  })
                }).then(res => {
                  return new Promise(resolve=>{
                    wx.request({
                      url: 'https://renyongqi.com/api/getUserIconName.php',
                      data: {
                        userName: that.data.userName,//传用户名
                        userImg: that.data.userImg,//用户头像
                        toke: res.data,//codeid
                        userCity: that.data.userCity,
                        userProvince: that.data.userProvince
                      },
                      method: 'POST',
                      header: {
                        'content-type': 'application/x-www-form-urlencoded' // 默认值
                      },
                      success(res) {
                        resolve(res);
                      }
                    })
                  }).then(res=>{
                   //console.log(res);
                   if(res.data.code==0){
                     wx.showToast({
                       title: '错误，请重启小程序和授权',
                       icon: 'none',
                       duration: 3000
                     })
                   }
                  }).catch(e=>{
                    console.log(e);
                  })
                })
              }
            })

          }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.onLoad();
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  goToSearch: function() {
    wx.navigateTo({
      url: '../Search/Search',
    })
  },
 callTel(res){//打电话
    //console.log(res.target.dataset.tel);
   wx.makePhoneCall({
     phoneNumber: res.target.dataset.tel // 仅为示例，并非真实的电话号码
   })
 }
})
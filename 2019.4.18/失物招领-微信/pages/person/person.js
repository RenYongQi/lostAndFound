// pages/person/person.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userImg: '',
    userName: '',
    userCity: '',
    userProvince: '',
    name: '',
    telnumber: '',
    professional: '',
    toke: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    //获取缓存toke
    new Promise(resolve => {
      wx.getStorage({
        key: 'key',
        success(res) {
          //console.log(res.data);
          resolve(res);
        }
      })
    }).then(res => {
      return new Promise(resolve => {
        wx.request({
          url: 'https://renyongqi.com/api/outUserInformation.php',
          data: {
            toke: res.data
          },
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: function(res) {
            resolve(res);
          }
        })
      })
      /*that.setData({
        toke: res.data
      })*/
    }).then(res => {
      //console.log(res);
      that.setData({
        name: res.data.name,
        professional: res.data.userzy,
        telnumber: res.data.tel
      })
    }).catch(e => {
      console.log(e);
    })

    //获取数据库当前codeid的信息


    wx.getSetting({
      success: function(res) {
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
                userCity: res.userInfo.city,
                userProvince: res.userInfo.province,
              })
            }
          })

        }
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
  updateUserName(res) {
    //console.log(res.detail.value);
    this.setData({
      name: res.detail.value,
    })
  },
  updateUserProfessional(res) {
    //console.log(res.detail.value);
    this.setData({
      professional: res.detail.value,
    })
  },
  updateUserTelNumber(res) {
    //console.log(res.detail.value);
    this.setData({
      telnumber: res.detail.value,
    })
  },
  saveUserInfo() {
    let that = this;
    //console.log(this.data.toke);
    if (this.data.name == '') {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none',
        duration: 3000
      })
    } else if (this.data.professional == '') {
      wx.showToast({
        title: '专业不能为空',
        icon: 'none',
        duration: 3000
      })
    } else if (this.data.telnumber == '') {
      wx.showToast({
        title: '联系方式不能为空',
        icon: 'none',
        duration: 3000
      })
    }else if (!(/^1[34578]\d{9}$/.test(this.data.telnumber))){
     //判断联系方式格式是否正确
      wx.showToast({
        title: '电话格式错误',
        icon: 'none',
        duration: 3000
      })
    } 
    else {
      new Promise(resolve => {
        wx.getStorage({
          key: 'key',
          success(res) {
            //console.log(res.data);
            resolve(res);
          }
        })
      }).then(res => {
        return new Promise(resolve => {
          wx.request({
            url: 'https://renyongqi.com/api/getUserInformation.php',
            data: {
              name: that.data.name,
              telnumber: that.data.telnumber,
              professional: that.data.professional,
              toke: res.data
            },
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function(res) {
              resolve(res);
              /*  // console.log(res.data.code);
               
                */
            }
          })
        })
        /*that.setData({
          toke: res.data
        })*/
      }).then(res => {
        //console.log(res);
        if (res.data.code == 200) {
          wx.showToast({
            title: '保存成功',
            icon: 'none',
            duration: 3000
          })
        } else if (res.data.code == 0) {
          wx.showToast({
            title: '保存失败，请重新保存',
            icon: 'none',
            duration: 3000
          })
        } else {
          wx.showToast({
            title: '请检查你的网络或者信息有误',
            icon: 'none',
            duration: 3000
          })
        }
        if(res.data.checktel==0){
          wx.showToast({
            title: '电话格式错误',
            icon: 'none',
            duration: 3000
          })
        }
      }).catch(e => {
        console.log(e);
      })
      
    }

  }
})
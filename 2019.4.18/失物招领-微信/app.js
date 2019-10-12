//app.js
App({
  onLaunch: function () {
    let that = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if(res.code){
          //console.log(res);
          wx.request({
            url: 'https://renyongqi.com/api/getWxCode.php',
            data: {
              code: res.code
            },
            method:"POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success:function(res){
              //console.log(res.data.toke);
              if(res.data.code==200){
                
                wx.showToast({
                  title: '欢迎使用，请继续完善资料！',
                  icon:'none', 
                  duration:3000
                })
              }else{
                wx.showToast({
                  title: '欢迎回来',
                  icon:'none',
                  duration:3000
                })
              }

              //that.globalData.toke = res.data.toke;//设置全局变量toke
              //设置缓存toke
              wx.setStorage({
                key: 'key',
                data: res.data.toke
              })
            }            
          })
         
        } else {
          console.log('登录失败！' + res.errMsg)
        }        
      }
    })
    // 获取用户信息
    wx.getSetting({
      
    })
  },
  globalData: {
    userInfo: null,
   // toke: '',
  }
})
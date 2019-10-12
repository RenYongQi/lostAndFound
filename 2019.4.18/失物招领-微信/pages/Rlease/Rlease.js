// pages/Rlease/Rlease.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    font_color: "white",//设置颜色
    bg_color: "#2add9c",//设置颜色
    font_color1: "#2add9c",
    bg_color1: "white",
    fileImage:['/img/file.png'],
    show1: "block",//选项卡状态
    show2: "none",//选项卡状态
    theSomething: '',//丢失信息
    thePlace: '',//丢失信息
    findSomething: '',//拾到信息
    findPlace: '',//拾到信息
    tmpFileIndex:0, //上传图片临时下表
    toke:''//拿到缓存toke
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
  lost_items:function(){
    let that=this;
    that.setData({
      font_color: 'white',
      bg_color: '#2add9c',
      font_color1: '#2add9c',
      bg_color1: 'white',
      show1:'block',
      show2:'none'
    })
  },
  found_items:function(){
    let that = this;
    that.setData({
      font_color1: 'white',
      bg_color1: '#2add9c',
      font_color: '#2add9c',
      bg_color: 'white',
      show2: 'block',
      show1: 'none',
    })
  },
  sendFile:function(){
    //console.log(1);
    let { fileImage}=this.data;
     let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        //console.log(res);
        // console.log(res.tempFilePaths);
        fileImage.unshift(res.tempFilePaths);
        that.setData({
          fileImage
        })
      }
    })
  },
  //获取输入丢失/拾到信息
  insertTheSomething(res){
     //console.log(res.detail.value);
     this.setData({
       theSomething: res.detail.value
     })
  },
  insertThePlace(res){
    this.setData({
      thePlace: res.detail.value
    })
  },

  //丢失提交
  lostSubmit(){
    let that = this;
    if(that.data.theSomething==''){
          wx.showToast({
            title: '丢失物品不能为空',
            icon: 'none'
          })
    }else if(that.data.thePlace==''){
      wx.showToast({
        title: '丢失地点不能为空',
        icon: 'none'
      })
    }else{
      new Promise(resolve => {
        wx.getStorage({
          key: 'key',
          success: function (res) {
            //console.log(res.data);
            resolve(res);
          },
        })
      }).then(res => {
        return new Promise(resolve => {
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
          if (this.data.fileImage.length == 1) {
            //如果没有传图片
            //console.log(this.data.fileImage.length);
            wx.request({
              url: 'https://renyongqi.com/api/insertUserFbNoPic.php',
              data: {
                theSomething: that.data.theSomething,
                thePlace: that.data.thePlace,
                toke: that.data.toke,
                state: "丢失"
              },
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              }, 
              success(res) {
                // console.log(res.data);
                if(res.data==1){
                  wx.showToast({
                    title: '发布成功',
                    icon: 'none'
                  })
                }else{
                  wx.showToast({
                    title: 'oH!发布失败，请检查网络',
                    icon: 'none'
                  })
                }
              },
              complete(){
                that.setData({
                  theSomething: '',//丢失信息
                  thePlace: '',//丢失信息
                })
              }
            })
          } else {
            //传了图片
            //调用循环依次传图片
            this.uploadFile(this.data.fileImage);
          }

        })
      })
    }
  },
  
  uploadFile(files){
    let that = this, {tmpFileIndex}=this.data;
    if (tmpFileIndex>0)
      {
      var isSubmitPicAgain=1;  //重复上传
      }else{
      var isSubmitPicAgain=0;
      }
    
    // console.log(files[tmpFileIndex][0]);
    if (tmpFileIndex<files.length-1){
      wx.uploadFile({
        url: 'https://renyongqi.com/api/insertUserFbHavePic.php',
        filePath: files[tmpFileIndex][0],
        name: 'file',
        header: {
          'content-type': 'multipart/form-data'
        },
        formData: {
          theSomething: this.data.theSomething,
          thePlace: this.data.thePlace,
          toke: this.data.toke,
          isSubmitPicAgain: isSubmitPicAgain,
          state: "丢失"
        },
        success(res) {
          // do something
        //  console.log("files:");
          //console.log(res);
          if (res.data == 1) {
            wx.showToast({
              title: '发布成功',
              icon: 'none'
            })
          } else {
            wx.showToast({
              title: 'oH!发布失败，请检查网络',
              icon: 'none'
            })
          }
        },
        complete() {
          that.setData({
            tmpFileIndex: ++tmpFileIndex
          })
          that.uploadFile(that.data.fileImage)
          that.setData({
            fileImage: ['/img/file.png'],
            theSomething: '',//丢失信息
            thePlace: '',//丢失信息
          })
        }
      })
    }else{
      that.setData({
        tmpFileIndex: 0
      })
    }
  },

  //拾到提交
  findSubmit(){
    let that = this;
    if(that.data.theSomething==''){
      wx.showToast({
        title: '拾到物品不能为空',
        icon: 'none'
      })
    }else if(that.data.thePlace==''){
      wx.showToast({
        title: '拾到地点不能为空',
        icon: 'none'
      })
    }else{
      new Promise(resolve => {
        wx.getStorage({
          key: 'key',
          success: function (res) {
            //console.log(res.data);
            resolve(res);
          },
        })
      }).then(res => {
        //获取缓存toke
        return new Promise(resolve => {
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
          if (that.data.fileImage.length == 1) {
            //如果没有传图片
            //console.log(this.data.fileImage.length);
            wx.request({
              url: 'https://renyongqi.com/api/insertUserFbNoPic.php',
              data: {
                theSomething: that.data.theSomething,
                thePlace: that.data.thePlace,
                toke: that.data.toke,
                state: "拾到"
              },
              method: 'POST',
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              }, success(res) {
                // console.log(res.data);
                if (res.data == 1) {
                  wx.showToast({
                    title: '发布成功',
                    icon: 'none'
                  })
                } else {
                  wx.showToast({
                    title: 'oH!发布失败，请检查网络',
                    icon: 'none'
                  })
                }
              }, 
              complete(){
              that.setData({
                theSomething: '',//丢失信息
                thePlace: '',//丢失信息
              })
              }
            })
          } else {
            //传了图片
            //调用循环依次传图片
            this.uploadFindFile(this.data.fileImage);
          }

        })
      })
    }    
  },
  uploadFindFile(files) {
    let that = this, { tmpFileIndex } = this.data;
    if (tmpFileIndex > 0) {
      var isSubmitPicAgain = 1;  //重复上传
    } else {
      var isSubmitPicAgain = 0;
    }

    // console.log(files[tmpFileIndex][0]);
    if (tmpFileIndex < files.length - 1) {
      wx.uploadFile({
        url: 'https://renyongqi.com/api/insertUserFbHavePic.php',
        filePath: files[tmpFileIndex][0],
        name: 'file',
        header: {
          'content-type': 'multipart/form-data'
        },
        formData: {
          theSomething: this.data.theSomething,
          thePlace: this.data.thePlace,
          toke: this.data.toke,
          isSubmitPicAgain: isSubmitPicAgain,
          state: "拾到"
        },
        success(res) {
          // do something
          //  console.log("files:");
         // console.log(res);
          if (res.data == 1) {
            wx.showToast({
              title: '发布成功',
              icon: 'none'
            })
          } else {
            wx.showToast({
              title: 'oH!发布失败，请检查网络',
              icon: 'none'
            })
          }
        },
        complete() {
          that.setData({
            tmpFileIndex: ++tmpFileIndex
          })
          that.uploadFindFile(that.data.fileImage)
          that.setData({
            fileImage: ['/img/file.png'],
            theSomething: '',//丢失信息
            thePlace: '',//丢失信息
          })
        }
      })
    } else {
      that.setData({
        tmpFileIndex: 0
      })
    }
  },
})
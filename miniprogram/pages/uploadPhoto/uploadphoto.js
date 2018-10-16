// miniprogram/pages/uploadPhoto/uploadphoto.js
const db = wx.cloud.database()
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    // this.doUpload()
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    console.log("show");
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {
    console.log("hide");
  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {
    console.log("dsf");
  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  doUpload: function () {
    // 选择图片
    const self = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]

        // 上传图片
        var date = new Date()

        const cloudPath = date.getTime() + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)
            self.insertToCloud(res)
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
            wx.switchTab({
              url: '/pages/photo/photo',
              success: function () {

              }
            })
          }
        })

      },
      fail: e => {
        console.error(e)
        wx.switchTab({
          url: '/pages/photo/photo',
          success: function () {

          }
        })
      }
    })
  },
  insertToCloud: function (res) {
    const self = this
    db.collection('images').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        image: res.fileID,
        createTime: db.serverDate()
      },
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
        self.getData()

      },
      fail: function (res) {
        console.log(res)
      },
      complete:function(){
        wx.switchTab({
          url:'/pages/photo/photo',
          success:function(){

          }
        })
      }
    })
  }

})
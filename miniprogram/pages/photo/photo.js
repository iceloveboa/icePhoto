// miniprogram/pages/photo/photo.js

const db = wx.cloud.database()

Page({
  /**
   * Page initial data
   */
  data: {
    images: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
     this.getData()
  },

  getData: function(){
    db.collection("images").orderBy('createTime', 'desc').get({
      success: res => {
        this.setData({
          images: res.data
        })
      }
    })
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

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

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
  doUpload: function()  {
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
          }
        })

      },
      fail: e => {
        console.error(e)
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
      }
    })
  }


})
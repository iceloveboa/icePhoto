// miniprogram/pages/photo/photo.js

const db = wx.cloud.database()
const app = getApp()

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
  },

  getOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
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
    if (!app.globalData.openid) {
      this.getOpenid()
    }
    this.getData()
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
})
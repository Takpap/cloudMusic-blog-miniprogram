// pages/blog/blog.js
let searchWord = ''
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modelShow: false,
    blogList: []
  },
  onPublish() {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (res) => {
              this.loginSuccess({
                detail: res.userInfo
              })
            }
          })
        } else {
          this.setData({
            modelShow: true
          })
        }
      }
    })
  },
  loginSuccess(event) {
    let userInfo = event.detail
    wx.navigateTo({
      url: `../blog-edit/blog-edit?nickName=${userInfo.nickName}&avatarUrl=${userInfo.avatarUrl}`
    })
  },
  loginFail() {
    wx.showModal({
      title: '授权用户才能登录',
      content: ''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadBlogList()
  },
  _loadBlogList() {
    wx.showLoading({
      title: 'loading'
    })
    wx.cloud.callFunction({
      name: 'blog',
      data: {
        $url: 'list',
        start: this.data.blogList.length,
        count: 10,
        searchWord: searchWord
      }
    }).then((res) => {
      this.setData({
        blogList: this.data.blogList.concat(res.result)
      })
      wx.hideLoading()
      wx.stopPullDownRefresh()
    })
  },
  goComment(event) {
    wx.navigateTo({
      url: "../blog-comments/blog-comments?_id=" + event.target.dataset._id
    })
  },
  search(event) {
    this.setData({
      blogList: []
    })
    searchWord = event.detail.searchWord
    this._loadBlogList()
  },
  onSend(event) {
    let content = event.detail.content
    let avatarUrl = event.detail.avatarUrl
    let nickName = event.detail.nickName
    let blogId = event.currentTarget.dataset._id
    db.collection('comments').add({
      data: {
        content,
        avatarUrl,
        nickName,
        blogId,
        createTime:db.serverDate()
      },
      success:((res)=>{
        // console.log(res)S
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
  onShow: function () {},

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
    this.setData({
      blogList: []
    })
    this._loadBlogList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this._loadBlogList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
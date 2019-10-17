// pages/blog-comments/blog-comments.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    blogDetail: {},
    comments: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let blogId = options._id
    db.collection('blog').where({
      _id: blogId
    }).get().then((res) => {
      let blogDetail = res.data
      for (let index = 0; index < blogDetail.length; index++) {
        let time = blogDetail[index].createTie
        console.log(time)
        if (time) {
          let date = new Date(time)
          const o = {
            'y': date.getFullYear(),
            'M': date.getMonth() + 1,
            "d": date.getDate(),
            "h": date.getHours(),
            "m": date.getMinutes(),
            "s": date.getSeconds()
          }
          const fmt = `${o.y}-${o.M}-${o.d} ${o.h}:${o.m}:${o.s}`
          blogDetail[index].createTie = fmt
        }
      }
      this.setData({
        blogDetail:blogDetail[0]
      })
    })
    db.collection('comments').where({
      blogId: blogId
    }).orderBy('createTime', 'desc').get().then((res) => {
      let comments = res.data
      for (let index = 0; index < comments.length; index++) {
        let time = comments[index].createTime
        if (time) {
          let date = new Date(time)
          const o = {
            'y': date.getFullYear(),
            'M': date.getMonth() + 1,
            "d": date.getDate(),
            "h": date.getHours(),
            "m": date.getMinutes(),
            "s": date.getSeconds()
          }
          const fmt = `${o.y}-${o.M}-${o.d} ${o.h}:${o.m}:${o.s}`
          comments[index].createTime = fmt
        }
      }
      
      this.setData({
        comments
      })
    })
  },
  onPreview(event) {
    // console.log(this.properties.blog)
    wx.previewImage({
      urls: this.properties.blog.img,
      current: event.currentTarget.dataset.imgsrc
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

  }
})
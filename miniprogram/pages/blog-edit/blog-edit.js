// pages/blog-edit/blog-edit.js
const MAX_IMAGE = 9
const db = wx.cloud.database()
let content = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [],
    avatarUrl: '',
    nickName: '',
    wordNum: 0,
    footBottom: 0,
    selectPhote: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      avatarUrl: options.avatarUrl,
      nickName: options.nickName
    })
  },
  onInput(event) {
    this.setData({
      wordNum: event.detail.value.length
    })
    content = event.detail.value
  },
  onFocus(event) {
    this.setData({
      footBottom: event.detail.height
    })
  },
  onBlur() {
    this.setData({
      footBottom: 0
    })
  },
  onChooseImage() {
    let max = MAX_IMAGE - this.data.images.length
    wx.chooseImage({
      count: max,
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          images: this.data.images.concat(res.tempFilePaths)
        })
        max = MAX_IMAGE - this.data.images.length
        this.setData({
          selectPhote: max <= 0 ? false : true
        })
      }
    })
  },

  onDelImage(event) {
    this.data.images.splice(event.target.dataset.index, 1)
    this.setData({
      images: this.data.images
    })
    if (this.data.images.length == MAX_IMAGE - 1) {
      this.setData({
        selectPhote: true
      })
    }
  },
  onPreviewImage(event) {
    wx.previewImage({
      urls: this.data.images,
      current: event.target.dataset.imgsrc
    })
  },
  send() {
    if(content.trim() == ''){
      wx.showModal({
        title:'请输入内容',
        content:''
      })
      return
    }
    wx.showLoading({
      title:'发布中',
      mask:true
    })
    let promiseArr = []
    let fileIds = []
    for (let i = 0; i < this.data.images.length; i++) {
      let p = new Promise((resolve, reject) => {
        let item = this.data.images[i]
        let suffix = /\.\w+$/.exec(item)[0]
        wx.cloud.uploadFile({
          cloudPath: 'blog/' + Date.now() + '-' + Math.random() * 100000 + suffix,
          filePath: item,
          success: (res) => {
            fileIds = fileIds.concat(res.fileID)
            resolve()
          },
          fail: (res) => {
            console.log(res)
            reject()
          }
        })
      })
      promiseArr.push(p)

    }
    Promise.all(promiseArr).then((res)=>{
      db.collection('blog').add({
        data:{
          nickName:this.data.nickName,
          avatarUrl: this.data.avatarUrl,
          content,
          img:fileIds,
          createTie:db.serverDate()
        }
      }).then((res)=>{
        console.log(res)
        wx.hideLoading()
        wx.showToast({
          title:'发布成功'
        })
        wx.navigateBack()
        const pages = getCurrentPages()
        const prePage = pages[pages.length-2]
        prePage.onPullDownRefresh()
      })
    }).catch((err)=>{
      console.log(err)
      wx.showToast({
        title:'发布失败'
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

  }
})
// components/blog-ctrl/blog-ctrl.js
let userInfo = {}
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },
  externalClasses: [
    'iconfont',
    'icon-fenxiang',
    'icon-pinglun',
    'icon-shanchu1'
  ],
  /**
   * 组件的初始数据
   */
  data: {
    modelShow: false,
    commentHidden: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onComment(event) {
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: (res) => {
                this.loginSuccess({
                  detail: res.userInfo
                })
                this.setData({
                  commentHidden: false
                })
              }
            })
          } else {
            this.setData({
              modelShow: true,
            })
          }
        }
      })

    },
    loginSuccess(event) {
      userInfo = event.detail
    },
    loginFail() {
      wx.showModal({
        title: '授权用户才能登录',
        content: ''
      })
    },
    onClose() {
      this.setData({
        commentHidden: true
      })
    },
    onShare(event) {

    },
    onSend(event) {
      let content = event.detail.value.content
      this.triggerEvent('onSend', {
        content,
        // _id: this.properties._id,
        avatarUrl:userInfo.avatarUrl,
        nickName: userInfo.nickName,
      })
      this.onClose()
      wx.showToast({
        title:'评论成功'
      })

    }
  }
})
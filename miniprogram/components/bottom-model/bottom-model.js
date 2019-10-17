// components/bottom-model/bottom-model.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    modelShow: Boolean
  },
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClose() {
      this.setData({
        modelShow: false
      })
    },
    onGetUserInfo(res){
       let userInfo = res.detail.userInfo
      if(userInfo){
        this.setData({
          modelShow:false
        })
        this.triggerEvent('loginSuccess',userInfo)
      }else{
         this.triggerEvent('loginFail')
      }
    }
  }
})
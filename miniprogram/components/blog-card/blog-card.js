// components/blog-card/blog-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    blog: Object
  },
  observers: {
    ['blog.createTie'](val) {
      if (val) {
        let date = new Date(val)
        const o = {
          'y': date.getFullYear(),
          'M': date.getMonth() + 1,
          "d": date.getDate(),
          "h": date.getHours(),
          "m": date.getMinutes(),
          "s": date.getSeconds()
        }
        const fmt = `${o.y}-${o.M}-${o.d} ${o.h}:${o.m}:${o.s}`
        this.setData({
          publishTime: fmt
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    publishTime: ''

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onPreview(event){
      // console.log(this.properties.blog)
      wx.previewImage({
        urls:this.properties.blog.img,
        current: event.currentTarget.dataset.imgsrc
      })
    }

  }
})
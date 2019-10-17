// components/search/search.js
let searchWord = ''
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder:{
      type:String,
      value:'请输入'
    }
  },
  externalClasses:[
    'iconfont',
    'icon-sousuo',
  ],
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    input(event){
      searchWord = event.detail.value
    },
    search() {
      this.triggerEvent('search',{searchWord})
    },
  }
})

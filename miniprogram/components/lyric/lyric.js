// components/lyric/lyric.js
let lyricHeight = 0
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isLyricShow: {
      type: Boolean,
      value: false
    },
    lyric: String
  },
  observers: {
    lyric(lrc) {
      if (lrc == '暂无歌词') {
        this.setData({
          lrcList: [{
            lrc,
            time: 0
          }],
          nowLyricIndex: -1
        })
      } else {
        this._parseLyric(lrc)
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    lrcList: [],
    nowLyricIndex: 0,
    scrollTop: 0
  },
  lifetimes: {
    ready() {
      wx.getSystemInfo({
        success(res) {
          //求出1rpx大小
          lyricHeight = res.screenWidth / 750 * 64
        }
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    update(currentTime) {
      let lrcList = this.data.lrcList
      if (lrcList.length == 0) {
        return
      }
      if (currentTime > lrcList[lrcList.length - 1].time) {
        this.setData({
          nowLyricIndex: -1,
          scrollTop: lrcList.length * lyricHeight
        })
      }

      for (let i = 0, len = lrcList.length; i < len; i++) {
        // console.log(currentTime)
        // console.log(lrcList[i].time)
        if (currentTime <= lrcList[i].time) {
          this.setData({
            nowLyricIndex: i - 1,
            scrollTop: (i - 1) * lyricHeight
          })
          break
        }
      }
    },
    _parseLyric(lyric) {
      let line = lyric.split('\n')
      let _lrcList = []
      line.forEach(element => {
        let time = element.match(/\[(\d{2,}):(\d{2,})(?:\.(\d{2,3}))?]/g)
        if (time != null) {
          let lrc = element.split(time)[1]
          let timeReg = time[0].match(/(\d{2,}):(\d{2,})(?:\.(\d{2,3}))?/)
          let timeToSeconds = parseInt(timeReg[1]) * 60 + parseInt(timeReg[2]) + parseInt(timeReg[3]) / 1000
          _lrcList.push({
            lrc,
            time: timeToSeconds
          })
        }
      })
      this.setData({
        lrcList: _lrcList
      })
    }
  }
})
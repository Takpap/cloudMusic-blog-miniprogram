// 云函数入口文件
const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')
cloud.init()
const db = cloud.database()
const blogCollection = db.collection('blog')


// 云函数入口函数
exports.main = async(event, context) => {
  const app = new TcbRouter({
    event
  })
  app.router('list', async(ctx, next) => {
    const searchWord = event.searchWord
    let w = {}
    if (searchWord.trim() != '') {
      w = {
        content: db.RegExp({
          regexp: searchWord,
          options: "i"
        })
      }
      console.log(w)
    }
    ctx.body = await blogCollection.where(w).skip(event.start).limit(event.count).orderBy('createTie', 'desc').get().then((res) => {
      return res.data
    })
  })
  return app.serve()
}
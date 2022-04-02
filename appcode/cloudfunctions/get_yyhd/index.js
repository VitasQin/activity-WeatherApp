// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'cloud1-5giz18mq9f9fc934'
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var text = event.openid
  return await db.collection('hdyy').aggregate().match({openid:text})
  .lookup({
    from:'hd',
    localField:'hdname',
    foreignField:'_id',
    as:'hd'
  }) 
  .sort({
    _updateTime: -1 // 倒序
  })
  .end()
}
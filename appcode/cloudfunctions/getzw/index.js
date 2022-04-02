// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'cloud1-5giz18mq9f9fc934'
})
const db=cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {

  return await db.collection("tsgzw").get()
}
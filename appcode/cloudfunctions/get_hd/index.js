// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:'cloud1-5giz18mq9f9fc934'
})
const db = cloud.database()
const _ = db.command
const $ = _.aggregate
// 云函数入口函数
exports.main = async (event, context) => {
  var text = event.openid
      return await db.collection('hd').aggregate()
      .lookup({
        from: 'hdyy',
         let: {
          hd_id: '$_id'
        },
        pipeline: db.command.aggregate.pipeline()
            .match(_.expr(
            $.eq(['$hdname', '$$hd_id']),
          ))
          .group({
          _id: '$hdname',
          bmrs: db.command.aggregate.sum('$js')
        })
        .done(),
      as: 'hdyy'
    })
    .end()

}
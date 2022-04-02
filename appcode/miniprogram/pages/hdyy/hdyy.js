// pages/hdyy/hdyy.js

const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    userInfo:'',
    array:["大一","大二","大三","大四","专科","研究生","已毕业"],
    array1:["计算机学院","化学学院"],
    xy_index:0,
    text_id:'',
    nj_index:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const app =getApp()
    var openid =app.globalData.openid
    this.setData({
      openid:openid,
      text_id:options.text_id
    })
    db.collection("user").where({openid:this.data.openid}).get().then(res=>{
      console.log(res.data)
      this.setData({
        userInfo:res.data
      })
    })
  },
  bindchangenj:function(e){
    console.log(e.detail.value)
    this.setData({
      nj_index:e.detail.value
    })
  },
  bindchangexy:function(e){
    console.log(e.detail.value)
    this.setData({
      xy_index:e.detail.value
    })
  },
  formSubmit(e){
    console.log(e.detail.value)
    var cc=0
    db.collection("hdyy").where({hdname:this.data.text_id,openid:this.data.openid}).count().then(res => {
      cc=res.total
      console.log(cc)
      if(cc==0) {
        console.log('11111')
        db.collection("hdyy").add({
          data:{
            openid:this.data.openid,
            hdname:this.data.text_id,
            phone:e.detail.value.phone,
            username:e.detail.value.name,
            qdzt:0,
            js:1,
            _updateTime:Date.parse(new Date()),
          },
          success:function(res){
            wx.showToast({
              title: '报名成功',
              icon: 'success',
              duration: 1500,
              success: function () {
                wx.navigateBack()
              }
            })
          }
          
        })
      }
      if(cc>0) {
        console.log('2222')
          wx.showToast({
            title: '你已经报名',
            icon: 'error',
            duration: 1500,
            success: function () {
              //wx.navigateBack()
            }
          })
      }
    })
   
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
// pages/qxyy/qxyy.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioItems: [{
        name: '有事',
        value: 'ys',
        checked: true
      },
      {
        name: '生病',
        value: 'sb'
      },
      {
        name: '其他',
        value: 'qt'
      }
    ],
    xzyy:'',
    list_id:''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const app=getApp()
    var openid=app.globalData.openid
    this.setData({
      openid:openid
    })
    console.log(options.id)
    this.setData({
      list_id:options.id
    })
  },
  radioChange(e){
    console.log(e.detail.value)
    this.setData({
      xzyy:e.detail.value
    })
  },
  //取消活动预约
  submitForm(){
    db.collection("hdyy").where({openid:this.data.openid,hdname:this.data.list_id}).remove({
      success: res => {
        wx.showToast({
          title: '活动预约取消成功',
          icon: 'success',
          duration: 2000,
          success:res=>{
            wx.navigateBack()
              }
            })
          }
        })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
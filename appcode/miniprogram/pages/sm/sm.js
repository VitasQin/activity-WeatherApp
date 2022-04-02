// pages/sm/sm.js
var wxbarcode=require('../../utils/index.js')
var times=require('../../utils/times.js')
const db= wx.cloud.database()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    code_openid:'',
    openid:'',
    userinfo:'',
    sqqk:0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const app =getApp()
    var openid =app.globalData.openid
    var userinfo =wx.getStorageSync('userinfo')
    this.setData({
      openid:openid,
      userinfo:userinfo,
      code_openid:openid.substr(-10).padStart(openid.length, "*")
    })
    wxbarcode.barcode('barcode',openid,680,100)
    wxbarcode.qrcode('qrcode',openid,420,420)
  },
  openqr:function(){
     var openid=this.data.openid
      var sqqk=this.data.sqqk
      var xzsjd=''
      var bhxx=''
      var timestamp = Date.parse(new Date());
      var date = new Date(timestamp);
      console.log(this.data.openid)
      wx.scanCode({
        onlyFromCamera: true,
        success (res) {
          console.log(res.result)
          db.collection("hdyy").where({hdname:res.result,openid:openid}).get().then(res=>{
            console.log(res)
              if(res.data[0].qdzt==0){
                db.collection("hdyy").where({hdname:res.result,openid:openid}).update({
                  data:{
                      qdzt:1,
                      qdsj:(new Date()).valueOf(),
                    },
                    success:res=>{
                    console.log(bhxx)
                    wx.showToast({
                      title: '签到成功',
                      icon: 'success',
                      duration: 2000,
                      success:res=>{
                      }
                    })
                  }
                })
              }else{
                if(res.data[0].qdzt==1){
                  wx.showToast({
                    title:'你已签到！',
                    icon:'error',
                    duration:2000,
                  })
                }
                else{
                  wx.showToast({
                    title:'你没有预约该项活动！',
                    icon:'error',
                    duration:2000,
                  })
                }
                
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
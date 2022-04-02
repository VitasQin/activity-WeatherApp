// pages/zwyd/zwyd.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list_id:'',
    rmbs:'',
    userinfo:'',
    openid:'',
    sjxx:[["8:00-9:30",0],["9:30-11:00",1],["11:00-12:30",2],["12:30-2:00",3],["2:00-4:00",4]],
    sjxxindex:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userinfo =wx.getStorageSync('userinfo')
    const app = getApp()
    var openid = app.globalData.openid
    console.log(options)
    this.setData({
      list_id:options.list_id,
      userinfo:userinfo,
      openid:openid,
      sjxxindex:options.sjid
    })
    wx.cloud.callFunction({
      name:'getzwlist',
      data:{
        listid:options.list_id
      },
      complete:res=>{
        console.log(res.result.list)
        this.setData({
          rmbs:res.result.list
        })
      }
    })
  },
  qrxz(){
    db.collection("xzxx").add({
      data:{
        openid:this.data.openid,
        zxzw:this.data.list_id,
        qdzt:0,
        qt:0,
        zxsj:this.data.sjxxindex,
        _createTime: Date.parse(new Date()),
      }
    }).then(res=>{
      wx.showToast({
        title:'选座成功',
        icon:'success',
        duration:2000,
        success:()=>{
          console.log(this.data.list_id)
          db.collection("tsgzw").doc(this.data.list_id).update({
            data:{
              ['sj.'+this.data.sjxxindex+'.0']:2
            },
            success:res=>{
              setTimeout(function(){
                wx.switchTab({
                  url: '../index/index',
                })
              },2000)
            }
          })
        }
      })
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
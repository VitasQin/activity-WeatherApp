// pages/dk/dk.js
const db=wx.cloud.database()
var times=require('../../utils/times.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:'',
    xzxx:'',
    qdcs:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const app=getApp()
    var userinfo =wx.getStorageSync('userinfo')
    this.setData({
      userinfo:userinfo
    })
    console.log(userinfo[0].openid)
    var openid=app.globalData.openid
    wx.cloud.callFunction({
      name:'get_yyhd',
      data:{
        openid:openid
      },
      complete:res=>{
        console.log(res.result.list)
        for(var i=0;i<res.result.list.length;i++){
          res.result.list[i].hd[0]["hdtime"]=times.toDate(res.result.list[i].hd[0]["hdtime"])
          res.result.list[i]["_updateTime"]=times.toDate(res.result.list[i]["_updateTime"])
        }
        this.setData({
          xzxx:res.result.list
        })
      }
    })
    db.collection("hdyy").where({openid:openid}).count().then(res => {
       console.log(res)
      this.setData({
        qdcs: res.total
      })
    })

  },
  qd(){
    wx.navigateTo({
      url: '../sm/sm',
    })
  },
  jl(){
    wx.navigateTo({
      url: '../wdyy/wdyy',
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
      this.onLoad()
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
// pages/hdbm/hdbm.js
const db=wx.cloud.database()
var times=require('../../utils/times.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    text_id:'',
    bm:'',
    bm1:'',
    rmb:'',
    rmb1:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const app=getApp()
    var openid=app.globalData.openid
    this.setData({
      openid:openid,
      text_id:options.text_id
    })
   this.gethd()
    /*
    db.collection("hdyy").where({openid:this.data.openid}).get().then(res=>{
      console.log(res.data)
      var lins=this.data.rmb
      for(let i=0;i<res.data.length;i++){
        for(let k=0;k<lins.length;k++){
          if(res.data[i].hd==lins[k]._id){
            console.log(res.data[i].hd+"对比"+lins[k]._id)
            lins[k]._yyzt=1
          }
        }
      }
      this.setData({
        rmb1:res.data,
        rmb:lins
      })
    })*/
  },
  gethd(){
    db.collection("hdyy").where({hdname:this.data.text_id,openid:this.data.openid}).count().then(res => {
      console.log(res.total)
      this.setData({
        bm1:res.total
      })
    })
    db.collection("hdyy").where({hdname:this.data.text_id}).count().then(res => {
      console.log(res.total)
      this.setData({
        bm:res.total
      })
    })
    db.collection("hd").doc(this.data.text_id).get().then(res=>{
      console.log(res.data)
      this.setData({
        rmb:res.data
      })
      console.log(this.data.rmb)
    })
  },
  sq(){
    wx.requestSubscribeMessage({
      tmplIds: ['XFMWOFZYtxAiy21fNG9p7CZJHC_TM514nehqWnpfBR0'],
      success:res=> {
        console.log('授权成功', res) 
        wx.cloud.callFunction({
          name: "fstz",
          data: {
            openid: this.data.openid
          }
        }).then(res => {
          console.log(this.data.openid)
          console.log("推送消息成功", res)
        }).catch(res => {
          console.log("推送消息失败", res)
        })
      },
      fail(res) {
        console.log('授权失败', res)
      }
    })
  },
  hdyy(e){
    console.log(this.data.bm,this.data.rmb.rs)
    if(this.data.rmb.rs>this.data.bm){wx.navigateTo({
      url: '../hdyy/hdyy?text_id='+e.currentTarget.id,
    })
   }else{
    wx.showToast({
      title: '报名人数已满，无法报名！',
      icon: 'error',
      duration: 1500,
      success: function () {
      }
    })
    }
  
    
  },
  qxyy(e){
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '../qxyy/qxyy?id='+e.currentTarget.id,
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
    console.log("1111111")
     this.gethd()
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
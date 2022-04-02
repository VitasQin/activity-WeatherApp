// pages/index/index.js
const db=wx.cloud.database()
var times=require('../../utils/times.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mglist:'',
    msgList:'',
    lxcode:"0",
    rmb:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'open',
      success: (res) => {
        var usid = res.result.openid
        console.log(usid)
        this.setData({
          openid: res.result.openid,
        })
        getApp().globalData.openid = res.result.openid
        db.collection("user").where({ openid: res.result.openid }).get().then(res => {
          console.log(res.data)
          this.setData({
            userInfo: res.data
          })
          wx.setStorageSync('userinfo', res.data)
        })
        wx.setStorageSync('openid', res.result.openid)
      },
    })
    db.collection("banner").get({
      success:res=>{
        console.log(res.data)
        this.setData({
          mglist:res.data
        }) 
      }
    })
  
    db.collection("tzgg").get({
      success:res=>{
        console.log(res.data)
        this.setData({
          msgList:res.data
        })
      }
    })
    
    /*
    db.collection("xwtz").get({
      success:res=>{
        console.log(res.data)
        for(var i=0;i<res.data.length;i++){
          res.data[i]["_createTime"]=times.toDate(res.data[i]["_createTime"])
        }
        this.setData({
          rmb:res.data
        })
      }
    })*/
   this.getnewList()
  },
  getnewList:function(){
    //数据加载中的友好提示
    wx.showLoading({
      title: '数据加载中',
    })    
    console.log("当前list的长度：",this.data.rmb.length);
    let len = this.data.rmb.length           //当前list的长度赋值给变量len
    var lxcode=this.data.lxcode
    wx.cloud.database().collection("xwtz").where({code:lxcode})
    .skip(len)
    .limit(5)
    .orderBy('_updateTime','desc')    //skip跳过len长度
    .get()
    .then(res=>{
      //数据加载成功，隐藏加载提示
      wx.hideLoading()
      console.log("查询成功",res);
      for(var i=0;i<res.data.length;i++){
        res.data[i]["_createTime"]=times.toDate(res.data[i]["_createTime"])
      }
      //数据加载完成的友好提示
      let dataList = res.data
      if(dataList.length<=0){
        wx.showToast({
          title: '数据加载完成',
          icon:"none"
        })
      }
      this.setData({
        //保留前面加载过的数据，使用concat连接
        rmb:this.data.rmb.concat(res.data)
      })
      console.log(this.data.rmb);
    })
    .catch(err=>{
      //数据加载失败，隐藏加载提示
      wx.hideLoading()
      console.log("查询失败",err);
    })
  },
  showlist(){
    wx.switchTab({
      url: '../dk/dk',
    })
  },
  sjowbs:function(e){
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '../news/news?text_id='+e.currentTarget.id,
    })
  },
  jdjb(){
    wx.navigateTo({
      url: '../jdjb/jdjb',
    })
  },
  hdbm(){
   wx.navigateTo({
     url: '../hdbm/hdbm',
   })
  },
  xqhd(){
    wx.switchTab({
      url: '../hd/hd',
    })
  },
  swzl(){
    wx.switchTab({
      url: '../swzl/swzl',
    })
  },
  tztb() {
    this.setData({
      mglist:'',
      msgList:'',
      lxcode:"0",
      rmb:[]
    })
    this.onLoad()
  },
  xqzt() {
    this.setData({
      mglist:'',
      msgList:'',
      lxcode:"1",
      rmb:[]
    })
    this.onLoad()
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
    this.setData({
      mglist:'',
      msgList:'',
      lxcode:"0",
      rmb:[]
    })
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
    console.log("页面上拉触底事件的函数");
    this.getnewList()  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
// pages/hd/hd.js
const db=wx.cloud.database()
const db1=wx.cloud.database()

var times=require('../../utils/times.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    sjxx: [["时间段1:8:00-9:30", 0], ["时间段2:9:30-11:00", 1], ["时间段3:11:00-12:30", 2], ["时间段4:12:30-2:00", 3], ["时间段5:2:00-4:00", 4]],
    sjxxindex: 0,
    placearr: ['查看全部', '新图一楼', '新图二楼'],
    ztarr: [['查看全部'], ['已预约'], ['可预约'], ['不可预约']],
    rmb: '',
    tswz: '',
    wzxz: '',
    yyzt: 0,
    sjzt: '',
    lcid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.gethdList()
    
  },

  sjowbs:function(e){
    console.log(e.currentTarget.id)
    wx.navigateTo({
      url: '../hdbm/hdbm?text_id='+e.currentTarget.id,
    })
  },
//获取活动list
  gethdList(){
    //数据加载中的友好提示
    wx.cloud.callFunction({
      name: "get_hd",
      complete: res => {
        console.log(res.result.list)
        for(var i=0;i<res.result.list.length;i++){
          res.result.list[i]["_createTime"]=times.toDate(res.result.list[i]["_createTime"])
          if(res.result.list[i].hdyy.length==0){
            res.result.list[i]["bmrs"]=0
          }
          else{
            res.result.list[i]["bmrs"]=res.result.list[i].hdyy[0].bmrs
          } 
        }
        this.setData({
          rmb:res.result.list
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
    this.gethdList()
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
    //this.gethdList()  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
// pages/xgxx/xgxx.js
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
    nj_index:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const app =getApp()
    var openid =app.globalData.openid
    this.setData({
      openid:openid
    })
    db.collection("user").where({openid:this.data.openid}).get().then(res=>{
      console.log(res.data)
      this.setData({
        userInfo:res.data
      })
      console.log(this.data.userInfo[0].nj)
      for(let i=0;i<this.data.array.length;i++){
        if(this,this.data.array[i]==this.data.userInfo[0].nj){
          console.log(i)
          this.setData({
            nj_index:i
          })
        }
      }
      for(let i=0;i<this.data.array1.length;i++){
        if(this,this.data.array1[i]==this.data.userInfo[0].xy){
          console.log(i)
          this.setData({
            xy_index:i
          })
        }
      }
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
    db.collection("user").where({openid:this.data.openid}).update({
      data:{
        nj:this.data.array[this.data.nj_index],
        phone:e.detail.value.phone,
        username:e.detail.value.name,
        xy:this.data.array1[this.data.xy_index],
        studentid:e.detail.value.xh,
        _updateTime:Date.parse(new Date()),
      },
      success:function(res){
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 1500,
          success: function () {
            wx.navigateTo({
              url: '../grzl/grzl',
            })
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
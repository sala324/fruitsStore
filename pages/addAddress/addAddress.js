const util = require('../../utils/util');
const app = getApp();
Page({
  data: {
    linkMan:'',
    roomNumber:'',
    mobile:'',
    addressName:'',
    address:'',
    checked:false,
    allAddress:'',
    addressList:[],
    isReset:false
  },
  switch1Change(e){
    this.setData({
      checked: e.detail.value
    })
  },
  addAddress(){
    let that=this
    wx.chooseLocation({
      success: function (res) {
        var address = res.name; // 以这个地址为例
        var address2 = res.address; // 以这个地址为例
        that.setData({
          addressName: address,
          address: address2,
          roomNumber:''
        })
      },
    })
  },
  changeRoomNumber(e) {
    let that=this
    this.setData({
      roomNumber: e.detail.value,
      allAddress: that.data.addressName + ' ' + e.detail.value
    })
  },
  changeLinkMan(e) {
    this.setData({
      linkMan: e.detail.value
    })
  },
  changeMobile(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  deletebtn(){
    wx.showModal({
      content: '是否删除该收货地址',
      success: function (res) {
        if (res.confirm) {
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
  },
  saveBtn(){
    let that=this
    let jsons={}
    let arr1 = this.data.addressList
    if (this.data.linkMan && this.data.roomNumber && this.data.mobile.length==11 && this.data.addressName && this.data.address){
      jsons.address = this.data.allAddress
      jsons.mobile = this.data.mobile
      jsons.linkMan = this.data.linkMan
      arr1.unshift(jsons)
      wx.setStorageSync('addressList', arr1);
      wx.navigateBack({
        delta:1
      })
    } else {
      if (!that.data.addressName) {
        util.toasts('请选择收货地址')
        } else if (!this.data.roomNumber) {
          util.toasts('请输入门牌号')
      } else if (!this.data.linkMan) {
        util.toasts('请输入联系人')
      } else if (!that.data.mobile | that.data.mobile.length<11) {
          util.toasts('请输入正确的手机号')
      } 
    }
  },
  onShow: function () {
    let arr2 = []
    let that=this
    wx.getStorage({
      key: 'addressList',
      success: function (res) {
        for (let i in res.data) {
          arr2.push(res.data[i])
          console.log(res.data[i])
        };
      }
    })
    this.setData({
      addressList: arr2
    })
    console.log(arr2)
  },
  onLoad(options){
    if (options.reset){
      this.setData({
        isReset: true,
        linkMan: options.linkMan,
        roomNumber: '1-1-1',
        mobile: options.mobile,
        addressName: options.address,
        address: options.address,
      })
      wx.setNavigationBarTitle({
        title: '修改收货地址'
      })
    } else {
      wx.setNavigationBarTitle({
        title: '新增收货地址'
      })
    }
  }
})
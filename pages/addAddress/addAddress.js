const util = require('../../utils/util');
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
let mapSdk;
const app = getApp();
Page({
  data: {
    linkMan:'',
    roomNumber:'',
    mobile:'',
    addressName:'',
    address:'',
    province:'',
    city:'',
    district:'',
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
        // 正则匹配 省市区
        let path = address2.match(/.+?(省|市|自治区|自治州|行政区)/g);
        if (path && path.length === 3) {
          that.setData({
            addressName: address,
            address: address2,
            province: path[0],
            city: path[1],
            district: path[2],
            roomNumber:''
          })
          return;
        }
        // 逆编码二次解析省市区
        mapSdk.reverseGeocoder({
          location: {latitude: res.latitude,longitude: res.longitude},
          success: function (res) {
            let component = res.result.address_component;
            path = [component.province, component.city, component.district];
            that.setData({
              addressName: address,
              address: address2,
              province: path[0],
              city: path[1],
              district: path[2],
              roomNumber:''
            })
          },
          fail: function(err){
            console.log("qqmapsdk-err",err)
          }
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
    let that=this
    wx.showModal({
      content: '是否删除该收货地址',
      success: function (res) {
        if (res.confirm) {
          that.deleteAddress()
        }
      }
    })
  },
  saveBtn(){
    let that=this
    // let jsons={}
    let arr1 = this.data.addressList
    if (this.data.linkMan && this.data.roomNumber && this.data.mobile.length==11 && this.data.addressName && this.data.address){
      // jsons.address = this.data.allAddress
      // jsons.mobile = this.data.mobile
      // jsons.linkMan = this.data.linkMan
      // arr1.unshift(jsons)
      // wx.setStorageSync('addressList', arr1);
      this.addAddressBtn()
      
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
  addAddressBtn() {
    util.requests('/business/address/saveAddress', {
      province: this.data.province,
      city: this.data.city,
      district: this.data.district,
      building: this.data.addressName,
      detail: this.data.roomNumber,
      deliveryName: this.data.linkMan,
      contactNumber: this.data.mobile,
      defaulted: this.data.checked,
      id: this.data.id,
      },'post').then(res => {
      if (res.data.code == 0) {
        if (this.data.id){
          util.dialog('地址修改成功')
        } else {
          util.dialog('地址新增成功')
        }
      }

    })
  },
  deleteAddress() {
    util.requests('/business/address/removeAddress', {
      id: this.data.id
    }, 'post').then(res => {
      if (res.data.code == 0) {
        util.dialog('地址删除成功')
      }

    })
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
    // 实例化地图 sdk
    mapSdk = new QQMapWX({
      key: 'GU2BZ-ZCCRG-DHHQQ-ICSQJ-B5FRV-4RFBT'
    });
    if (options.reset){
      if(options.checked=='true'){
        this.setData({
          checked: true
        })
      } else {
        this.setData({
          checked: false
        })
      }
      this.setData({
        isReset: true,
        linkMan: options.linkMan,
        roomNumber: options.detail,
        mobile: options.mobile,
        addressName: options.address,
        address: options.address,
        id: options.id,
        
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
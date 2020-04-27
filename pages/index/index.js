const util = require('../../utils/util');
const app = getApp();
Page({
  data: {
    storageArr:[],//判断用户本地有无购物车数据
    cartData: true,//判断用户有无添加购物车
    typeId:1,
    price: 0,//购物车总价
    allnum: 0,//购物车总数
    showCart:false,
    typeArr:[
      {
        val: '水果',
        id: '1'
      },
      {
        val: '蔬菜',
        id: '2'
      },
      {
        val: '肉类',
        id: '3'
      },
    ],
    productArr: [
      {
        name: '西红柿',
        price: 4,
        originalPrice: 5,
        id: 1,
        num: 0,
        des: '去哪个拉开你喇叭能看清离开',
        url: '../../images/icon/shangpin.png'
      },
      {
        name: '西瓜',
        price: 2,
        originalPrice: 2.5,
        id: 2,
        num: 0,
        des: '去哪个拉开你喇叭能看清离开',
        url: '../../images/icon/shangpin.png'
      },
      {
        name: '苹果',
        price: 6,
        originalPrice: 7,
        id: 3,
        num: 0,
        des: '去哪个拉开你喇叭能看清离开',
        url: '../../images/icon/shangpin.png'
      },
      {
        name: '榴莲',
        price: 230,
        originalPrice: 230,
        id: 4,
        num: 0,
        des: '去哪个拉开你喇叭能看清离开',
        url: '../../images/icon/shangpin.png'
      },
      {
        name: '菠萝',
        price: 3,
        originalPrice: 3.5,
        id: 5,
        num: 0,
        des: '去哪个拉开你喇叭能看清离开',
        url: '../../images/icon/shangpin.png'
      },
      {
        name: '葡萄',
        price: 10,
        originalPrice: 12,
        id: 6,
        num: 0,
        des: '去哪个拉开你喇叭能看清离开',
        url: '../../images/icon/shangpin.png'
      }, {
        name: '哈密瓜',
        price: 5,
        originalPrice: 5,
        id: 7,
        num: 0,
        des: '去哪个拉开你喇叭能看清离开',
        url: '../../images/icon/shangpin.png'
      }, {
        name: '桔子',
        price: 4,
        originalPrice: 4,
        id: 8,
        num: 0,
        des: '去哪个拉开你喇叭能看清离开',
        url: '../../images/icon/shangpin.png'
      }, {
        name: '凤梨',
        price: 6,
        originalPrice: 7,
        id: 9,
        num: 0,
        des: '去哪个拉开你喇叭能看清离开',
        url: '../../images/icon/shangpin.png'
      },
      {
        name: '香蕉',
        price: 3,
        originalPrice: 4,
        id: 10,
        num: 0,
        des: '去哪个拉开你喇叭能看清离开',
        url: '../../images/icon/shangpin.png'
      },
      {
        name: '猕猴桃',
        price: 5,
        originalPrice: 6,
        id: 11,
        num: 0,
        des: '去哪个拉开你喇叭能看清离开',
        url: '../../images/icon/shangpin.png'
      }
    ],
    productArr2:[
      {
        name:'西红柿',
        price:4,
        originalPrice:5,
        id:1,
        num:0,
        des:'去哪个拉开你喇叭能看清离开',
        url:'../../images/icon/shangpin.png'
      },
      {
        name: '西瓜',
        price: 2,
        originalPrice: 2.5,
        id: 2,
        num: 0,
        des: '去哪个拉开你喇叭能看清离开',
        url: '../../images/icon/shangpin.png'
      },
      {
        name: '苹果',
        price: 6,
        originalPrice: 7,
        id: 3,
        num: 0,
        des: '去哪个拉开你喇叭能看清离开',
        url: '../../images/icon/shangpin.png'
      },
      {
        name: '榴莲',
        price: 230,
        originalPrice: 230,
        id: 4,
        num: 0,
        des: '去哪个拉开你喇叭能看清离开',
        url: '../../images/icon/shangpin.png'
      },
      {
        name: '菠萝',
        price: 3,
        originalPrice: 3.5,
        id: 5,
        num: 0,
        des: '去哪个拉开你喇叭能看清离开',
        url: '../../images/icon/shangpin.png'
      },
      {
        name: '葡萄',
        price: 10,
        originalPrice: 12,
        id: 6,
        num: 0,
        des: '去哪个拉开你喇叭能看清离开',
        url: '../../images/icon/shangpin.png'
      }, {
        name: '哈密瓜',
        price: 5,
        originalPrice: 5,
        id: 7,
        num: 0,
        des: '去哪个拉开你喇叭能看清离开',
        url: '../../images/icon/shangpin.png'
      }, {
        name: '桔子',
        price: 4,
        originalPrice: 4,
        id: 8,
        num: 0,
        des: '去哪个拉开你喇叭能看清离开',
        url: '../../images/icon/shangpin.png'
      }, {
        name: '凤梨',
        price: 6,
        originalPrice: 7,
        id: 9,
        num: 0,
        des: '去哪个拉开你喇叭能看清离开',
        url: '../../images/icon/shangpin.png'
      },
      {
        name: '香蕉',
        price: 3,
        originalPrice: 4,
        id: 10,
        num: 0,
        des: '去哪个拉开你喇叭能看清离开',
        url: '../../images/icon/shangpin.png'
      },
      {
        name: '猕猴桃',
        price: 5,
        originalPrice: 6,
        id: 11,
        num: 0,
        des: '去哪个拉开你喇叭能看清离开',
        url: '../../images/icon/shangpin.png'
      }
    ],
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  getInfoUser() {
    let that = this
    wx.login({
      success(res) {
        if (res.code) {
          //发起网络请求
          console.log(res.code)
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
  onShareAppMessage: function (res) {
    var that = this;
    return {
      title: '来大侠管房，闲置房源秒出租，坐在家里当房东。',
      path: '/pages/index/index',
      success: function (res) {
        console.log(成功)
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  setUserInfo(e){
    wx.login({
      success: res => {
        if (res.code) {
          console.log(res.code)
          console.log(e.detail.iv)
          console.log(e.detail.encryptedData)
          util.request('/business/user/login', {
            code: res.code,
            iv: e.detail.iv,
            encryptedData: e.detail.encryptedData,
          }, 'post').then(res => {
            if (res.data.code == 0) {
              try {
                wx.setStorageSync('token', res.data.data);
              } catch (e) {
                console.log('存储失败！')
              }
              util.requests('/business/user/getCurrentUser', {}).then(res => {
                if (res.data.code == 0){
                  try {
                    wx.setStorageSync('userId', res.data.data.id);
                  } catch (e) {
                    console.log('存储失败！')
                  }
                }
              })
            } else {
              util.toasts('网络请求失败，点击重试', 2000)
            }
          })
        }
      }
    });
  },
  login(e) {
    let me = this;
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '未授权您将无法登陆',
        success: function (res) { }
      })
    } else {
      wx.login({
        success: res => {
          if (res.code) {
            console.log(res.code)
            console.log(e.detail.iv)
            console.log(e.detail.encryptedData)
          }
        }
      });
    }
  },
  increaseItem1(dataArrs,index,dataValue){
    let jsons = {}
    let jsons2 = {}
    let jsons3 = wx.getStorageSync('cartArr')
    console.log(jsons3)

    if (dataArrs[index].num <= 0) {
      let ids = dataArrs[index].id
      delete jsons3[ids]
    } else {
      jsons2.num = dataArrs[index].num
      jsons2.name = dataArrs[index].name
      jsons2.price = dataArrs[index].price
      jsons2.url = dataArrs[index].url
      jsons2.originalPrice = dataArrs[index].originalPrice
      jsons[dataArrs[index].id] = jsons2
    }
    let jsons4 = Object.assign(jsons3, jsons)
    wx.setStorageSync('cartArr', jsons4)
    this.setData({
      [dataValue]: dataArrs
    })
  },
  increaseItem(e){
    let dataArrs = this.data.productArr
    dataArrs[e.currentTarget.dataset.index].num = dataArrs[e.currentTarget.dataset.index].num - 1
    let index = e.currentTarget.dataset.index
    this.jisuan1()
    this.increaseItem1(dataArrs, index, 'productArr')
    this.cunchu()
  },
  async increaseItem2(e) {
    let dataArrs = this.data.storageArr
    dataArrs[e.currentTarget.dataset.index].num = dataArrs[e.currentTarget.dataset.index].num - 1
    let index = e.currentTarget.dataset.index
    this.jisuan1()
    await this.increaseItem1(dataArrs, index, 'storageArr')
    this.cunchu()
  },
  additem1(dataArrs,index,arrValue){
    let jsons = {}
    let jsons2 = {}
    let jsons3 = {}
    if (this.data.storageArr.length > 0) {
      jsons3 = wx.getStorageSync('cartArr')
    }
    jsons2.num = dataArrs[index].num
    jsons2.name = dataArrs[index].name
    jsons2.price = dataArrs[index].price
    jsons2.url = dataArrs[index].url
    jsons2.originalPrice = dataArrs[index].originalPrice
    jsons[dataArrs[index].id] = jsons2
    let jsons4 = Object.assign(jsons3, jsons)
    console.log(jsons4)
    try {
      wx.setStorageSync('cartArr', jsons4)
    } catch (e) {
      return false;
      // Do something when catch error
    }
    this.setData({
      [arrValue]: dataArrs
    })
  },
  additem2(e){
    let dataArrs = this.data.storageArr
    dataArrs[e.currentTarget.dataset.index].num = dataArrs[e.currentTarget.dataset.index].num + 1
    let index = e.currentTarget.dataset.index
    this.additem1(dataArrs, index,'storageArr')
    this.cunchu()
  },
  addItem(e){
    let dataArrs = this.data.productArr
    dataArrs[e.currentTarget.dataset.index].num= dataArrs[e.currentTarget.dataset.index].num+1
    let index = e.currentTarget.dataset.index
    this.jisuan1()
    this.additem1(dataArrs, index,'productArr')
    this.cunchu()
  },
  showCart1() {
    this.setData({
      showCart: true
    })
    
  },
  showCart2(){
    let showCart = this.data.showCart
    let that = this
    if (this.data.allnum>0){
      showCart = !showCart
      if (showCart){
        that.choosebtn()
      } else {
        that.choosebtn2()
      }
      this.setData({
        showCart: showCart
      })
    }
  },
  jisuan1(){
    let that=this
    wx.createSelectorQuery().selectAll('.gouwuche').boundingClientRect(function (rect) {
      that.setData({
        gwcHeight: -(rect[0].height) + 'px'
      })
    }).exec() 
  },
  hideCart() {
    this.choosebtn2()
    this.setData({
      showCart: false
    })
    console.log(3)
    
  },
  deleteBtn1(){
    let that=this
    wx.showModal({
      title: '温馨提示',
      content: '清空购物车中所有商品？',
      success: function (res) {
        if (res.confirm) {
          that.deleteBtn()
        }
      }
    })
  },
  deleteBtn(){
    wx.setStorageSync('cartArr', {})
    this.data.productArr.forEach((val,index)=>{
      val.num=0
    })
    this.setData({
      storageArr:[],
      cartData: false,
      allnum:0,
      price:0,
      showCart:false,
      productArr: this.data.productArr
    })
    this.choosebtn2()
  },
  chooseType(e) {
    this.setData({
      typeId: e.currentTarget.dataset.id
    })
    console.log(this.data.typeId)
  },
  onLoad(options){
    
  },
  gouwuche(){
    let jsons ={}
    try {
      jsons = wx.getStorageSync('cartArr')
    } catch (e) {
      console(e)
      return false;
    }
    let arrs = []
    for (var p in jsons) {
      var json = jsons[p]
      json.id = Number(p)
      arrs.push(json)
    }
    let num = 0
    let price = 0
    arrs.forEach((val2, index2) => {
        num += val2.num
      price += val2.price * val2.num
    })
    this.setData({
      price: price,
      allnum: num
    })
  },
  cunchu(){
    console.log(1)
    let jsons ={}
    try {
      jsons = wx.getStorageSync('cartArr')
    } catch (e) {
      return false;
    }
    if(jsons){
      let arrs = []
      for (var p in jsons) {
        var json = jsons[p]
        json.id = Number(p)
        arrs.push(json)
      }
      let arr5 = []
      let num = 0
      let price = 0
      // console.log(this.data.productArr2)
      this.data.productArr2.forEach((val, index) => {
        arrs.forEach((val2, index2) => {
          if (val2.id === val.id) {
            val.num = val2.num
            console.log(2)
          }
        })
        arr5.push(val)
        this.gouwuche()
      })
      // console.log(arr5)
      this.setData({
        storageArr: arrs,
        cartData: true,
        productArr: arr5
      })
      // console.log(this.data.productArr)
    }
    
  },
  onReady: function () {
    this.animation = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease'
    })
    let that=this
    wx.createSelectorQuery().selectAll('.cartWrap').boundingClientRect(function (rect) {
      that.setData({
        cartHeight: rect[0].height
      })
    }).exec() 
    wx.createSelectorQuery().selectAll('.gouwuche').boundingClientRect(function (rect) {
      that.setData({
        gwcHeight: -(rect[0].height-60)+'px'
      })
    }).exec() 
  },
  choosebtn() {
    console.log(5)
    let num = this.data.cartHeight
    // this.animation.bottom(num).step()
    this.animation.height('100%').step()
    this.setData({ animation: this.animation.export() })
  },
  choosebtn2() {
    console.log(4)
    let num = this.data.gwcHeight
    // this.animation.bottom(-num).step()
    this.animation.height('0%').step()
    this.setData({ animation: this.animation.export() })
  },
  onShow: function () {
    this.cunchu()
    this.getInfoUser()
  }
})
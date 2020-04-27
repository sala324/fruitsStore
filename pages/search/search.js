// pages/search/search.js
Page({
  data: {
    storageArr:[],
    allnum: 0,
    price: 0,
    productArr: [
      {
        name: '西红柿',
        price: 4,
        originalPrice: 5,
        id: 1,
        num: 0,
        des: '去哪个拉开你喇叭能看清离开',
        url: '../../images/icon/shangpin.png'
      }
    ],
    showDialog:true,
    keyWords:'',
    keyWordsArr: ['苹果', '香蕉', '白菜', '土豆'],
    hotWordsArr: ['苹果', '香蕉', '白菜', '土豆', '苹果', '哈密瓜', '白菜', '牛肉', '带鱼', '花菜', '羊肉', '五花肉', '西瓜', '香蕉', '武昌鱼', '菠萝']
  },
  onLoad: function (options) {

  },
  onReady: function () {
    this.animation = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease'
    })
    let that = this
    wx.createSelectorQuery().selectAll('.cartWrap').boundingClientRect(function (rect) {
      console.log(rect[0].height)
      that.setData({
        cartHeight: rect[0].height
      })
    }).exec()
    wx.createSelectorQuery().selectAll('.gouwuche').boundingClientRect(function (rect) {
      that.setData({
        gwcHeight: -(rect[0].height - 60) + 'px'
      })
    }).exec()
  },
  choosebtn() {
    console.log(5)
    let num = this.data.cartHeight
    this.animation.bottom(num).step()
    this.setData({ animation: this.animation.export() })
  },
  choosebtn2() {
    console.log(4)
    let num = this.data.gwcHeight
    this.animation.bottom(-num).step()
    this.setData({ animation: this.animation.export() })
  },
  jisuan1() {
    let that = this
    wx.createSelectorQuery().selectAll('.gouwuche').boundingClientRect(function (rect) {
      that.setData({
        gwcHeight: -(rect[0].height) + 'px'
      })
    }).exec()
  },
  clearWords(){
    this.setData({
      keyWords: '',
    })
  },
  deleteBtn() {
    wx.setStorageSync('cartArr', {})
    this.data.productArr.forEach((val, index) => {
      val.num = 0
    })
    this.setData({
      storageArr: [],
      cartData: false,
      allnum: 0,
      price: 0,
      showCart: false,
      productArr: this.data.productArr
    })
  },
  showCart2() {
    if (this.data.allnum > 0) {
      if (showCart) {
        that.choosebtn()
      } else {
        that.choosebtn2()
      }
      this.setData({
        showCart: true
      })
    }
  },
  hideCart() {
    this.choosebtn2()
    this.setData({
      showCart: false
    })
  },
  gouwuche() {
    let jsons = {}
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
  increaseItem1(dataArrs, index, dataValue) {
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
  increaseItem(e) {
    let dataArrs = this.data.productArr
    dataArrs[e.currentTarget.dataset.index].num = dataArrs[e.currentTarget.dataset.index].num - 1
    let index = e.currentTarget.dataset.index
    
    this.increaseItem1(dataArrs, index, 'productArr')
    this.jisuan1()
    this.cunchu()
  },
  increaseItem2(e) {
    let dataArrs = this.data.storageArr
    dataArrs[e.currentTarget.dataset.index].num = dataArrs[e.currentTarget.dataset.index].num - 1
    let index = e.currentTarget.dataset.index
    this.increaseItem1(dataArrs, index, 'storageArr')
    this.jisuan1()
    this.cunchu()
  },
  additem1(dataArrs, index, arrValue) {
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
  additem2(e) {
    let dataArrs = this.data.storageArr
    dataArrs[e.currentTarget.dataset.index].num = dataArrs[e.currentTarget.dataset.index].num + 1
    let index = e.currentTarget.dataset.index
    this.additem1(dataArrs, index, 'storageArr')
    this.jisuan1()
    this.cunchu()
  },
  addItem(e) {
    let dataArrs = this.data.productArr
    dataArrs[e.currentTarget.dataset.index].num = dataArrs[e.currentTarget.dataset.index].num + 1
    let index = e.currentTarget.dataset.index
    this.additem1(dataArrs, index, 'productArr')
    this.cunchu()
  },
  cunchu() {
    let jsons = {}
    try {
      jsons = wx.getStorageSync('cartArr')
    } catch (e) {
      return false;
    }
    if (jsons) {
      let arrs = []
      for (var p in jsons) {
        var json = jsons[p]
        json.id = Number(p)
        arrs.push(json)
      }
      let arr5 = []
      let num = 0
      let price = 0
      this.data.productArr.forEach((val, index) => {
        arrs.forEach((val2, index2) => {
          if (val2.id === val.id) {
            val.num = val2.num
          }
        })
        arr5.push(val)
        this.gouwuche()
      })
      this.setData({
        storageArr: arrs,
        cartData: true,
        productArr: arr5
      })
    }

  },
  clearAll(){
    this.setData({
      keyWordsArr: [],
      keyWords: ''
    })
    wx.setStorageSync('keyWordsArr', [])
  },
  changeKeyWords(e){
    this.setData({
      keyWords:e.detail.value
    })
  },
  async searchBtn(){
    if (this.data.keyWords){
      await this.keyWords(this.data.keyWords)
      this.cunchu()
    } else {
      wx.showToast({
        title: '请输入商品名称',
        icon: 'none'
      })
    }
    
  },
  showDialog2(){
    this.setData({
      showDialog: true
    })
  },
  keyWords(val){
    let arr = this.data.keyWordsArr
    arr.push(val)
    let arr2 = Array.from(new Set(arr))

    wx.setStorageSync('keyWordsArr', arr2)
    this.setData({
      keyWordsArr: arr2,
      keyWords: val,
      showDialog: false
    })
  },
  async chooseWords(e){
    await this.keyWords(e.currentTarget.dataset.words)
    this.cunchu()
  },
  onShow: function () {
    let arr2 = []
    let that = this
    wx.getStorage({
      key: 'keyWordsArr',
      success: function (res) {
        for (let i in res.data) {
          arr2.push(res.data[i])
          that.setData({
            keyWordsArr: arr2
          })
        };
      }
    })
    this.setData({
      keyWordsArr: arr2
    })
    
  }
})
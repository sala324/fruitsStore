const util = require('../../utils/util');
Page({
  data: {
    address:'湖北省武汉市武昌区东亭花园新康苑 1-1-1',
    linkMan:'陈丽沙',
    mobile:'181****2542',
    price:0,
    allnum:0,
    hejiMoney:0,
    orderArr:[],
    showAll:false,
    youhuiprice:0,
    showItem:3,
    showText:'展开更多'
  },
  showAll(){
    let showAll = this.data.showAll
    let length = this.data.orderArr.length
    if (this.data.showItem==3){
      this.setData({
        showItem: length,
        showText: '收起'
      })
      console.log(this.data.showItem)
    } else {
      this.setData({
        showItem: 3,
        showText: '加载更多'
      })
    }
    this.setData({
      showAll: !showAll
    })
  },
  showCart1() {
    this.setData({
      showCart: true
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
    let youhui=0
    arrs.forEach((val2, index2) => {
      num += val2.num
      price += val2.price * val2.num
      val2.price1 = val2.price * val2.num
      val2.price2 = val2.originalPrice * val2.num
      if (val2.originalPrice>val2.price){
        youhui += (val2.originalPrice - val2.price) * val2.num
      }
    })
    this.setData({
      price: price,
      allnum: num,
      hejiMoney: price,
      orderArr:arrs,
      youhuiprice: youhui
    })
  },
  onShow: function () {
    this.gouwuche()
  }
})
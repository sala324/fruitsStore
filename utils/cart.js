const cunchu = n =>{
    let jsons = wx.getStorageSync('cartArr') || {}//购物车本地缓存
    delete jsons['nv_toString']//删除从wx.getStorageSync中拿到的nv_toString
    let num = 0,//购物车总数量
        price = 0//购物车总价
        arrs = []//购物车列表
        youhui= 0//购物车优惠金额
        checkedAll= JSON.stringify(jsons) == "{}"?false:true//购物车全选
    if (jsons) {
      for (var p in jsons) {
        var json = jsons[p]
        json.id = Number(p)
        arrs.push(json)
      }
      
      arrs.forEach((val, index) => {
        if (val.checked) {
          num += val.num
          price += val.price * val.num
          if (val.originPrice > val.price) {
            youhui += (val.originPrice - val.price) * val.num
          }
        } else {
          checkedAll= false
        }
      })
      let noData=false//购物车有无数据
      if (num > 0) {
        noData = false
        wx.setTabBarBadge({
          index: 1,
          text: num + ''
        })
      } else {
        noData =true
        wx.removeTabBarBadge({
          index: 1
        })
      }
    }
    let json4={}
    json4.storageArr = arrs
    json4.cartData = true
    json4.allnum = num
    json4.youhui = youhui
    json4.checkedAll = checkedAll
    json4.price = price/100
    return json4
  
  }
  const jsonBox = (val,booler) =>{
    //格式化选中产品的数据
    let jsons2={}
    jsons2.num = val.num
    jsons2.title = val.title
    jsons2.price = val.price
    jsons2.thumbnails = val.thumbnails
    jsons2.checked = booler//标识该商品在购物车中有无选中状态
    jsons2.originPrice = val.originPrice
    // val.checked=booler//标识该商品在购物车中有无选中状态
    return jsons2
  }
const  newCartArr=(dataArrs,index,dataValue)=>{
    //格式化存到本地购物车以对象的方式存入本地
    let jsons1 = {}
    let jsons2= dataValue=='productArr'?jsonBox(dataArrs[index],true):jsonBox(dataArrs[index],dataArrs[index].checked)
    jsons1[dataArrs[index].id] = jsons2
    return jsons1
  }
const  resetItem=(dataArrs,storageArr, index, dataValue,_this)=> {
  //dataArrs展示的产品数组,storageArr需要与之比较的本地存储, index产品的索引值, dataValue产品数组的key值,_this页面的this
    let jsons = {}
    let jsons3 = wx.getStorageSync('cartArr') || {}
    if (dataArrs[index].num <= 0) {
      let ids = dataArrs[index].id
      if(dataValue=='productArr'){
        //该商品为0需要主动设置该商品为0
        var index2 = dataArrs.findIndex((value, index, arr) => {
          return value.id == ids
        })
        if (index2>=0) {
          dataArrs[index2].num = 0
        }
      }
      //同时删除本地数量为0的商品
      delete jsons3[ids]
    } else {
      jsons=newCartArr(dataArrs,index,dataValue)
      console.log(jsons)
    }
    let jsons4 = Object.assign(jsons3, jsons)//Object.assign可覆盖键值相同的商品
    wx.setStorageSync('cartArr', jsons4)
    _this.setData({
      [dataValue]: dataArrs
    })
  }
  module.exports = {
    jsonBox:jsonBox,
    cunchu: cunchu,
    resetItem:resetItem
  }
  
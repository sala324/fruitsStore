const cunchu = n =>{
    let jsons = {}//购物车本地缓存
    try {
      jsons = wx.getStorageSync('cartArr')
    } catch (e) {
      return false;
    }
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
  const jsonBox = (val,booler=val.checked) =>{
    let jsons2={}
    jsons2.num = val.num
    jsons2.title = val.title
    jsons2.price = val.price
    jsons2.thumbnails = val.thumbnails
    jsons2.checked = booler
    jsons2.originPrice = val.originPrice
    return jsons2
  }
  module.exports = {
    jsonBox:jsonBox,
    cunchu: cunchu
  }
  
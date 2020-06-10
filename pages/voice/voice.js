

const util = require('../../utils/util');
import { aa,bcd,incCounter } from '../../utils/testClass';
let plugin = requirePlugin("QCloudAIVoice");
var mod = require('../../utils/test2');
let manager = plugin.getRecordRecognitionManager()
plugin.setQCloudSecret(1302214974, 'AKIDvafTyD2uf9O5Wdie4C2gYDYhbFdN799s', 'e2A2eHdttbMrFNE8lIYquze3BNek59xO', true); 

Page({
  data: {
    text:12344333333
  },
  recordingStart(){
    let that=this
    manager.start({duration:30000, engine_model_type: '16k_0'});
    manager.onRecognize((res) => {
      if (res.result) {
        that.setData({
          text: res.result
        })
        console.log("current result", res.result)
      } else if (res.errMsg) {
        console.log("recognize error", res.errMsg)
      }
    })
  },
  recordingStop() {
    manager.stop()
  },
  onLoad(options){
    manager.onStart((res) => {
          console.log('recorder start', res.msg);
    })
    manager.onStop((res) => {
          console.log('recorder stop', res.tempFilePath);
    })
    manager.onError((res) => {
          console.log('recorder error', res.errMsg);
    })
    manager.onRecognize((res) => {
      if (res.result) {
        that.setData({
          text: res.result
        })
        console.log("current result", res.result)
      } else if (res.errMsg) {
        console.log("recognize error", res.errMsg)
      }
    })
  },
  onShow(){
    let json1=new aa('1')
    console.log(json1.bb('234'))
    let a2=bcd
    console.log(bcd)
    a2=6
    console.log(a2)
    let b2=incCounter
    b2()
    console.log(bcd)
    console.log(mod.counter);
    mod.incCounter();
    console.log(mod.counter);
    mod.counter++;
    let mod2=mod.counter
    mod2=5
    console.log(mod2)
  }
})

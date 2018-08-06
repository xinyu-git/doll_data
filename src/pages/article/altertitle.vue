<template>
<view class="page">
  <view class="weui-cell_bd weui-cell_primary">
      <textarea id="textarea" maxlength="50" bindinput="watchTextarea" value="{{title}}" class="weui-textarea my-textarea" placeholder="请输入文章标题" placeholder-class='placeholdercolor' auto-focus></textarea>
      <view class="weui-textarea-counter my-counter">
          <text id="count">{{sNumber}}</text> /
          <text id="count_max">{{max}}</text>
      </view>
  </view>
  <view bindtap="btn_success">完成</view>
</view>
</template>
<script>
import wepy from "wepy";
import config from "../../config/api";
export default class UploadVideo extends wepy.page {
  config = { navigationBarTitleText: "修改标题" };
  components = {};
  data = {
    sNumber: 0,
    max: 50,
    texts:"",
    title:""
  };
  async onLoad(options) {
    console.log(options);
    this.title = options.title
     let pages = getCurrentPages();
      
    let prevPage = pages[pages.length - 2];  //上一个页面
    console.log(prevPage)
    this.title = prevPage.data.title;
    //进入到页面的时候，对告诉服务器，要lock住这个key
    this.key = options.key || options.scene;
  }
  watchTextarea(event) {
    this.sNumber = event.detail.value.length;
    //this.max = 5000 - event.detail.value.length;
    this.texts = event.detail.value
  }
  methods = {
    btn_success(){
      let that = this
      let pages = getCurrentPages();
      let Page = pages[pages.length - 1];//当前页
      let prevPage = pages[pages.length - 2];  //上一个页面
    
      prevPage.setData({
        title:that.texts
      })//设置数据
      wx.navigateBack()
    }
  };
}
</script>
<style>
page {
  background: #f1f2f6;
}
.my-textarea {
  background: #fff;
  margin-top: 1rpx;
  padding: 30rpx;
  width: 690rpx;
}
.placeholdercolor {
  color: #ccc;
  font-size: 28rpx;
}
.my-counter {
  margin-right: 30rpx;
  margin-top: 20rpx;
}
</style>

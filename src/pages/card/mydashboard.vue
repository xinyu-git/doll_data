<template>
<view class="page">
  <!--浏览数据统计-->
  <view class="my-dateList1">
  <view class="weui-cell">
    <view class="weui-cells__title my-title">浏览数（昨日）</view>
  </view>
  <view class="weui-flex my-dateBox">
    <view class="weui-flex__item">
      <text>112</text>
      <text>访问次数</text>
    </view>
    <view class="weui-flex__item">
      <text>102</text>
      <text>访问人数</text>
    </view>
    <view class="weui-flex__item">
      <text>20</text>
      <text>互动次数</text>
    </view>
  </view>
  </view>
  <!--推广数据统计-->
  <view class="my-dateList2">
  <view class="weui-cell">
    <view class="weui-cells__title my-title">推广数据</view>
  </view>
  <view class="weui-flex my-dateBox">
    <view class="weui-flex__item my-datenum">
      <text>10</text>
      <text>分享次数</text>
    </view>
    <view class="weui-flex__item my-datenum">
      <text>10</text>
      <text>扫码次数</text>
    </view>
    
  </view>
</view>
</view>
</template>
<script>
import wepy from "wepy";
import config from "../../config/api";
export default class Mydashboard extends wepy.page {
  config = { navigationBarTitleText: "销售数据" };
  components = {};
  data = {
    key: ""
  };
  async onLoad(options) {
    //进入到页面的时候，对告诉服务器，要lock住这个key
    this.key = options.key || options.scene;
  }
  methods = {};
}
</script>
<style>
.my-dateList1 {
  border-bottom: solid 1px #e0e0e0;
  padding-bottom: 35rpx;
}

.my-dateBox text {
  display: block;
  text-align: center;
  color: #333;
  font-size: 32rpx;
}
.my-dateBox text:nth-child(1) {
  font-size: 40rpx;
}
.my-title {
  color: #666;
  font-size: 30rpx;
}
.my-dateList2::before {
  border: 0;
}
.my-dateList2 .my-datenum:nth-child(1) {
  margin-left: -235rpx;
}
.my-dateList2 .my-datenum:nth-child(2) {
  margin-left: -470rpx;
}
</style>

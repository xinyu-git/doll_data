<template>
<view class="page">
  <!--名片信息-->
  <view class="weui-media-box weui-media-box_appmsg my-cardinfoBox" wx:for="{{cardinfo}}" wx:if="{{index<1}}" wx:key="">
    <view class="weui-media-box__hd_in-appmsg my-roundness-img">
      <image class="weui-media-box__thumb" src="{{my_avator}}"></image>
    </view>
    <view class="weui-media-box__bd_in-appmsg my-infoBox" >
      <view class="weui-media-box__title my-nameBox">
        <text>{{item.name}}</text>
        <text>{{item.title}}</text>
      </view>
      <view class="weui-media-box__desc my-addressBox">
        <text>公司：{{item.corp}}</text>
        <text>地址：{{item.address}}</text>
        <text>手机：{{item.mobile}}</text>
      </view>
      <view class="ico-editor-btn">
        <image src="../../images/ico-editor.png"></image>
        <text>编辑</text>
      </view>
    </view>
  </view>
  <!--名片发送数据-->
  <view class="weui-flex my-dateBox">
    <view class="weui-cell__ft my-dateNum">
      <text>150</text>
      <text>次发送名片</text>
    </view>
    <view class="weui-cell__ft my-dateNum">
      <text>15</text>
      <text>人互动</text>
    </view>
    <view class="weui-cell__ft my-dateNum">
      <button class="btn-share" open-type="share" data-name="pageShare" >分享名片</button>
    </view>
  </view>
  <!--视频列表-->
  <view class="my-videoList">
    <view class="weui-cells__title my-videoTitle">视频</view>
    <view class="weui-grids my-sVideoBox">
      <view class="weui-grid my-small-video">
        <image src="../../images/video-sm1.jpg"></image>
      </view>
      <view class="weui-grid my-small-video">
        <image src="../../images/video-sm2.jpg"></image>
      </view>
      <view class="weui-grid my-small-video">
        <image src="../../images/video-sm3.jpg"></image>
      </view>
      <view class="weui-grid my-small-video">
        <image src="../../images/video-sm4.jpg"></image>
      </view>
      <view class="weui-grid my-small-video">
        <image src="../../images/video-sm5.jpg"></image>
      </view>
      <view class="weui-grid my-small-video">
        <image src="../../images/video-sm6.jpg"></image>
      </view>
    </view>
  </view>
 <!--底部固定导航-->
  <view class="weui-cell weui-bottombar noline">
    <view class="weui-cell__ft ico_bt_share">
      <button class="ico_bt_btn" open-type="share" data-name="pageShare" >
      <image src="../../images/ico_bt_share.png"></image>
      <text>推荐</text>
      </button>
    </view>
    <view class="weui-cell__ft ico_bt_news2">
      <button class="ico_bt_btn" open-type="contact" session-from="{{uid}}">
      <image src="../../images/ico_bt_news2.png"></image>
      <text>联系</text>
      </button>
    </view>
    <view class="weui-cell__ft  ico_bt_my2">
      <button class="ico_bt_btn"  bindtap='go2my'>
      <image src="../../images/ico_bt_my2.png"></image>
      <text>我的</text>
      </button>
    </view>
  </view>
</view>
</template>
<script>
import wepy from "wepy";

import api from "../../config/api";
export default class Mycard extends wepy.page {
  config = {
    navigationBarTitleText: "我的名片"
  };
  components = {};
  data = {
    cardinfo: null,
    uid: null,
    cardid: null,
    hasbackgroundmusic: false,
    mycard1: true,
    medias: [],
    mycard2: false,
    my_avator: ""
  };

  async onLoad(options) {
    this.cardid = options.id;
    //console.log(this.cardinfo);
    if (!this.cardinfo) {
      let result = await this.$parent.globalData.get(
        `${api.server}/auth/user/card/myowncards`
      );
      //console.log(result);
      if (result.length > 0) {
        this.createCard = false;
        this.cardinfo = this.$parent.globalData.usercard = result;
        this.my_avator = this.$parent.globalData.userInfo.headimg;
        this.$apply();
        //wx.setStorageSync("user:card",result.rows);
      }
    }
  }
  methods = {};
  go2cardlist() {
    wx.navigateTo({ url: "/pages/portal/cardlist" });
  }
  go2dashboard() {
    wx.navigateTo({ url: "/pages/card/mydashboard" });
  }
  go2my() {
    wx.navigateTo({ url: "/pages/shop/my" });
  }
  go2chatlist() {
    wx.navigateTo({ url: "/pages/card/chatlist" });
  }
  go2uploadvideo() {
    wx.navigateTo({ url: "/pages/card/uploadvideo" });
  }
  go2register() {
    wx.navigateTo({ url: "/pages/card/register" });
  }
}
</script>
<style>
.my-addressBox text {
  display: block;
  color: #666;
  font-size: 32rpx;
  line-height: 1.4;
}
.my-nameBox {
  padding-bottom: 10rpx;
  width: 75%;
}
.my-nameBox text {
  display: block;
  margin-right: 30rpx;
  color: #333;
  font-size: 40rpx;
  font-weight: bolder;
}
.my-nameBox text:nth-child(2) {
  font-size: 36rpx;
  font-weight: lighter;
}
.my-dateNum {
  margin: 0 15rpx 0 30rpx;
}
.my-dateBox {
  padding: 20rpx 10rpx;
  font-size: 32rpx;
}
.my-dateNum text {
  display: inline-block;
  text-align: center;
  margin-left: 15rpx;
  color: #333;
}
.btn-share {
  font-size: 30rpx;
  color: #ff6434;
  border: solid 2px #ff6434;
  width: 150rpx;
  padding: 0;
  line-height: 2;
  margin: -10rpx 0 0 20rpx;
}
.my-small-video image {
  width: 229rpx;
  height: 229rpx;
  display: inline-block;
}
.my-small-video {
  padding: 0;
  border: 0;
  width: 229rpx;
  height: 229rpx;
  overflow: hidden;
}
.my-sVideoBox {
  padding: 5rpx 33rpx;
  border: 0;
}
.my-videoList {
  background: #fafafa;
  border-top: solid 1px #e0e0e0;
  margin-top: 10rpx;
}
.my-videoTitle {
  color: #666;
  font-size: 36rpx;
  margin-bottom: 10rpx;
}
.my-roundness-img {
  width: 186rpx;
  height: 186rpx;
}
.my-roundness-img image {
  border-radius: 50%;
}
.my-cardinfoBox {
  position: relative;
}
.ico-editor-btn {
  position: absolute;
  top: 60rpx;
  right: 100rpx;
}
.ico-editor-btn image {
  width: 22rpx;
  height: 22rpx;
}
.ico-editor-btn text {
  margin-left: 15rpx;
  color: #ff6434;
  font-size: 34rpx;
}
.weui-bottombar {
  width: 100%;
  height: 80rpx;
  background: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 9999;
  border-top: solid 1px #e0e0e0;
}

.ico_bt_btn {
  background: rgba(0, 0, 0, 0);
  color: #fff;
  line-height: 40rpx;
  font-size: 30rpx;
  padding: 0;
}

.ico_bt_btn text {
  display: block;
  color: #666;
}

.ico_bt_share {
  position: absolute;
  left: 105rpx;
}
.ico_bt_share image {
  width: 41rpx;
  height: 40rpx;
}
.ico_bt_news2 {
  position: absolute;
  left: 351rpx;
}
.ico_bt_news2 image {
  width: 48rpx;
  height: 45rpx;
}
.ico_bt_my2 {
  position: absolute;
  left: 604rpx;
}
.ico_bt_my2 image {
  width: 42rpx;
  height: 47rpx;
}
button::after,
.noline::before {
  border: 0;
}
.clearfloat:after {
  clear: both;
  content: "";
  display: block;
  height: 0;
  visibility: hidden;
}
</style>

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
    <view class="weui-cell__ft ico_bt_card" bindtap='go2cardlist'>
      <button class="ico_bt_btn">
      <image src="../../images/ico_bt_card.png"></image>
      <text>名片夹</text>
      </button>
    </view>
    <view class="weui-cell__ft  ico_bt_news" bindtap='go2chatlist'>
      <button class="ico_bt_btn">
      <image src="../../images/ico_bt_news.png"></image>
      <text>消息</text>
      </button>
    </view>
    <view class="weui-cell__ft ico_bt_add">
      <button class="ico_bt_btn" bindtap='go2uploadvideo'>
      <image src="../../images/ico_bt_add.png"></image>
      </button>
    </view>
    <view class="weui-cell__ft ico_bt_sell">
      <button class="ico_bt_btn"  bindtap='go2dashboard'>
      <image src="../../images/ico_bt_sell.png"></image>
      <text>销售</text>
      </button>
    </view>
    <view class="weui-cell__ft ico_bt_my">
      <button class="ico_bt_btn">
      <image src="../../images/ico_bt_my.png"></image>
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
    this.cardinfo = this.cardinfo =
      this.$parent.globalData.usercard || wx.getStorageSync("user:card");
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

    await this.loadCard();
  }
  async loadCard() {
    wx.showNavigationBarLoading();
    this.cardinfo = await this.$parent.globalData.get(
      `${api.server}/auth/user/card/info?card_id=${this.cardid}`
    );
    //console.log(this.cardinfo)
    let medias = this.cardinfo.medias;
    try {
      this.medias = JSON.parse(medias);
    } catch (e) {
      this.medias = [];
    }
    //console.log(this.cardinfo.medias)
    //console.log(this.medias)
    this.uid = this.cardinfo.User.id;
    this.$apply();
    wx.setNavigationBarTitle({ title: this.cardinfo.name });
    wx.hideNavigationBarLoading();
  }
  methods = {};
  go2cardlist() {
    wx.navigateTo({ url: "/pages/portal/cardlist" });
  }
  go2dashboard() {
    wx.navigateTo({ url: "/pages/card/mydashboard" });
  }
  go2mycard() {
    wx.navigateTo({ url: "/pages/card/mycard" });
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
  padding: 5rpx 14px;
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
.ico_bt_card {
  position: absolute;
  left: 50rpx;
}
.ico_bt_add {
  position: absolute;
  left: 337rpx;
}
.ico_bt_my {
  position: absolute;
  right: 110rpx;
}
.ico_bt_news {
  position: absolute;
  left: 210rpx;
}
.ico_bt_sell {
  position: absolute;
  left: 505rpx;
}
.ico_bt_card image {
  width: 36rpx;
  height: 30rpx;
}
.iconBox-three .ico_bt_card {
  top: 20rpx;
  left: 50rpx;
}
.iconBox-three .ico_bt_card image {
  width: 44rpx;
  height: 47rpx;
}
.ico_bt_add image {
  width: 98rpx;
  height: 98rpx;
}
.ico_bt_my image {
  width: 28rpx;
  height: 32rpx;
}
.ico_bt_news image {
  width: 32rpx;
  height: 29rpx;
}
.ico_bt_sell image {
  width: 38rpx;
  height: 36rpx;
}
.noline::before,
button::after {
  border: none;
}
</style>

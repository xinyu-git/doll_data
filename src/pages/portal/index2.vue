<template>
<view class="page" bindtouchstart="handletouchtart" bindtouchmove="handletouchmove">
  <!--视频播放-->
  <view class="weui-cell my-bgColor" wx:if="{{custombg}}">
    <view class="my-videoBox1">
      <video id="myVideo" src="http://zz.kongzhong.com/index180118/images/cover.webm" autoplay="true" loop="true" controls></video>
    </view>
  </view>
  <!--名片信息一-->
  <view class="my-cardBox1" wx:if="{{mycard1}}">
    <view class="weui-cell my-cardCon">
      <view class="weui-cell_primary my-avaterBox">
        <text>{{cardinfo.name}}</text>
        <text>{{cardinfo.title}}</text>
      </view>
      <button bindtap="callmeTap" class="call-btn" >联系我</button>
      <view class="my-addressBox">
        <text>公司：{{cardinfo.corp}}</text>
        <text>地址：{{cardinfo.address}}</text>
        <text>手机：{{cardinfo.mobile}}</text>
      </view>
      <view class="weui-cell_hd my-picBox">
        <image src="../../images/person.png"/>
      </view>
      <view class="my-bottomBg">
        <image src="../../images/bottom_bg1.jpg"/>
      </view>
    </view>
  </view>
  <!--名片信息二-->
  <view class="weui-cell my-bgColor my-cardBox2" wx:if="{{mycard2}}">
    <view class="weui-cell_hd">
      <image src="../../images/person.png"/>
    </view>
    <view class="weui-cell_bd weuicell_primary">
      <text>{{cardinfo.name}}</text>
      <text>{{cardinfo.title}}</text>
    </view>
    <button bindtap="callmeTap" class="call-btn" data-mobile="{{cardinfo.mobile}}">联系我</button>
  </view>
  <!--小视频列表-->
  <view class="my-videoBox2 my-pd15">
    <view class="weui-cells_title">视频</view>
    <view class="small-videobox clearfloat">
      <view>
        <image src="../../images/video-sm1.jpg"></image>
      </view>
      <view>
        <image src="../../images/video-sm2.jpg"></image>
      </view>
      <view>
        <image src="../../images/video-sm3.jpg"></image>
      </view>
      <view>
        <image src="../../images/video-sm4.jpg"></image>
      </view>
      <view>
        <image src="../../images/video-sm5.jpg"></image>
      </view>
      <view>
        <image src="../../images/video-sm6.jpg"></image>
      </view>
    </view>
  </view>
  <!--企业信息-->
  <view class="my-infobox">
    <view class="weui-cells_title">企业信息</view>
    <image src="../../images/photo1.jpg"></image>
  </view>
  <!--底部固定导航-->
  <view class="weui-bottombar weui-cell noline2">
    <view class="weui-cell__ft  nav-icon1">
      <button class="nav-btn" open-type="share" data-name="pageShare" >
      <image src="../../images/shareto.png"></image>
      <text>分享</text>
      </button>
    </view>
    <view class="weui-cell__ft  nav-icon2">
      <button class="nav-btn" open-type="contact" session-from="{{uid}}">
      <image src="../../images/iconnum.png"></image>
      </button>
    </view>
    <view class="weui-cell__ft  nav-icon3">
      <button class="nav-btn"  bindtap='go2mycard'>
      <image src="../../images/iconuser.png"></image>
      <text>我的</text>
      </button>
    </view>
  </view>
</view>
</template>
<script>
import wepy from "wepy";
import api from "../../config/api";
export default class Index extends wepy.page {
  config = {
    //navigationBarTitleText: "袁小员的视频介绍",
	enablePullDownRefresh : false, 
    navigationBarBackgroundColor: "#e67841",
    backgroundColor: "#e67841",
    navigationBarTextStyle: "white"
  };

  data = {
    cardinfo: null,
    uid: null,
    hasbackgroundmusic: false,
    custombg: true,
    mycard1: true,
    mycard2: false
  };

  async onLoad(options) {
    this.uid = options.id;
    console.log("====", this.uid); 
	await this.loadCard();
  }
  async loadCard(){
	  	wx.showNavigationBarLoading()
	  	this.cardinfo =  await this.$parent.globalData.get(`${api.server}/auth/user/card/info?card_id=${this.uid}`);
    	//console.log(this.cardinfo)
		this.$apply();
	  	wx.setNavigationBarTitle({title:this.cardinfo.name})
	  	wx.hideNavigationBarLoading()
  }
  methods = {
    async playVideo(e) {
      this.videoContext = wx.createVideoContext("myVideo" + e.currentTarget.id);
      if (e.currentTarget.id == 1) {
        this.vCoverBox1 = false;
      }
      if (e.currentTarget.id == 2) {
        this.vCoverBox2 = false;
      }
      this.videoContext.play();
    },
    handletouchmove: function(event) {
      var currentX = event.touches[0].pageX;
      var currentY = event.touches[0].pageY;
      var tx = currentX - this.data.lastX;
      var ty = currentY - this.data.lastY;
      var text = "";
      if (Math.abs(tx) > Math.abs(ty)) {
      } else {
        if (ty < 0) {
          this.custombg = false;
          this.mycard1 = false;
          this.mycard2 = true;
        } else if (ty > 0) {
          this.custombg = true;
          this.mycard1 = true;
          this.mycard2 = false;
        }
      }
      //将当前坐标进行保存以进行下一次计算
      this.data.lastX = currentX;
      this.data.lastY = currentY;
    },
    playVideo() {
      this.videoContext.requestFullScreen({ direction: 90 });
    },
	go2mycard(){
		wx.navigateTo({url : "/pages/card/mycard"})
	},
    callmeTap() {
      wx.makePhoneCall({
        phoneNumber: this.cardinfo.mobile
      });
    }
  };
}
</script>
<style>
.clearfloat:after {
  clear: both;
  content: "";
  display: block;
  height: 0;
  visibility: hidden;
}
.my-pd15 {
  padding: 15px;
}
.my-bgColor {
  background: #e67841;
}
.my-videoBox1 #myVideo {
  width: 692rpx;
  height: 568rpx;
}
.my-cardBox1 {
  background: #e67841;
  height: 343rpx;
}
.my-cardCon {
  background: #c76433;
  height: 343rpx;
  position: relative;
  width: 95%;
  margin: 0 auto;
  box-sizing: border-box;
}
.my-cardCon image,
.my-cardBox2 image {
  width: 120rpx;
  height: 120rpx;
  display: block;
}
.my-picBox {
  position: absolute;
  right: 37rpx;
  top: 24rpx;
}
.my-avaterBox text {
  display: block;
  color: #fff;
  font-size: 32rpx;
  width: 375rpx;
  text-indent: 15rpx;
}
.my-avaterBox text:nth-child(2) {
  font-size: 28rpx;
  border-bottom: solid 1rpx #cd7e57;
  padding-bottom: 10rpx;
}
.my-avaterBox {
  position: absolute;
  top: 50rpx;
}
.call-btn {
  position: absolute;
  top: 158rpx;
  right: 35rpx;
  width: 120rpx;
  height: 60rpx;
  padding: 0;
  font-size: 30rpx;
  line-height: 56rpx;
  color: #e67841;
  border: solid 2px #b75c2f;
  z-index: 4;
}
.my-addressBox {
  position: absolute;
  bottom: 30rpx;
  color: #fff;
  font-size: 28rpx;
  z-index: 2;
}
.my-addressBox text {
  display: block;
}
.my-bottomBg {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
.my-bottomBg image {
  width: 100%;
  display: block;
  z-index: 1;
}
.small-videobox {
  padding-top: 15rpx;
}
.small-videobox image {
  width: 227rpx;
  height: 227rpx;
  float: left;
}
.my-infobox {
  padding: 0 15px 65px;
}
.my-infobox image {
  width: 100%;
  height: 300rpx;
  display: block;
  margin-top: 15rpx;
}
.my-cardBox2 text {
  color: #fff;
  display: block;
  font-size: 32rpx;
  margin-left: 40rpx;
}
.my-cardBox2 text:nth-child(2) {
  font-size: 28rpx;
}
.my-cardBox2 {
  position: relative;
}
.my-cardBox2 .call-btn {
  position: absolute;
  top: 60rpx;
  right: 30rpx;
}

.noline::before,
.noline2::before {
  border: none;
}
.fixbottom {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.weui-bottombar {
  width: 100%;
  height: 80rpx;
  background: #e67841;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 9999;
}
.nav-btn {
  background: rgba(0, 0, 0, 0);
  color: #fff;
  line-height: 40rpx;
  font-size: 30rpx;
  padding: 0;
}
.nav-btn text {
  display: block;
  color: #fff;
}
.nav-icon1 {
  position: absolute;
  left: 50rpx;
}
.nav-icon2 {
  height: 158rpx;
  position: absolute;
  top: -44rpx;
  left: 284rpx;
}
.nav-icon3 {
  position: absolute;
  right: 110rpx;
}
.nav-icon1 image {
  width: 44rpx;
  height: 47rpx;
}
.nav-icon2 image {
  width: 156rpx;
  height: 158rpx;
}
.nav-icon3 image {
  width: 37rpx;
  height: 48rpx;
}
button::after {
  border: 0;
}
.weui-cells-btpd {
  padding-bottom: 160rpx;
}
</style>

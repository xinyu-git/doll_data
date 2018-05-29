<template>
<view class="page">
    <!--top定制-->
  <view class="weui-cell weui-card">
    <view class="weui-cell__title ">
      <image  src="../../images/person.png"></image>
    </view>
    <view class="weui-cell__ft weui-cell__ft-color">
      <text>袁小员</text>
      <text>坦克世界vip运营</text>
    </view>
    <!--打电话-->
    <view bindtap="callmeTap" class="weui-cell__ft btn_wx">
      <image  src="../../images/iconcall.png"></image>
    </view>
    <!--客服中心-->
    <view class="weui-cell__ft weui-cell-cuetom">
      <button class='customer-btn' open-type="contact" session-from="{{uid}}"></button>
      <image src="../../images/iconwx.png"></image>
    </view>
     
  </view>
  <!--视频播放一-->
  <view class="weui-cells__title">
    <view class="videoCon">
      <view class="v_section">
        <video id="myVideo1" src="http://zz.kongzhong.com/index180118/images/cover.webm"   controls show-center-play-btn="{{controlState}}" bindended="videoEnd1">
          <cover-view class="coverBox" wx:if="{{vCoverBox1}}"  wx:for-index="index" bindtap="palyVideo" id="1">
            <cover-view class="videoPoster" >
              <cover-image class="img"  src="../../images/video.jpg" />
              </image>
            </cover-view>
            <cover-view class="play-btn">
              <cover-image class="img"  src="../../images/start.png" />
              </image>
            </cover-view>
          </cover-view>
        </video>
      </view>
    </view>
  </view>
  <!--最新动态-->  
  <view class="weui-cells__title">
    <text class="weui-cell-bt">最新动态</text>
    <view class="imgbox">
    <image src="../../images/photo1.jpg"></image>
    </view>
  </view>
  <!--发布内容一-->
  <view class="weui-cell noline">
    <view class="weui-cell__bd person-box">
      <image  src="../../images/person.png" />
      </image>
    </view>
    <view class="weui-cell__ft weui-cell__font">
      <text>袁小员</text>
      <text>38分钟前</text>
    </view>
  </view>
  <view class="weui-cell">
    <view class="weui-cell-bd weui-cell-primary">
      <text>空中旋转360度，落地没事！</text>
    </view>
  </view>
  <!--视频播放二-->    
  <view class="weui-cells__title weui-cells-nopd">
    <view class="videoCon">
      <view class="v_section">
        <video id="myVideo2" src="http://zz.kongzhong.com/index180118/images/cover.webm"   controls show-center-play-btn="{{controlState}}" bindended="videoEnd2">
          <cover-view class="coverBox" data-vCoverBox="vCoverBox2" wx:if="{{vCoverBox2}}" bindtap="palyVideo" id="2">
            <cover-view class="videoPoster" >
              <cover-image class="img"  src="../../images/video.jpg"/>
            </cover-view>
            <cover-view class="play-btn" >
              <cover-image class="img"  src="../../images/start.png" />
            </cover-view>
          </cover-view>
        </video>
      </view>
    </view>
  </view>
  <!--发布内容二-->
  <view class="weui-cell noline">
    <view class="weui-cell__bd person-box">
      <image  src="../../images/person2.png" />
      </image>
    </view>
    <view class="weui-cell__ft weui-cell__font">
      <text>坦克世界</text>
      <text>38分钟前</text>
    </view>
  </view>
  <view class="weui-cell">
    <view class="weui-cell-bd weui-cell-primary">
      <text>立夏快乐！</text>
    </view>
    
  </view>
  <view class="weui-cells__title weui-cells-nopd weui-cells-btpd ">
      <view class="imgbox">
    <image src="../../images/photo1.jpg"></image>
      </view>
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
      <button class="nav-btn"  bindtap='go2myprofile'>
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
    navigationBarTitleText: "用户端",
    navigationBarBackgroundColor: "#e67841",
    backgroundColor: "#e67841",
    navigationBarTextStyle: "white"
  };

  data = {
    userlist: [
      { fullname: "张三" },
      { fullname: "王五" },
      { fullname: "李四" }
    ],
    uid: null,
    hasbackgroundmusic: false,
    vCoverBox1: true,
    vCoverBox2: true
  };

  async onLoad(options) {
    this.uid = options.id;
    console.log("====", this.uid);
  }

  methods = {
    async palyVideo(e) {
      this.videoContext = wx.createVideoContext("myVideo" + e.currentTarget.id);
      if (e.currentTarget.id == 1) {
        this.vCoverBox1 = false;
      }
      if (e.currentTarget.id == 2) {
        this.vCoverBox2 = false;
      }
      this.videoContext.play();
    },
    videoEnd1(e) {
      this.vCoverBox1 = true;
    },
    videoEnd2(e) {
      this.vCoverBox2 = true;
    },
    callmeTap() {
      wx.makePhoneCall({
        phoneNumber: "13910100160"
      });
    },
    go2myprofile() {
      wx.navigateTo({ url: "/pages/card/chatList" });
    }
  };
}
</script>
<style>
.controls {
  position: relative;
  top: 50%;
  height: 50px;
  margin-top: -25px;
  display: flex;
}
.videoCon {
  position: relative;
  width: 690rpx;
  height: 410rpx;
  margin: 0 auto;
}
.v_section {
  width: 690rpx;
  height: 410rpx;
  position: absolute;
  left: 50%;
  margin-left: -345rpx;
  top: 0;
}
.v_section video {
  width: 100%;
  height: 100%;
  display: block;
}
.coverBox {
  position: relative;
  height: 100%;
  z-index: 2;
}
.play-btn {
  width: 95rpx;
  height: 95rpx;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -48rpx;
  margin-left: -48rpx;
  z-index: 2;
}
.videoPoster {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
.play-btn.hide {
  display: none;
}

.imgbox image {
  width: 690rpx;
  height: 300rpx;
  margin: 0 auto;
}
.person-box image {
  width: 120rpx;
  height: 120rpx;
  margin-left: 15rpx;
}
.weui-cell__ft text {
  display: block;
  font-size: 28rpx;
  color: #000;
}

.weui-cells__title text {
  color: #000;
}
.weui-card {
  background: #e67841;
  height: 210rpx;
}
.weui-card image {
  width: 150rpx;
  height: 150rpx;
  margin-right: 41rpx;
}
.weui-cell__ft-color text {
  color: #fff;
  text-align: left;
  font-size: 26rpx;
}
.weui-cell__ft-color text:nth-child(1) {
  font-size: 34rpx;
}
.weui-cell-cuetom {
  margin-left: 20rpx;
}
.weui-cell-cuetom image {
  width: 74rpx;
  height: 74rpx;
  margin-left: 20rpx;
  margin-right: 0;
}
.customer-btn {
  position: absolute;
  top: 41px;
  opacity: 0;
  right: 26px;
  height: 40px;
  width: 40px;
}
.icon_kf {
  width: 74rpx;
  height: 74rpx;
  display: inline-block;
  margin-top: 5px;
}
.noline::before,
.noline2::before {
  border: none;
}
.noline {
  padding: 0 15px;
  margin: 20rpx 0 10rpx;
}
.btn_wx {
  margin-left: 100rpx;
}
.btn_wx image {
  width: 74rpx;
  height: 74rpx;
  margin: 0;
  border: none;
}
.weui-cell__font text {
  font-size: 32rpx;
}
.weui-cell__font text:nth-child(2) {
  color: #aaa;
  font-size: 28rpx;
}
.weui-cell-bt {
  display: block;
  margin-bottom: 10rpx;
  font-size: 32rpx;
  color: #000;
}
.weui-cells-nopd {
  margin-top: 0;
}

.v_section cover-view {
  pointer-events: none;
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

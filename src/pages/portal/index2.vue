<template>
<view class="page" >
  <!--视频播放  bindtouchstart="handletouchtart" bindtouchmove="handletouchmove"-->
  <view class="videoBox" wx:if="{{custombg}}">
    <view class="my-videoBox1">
      <video id="myVideo" class="myVideo" src="{{source}}" autoplay="true"  loop="true" controls></video>
    </view>
  </view>
  <!--名片信息-->
  <view class="my-cardBox1" wx:if="{{mycard1}}">
    <view class="weui-cell my-cardCon">
      <view class="my-colorLump"></view>
      <view class="weui-cell_primary my-avaterBox">
        <text>{{cardinfo.name}}</text>
        <text>{{cardinfo.title}}</text>
      </view>
      <view class="weui-cell__ft my-btn_wx">
        <button class='my-btn_news' open-type="contact" session-from="{{uid}}"></button>
        <image src="../../images/ico_wx.png"></image>
      </view>
      <view class="my-btn_call" bindtap="callmeTap" >
        <image  src="../../images/ico_call.png"></image>
      </view>
      <view class="my-border-r"></view>
      <view class="my-addressBox">
        <text>公司：{{cardinfo.corp}}</text>
        <text>地址：{{cardinfo.address}}</text>
        <text>手机：{{cardinfo.mobile}}</text>
      </view>
       <button class="goShopBtn" bindtap="go2shop">我的商城</button>
    </view>
  </view>
  <!--小视频列表-->
  <view class="my-videoList">
    <view class="weui-cells__title my_title">视频</view>
    <view class="myVideoBoxes clearfloat">
    <view class="weui-grids my-sVideoBox" wx:for="{{videolist}}" wx:key="">
      <view class="weui-grid my-small-video" id="{{index}}" bindtap="playVideo">
        <image src="{{item.cover}}"></image>
      </view>
    </view></view>
  </view>
  <!--企业信息文章-->
  <view class="my-introBox">
    <view class="weui-cells__title my_title">企业信息</view>
    <text>空中网是中国领先的网络游戏研发商和运营商，致力于为中国及海外互联网用户提供高品质的大型在线游戏服务，同时为中国手机用户提供多元化的无线娱乐服务。 </text>
    <text>公司于2004年在美国纳斯达克上市，目前公司业务覆盖互联网游戏、手机游戏以及无线增值三大领域。</text>
    <text> 2017年4月14日晚间消息，空中网今日宣布，已完成私有化交易，公司将不再是一家上市公司，而成为Linkedsee Limited的全资子公司。</text>
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
     <view class="weui-cell__ft  ico_bt_my2" wx:if="{{my}}">
      <button class="ico_bt_btn"  bindtap='go2my'>
      <image src="../../images/ico_bt_my2.png"></image>
      <text>我的</text>
      </button>
    </view>
    <view class="weui-cell__ft  ico_bt_my2" wx:else>
      <button class="ico_bt_btn"  bindtap='go2shop'>
      <image src="../../images/ico_bt_my2.png"></image>
      <text>商城</text>
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
    enablePullDownRefresh: false
  };

  data = {
    cardinfo: null,
    uid: null,
    cardid: null,
    hasbackgroundmusic: false,
    custombg: true,
    mycard1: true,
    medias: [],
    mycard2: false,
    posterurl: "",
    source: "",
    videolist: [],
    my: true
    //http: null
  };

  async onLoad(options) {
    //this.http = `${api.server}`;
    this.cardid = options.id;
    let userInfo = wx.getStorageSync("user:detail");
    this.userInfo = userInfo;
    //console.log(this.$parent.globalData.usercard[0].id);
    //console.log(this.cardid);
    if (this.cardid != this.$parent.globalData.usercard[0].id) {
      this.my = false;
    }
  }
  async onShow() {
    this.loadCard();
  }
  async loadCard() {
    let that = this;
    wx.showNavigationBarLoading();
    this.cardinfo = await this.$parent.globalData.get(
      `${api.server}/auth/user/card/info?card_id=${this.cardid}`
    );
    let medias = this.cardinfo.medias;
    try {
      this.medias = JSON.parse(medias);
    } catch (e) {
      this.medias = [];
    }
    for (var i = 0; i < this.medias.length; i++) {
      if (this.medias[i].isDefault) {
        this.source = this.medias[i].source;
      } else {
        this.videolist.push(this.medias[i]);
      }
    }
    //console.log(this.cardinfo.medias)
    //console.log(this.medias)
    this.uid = this.cardinfo.User.id;
    this.$apply();
    wx.setNavigationBarTitle({ title: that.cardinfo.name });
    wx.hideNavigationBarLoading();
    this.createFavorite();
    //console.log(this.cardinfo);
  }
  async createFavorite() {
    let result = await this.$parent.globalData.post(
      `${api.server}/api/favorite/create`,
      {
        target_id: this.cardid,
        target_type: "card",
        description: this.cardinfo.description,
        category: "",
        cover_img: "",
        title: this.cardinfo.title
      }
    );
    //console.log(result);
  }
  methods = {
    async playVideo(e) {
      this.videoContext = wx.createVideoContext("myVideo");
      //if (e.currentTarget.id == 1) {
      //  this.vCoverBox1 = false;
      //}
      //if (e.currentTarget.id == 2) {
      //  this.vCoverBox2 = false;
      //}
      //console.log(e.currentTarget.id);
      for (var i = 0; i < this.videolist.length; i++) {
        if (e.currentTarget.id == i) {
          this.source = this.videolist[i].source;
        }
      }

      //this.custombg = false;
      //this.box = true;
      //this.videoContext.play();
      this.videoContext.requestFullScreen({ direction: 90 });
    },
    playVideo2() {
      this.videoContext.requestFullScreen({ direction: 90 });
    },
    go2my() {
      wx.navigateTo({ url: "/pages/card/my" });
    },
    go2shop() {
      wx.navigateTo({ url: "/pages/shop/index1?id=" + this.cardid });
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
.my-videoBox1 .myVideo {
  width: 100%;
  height: 568rpx;
}
.my-cardBox1 {
  color: #ff6434;
  border-bottom: solid 1px #e0e0e0;
}
.my-cardCon {
  position: relative;
  width: 95%;
  margin: 0 auto;
  box-sizing: border-box;
}
.my-avaterBox text {
  display: inline-block;
  color: #ff6434;
  font-size: 56rpx;
  font-weight: bolder;
}
.my-avaterBox text:nth-child(2) {
  font-size: 32rpx;
  margin-left: 20rpx;
  padding-bottom: 10rpx;
  color: #ffa285;
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
  z-index: 4;
}
.my-addressBox {
  color: #666;
  margin-top: 125rpx;
  margin-left: 8rpx;
}
.my-addressBox text {
  display: block;
  font-size: 32rpx;
}
.myVideoBoxes {
  padding: 0 32rpx;
}
.noline::before,
.my-smallVideo::before,
.myVideoBoxes::before {
  border: none;
}
.my-btn_call {
  position: absolute;
  top: 60rpx;
  right: 142rpx;
}
.my-btn_call image,
.my-btn_wx image {
  width: 72rpx;
  height: 72rpx;
}
.my-btn_wx {
  position: absolute;
  top: 60rpx;
  right: 10rpx;
}
.my-border-r {
  border-right: solid 1px #ff6434;
  position: absolute;
  top: 80rpx;
  right: 108rpx;
  width: 1px;
  height: 40rpx;
}
.my-colorLump {
  background: #ffa285;
  width: 20rpx;
  height: 52rpx;
  position: absolute;
  top: 20%;
  left: -2.5%;
}
.my-btn_news {
  position: absolute;
  top: 0;
  right: 0;
  width: 72rpx;
  height: 72rpx;
  padding: 0;
  z-index: 4;
  opacity: 0;
}
.my-small-video image {
  width: 230rpx;
  height: 230rpx;
  display: inline-block;
}

.my-small-video {
  padding: 0;
  border: 0;
  width: 230rpx;
  height: 230rpx;
  overflow: hidden;
}

.my-sVideoBox {
  border: 0;
  width: 229rpx;
  height: 229rpx;
  float: left;
}
.my_title {
  font-size: 36rpx;
  color: #666;
}
.my-videoList {
  padding-bottom: 40rpx;
  border-bottom: solid 1px #e0e0e0;
}
.my-introBox {
  padding-bottom: 180rpx;
}
.my-introBox text {
  display: block;
  padding: 5px 15px 0;
  color: #333;
  font-size: 32rpx;
  text-indent: 2em;
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
button::after {
  border: 0;
}
.clearfloat:after {
  clear: both;
  content: "";
  display: block;
  height: 0;
  visibility: hidden;
}
.goShopBtn {
  position: absolute;
  bottom: 35rpx;
  right: 15rpx;
  color: #fff;
  background: #ff6434;
  font-size: 32rpx;
}
</style>

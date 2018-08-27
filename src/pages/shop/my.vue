<template>
<view class="page">
   <view class="profile-info" bindtap="goLogin">
    <image class="avatar" src="{{userInfo.headimg}}"></image>
    <view class="info">
      <text>Hi, 你好!</text>
      <text class="name">{{userInfo.nickname}}</text>
      <!-- <text class="level">{{userInfo.username}}</text> -->
    </view>
  </view>
<view class="user-menu">
    <view class="card_title">名片管理</view>
    <view class="item" bindtap="go2uploadvideo">
      <view class="a">
        <text class="icon order"></text>
        <text class="txt">上传视频</text>
      </view>
    </view>
    <view class="item" bindtap="go2card">
      <view class="a">
        <text class="icon feedback"></text>
        <text class="txt">名片信息</text>
      </view>
    </view>
    <view class="item" bindtap="go2mycard">
      <view class="a">
        <text class="icon feedback"></text>
        <text class="txt">编辑信息</text>
      </view>
    </view>
    <view class="item" bindtap="go2myarticle">
      <view  class="a">
        <text class="icon kefu"></text>
        <text class="txt">文章</text>
      </view>
    </view>
    <view class="item" bindtap="go2dashboard"> 
      <view class="a">
        <text class="icon coupon"></text>
        <text class="txt">数据</text>
      </view>
    </view>
    <view class="item" bindtap="go2chatlist"> 
      <view class="a">
        <text class="icon kefu"></text>
        <text class="txt">聊天</text>
      </view>
    </view>
</view>
<view class="user-menu">
    <view class="card_title">商城管理</view>
    <view class="item" bindtap="go2crm">
      <view class="a">
        <text class="icon address"></text>
        <text class="txt">商品管理</text>
      </view>
    </view>
    <view class="item">
      <view class="a">
        <text class="icon security"></text>
        <text class="txt">订单管理</text>
      </view>
    </view>
    <view class="item">
     <view class="a">
        <text class="icon address"></text>
        <text class="txt">数据查看</text>
     </view>
    </view>
   </view>
</view>
</template>
<script>
import wepy from "wepy";
import api from "../../config/api";
export default class Index extends wepy.page {
  config = {
    enablePullDownRefresh: false,
    navigationBarTitleText: "我"
  };
  data = {
    userInfo: {}
  };
  async onLoad(options) {}
  onShow() {
    let userInfo = wx.getStorageSync("user:detail");
    this.userInfo = userInfo;
    //console.log(userInfo.nickname);
  }
  methods = {
    go2dashboard() {},
    go2crm(e) {
      let url =
        "https://card.kong.net/?access_token=" +
        this.$parent.globalData.token +
        "#/goods/goodsList";
      console.log("----", encodeURIComponent(url));
      wx.navigateTo({ url: "/pages/shop/crm?url=" + encodeURIComponent(url) });
    },
    go2myarticle() {
      wx.navigateTo({ url: "/pages/article/articlelist" });
    },
    go2uploadvideo() {
      wx.navigateTo({ url: "/pages/card/uploadvideo" });
    },
    go2chatlist() {
      wx.navigateTo({ url: "/pages/card/chatlist" });
    },
    go2mycard() {
      wx.navigateTo({ url: "/pages/card/mycard" });
    },
    go2card() {
      wx.navigateTo({
        url: "/pages/portal/index2?id=" + this.$parent.globalData.usercard[0].id
      });
    }
  };
}
</script>
<style>
.profile-info {
  width: 100%;
  height: 280rpx;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  padding: 0 30.25rpx;
  background: #fe6a3c;
}

.profile-info .avatar {
  height: 120rpx;
  width: 120rpx;
  border-radius: 50%;
}

.profile-info .info {
  flex: 1;
  height: 85rpx;
  padding-left: 31.25rpx;
  color: #fff;
}

.profile-info .name {
  display: block;
  height: 45rpx;
  line-height: 45rpx;
  color: #fff;
  font-size: 34rpx;
  margin-top: 6rpx;
}

.profile-info .level {
  display: block;
  height: 30rpx;
  line-height: 30rpx;
  margin-bottom: 10rpx;
  color: #7f7f7f;
  font-size: 30rpx;
}

.user-menu {
  width: 100%;
  height: auto;
  overflow: hidden;
  background: #fff;
}

.user-menu .item {
  float: left;
  width: 33%;
  height: 187.5rpx;
  border-right: 1px solid rgba(0, 0, 0, 0.15);
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  text-align: center;
}

.user-menu .item .a {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.user-menu .item.no-border {
  border-right: 0;
}

.user-menu .item.item-bottom {
  border-bottom: none;
}

.user-menu .icon {
  margin: 0 auto;
  display: block;
  height: 52.803rpx;
  width: 52.803rpx;
  margin-bottom: 16rpx;
}

.user-menu .icon.order {
  background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png)
    0 -437.5rpx no-repeat;
  background-size: 52.803rpx;
}

.user-menu .icon.coupon {
  background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png)
    0 -62.4997rpx no-repeat;
  background-size: 52.803rpx;
}

.user-menu .icon.gift {
  background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png)
    0 -187.5rpx no-repeat;
  background-size: 52.803rpx;
}

.user-menu .icon.address {
  background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png)
    0 0 no-repeat;
  background-size: 52.803rpx;
}

.user-menu .icon.security {
  background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png)
    0 -500rpx no-repeat;
  background-size: 52.803rpx;
}

.user-menu .icon.kefu {
  background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png)
    0 -312.5rpx no-repeat;
  background-size: 52.803rpx;
}

.user-menu .icon.help {
  background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png)
    0 -250rpx no-repeat;
  background-size: 52.803rpx;
}

.user-menu .icon.feedback {
  background: url(http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/sprites/ucenter-sdf6a55ee56-f2c2b9c2f0.png)
    0 -125rpx no-repeat;
  background-size: 52.803rpx;
}

.user-menu .txt {
  display: block;
  height: 24rpx;
  width: 100%;
  font-size: 24rpx;
  color: #333;
}

.logout {
  margin-top: 50rpx;
  height: 101rpx;
  width: 100%;
  line-height: 101rpx;
  text-align: center;
  background: #fff;
  color: #333;
  font-size: 30rpx;
}
.card_title {
  height: 80rpx;
  line-height: 80rpx;
  padding-left: 60rpx;
  border-bottom: solid 1px rgba(0, 0, 0, 0.15);
  margin-top: 17 rpx;
}
</style>
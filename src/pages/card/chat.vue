<template>
<view class="page">
  <view class="page__bd page__bd_spacing">
    <view class="content">
       <scroll-view scroll-y style="height:980rpx;" scroll-into-view="{{toView}}"  bindscrolltoupper="upper" bindscrolltolower="lower" bindscroll="scroll">
        <block wx:for="{{messages}}" wx:key="index" wx:for-index="index" wx:for-item="item">
          <view class="chatbox">
            <image class="avater float-right" wx:if="{{item.from== myid}}" src="{{my_avator}}"></image>
            <image class="avater float-left" wx:else src="{{to_avator}}"></image>
            <view class="msg float-right mymsg" wx:if="{{item.from== myid}}">{{item.content}}</view>
            <view class="msg othermsg" wx:else>{{item.content}}</view>
          </view>
        </block>
        <view id="sroll-bottom"></view>
      </scroll-view>
    </view>
    <view class="weui-footer weui-footer_fixed-bottom" style="bottom:0;">
      <view class="replymsg_box">
        <input class="weui-textarea" adjust-position="true"  placeholder="请回复消息……" style="text-align:left;" 
                value="{{readyToSend}}" bindtap="getfocus"  bindinput="bindInputTitle" confirm-type="send" cursor-spacing="85" bindconfirm="send">
      </view>
      <view class="send-box">
        <image class="uploadimg" bindtap="uploadimg"  src="../../images/icon-pic.png"></image>
        <button class="send-btn" bindtap='sendmsg'>发送</button>
      </view>
    </view>
  </view>
</view>
</template>
<script>
import wepy from "wepy";
import config from "../../config/api";
export default class Chat extends wepy.page {
  config = {
    navigationBarTitleText: "回复消息",
    navigationBarBackgroundColor: "#e67841",
    navigationBarTextStyle: "white"
  };
  components = {};
  data = {
    to_avator : "", 
    my_avator : "", 
    key: "",
    messages: [],
    readyToSend: "",
    showMainpage: true,
    myid : '', 
    uid: null,
    toView: "sroll-bottom"
  };
  async onLoad(options) {
    this.$parent.globalData.EventBus.removeEventListener( "m:msg", this.onmsgchange, this );
    this.$parent.globalData.EventBus.addEventListener(  "m:msg", this.onmsgchange, this );
    
    //console.log(this.$parent.globalData.userInfo);
    this.my_avator = this.$parent.globalData.userInfo.headimg;
    this.myid = this.$parent.globalData.userInfo.id;
    this.uid = options.id;
    this.onmsgchange();
  }
  onmsgchange(evt) {
    this.messages = this.$parent.globalData.chatmsg.filter(item => {
      return item.from == this.uid || item.to == this.uid;
    });
    console.log('after filter' , this.messages)
    this.$apply();
  }
  methods = {
    getfocus() {
      this.toView = "sroll-bottom"
    },
    bindInputTitle(e) {
      this.readyToSend = e.detail.value;
      this.$apply();
    },
    sendmsg(evt) {
      //{from: 19904, to: "19901", content: "我", msgTime: "2018-05-23 08:55:07", type: "text"}
      if (!!this.readyToSend) {
        this.$parent.globalData.socket1.emit("m:msg", {
          	to: this.uid,
            content: this.readyToSend 
        });
        this.readyToSend = "";
        this.onmsgchange();
        this.$apply();
      }
    },
    uploadimg() {
      wx.chooseImage({
        count: 9, // 最多可以选择的图片张数，默认9
        sizeType: ["original", "compressed"], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ["album", "camera"], // album 从相册选图，camera 使用相机，默认二者都有
        success: (res) =>{
          console.log(res);
          this.imgsrc = res.tempFilePaths
        },
        fail: function() { },
        complete: function() {}
      });
    }
  };
}
</script>
<style>
#sroll-bottom {
  height: 35rpx;
}

.send-box {
  padding: 30rpx;
  position: relative;
  height: 80rpx;
  background: #fff;
}
.send-box .uploadimg {
  width: 56rpx;
  height: 48rpx;
  position: absolute;
  left: 60rpx;
  top: 40rpx;
}
.replymsg_box {
  width: 100%;
  display: block;
  border-bottom: 1px solid #ccc;
}
.weui-textarea {
  height: 80rpx;
  padding: 30rpx;
  color: #000;
  background: #fff;
}
.send-btn {
  background: #e67841;
  color: #fff;
  width: 120rpx;
  height: 68rpx;
  line-height: 68rpx;
  font-size: 30rpx;
  border-radius: 8rpx;
  position: absolute;
  right: 40rpx;
  top: 35rpx;
  padding-left: 5rpx;
  padding-right: 5rpx;
}
.float-left {
  float: left;
}
.float-right {
  float: right;
}

.chatbox {
  margin: 20rpx 0 0;
}

.chatbox .float-left {
  margin-right: 30rpx;
}
.chatbox .float-right {
  margin-left: 30rpx;
}
.chatbox:after {
  content: " ";
  display: block;
  clear: both;
  height: 0;
}
.msg {
  border-radius: 10rpx;
  background: #fff;
  position: relative;
  margin-top: 25rpx;
  display: inline-block;
  min-width: 5%;
  max-width: 69%;
  border: 2px solid #e67841;
  text-align: left;
  padding: 20rpx;
  font-size: 32rpx;
}
.mymsg {
  background: #e67841;
  color: #fff;
}
.avater {
  width: 100rpx;
  height: 100rpx;
  display: inline-block;
  margin-top: 16rpx;
}
.mymsg:after {
  content: "";
  position: absolute;
  right: -32rpx;
  top: 10rpx;
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 8px solid transparent;
  border-left: 8px solid #e67841;
}
.othermsg:before {
  content: "";
  position: absolute;
  left: -12rpx;
  top: 16rpx;
  content: "";
  width: 8px;
  height: 8px;
  border-left: solid 2px #e67841;
  border-top: solid 2px #e67841;
  background: #fff;
  transform: rotateZ(315deg);
  -webkit-transform: rotateZ(315deg);
  -moz-transform: rotateZ(315deg);
  -o-transform: rotateZ(315deg);
  -ms-transform: rotateZ(315deg);
}
</style>

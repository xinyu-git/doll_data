<template>
<view class="page">
  <view class="page__bd ">
    <view class="content">
      <scroll-view scroll-y style="height:1050rpx;" scroll-into-view="{{toView}}"  bindscrolltoupper="upper" bindscrolltolower="lower" bindscroll="scroll" >
        <view class="my-timeShow">
          <text>{{topTime}}</text>
          <view class="my-line"></view>
        </view>
        <block wx:for="{{messages}}" wx:key="index" wx:for-index="index" wx:for-item="item">
          <view class="my-chatBox">
            <image class="my-avaterInfo my-pull-rt" wx:if="{{item.from=='me'}}" src="{{my_avator}}"></image>
            <image class="my-avaterInfo my-pull-lt" wx:else src="{{to_avator}}"></image>
            <view class="msg mymsg my-pull-rt" wx:if="{{item.from=='me'}}">{{item.content}}</view>
            <view class="msg othermsg" wx:else>{{item.content}}</view>
          </view>
        </block>
        <view id="sroll-bottom"></view>
      </scroll-view>
    </view>
    <view class="weui-footer weui-footer_fixed-bottom" style="bottom:0;">
      <view class="replymsg_box">
        <input class="weui-textarea" placeholder="请输入要回复的内容" style="text-align:left;" 
                value="{{readyToSend}}" bindtap="getfocus"  bindinput="bindInputTitle" confirm-type="send" cursor-spacing="85" bindconfirm="send" />
      </view>
      <view class="my-send-box">
        <image class="uploadimg" bindtap="uploadimg"  src="../../images/ico-pic.png"></image>
        <view class="my-send-btn" bindtap='sendmsg'>发送</view>
      </view>
    </view>
  </view>
</view>
</template>
<script>
import wepy from "wepy";
//import config from "../../config/api";
export default class Chat extends wepy.page {
  config = {
    navigationBarTitleText: "回复消息"
  };
  components = {};
  data = {
    to_avator: "",
    my_avator: "",
    key: "",
    messages: [],
    readyToSend: "",
    showMainpage: true,
    uid: null,
    me: "",
    toView: "sroll-bottom",
    time: [],
    topTime: null
  };
  async onLoad(options) {
    //进入到页面的时候，对告诉服务器，要lock住这个key
    this.toView = "sroll-bottom";
    this.$parent.globalData.EventBus.removeEventListener(
      "m:msg",
      this.onmsgchange,
      this
    );
    this.$parent.globalData.EventBus.addEventListener(
      "m:msg",
      this.onmsgchange,
      this
    );
    console.log(this.$parent.globalData.userInfo);
    this.my_avator = this.$parent.globalData.userInfo.headimg;
    let chatmsg = this.$parent.globalData.chatusers;
    this.myid = this.$parent.globalData.userInfo.id;
    this.uid = options.id;
    for (let i in chatmsg) {
      if ((this.uid = chatmsg[i].id)) {
        this.to_avator = chatmsg[i].headimg;
      }
    }
    console.log("this.uid is ", this.uid);
    console.log(this.$parent.globalData);
    this.onmsgchange();
  }
  onmsgchange(evt) {
    this.messages = this.$parent.globalData.chatmsg.filter(item => {
      if (item.type) {
        return item.from == this.uid || item.to == this.uid;
      }
    });
    console.log(this.messages);
    this.topTime = this.$parent.globalData.chatmsg[0].msgTime;
    console.log(this.topTime);
    this.$apply();
  }
  methods = {
    getfocus() {
      this.setData({
        toView: "sroll-bottom"
      });
    },
    bindInputTitle(e) {
      this.readyToSend = e.detail.value;
      this.$apply();
    },
    sendmsg(evt) {
      //{from: 19904, to: "19901", content: "我", msgTime: "2018-05-23 08:55:07", type: "text"}
      //if (this.readyToSend) {
      if (true) {
        this.$parent.globalData.socket1.emit("m:msg", {
          to: this.uid,
          content: this.readyToSend
        });
        this.$parent.globalData.chatmsg.push({
          from: "me",
          to: this.uid,
          content: this.readyToSend,
          type: "text"
        });
        this.readyToSend = "";
        this.onmsgchange();
        this.$apply();
      }
    },
    uploadimg() {
      let that = this;
      wx.chooseImage({
        count: 9, // 最多可以选择的图片张数，默认9
        sizeType: ["original", "compressed"], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ["album", "camera"], // album 从相册选图，camera 使用相机，默认二者都有
        success: function(res) {
          // success
          //console.log(res);

          that.src = res.tempFilePaths;
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      });
    }
  };
}
</script>
<style>
#sroll-bottom {
  height: 35rpx;
}
.my-send-box {
  padding: 30rpx;
  position: relative;
  background: #fff;
  height: 45rpx;
}
.my-send-box .uploadimg {
  width: 52rpx;
  height: 52rpx;
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
  height: 15rpx;
  padding: 30rpx;
  color: #000;
  background: #fff;
}
.my-send-btn {
  color: #ff6434;
  width: 120rpx;
  height: 68rpx;
  line-height: 68rpx;
  font-size: 30rpx;
  position: absolute;
  right: 40rpx;
  top: 35rpx;
}
.my-pull-lt {
  float: left;
}
.my-pull-rt {
  float: right;
}
.my-chatBox {
  margin: 10rpx 0 0;
}
.my-chatBox .my-pull-lt {
  margin-right: 30rpx;
}
.my-chatBox .my-pull-rt {
  margin-left: 30rpx;
}
.my-chatBox:after {
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
  max-width: 65%;
  border: 1px solid #ff6434;
  text-align: left;
  min-height: 52rpx;
  padding: 20rpx 10rpx 20rpx 15rpx;
  font-size: 32rpx;
}
.mymsg {
  background: #fff;
  color: #333;
  border: 1px solid #e0e0e0;
}
.my-avaterInfo {
  width: 100rpx;
  height: 100rpx;
  display: inline-block;
  border-radius: 50%;
  margin-left: 30rpx;
  margin-right: 30rpx;
  margin-top: 18rpx;
}
.mymsg:after {
  content: "";
  position: absolute;
  right: -10rpx;
  top: 24rpx;
  content: "";
  width: 8px;
  height: 8px;
  border-right: solid 1px #e0e0e0;
  border-bottom: solid 1px #e0e0e0;
  background: #fff;
  transform: rotateZ(315deg);
}
.othermsg:before {
  content: "";
  position: absolute;
  left: -10rpx;
  top: 24rpx;
  content: "";
  width: 8px;
  height: 8px;
  border-left: solid 1px #ff6434;
  border-top: solid 1px #ff6434;
  background: #fff;
  transform: rotateZ(315deg);
}
.my-timeShow text {
  display: inline-block;
  color: #ccc;
  font-size: 30rpx;
  padding-top: 70rpx;
  padding-bottom: 20rpx;
  background: #f8f8f8;
  width: 42%;
  text-align: center;
}
.my-timeShow {
  text-align: center;
  position: relative;
}
.my-line {
  position: absolute;
  border-bottom: solid 1px #e0e0e0;
  top: 90rpx;
  left: 0;
  height: 1px;
  width: 100%;
  z-index: -1;
}
</style>

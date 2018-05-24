<template>
<view class="page">
  <view class="page__bd page__bd_spacing">
    <view class="content">
      <scroll-view scroll-y style="height:1000rpx;" bindscrolltoupper="upper" bindscrolltolower="lower" bindscroll="scroll">
        <block wx:for="{{messages}}" wx:key="index" wx:for-index="index" wx:for-item="item">
          <view class="chatbox">
            <image class="avater right" wx:if="{{item.from=='me'}}" src="{{item.url}}"></image>
            <image class="avater left" wx:else src="{{item.url}}"></image>
            <view class="msg right mymsg" wx:if="{{item.from=='me'}}">{{item.content}}</view>
            <view class="msg othermsg" wx:else>{{item.content}}</view>
          </view>
        </block>
      </scroll-view>
    </view>
    <view class="weui-footer weui-footer_fixed-bottom" style="bottom:0;">
      <view class="replymsg_box">
        <textarea class="weui-textarea" placeholder="请回复消息……" style="text-align:left;" 
                value="{{readyToSend}}" bindinput="bindInputTitle" confirm-type="send" cursor-spacing="10" bindconfirm="send"></textarea>
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
    backgroundColor: "#e67841",
    navigationBarTextStyle: "white"
  };
  components = {};
  data = {
    key: "",
    messages: [
      {
        content: "我想问一下黄金59多少钱？",
        from: "me",
        url: "../../images/person.png"
      },
      {
        content: "您好，在呢～1888元。",
        from: "other",
        url: "../../images/person.png"
      },
      {
        content: "想问一下黄金59多少钱？想问一下黄金59多少钱？",
        from: "me",
        url: "../../images/person.png"
      },
      {
        content: "您好，在呢～1888元您好，在呢～1888元",
        from: "other",
        url: "../../images/person.png"
      },
      {
        content: "我想问一下黄金59多少钱",
        from: "me",
        url: "../../images/person.png"
      },
      {
        content: "您好，在呢～1888元",
        from: "other",
        url: "../../images/person.png"
      },
      {
        content: "想问一下黄金59多少钱？想问一下黄金59多少钱？",
        from: "me",
        url: "../../images/person.png"
      },
      {
        content: "您好，在呢～1888元您好，在呢～1888元",
        from: "other",
        url: "../../images/person.png"
      },
      {
        content: "想问一下黄金59多少钱？想问一下黄金59多少钱？",
        from: "me",
        url: "../../images/person.png"
      },
      {
        content: "您好，在呢～1888元您好，在呢～1888元",
        from: "other",
        url: "../../images/person.png"
      },
      {
        content: "我想问一下黄金59多少钱",
        from: "me",
        url: "../../images/person.png"
      },
      {
        content: "您好，在呢～1888元",
        from: "other",
        url: "../../images/person.png"
      },
      {
        content: "想问一下黄金59多少钱？想问一下黄金59多少钱？",
        from: "me",
        url: "../../images/person.png"
      },
      {
        content: "您好，在呢～1888元您好，在呢～1888元",
        from: "other",
        url: "../../images/person.png"
      }
    ],
    readyToSend: "",
    showMainpage: true,
    uid: null
  };
  async onLoad(options) {
    //进入到页面的时候，对告诉服务器，要lock住这个key
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
    this.uid = options.id;
    //console.log('this.uid is ', this.uid)
    //console.log(this.$parent.globalData);
    //this.onmsgchange();
  }
  onmsgchange(evt) {
    this.messages = this.$parent.globalData.chatmsg.filter(item => {
      return item.from == this.uid || item.to == this.uid;
    });
    console.log(this.messages);
    this.$apply();
  }
  methods = {
    bindInputTitle(e) {
      this.readyToSend = e.detail.value;
      this.$apply();
    },
    sendmsg(evt) {
      //{from: 19904, to: "19901", content: "我", msgTime: "2018-05-23 08:55:07", type: "text"}
      if (this.readyToSend) {
        this.$parent.globalData.socket1.emit("m:msg", {
          to: this.uid,
          msg: this.readyToSend
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
      wx.chooseImage({
        count: 9, // 最多可以选择的图片张数，默认9
        sizeType: ["original", "compressed"], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ["album", "camera"], // album 从相册选图，camera 使用相机，默认二者都有
        success: function(res) {
          // success
          console.log(res);
          _this.setData({
            src: res.tempFilePaths
          });
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
.send-box {
  padding: 30rpx;
  position: relative;
  height: 80rpx;
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
  width: 140rpx;
  height: 60rpx;
  line-height: 60rpx;
  font-size: 30rpx;
  border-radius: 8rpx;
  position: absolute;
  right: 30rpx;
  top: 35rpx;
}
.left {
  float: left;
}
.right {
  float: right;
}
.chatbox {
  padding: 20rpx 0;
}
.chatbox .right,
.chatbox .left {
  margin-right: 30rpx;
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
  margin-top: 16rpx;
  display: inline-block;
  width: 55%;
  border: 2px solid #e67841;
  text-align: left;
  padding: 10rpx;
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
}
.mymsg:after {
  content: "";
  position: absolute;
  right: -36rpx;
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

<template>
<view class="page">
  <view class="page__bd ">
    <view class="weui-cells weui-cells_after-title noline">
     <view class="weui-cell my-chatBox  noline" wx:for="{{userlist}}" wx:key="id" bindtap="chat2person" data-url="{{item.id}}">
    <view class="weui-media-box weui-media-box_appmsg my-newsList">
          <view class="weui-media_hd">
            <image class="weui-media-box__thumb" src="{{item.headimg}}"></image>
          </view>
          <view class="weui-media_bd">
            <view class="weui-media-box__title my-news_title">{{item.fullname}}</view>
            <view class="weui-media-box__desc my-news_desc">{{item.content}}</view>
          </view>
          <view class="weui-badge my-read-btn" wx:if="{{item.status==0}}">已读</view>
          <view class="weui-badge my-unread-btn" wx:else="{{item.status==1}}">未读</view>
        </view>
      </view>
    </view>
  </view>
</view>
</template>
<script>
import wepy from "wepy";
import config from "../../config/api";
export default class Chatlist extends wepy.page {
  config = {
    navigationBarTitleText: "最新消息"
  };
  components = {};
  data = {
    userlist: [],
    canclick: true,
    showMainpage: false,
    socket: null,
    userInfo: null
  };
  async onLoad(options) {
    let that = this;
    this.$parent.globalData.chatusers = wx.getStorageSync("card:users");
    //this.$parent.globalData.chatusers = {"uid19900":{"id":19900,"fullname":"孙奇","headimg":"http://wx.qlogo.cn/mmopen/HE6qQtUcENYLLkjK0icyic1oh7fe71HguCxS0WEklQkibKZiasNjAat1GYEPicqt04cpcWnfKJL68bh1XuYTdXibBJnh7bZznkQeQr/0","nickname":null}}

    this.$parent.globalData.chatmsg = wx.getStorageSync("card:chatmsg");
    //this.$parent.globalData.chatmsg =[{"from":19900,"to":"19902","content":"啦啦啦啦","msgTime":"2018-08-20 10:30:18","type":"text"},{"from":19900,"to":"19902","content":"早上好","msgTime":"2018-08-20 10:31:01","type":"text"},{"from":19900,"to":"19902","content":"刚刚刚刚","msgTime":"2018-08-20 10:32:17","type":"text"},{"from":"me","to":"19900","content":"哈哈哈哈","type":"text"},{"type":"","from":19902,"to":"19900","msgTime":"2018-08-20 10:40:01","content":"哈哈哈哈"},{"from":"me","to":"19900","content":"哈哈哈哈","type":"text"},{"type":"","from":19902,"to":"19900","msgTime":"2018-08-20 10:40:05","content":"哈哈哈哈"},{"from":"me","to":"19900","content":"哈哈哈","type":"text"},{"type":"","from":19902,"to":"19900","msgTime":"2018-08-20 10:40:10","content":"哈哈哈"},{"type":"","from":19902,"to":"19900","msgTime":"2018-08-20 10:50:29","content":"你好"}]

    let userInfo = wx.getStorageSync("user:detail");
    this.userInfo = userInfo;
    console.log(this.userInfo);
    this.onchatuserchange();
    this.$parent.globalData.EventBus.removeEventListener(
      "userchage",
      this.onchatuserchange,
      this
    );
    this.$parent.globalData.EventBus.addEventListener(
      "userchage",
      this.onchatuserchange,
      this
    );
    this.key = options.key || options.scene;
  }
  onchatuserchange(evt) {
    /*console.log("user changes");
    this.userlist = this.$parent.globalData.chatusers;
    console.log(this.userlist);
    this.$apply()*/
    console.log("user changes");
    let arr = [];
    this.userlist = this.$parent.globalData.chatusers;
    //console.log(this.$parent.globalData.chatmsg)
    for (let i in this.userlist) {
      let chatmsg = this.$parent.globalData.chatmsg;
      for (let j in chatmsg) {
        if (chatmsg[j].type == "text") {
          if (
            (chatmsg[j].from == this.userlist[i].id &&
              chatmsg[j].to == this.userInfo.id) ||
            (chatmsg[j].to == this.userlist[i].id && chatmsg[j].from == "me")
          ) {
            console.log(chatmsg[j]);
            //console.log(chatmsg[j])
            this.userlist[i]["content"] = chatmsg[j].content;
          }
        }
      }
      arr.push(this.userlist[i]);
    }
    this.$apply();
  }

  methods = {
    chat2person(e) {
      let id = e.currentTarget.dataset.url;
      //console.log("go 2 chat");
      //console.log(id);
      wx.navigateTo({ url: `../card/chat?id=${id}` });
    }
  };
}
</script>
<style>
.my-newsList {
  border-bottom: solid 1px #d9d9d9;
  width: 100%;
  position: relative;
}
.my-newsList image {
  width: 100rpx;
  height: 100rpx;
  vertical-align: top;
  border-radius: 50%;
  margin-right: 0.8em;
}
.my-read-btn {
  padding: 0.15em 0.4em;
  color: #898989;
  font-size: 30rpx;
  position: absolute;
  right: 20rpx;
  background: none;
}
.my-unread-btn {
  margin: 0;
  position: absolute;
  right: 20rpx;
  color: #ff0e3e;
  background: none;
  font-size: 30rpx;
}
.my-chatBox {
  padding: 0;
}
.noline::before {
  border: none;
}
.my-news_title {
  color: #999;
  font-size: 30rpx;
}
.my-news_desc {
  color: #333;
  font-size: 34rpx;
  margin-top: 10rpx;
}
</style>

<template>
<view class="page">
  <view class="page__bd">
    <view class="weui-cells weui-cells_after-title">
      <view class="weui-cell weui-cell_access " wx:for="{{userlist}}" wx:key="id" bindtap="chat2person" data-url="{{item.id}}">
        <view class="weui-media-box weui-media-box_appmsg list-box">
          <view class="weui-media_hd">
            <image class="weui-media-box__thumb" src="{{item.url}}"></image>
          </view>
          <view class="weui-media_bd">
            <view class="weui-media-box__title">{{item.fullname}}</view>
            <view class="weui-media-box__desc">{{item.fullcon}}</view>
          </view>
          <view class="weui-badge read-btn" wx:if="{{item.status==0}}">已读</view>
          <view class="weui-badge unread-btn" wx:else="{{item.status==1}}">未读</view>
        </view>
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
    navigationBarTitleText: "最新消息",
    navigationBarBackgroundColor: "#e67841",
    backgroundColor: "#e67841",
    navigationBarTextStyle: "white"
  };
  components = {};
  data = {
    userlist: [],
    canclick: true,
    showMainpage: false,
    socket: null
  };
  async onLoad(options) {
    let that = this;
    this.$parent.globalData.chatusers = wx.getStorageSync("card:users")
    this.$parent.globalData.chatmsg = wx.getStorageSync("card:chatmsg")
    this.onchatuserchange();
    this.$parent.globalData.EventBus.removeEventListener( "userchage",  this.onchatuserchange, this );
    this.$parent.globalData.EventBus.addEventListener( "userchage", this.onchatuserchange, this );
    this.key = options.key || options.scene;
  }
  onchatuserchange(evt) {
    console.log('user changes')
    this.userlist = this.$parent.globalData.chatusers;
    console.log(this.userlist)
    this.$apply();
  }

  methods = {
    chat2person(e) {
      let id = e.currentTarget.dataset.url;
      console.log("go 2 chat");
      console.log(id);
      wx.navigateTo({ url: `../card/chat?id=${id}` });
    }
  };
}
</script>
<style>
.list-box image {
  width: 100rpx;
  height: 100rpx;
  vertical-align: top;
}

.read-btn {
  padding: 0.15em 0.4em;
  min-width: 60rpx;
  border-radius: 18px;
  background: #898989;
  color: #fff;
  line-height: 1.4;
  text-align: center;
  font-size: 12px;
  vertical-align: middle;
  position: absolute;
  right: 20rpx;
}
.unread-btn {
  margin: 0;
  min-width: 60rpx;
  position: absolute;
  right: 20rpx;
  line-height: 1.4;
}
.list-box .weui-media-box__desc {
  line-height: 1.4;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.list-box .weui-media_bd {
  width: 65%;
}
.weui-cell {
  padding: 0;
}
.weui-cell:before {
  border: none;
}
.list-box {
  border-bottom: solid 1px #d9d9d9;
  width: 100%;
  position: relative;
}
.list-box .weui-media_hd {
  margin-right: 0.8em;
}
</style>

<template>
<view class="page">
 <view class="page-bd">
    <text class="noMusic" data-name="{{noMusic}}" bindtap="addMusic">无背景音乐</text>
      <view class="musicList"  wx:for="{{musicList}}" wx:key>
            <view class="weui-flex">
              <view class="weui-flex-item" bindtap="showList"  data-listid="{{index}}" >
                 <text>{{item.name}}</text>
                 <text class="musicNum">包含{{item.list.length}}首歌曲</text>
              </view>
            </view> 
            <view class="page-category js-categoryInner {{uhide==index?'':'hidden'}}" >
               <view class="weui-cells weui-cells_access" wx:for="{{item.list}}" wx:for-item="iitem" wx:key="" >
                <text class="list-left" data-name="{{iitem.musicName}}" bindtap="addMusic">{{iitem.musicName}}</text>
              </view>
         </view> 
        </view>
  </view> 
</view>
</template>
<script>
import wepy from "wepy";
import config from "../../config/api";
export default class UploadVideo extends wepy.page {
  config = {
    navigationBarTitleText: "添加音乐"
  };

  data = {
    musicList: [
      {
        id: 1,
        name: "圣诞",
        list: [
          { musicName: "圣诞祝福", id: 1 },
          { musicName: "铃儿叮当", id: 2 },
          { musicName: "欢乐颂", id: 3 },
          { musicName: "雨中漫步", id: 4 },
          { musicName: "生日快乐", id: 5 }
        ]
      },
      {
        id: 2,
        name: "欢快",
        list: [
          { musicName: "圣诞祝福", id: 1 },
          { musicName: "铃儿叮当", id: 2 },
          { musicName: "欢乐颂", id: 3 },
          { musicName: "雨中漫步", id: 4 },
          { musicName: "生日快乐", id: 5 }
        ]
      }
    ],
    animationData: {},
    animating: "",
    taName: "",
    shoufenqinName: "",
    animationShoufenqin: "",
    shoufenqinBloo: "",
    uhide: null,
    noMusic: ""
  };
  async onLoad(options) {
    //进入到页面的时候，对告诉服务器，要lock住这个key
    this.key = options.key || options.scene;
  }
  methods = {
    showList(e) {
      let listid = e.currentTarget.dataset.listid;
      if (listid == this.uhide) {
        this.uhide = null;
      } else {
        this.uhide = listid;
      }
    },
    addMusic(e) {
      let that = this;
      let pages = getCurrentPages();
      let Page = pages[pages.length - 1]; //当前页
      let prevPage = pages[pages.length - 2]; //上一个页面
      let name = e.currentTarget.dataset.name;
      prevPage.setData({
        music: name
      }); //设置数据
      wx.navigateBack();
    }
  };
}
</script>
<style>
page {
  background: #f1f2f6;
}
.page-bd .musicList {
  background-color: #fff;
  border-radius: 2px;
  margin: 10px 0;
  overflow: hidden;
  vertical-align: bottom;
}
.page-bd .js-show .weui-flex {
  opacity: 0.4;
}
.page-bd .weui-flex {
  align-items: center;
  transition: all 0.3s ease 0s;
  display: -webkit-flex;
  display: -webkit-box;
  display: flex;
  padding: 25rpx;
}
.weui-flex-item {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
}
.page-bd .weui-flex-item {
  -webkit-flex: 1 1 0;
  flex: 1 1 0;
}
.page-bd .js-show .page-category {
  height: auto;
}
.musicList text {
  display: block;
}
.musicList .musicNum {
  display: block;
  font-size: 26rpx;
  color: #9b9b9b;
  margin-top: 8rpx;
}
.weui-cells::before,
.weui-cells::after {
  border: 0;
}
.weui-cells_access {
  margin: 0rpx 0 25rpx 25rpx;
  border-top: solid 1px #e2e2e4;
  height: 75rpx;
  line-height: 100rpx;
  margin-top: 0;
  font-size: 30rpx;
}
.hidden {
  display: none;
}
.noMusic {
  width: 100%;
  height: 100rpx;
  line-height: 100rpx;
  background: #fff;
  display: block;
  margin-top: 20rpx;
  padding-left: 25rpx;
}
</style>

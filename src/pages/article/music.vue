<template>
<view class="page">
 <view class="page-bd">
      <view class="musicList"  wx:for="{{musicList}}">
            <view class="weui-flex">
              <view class="weui-flex-item" bindtap="showList"  data-listid="{{index}}" >
                 <text>{{item.name}}</text>
                 <text class="musicNum">包含{{item.list.length}}首歌曲</text>
              </view>
            </view> 
            <view class="page-category js-categoryInner">
               <view class="weui-cells weui-cells_access" wx:for="{{item.list}}" wx:key=""  catchtap="alllist">
                <text class="list-left">{{iitem.musicName}}</text>
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
        name: "神挡",
        list: [
          { musicName: "圣诞祝福", id: 1 },
          { musicName: "铃儿叮当" },
          { musicName: "欢乐颂" },
          { musicName: "雨中漫步" },
          { musicName: "生日快乐" }
        ]
      },
      {
        id: 2,
        name: "ttdsf",
        list: [
          { musicName: "圣诞祝福", id: 1 },
          { musicName: "铃儿叮当" },
          { musicName: "欢乐颂" },
          { musicName: "雨中漫步" },
          { musicName: "生日快乐" }
        ]
      }
    ],
    animationData: {},
    animating: "",
    taName: "",
    shoufenqinName: "",
    animationShoufenqin: "",
    shoufenqinBloo: ""
  };
  async onLoad(options) {
    //进入到页面的时候，对告诉服务器，要lock住这个key
    this.key = options.key || options.scene;
  }
  methods = {
    showList(e) {
      let listid = e.currentTarget.dataset.listid;
      console.log(listid);
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
  cursor: pointer;
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

.page-bd .page-category {
  height: 0;
  overflow: hidden;
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
</style>

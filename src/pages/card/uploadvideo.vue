<template>
<view class="page">
   <view class="weui-cell my-upVideoBox">
       <image src="../../images/ico-up-video.png" bindtap="uploadvideo"></image>
  </view>
   <view class="my-upVideoText"><text>上传第一个视频名片</text></view>
   <button class="my-saveBtn">保存</button>
</view>

</template>
<script>
import wepy from "wepy";
import config from "../../config/api";
export default class UploadVideo extends wepy.page {
  config = { navigationBarTitleText: "上传视频" };
  components = {};
  data = {
    key: ""
  };
  async onLoad(options) {
    //进入到页面的时候，对告诉服务器，要lock住这个key
    this.key = options.key || options.scene;
  }
  methods = {
    uploadvideo() {
      wx.chooseVideo({
        count: 9, // 最多可以选择的视频张数，默认9
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
.my-upVideoBox::before {
  border: 0;
}
.my-upVideoBox image {
  width: 180rpx;
  height: 140rpx;
  display: block;
  margin: 189rpx auto 40rpx auto;
}

.my-upVideoText text {
  display: block;
  text-align: center;
  color: #666;
  font-size: 36rpx;
  margin-bottom: 90rpx;
}
.my-saveBtn {
  width: 630rpx;
  height: 96rpx;
  margin: 0 auto;
  color: #fff;
  font-size: 36rpx;
  background: #ff633f;
  border: solid 1px #cc4f32;
}
</style>
 
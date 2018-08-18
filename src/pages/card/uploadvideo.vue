<template>
<view class="page">
   <view class="weui-cell my-upVideoBox">
       <image wx:if="{{showImg}}" src="../../images/ico-up-video.png" bindtap="uploadvideo"></image>
       <video wx:if="{{videoUrl}}" objectFit="cover"   src="{{http+videoUrl}}"  controls="{{false}}" ></video>
  
  </view>
   <view class="my-upVideoText"><text>上传第一个视频名片</text></view>
   <button class="my-saveBtn" bindtap="submitBtn">保存</button>
</view>

</template>
<script>
import wepy from "wepy";
import api from "../../config/api";
export default class UploadVideo extends wepy.page {
  config = { navigationBarTitleText: "上传视频" };
  components = {};
  data = {
    key: "",
    videoUrl: "",
    cardid: null,
    showImg: true,
    http: null,
    medias: []
  };
  async onLoad(options) {
    //进入到页面的时候，对告诉服务器，要lock住这个key
    this.key = options.key || options.scene;
    this.http = `${api.server}`;
    let resultCard = await this.$parent.globalData.get(
      `${api.server}/auth/user/card/myowncards`
    );
    this.cardid = this.$parent.globalData.cardid = resultCard[0].id;
  }
  //获取视频里的数据
  async getCardinfo() {
    this.cardinfo = await this.$parent.globalData.get(
      `${api.server}/auth/user/card/info?card_id=${this.cardid}`
    );
    console.log(this.cardinfo);
    let medias = this.cardinfo.medias;
    try {
      medias = JSON.parse(medias);
    } catch (e) {
      medias = [];
    }
    let obj = {
      type: "video",
      source: `${api.server}` + this.videoUrl,
      cover: "",
      isDefault: true
    };
    if (medias.length > 0) {
      for (let i in medias) {
        medias[i].isDefault = false;
        this.medias.push(medias[i]);
      }
    }
    this.medias.push(obj);
    console.log(this.medias);

    this.$apply();
  }
  //上传视频
  async saveMedia(tempFilePaths) {
    let that = this;
    let resultUpload = await that.$parent.globalData.upload(
      `${api.server}/api/util/fileupload`,
      tempFilePaths
    );
    console.log(resultUpload);
    resultUpload = JSON.parse(resultUpload);
    if (resultUpload[0].url) {
      that.showImg = false;
      wx.hideLoading();
      wx.showToast({
        title: "上传完成",
        icon: "success",
        duration: 1000
      });

      that.videoUrl = resultUpload[0].url;
      this.getCardinfo();
    }
    that.$apply();
  }
  //提交数据
  async submitBtn() {
    let result = await this.$parent.globalData.post(
      `${api.server}/auth/user/card/modify`,
      { medias: JSON.stringify(this.medias), id: this.cardid }
    );
    console.log(result);
    if (result.status === "success") {
      wx.navigateTo({ url: "/pages/portal/index2?id=" + this.cardid });
    }
  }

  methods = {
    //选择视频
    uploadvideo() {
      let that = this;
      wx.chooseVideo({
        sourceType: ["album", "camera"],
        maxDuration: 60,
        camera: "back",
        success: function(res) {
          wx.showLoading({
            title: "上传中。。"
          });
          // success
          console.log(res);
          that.saveMedia(res.tempFilePath);
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
.my-upVideoBox image,
.my-upVideoBox video {
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
.my-upVideoBox::before {
  border: 0;
}
</style>
 
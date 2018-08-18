<template>
<view class="page">
   <view class="weui-cells__title my__title">
    <image class="cover" wx:if="{{cover}}" src="{{http+cover}}" mode="aspectFill"  style="width: 100%; height: 280rpx;"></image>
    <view class="my__set">
      <view bindtap="setTitle" class="titleBox">
        <view>
          <view class="setTitle">{{articleForm.title}}</view>
          <view class="setTitle" style="display:{{articleForm.title?'none':'block'}}">{{titleTip}}</view>
        </view>
      </view>
      <view bindtap="addMusic">
        <view class="setMusic">{{music}}</view>
        <view class="setMusic {{music?'hidden':''}}" >{{musicTip}}</view>
      </view>
      <view class="setCover" bindtap="setCover">添加封面</view>
    </view>
 </view>
 <view class="addContent">
 <view class="addBtn" bindtap="addList" id="0">
   <image src="../../images/icon_add.png"></image>
   <view class="creatBtn {{uhide=='0'?'':'hidden'}}">
        <view class="textBtn" bindtap="go2editorial" data-index="0">
          <i-icon type="activity" size="24" color="#fd7449" />
          <text>文字</text>
        </view>
        <view class="pictureBtn" bindtap="uploadImg">
          <i-icon type="picture" size="24" color="#fd7449" />
          <text>图片</text>
        </view>
        <view class="videoBtn" bindtap="uploadVideo">
           <i-icon type="playon" size="24" color="#fd7449" />
           <text>视频</text>
        </view>
    </view>
 </view>
 <view class="addTextList"  wx:for="{{list}}" wx:key>
    <view class="addTextBox">
        <view class="closeBtn" bindtap="deleList" id="{{index}}"><image src="../../images/icon_close.png"></image></view>
        <video objectFit="cover" wx:if="{{item.status==0}}"  src="{{http+item.media}}" class="addVideo" controls="{{false}}" ></video>
        <view wx:else class="addImg"><image bindtap="editImg" data-index="{{index}}" data-status="{{item.status}}" data-src="{{http+item.media}}"  src="{{item.media==''?src:http+item.media}}" mode="aspectFill"></image>
         <view wx:if="{{item.statu==1}}" bindtap="deleImg" data-index="{{index}}" class="closeBtn_img  {{item.media==''?'hidden':''}}">
         <i-icon type="delete_fill" size="22" color="#00b5f9" />
         </view>
        </view>      
        <view class="addText" bindtap="editContent" data-index="{{index}}">
            <text>{{item.content}}</text>
            <text style="display:{{item.content?'none':'block'}}">{{tips}}</text>
        </view>
    </view>
    <view class="addBtn" bindtap="addList" id="{{index+1}}">
      <image src="../../images/icon_add.png"></image>
      <view class="creatBtn {{uhide==index+1?'':'hidden'}}" >
        <view class="textBtn" bindtap="go2editorial" data-index="{{index+1}}">
         <i-icon type="activity" size="24" color="#fd7449" />
         <text>文字</text>
        </view>
        <view class="pictureBtn" bindtap="uploadImg" id="{{index+1}}">
         <i-icon type="picture" size="24" color="#fd7449" />
         <text>图片</text>
        </view>
        <view class="videoBtn" bindtap="uploadVideo" id="{{index+1}}">
         <i-icon type="playon" size="24" color="#fd7449" />
         <text>视频</text>
        </view>
    </view>
    </view>
 </view></view>
 <view bindtap="submitBtn" class="submitBtn">完成</view>
 <view class="mark" wx:if="{{mark}}" bindtap="colseTips">
     <view class="tipImg">
   <image src="../../images/tipImg.png"></image>   
 </view>
 </view>
 
</view>
</template>
<script>
import wepy from "wepy";
import api from "../../config/api";
export default class UploadVideo extends wepy.page {
  config = {
    navigationBarTitleText: "添加段落",
    usingComponents: {
      "i-icon": "../../icon/index"
    }
  };
  components = {};
  data = {
    src: "../../images/ico-text.jpg",
    createToggle: false,
    uhide: 0,
    list: [],
    itemId: null,
    mark: false,
    tips: "",
    cover: "",
    titleTip: "点击设置标题",
    musicTip: "添加音乐",
    music: "",
    articleForm: {
      title: "",
      author: "",
      content: { cover: "", list: [] },
      abstract: "",
      from: "",
      type: "",
      i: 0,
      success: "",
      fail: ""
    },
    http: null
  };
  async onLoad(options) {
    this.http = `${api.server}` + "/";
    //有id时说明从编辑进来的
    this.article_id = options.id;
    if (this.article_id) {
      this.getArticleDetail();
    }
  }
  async onShow() {
    console.log(this.http);
    let userInfo = wx.getStorageSync("user:detail");
    this.articleForm.author = userInfo.nickname;
    this.list = this.$parent.globalData.list;
    //console.log(this.$parent.globalData.list);
    //console.log(userInfo.nickname);
    this.$apply();
  }
  //编辑模式 读取数据渲染页面
  async getArticleDetail() {
    let result = await this.$parent.globalData.get(
      `${api.server}/api/article/info?article_id=${this.article_id}`
    );
    this.list = this.$parent.globalData.list = JSON.parse(result.content.list);
    this.articleForm.title = result.title;
    this.cover = result.content.cover;
    this.$apply();
  }
  //创建一个新的list
  newobj(content, media, status) {
    let obj = { content: content, media: media, status: status };
    return obj;
  }
  //插入数据图片和视频的区分
  pushSort(content, media, status) {
    return this.newobj(content, media, status);
  }

  //处理上传媒体数据
  async arraySort(media, content, status) {
    let that = this;
    let allList = [];
    let myKey = that.itemId;
    let objs = this.pushSort(content, media, status);
    console.log(objs);
    if (myKey == 0) {
      allList.push(objs);
      if (that.list.length > 0) {
        for (let i in that.list) {
          allList.push(that.list[i]);
        }
      }
    } else {
      //第非1个插入
      for (let i in that.list) {
        allList.push(that.list[i]);
        let m = Number(i) + 1;
        if (myKey == m) {
          allList.push(objs);
        }
      }
    }
    that.tips = "点击添加文字";
    that.list = that.$parent.globalData.list = allList;
    that.$apply();
  }
  //完成提交数据
  async submitBtn() {
    if (!this.articleForm.title) {
      this.mark = true;
      return false;
    }
    if (this.cover) {
      this.articleForm.content.cover = this.cover;
    }
    if (this.list.length > 0) {
      this.articleForm.content.list = this.list;
    }
    this.articleForm.content = JSON.stringify(this.articleForm.content);
    console.log(this.articleForm);
    let resultdelete = await this.$parent.globalData.post(
      `${api.server}/api/article/create`,
      this.articleForm
    );
    if (resultdelete.id) {
      wx.navigateTo({ url: "/pages/article/article?id=" + resultdelete.id });
    }
  }
  //上传段落视频图片
  async saveMedia(tempFilePaths, status) {
    let that = this;
    for (let i in tempFilePaths) {
      let resultUpload = await that.$parent.globalData.upload(
        `${api.server}/api/util/fileupload`,
        tempFilePaths[i]
      );
      console.log(JSON.parse(resultUpload));
      resultUpload = JSON.parse(resultUpload);
      if (resultUpload[0].url) {
        that.arraySort(resultUpload[0].url, "", status);
        if (Number(i) + 1 == tempFilePaths.length) {
          wx.hideLoading();
          wx.showToast({
            title: "上传完成",
            icon: "success",
            duration: 1000
          });
        }
      }
    }
  }
  //编辑保存图片或保存封面
  async editMedia(tempFilePaths, itemId) {
    let that = this;
    let resultUpload = await that.$parent.globalData.upload(
      `${api.server}/api/util/fileupload`,
      tempFilePaths
    );
    resultUpload = JSON.parse(resultUpload);
    if (resultUpload[0].url) {
      wx.hideLoading();
      wx.showToast({
        title: "上传完成",
        icon: "success",
        duration: 1000
      });
      if (itemId == "cover") {
        that.cover = resultUpload[0].url;
      } else {
        let allList = [];
        for (let i in that.list) {
          console.log(i);
          if (itemId == i) {
            that.list[i].media = resultUpload[0].url;
            that.list[i].status = 1;
          }
          allList.push(that.list[i]);
        }
      }
      that.$apply();
    }
  }
  methods = {
    //删除图片
    deleImg(e) {
      let that = this;
      that.list = this.$parent.globalData.list;
      wx.showModal({
        title: "提示",
        content: "确定要删除图片吗？",
        success: function(sm) {
          if (sm.confirm) {
            let itemId = e.currentTarget.dataset.index;
            let allList = [];
            for (let i in that.list) {
              if (that.list[itemId].content) {
                if (that.itemId === i) {
                  that.list[i].media = "";
                  that.list[i].status = 2;
                }
                allList.push(that.list[i]);
              } else {
                if (that.list.length === 1) {
                  allList = [];
                } else {
                  if (that.itemId != i) {
                    allList.push(that.list[i]);
                  }
                }
              }
            }
            that.list = that.$parent.globalData.list = allList;
            that.$apply();
          } else if (sm.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    },
    //删除段落
    deleList(e) {
      let that = this;
      wx.showModal({
        title: "提示",
        content: "确定要删除吗？",
        success: function(sm) {
          if (sm.confirm) {
            let deleId = e.currentTarget.id;
            let allList = [];
            for (let i in that.list) {
              if (deleId != i) {
                allList.push(that.list[i]);
              }
            }
            that.list = that.$parent.globalData.list = allList;
            if (that.list.length === 0) {
              that.uhide = 0;
            }
            that.$apply();
          } else if (sm.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    },
    //添加段落
    addList(e) {
      let that = this;
      let toggleBtnVal = that.uhide;
      that.itemId = e.currentTarget.id;
      if (toggleBtnVal == that.itemId) {
        that.uhide = 99999;
      } else {
        that.uhide = that.itemId;
      }
    },
    //上传图片
    uploadImg(e) {
      let that = this;
      console.log(this.list);
      wx.chooseImage({
        count: 9, // 最多可以选择的图片张数，默认9
        sizeType: ["original", "compressed"], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ["album", "camera"], // album 从相册选图，camera 使用相机，默认二者都有
        success: function(res) {
          wx.showLoading({
            title: "上传中。。"
          });
          that.saveMedia(res.tempFilePaths, 1);
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      });
      that.$apply();
    },
    //上传视频
    uploadVideo() {
      let that = this;
      wx.chooseVideo({
        sourceType: ["album", "camera"],
        maxDuration: 60,
        camera: "back",
        success: function(res) {
          wx.showLoading({
            title: "上传中。。"
          });
          let arr = [];
          arr.push(res.tempFilePath);
          that.saveMedia(arr, 0);
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      });
      that.$apply();
    },
    //编辑图片
    editImg(e) {
      let that = this;
      console.log(e.currentTarget.dataset.status);
      let status = e.currentTarget.dataset.status;
      let src = e.currentTarget.dataset.src;
      let itemId = e.currentTarget.dataset.index;
      if (status === 1) {
        wx.previewImage({
          current: src, // 当前显示图片的http链接
          urls: [src] // 需要预览的图片http链接列表
        });
      } else if (status === 2) {
        wx.chooseImage({
          count: 1, // 最多可以选择的图片张数，默认9
          sizeType: ["original", "compressed"], // original 原图，compressed 压缩图，默认二者都有
          sourceType: ["album", "camera"], // album 从相册选图，camera 使用相机，默认二者都有
          success: function(res) {
            that.editMedia(res.tempFilePaths[0], itemId);
            that.$apply();
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        });
      }
    },
    //上传封面
    setCover() {
      let that = this;
      console.log(this.list);
      wx.chooseImage({
        count: 1, // 最多可以选择的图片张数，默认9
        sizeType: ["original", "compressed"], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ["album", "camera"], // album 从相册选图，camera 使用相机，默认二者都有
        success: function(res) {
          that.editMedia(res.tempFilePaths[0], "cover");
          that.$apply();
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      });
      console.log(this.cover);
    },
    //关闭遮罩层
    colseTips() {
      this.mark = false;
    },
    go2editorial(e) {
      wx.navigateTo({
        url: "/pages/article/editorial?itemId=" + e.currentTarget.dataset.index
      });
    },
    editContent(e) {
      wx.navigateTo({
        url: "/pages/article/editorial?editId=" + e.currentTarget.dataset.index
      });
    },
    addMusic() {
      wx.navigateTo({ url: "/pages/article/music" });
    },
    setTitle() {
      wx.navigateTo({ url: "/pages/article/edittitle?title=" + this.title });
    }
  };
}
</script>
<style>
page {
  background: #f1f2f6;
}
.hidden {
  display: none;
}
.creatBtn {
  width: 246rpx;
  height: 90rpx;
  background: #fff;
  border-radius: 25rpx;
  box-shadow: 6rpx 6rpx 20rpx #ccc;
  position: absolute;
  left: 50%;
  margin-left: -123rpx;
  top: 60rpx;
  z-index: 888;
}
.textBtn,
.pictureBtn,
.videoBtn {
  position: absolute;
  left: 30rpx;
  top: 2rpx;
  width: 33%;
}
.pictureBtn {
  left: 102rpx;
}
.videoBtn {
  left: 174rpx;
}
.my__title {
  height: 280rpx;
  background: #d9d9d9;
  margin-top: 0;
  position: relative;
  font-size: 32rpx;
  color: #303030;
  position: relative;
  width: 100%;
  overflow: hidden;
}
.cover {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
.titleBox {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3;
  height: 280rpx;
}
.setTitle {
  font-size: 36rpx;
  color: #fff;
  text-shadow: 0px 0px 10px #676262;
  font-weight: bold;
  padding-top: 15rpx;
  padding-left: 15rpx;
  width: 720rpx;
}
.setMusic,
.setCover {
  width: 178rpx;
  height: 52rpx;
  background: #fff;
  text-align: center;
  line-height: 52rpx;
  border-radius: 20rpx;
  position: absolute;
  left: 40rpx;
  bottom: 20rpx;
  z-index: 66;
}
.setCover {
  position: absolute;
  left: 535rpx;
}
.my__set {
  position: absolute;
  height: 280rpx;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 2;
}
.addTextBox {
  width: 95%;
  height: 220rpx;
  background: #fff;
  border: solid 1px #e0e1e6;
  border-radius: 20rpx;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
}

.addImg image {
  width: 160rpx;
  height: 160rpx;
  display: block;
  margin: 30rpx 20rpx 30rpx 40rpx;
  float: left;
}
.addText {
  font-size: 32rpx;
  padding: 30rpx 30rpx 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  height: 157rpx;
}
.closeBtn image {
  width: 28rpx;
  height: 28rpx;
  display: block;
  position: absolute;
  top: 10rpx;
  right: 10rpx;
}
.addBtn {
  position: relative;
  width: 60rpx;
  height: 60rpx;
  margin: 5rpx auto;
}
.addBtn image {
  width: 60rpx;
  height: 60rpx;
  display: block;
  margin: 10rpx auto;
}
.creatBtn .textBtn text,
.creatBtn .pictureBtn text,
.creatBtn .videoBtn text {
  display: block;
  font-size: 24rpx;
  float: left;
  width: 50rpx;
  text-align: center;
  margin-top: -3rpx;
}

.submitBtn {
  width: 100%;
  height: 90rpx;
  line-height: 90rpx;
  background: #fd7449;
  text-align: center;
  position: fixed;
  bottom: 0;
  color: #fff;
}
.addTextBox video {
  width: 160rpx;
  height: 160rpx;
  display: block;
  margin: 30rpx 20rpx 30rpx 40rpx;
  float: left;
}
.addContent {
  padding-bottom: 130rpx;
}
.closeBtn_img {
  position: absolute;
  left: 185rpx;
  top: 5rpx;
}
.mark {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(57, 60, 75, 0.75);
  left: 0;
  top: 0;
  z-index: 99998;
}
.tipImg image {
  position: absolute;
  top: 90rpx;
  left: 150rpx;
  z-index: 99999;
  width: 350rpx;
  height: 260rpx;
}
</style>

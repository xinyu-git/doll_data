<template>
<view class="page">
    <view class="page_container">
        <view class="set-weui-cell">
             <view class="doll_name">机器：<text>{{machename}}</text></view>
        </view>
        <view class="weui-uploader__bd upImg_box">
            <view class="weui-uploader__files" id="uploaderFiles" wx:if="{{!isShow}}">
              <block >
                <view class="weui-uploader__file itemImg" >
                  <image class="weui-uploader__img" src="{{src}}" mode="aspectFill" />
                  <view class='deleteBtn' @tap="deleteImg">x</view>
                </view>
              </block>
              <view class="photo-data">
                <view class="weui-cell doll-item">
                    <view class="weui-cell__bd">币数</view>
                    <view class="weui-cell__ft"><input type="number" @input="bindInput" data-name="stockcoins"/></view>
                </view>
                <view class="weui-cell doll-item">
                    <view class="weui-cell__bd">娃娃数</view>
                    <view class="weui-cell__ft"><input type="number" @input="bindInput" data-name="stocknums"/></view>
                </view>
                <view class="btn-operate_box">
                    <button type="warn" bindtap="bindMachine"  class="weui-btn weui-btn_mini weui-btn_primary"> 重拍 </button>
                    <button type="primary" bindtap="bindMachine"  class="weui-btn weui-btn_mini weui-btn_warn" @tap="photoSubmit"> 确定提交 </button>
                </view>
            </view>
            </view>
            <view class="photo-wrap {{isShow}}" wx:if="{{isShow}}">
                <view class="bind-result_text">
                    <text>娃娃数据提交成功，请对码表进行拍照</text>
                </view>
                <view class="btn-photo_box">
                    <view class="weui-uploader__input-box photoIconBox">
                        <view  class='cameraIcon iconfont icon-photo' @tap="chooseImage"></view>
                    </view>
                    <view class="upImg_prompt" >拍照上传数据</view>
                </view>
            </view>
        </view>
    </view>
</view>
</template>
<script>
    import wepy from 'wepy';
    import api from "../../config/api";
    //通过继承自wepy.page的类创建页面逻辑
    export default class repleResult extends wepy.page {
        config = {
            navigationBarTitleText: "拍照",
            navigationBarBackgroundColor:'#f2f2f2',
        };
        //可用于页面模板绑定的数据
        data = {
            src:'',
            isShow:true,
            stocknums:null,
            stockcoins:null,
            macheid:null,
            type:null,
            machename:null,
        };
    
        //事件处理函数(集中保存在methods对象中)
        methods = {
            chooseImage: function(e) {
                let that = this;
                wx.chooseImage({
                  count: 1, //默认选择数为9
                  sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                  sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
                  success: function(res) {
                    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                    that.src=res.tempFilePaths;
                    that.isShow=false;
                    that.$apply();
                  },
                  fail:function(){

                  },
                  complete:function(){

                  }
                })
            },
            deleteImg() { //点击删除image
                let that = this;
                that.isShow=true;
                that.src='';
            },
            async photoSubmit() {
                let that=this;
                if(that.stockcoins!=null && that.stocknums!=null){
                     wx.showModal({
                        confirmColor: "#7ec792",
                        title: "提示",
                        content:  "是否确定提交",
                        success: function(res) {
                            if (res.confirm) {
                                that.updateCode();
                                that.$apply();
                            } else if (res.cancel) {
                                console.log('用户点击取消')
                            }
                        }
                    });
                }else{
                    wx.showModal({
                        confirmColor: "#7ec792",
                        title: "提示",
                        showCancel: false,
                        content: "请填写娃娃和币数"
                    });
                }
            },
            hideModal (flag) {
                let that=this;
                that.dialogControl=false;
                if(flag==1){
                    console.log(flag)
                    //wx.chooseImage({
                       // success: function(res) {
                            //console.log(res)
                           // return false
                            //var tempFilePaths = res.tempFilePaths
                            wx.uploadFile({
                                url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
                                filePath: that.src,
                                name: 'file',
                                formData:{
                                  'user': 'test'
                                },
                                success: function(res){
                                  var data = res.data
                                  //do something
                                }
                            })
                        //}
                    //})
                }else if(flag==0){
                    this.isShow=true;
                    console.log('else'+flag)
                }
            },
            bindInput(e) {
                let that=this;         
                let name=e.target.dataset.name
                this[name]=e.detail.value;
                this.$apply();
            },
        };
        async updateCode(){
            let that=this;
            let codeArr=[{
                stockcoins:that.stockcoins,
                stocknums:that.stocknums,
                macheid:that.macheid
            }]
            console.log(codeArr)
            //return false;
            let result = await this.$parent.globalData.post(
                `${api.server1}/inventorys/updateWatchStopCode`,
                {
                   data:JSON.stringify(codeArr)
                }
            );
            console.log(result)
            //return false;
            if(result.code==0){
                wx.navigateTo({ url: `uploadResult?resultMsg=${result.msg}`});
            }else{
                wx.showModal({
                     confirmColor: "#7ec792",
                     title: "提示",
                     showCancel: false,
                     content: result.msg || "出错了，请重试"
                 });
            }
        }
        //页面的生命周期函数
        async onLoad(options) {
            this.macheid=this.$parent.globalData.macheid;
            this.type=this.$parent.globalData.type;
            this.machename=this.$parent.globalData.machename;
            
        };
    }
</script>
<style lang="less">
.btn-confirm{width:98%;margin:0 auto;}
.bind-result_text{padding:40rpx 10rpx 60rpx;text-align: center;}
.upImg_box{font-size:32rpx;}
.cameraIcon{
  width: 112rpx;
  height: 112rpx;
  background: #fff;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  font-size: 60rpx;
  text-align: center;
  line-height: 112rpx;
  color: #B2B2B2;
}
.photoIconBox{width:112rpx;height: 112rpx;float:none;display: inline-block;margin-bottom: 0;}
.btn-photo_box{text-align: center;}
.upImg_prompt{
  display: inline-block;
  font-size: 34rpx;
  color: #B2B2B2;
}
.photoIconBox,.upImg_prompt{vertical-align: middle;}
.upImg_box{padding:32rpx;}
.upImg_box .weui-uploader__files{width:700rpx;margin:0 auto;}
.itemImg{position: relative;width:100%;}
.upImg_box .weui-uploader__files .weui-uploader__img{width:100%;height: 350rpx;margin:0 auto;}
.deleteBtn{
  width: 32rpx;
  height: 32rpx;
  line-height: 26rpx;
  font-size: 30rpx;
  color: #fff;
  text-align: center;
  background: #E5E5E5;
  border-radius: 50%;
  position: absolute;
  left:-16rpx;
  top: -16rpx;
  z-index: 5;
}
.weui-btn_mini {
    display: inline-block;
    padding: 0 1.32em;
    line-height: 2.3;
    font-size: 13px;
}
.btn-operate_box{text-align:center;}
.btn-operate_box button{margin:0 10rpx;}
.doll-item .weui-cell__ft input{background: #fff;}
</style>

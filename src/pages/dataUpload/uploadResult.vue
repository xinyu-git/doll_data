<template>
<view class="page">
    <view class="page_container">
        <view class="dollName_box set-weui-cell">
             <view class="doll_name">机器：<text>{{machename}}</text></view>
        </view>
        <view class="bind-result_text">
            <text class="enterTips">信息录入{{resultMsg}}</text>
            <view class="weui-panel weui-panel_access set-panel_access">
                <!-- <view class="weui-cell weui-cell_access">
                    <view class="weui-cell__label">时间：</view>
                    <view class="weui-cell__label">2018.08.01 19:30</view>
                </view> -->
                <view class="weui-cell weui-cell_access">
                    <view class="weui-cell__label">操作人：</view>
                    <view class="weui-cell__label">{{operator}}</view>
                </view>
            </view>
            
        </view>
        <view class="btn-confirm">
            <button type="primary" @tap="flickJump" data-url="/pages/dataUpload/dataUpload" data-codetype="1"> 娃娃机抄码表 </button>
        </view>
    </view>
</view>
</template>
<script>
    import wepy from 'wepy';
    import api from "../../config/api";
    //通过继承自wepy.page的类创建页面逻辑
    export default class uploadResult extends wepy.page {
        config = {
            navigationBarTitleText: "录入结果",
            navigationBarBackgroundColor:'#f2f2f2',
        };
        //可用于页面模板绑定的数据
        data = {
            macheid:null,
            type:null,
            machename:null,
            resultMsg:null,
            operator:null
        };
    
        //事件处理函数(集中保存在methods对象中)
        methods = {
            flickJump(e){
                let that=this;
                //跳转链接
                let dataUrl=e.currentTarget.dataset.url;
                //二维码类型：娃娃机--1  库房--2
                let codeType=e.currentTarget.dataset.codetype;
                that.flick(dataUrl,codeType);
            }
            
        };
        resolveUrl(url){
            let obj = {};
            let reg = /[?&][^?&]+=[^?&%]+/g;
            let arr = url.match(reg);
            if(arr!=null){
                arr.forEach((item) => {
                    let tempArr = item.substring(1).split('=');
                    let key = decodeURIComponent(tempArr[0]);
                    let val = decodeURIComponent(tempArr[1]);
                    obj[key] = val;
                })
            }
            return obj;
        };
        flick(entryUrl,codeType) {
            wx.scanCode({
                onlyFromCamera:true,
                success:(res)=>{
                    let url=res.result;
                    let machineInfo=this.resolveUrl(url);
                    this.$parent.globalData.macheid=machineInfo.macheid;
                    this.$parent.globalData.machename=machineInfo.machename;
                    if(machineInfo.macheid && codeType==1){
                        wx.showToast({
                            title: '成功',
                            icon: 'success',
                            duration: 1000,
                            success:function(){
                                wx.navigateTo({ url: entryUrl });
                            }
                        })
                    }else{
                        wx.showModal({
                            confirmColor: "#7ec792",
                            title: "提示",
                            showCancel: false,
                            content: "二维码不符"
                        });
                    }
                },
                fail:(res)=>{
                    wx.showToast({
                        title: '失败',
                        icon: 'success',
                        duration: 2000
                    })
                }
            })
        };
        async onShow(){
            let userInfo=wx.getStorageSync("user:detail");
            this.operator=userInfo.nickname;
        };
        //页面的生命周期函数
        async onLoad(options) {
            this.macheid=this.$parent.globalData.macheid;
            this.type=this.$parent.globalData.type;
            this.machename=this.$parent.globalData.machename;
            this.resultMsg=options.resultMsg;
            //this.operator=this.$parent.globalData.operator;
            console.log(options)
        };
    }
</script>
<style lang="less">
.btn-confirm{width:98%;margin:0 auto;}
.bind-result_text{padding:40rpx 10rpx 60rpx;text-align: center;}
.set-panel_access .weui-cell{justify-content: space-between;}
.enterTips{font-size:40rpx;padding-bottom:10rpx;}
</style>

<template>
<view class="page">
    <view class="page_container">
        <view class="dollName_box set-weui-cell">
             <view class="doll_name">机器：<text>{{machename}}</text></view>
        </view>
        <view class="bind-result_text">
            <text>{{resultTypeMsg}}{{resultMsg}}</text>
        </view>
        <view class="btn-confirm">
            <button type="primary" @tap="flickJump" data-url="/pages/replenishment/index" data-codetype="1"> 娃娃机补货 </button>
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
            navigationBarTitleText: "补货结果",
            navigationBarBackgroundColor:'#f2f2f2',
        };
        //可用于页面模板绑定的数据
        data = {
            macheid:null,
            type:null,
            machename:null,
            resultTypeMsg:null,
            resultMsg:null
        };
    
        //事件处理函数(集中保存在methods对象中)
        methods = {
            flickJump(e){
                let that=this;
                let dataUrl=e.currentTarget.dataset.url;
                that.flick(dataUrl);
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
        }
        //页面的生命周期函数
        async onLoad(options) {
            let that=this;
            let stocktype=options.stocktype;
            that.macheid=that.$parent.globalData.macheid;
            that.type=that.$parent.globalData.type;
            that.machename=that.$parent.globalData.machename;
            that.resultMsg=options.resultMsg;
            if(stocktype==0){
                that.resultTypeMsg='补货'
            }
        };
    }
</script>
<style lang="less">
.btn-confirm{width:98%;margin:0 auto;}
.bind-result_text{padding:60rpx 10rpx;text-align: center;}
</style>

<template>
<view class="page">
    <view class="page_container">
        <view class="set-weui-cell">
             <view class="doll_name">机器：<text>{{machename}}</text></view>
        </view>
        <view class="bind-result_text">
            <text>{{resultTypeMsg}}{{resultMsg}}</text>
        </view>
        <view class="btn-confirm">
            <button type="primary" @tap="flick"> 扫一扫 </button>
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
            flick() {
                wx.scanCode({
                    onlyFromCamera:true,
                    success:(res)=>{
                        console.log(res)
                    }
                })
            }
        };
    
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
.bind-result_text{padding:40rpx 10rpx 60rpx;text-align: center;}
</style>

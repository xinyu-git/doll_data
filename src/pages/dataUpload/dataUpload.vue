<template>
<view class="page">
    <view class="page_container">
        <view class='page-head'>
            <view class="dollName_box">
                <view class="doll_name">机器：<text>{{machename}}</text></view>
            </view>
            <view class="page-cell">
                <view class="page-cell__bd">名称</view>
                <view class="page-cell__ft">数量</view>
            </view>
        </view>
        <view class="page-body body-Margin">
            <scroll-view class='body-v' scroll-y >
                <view class="dollList">
                    <block  wx:for="{{dollListAll}}" wx:for-item="item" wx:key="item.id">
                        <view class="weui-cell doll-item">
                            <view class="weui-cell__bd">{{item.name}}</view>
                            <view class="weui-cell__ft"><input type="number" value="{{item.size}}"/></view>
                        </view>
                    </block>
                </view>
            </scroll-view>
        </view>
        <view class="page-footer">
            <button type="primary" @tap="next"> 下一步 </button>
        </view>
    </view>
</view>
</template>
<script>
    import wepy from 'wepy';
    import api from "../../config/api";
    //通过继承自wepy.page的类创建页面逻辑
    export default class dataUpload extends wepy.page {
        config = {
            navigationBarTitleText: "娃娃机盘点",
            navigationBarBackgroundColor:'#f2f2f2'
        };
        //可用于页面模板绑定的数据
        data = {
            dollListAll:[],
            macheid:null,
            type:null,
            machename:null,
        };
    
        //事件处理函数(集中保存在methods对象中)
        methods = {
            next () {
                wx.navigateTo({ url: `dollPhoto` });
            }
        };
    
        //页面的生命周期函数
        onLoad() {
            this.macheid=this.$parent.globalData.macheid;
            this.type=this.$parent.globalData.type;
            this.machename=this.$parent.globalData.machename;
            this.getDollList();
        };
        async getDollList(){
            let that=this;
            let result = await this.$parent.globalData.get(`${api.server1}/kucuns/getCatLog`)
            if(result.code==0){
                that.dollListAll=JSON.parse(result.data);
            }
        };
    }
</script>
<style lang="less">
    .dollName_box{border-bottom:1px solid #ccc;background:#fff;font-size:30rpx;}
    .body-Margin{margin-top:180rpx;margin-bottom:120rpx;}
    .page-cell{display: flex;height: 90rpx;line-height: 90rpx;align-items: center;-webkit-box-align: center;padding:0 15rpx;font-size:30rpx;background: #fff;}
    .page-cell__bd{flex:1;}
    .page-cell__ft{text-align:center;}
    .doll-item .weui-cell__ft{color:#000;text-align:left;}
    .doll-item .weui-cell__ft input{border:1px solid #000;width:100rpx;padding:10rpx 10rpx;}
    .dollList{font-size:30rpx;}
</style>

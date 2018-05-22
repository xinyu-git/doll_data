<template>
<view class="page">
    <view class="page__bd">
        <view class="weui-cells__title">带说明的列表项</view>
        <view class="weui-cells weui-cells_after-title">
            <view class="weui-cell">
                <view class="weui-cell__bd">标题文字</view>
                <view class="weui-cell__ft">说明文字</view>
            </view>
        </view>
    </view>
</view>
</template>
<script>
    import wepy from 'wepy'
    import config from '../../config/api'
    export default class Chat extends wepy.page {
        config = {"navigationBarTitleText": "咨询"}
        components= {
        }
        data = {
            key: '',
            canclick : true,
            showMainpage : false
        }
        async onLoad(options) {
            //进入到页面的时候，对告诉服务器，要lock住这个key
            this.key = options.key || options.scene;
        }
        methods = {
            
        }
    }
</script>
<style>
   
</style>
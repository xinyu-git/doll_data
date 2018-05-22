<template>
<view class="page">
<view class="page__hd">
        <view class="page__title">Button</view>
        <view class="page__desc">按钮，WeUI采用小程序原生的按钮为主体，加入一些间距的样式。</view>
    </view>
    <view class="page__bd page__bd_spacing">
        <navigator url="/pages/portal/index?id=19901" hover-class="navigator-hover">
            <button class="weui-btn" type="primary">名片1</button>
        </navigator>
        <navigator url="/pages/portal/index?id=19902" hover-class="navigator-hover">
            <button class="weui-btn" type="default" plain="true">名片2</button>
        </navigator>
 </view>
</view>
</template>
<script>
    import wepy from 'wepy'
    import config from '../../config/api'
    export default class loginPc extends wepy.page {
        config = {"navigationBarTitleText": "收藏名片列表"}
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
    @import '../../zanui/btn.wxss'
</style>
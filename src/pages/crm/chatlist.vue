<template>
<view class="page">
    <view style="margin:60px 0;text-align:center;font-size:16px;color:#666;">
        <image src="../../images/pclogin.png" style="display:block;margin:auto;width:240px;height:218px;"></image>
        <view>登陆确认</view>
    </view>
    <view style="margin:60px 0">
        <view class="zan-btns">
            <button class="zan-btn zan-btn--primary" bindtap="agree" 
            open-type="getUserInfo"> 登陆 </button>
        </view>    
    </view>
</view>

</template>
<script>
    import wepy from 'wepy'
    import config from '../../config/api'
    export default class loginPc extends wepy.page {
        config = {"navigationBarTitleText": "咨询列表"}
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
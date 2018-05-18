<template>
<view class="page">
    
    <view class="page__bd page__bd_spacing">
        <view class="content" style="background-color:#ccc">
        
        </view>


        <view class="weui-footer weui-footer_fixed-bottom" style="bottom:0;">
            
            <view class="weui-cell weui-cell_input">
                <view class="weui-cell__bd">
                    <input class="weui-input" placeholder="请输入文本" style="text-align:left;"/>
                </view>
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
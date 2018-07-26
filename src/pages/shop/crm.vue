<template>
    <view class="page">
        <block wx:if="{{targetUrl!=null}}">
            <web-view src="{{targetUrl}}"></web-view>
        </block>
        <block wx:else>
            <view style="margin:30rpx auto;text-align:center;color:#666;">
                没有可展示的内容哦!
            </view>
        </block>
    </view>
</template>
<script>
    import wepy from 'wepy';
    export default class Crm extends wepy.page {
        data = {
            targetUrl:null,
            siteSetting:{
                "site":"https://card.kongzhong.net",                
            }
        }
        onLoad(options) {
            this.targetUrl = null;
            let url = null;
            console.log(">>options info",options)
            let scene = decodeURIComponent(options.scene);
            if(options.url){
                url = options.url;
            }else if(scene){
                
            }
            if(url){
                this.targetUrl = decodeURIComponent(url);
            }
            console.log("load target",this.targetUrl)
            this.$apply();
        }
    }
</script>
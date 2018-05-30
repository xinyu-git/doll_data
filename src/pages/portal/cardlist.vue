<template>
<view class="page">
<view class="page__hd">
        <view class="page__title">名片列表</view>
        <view class="page__desc">此处是我的名片夹，显示的是各个的名片的入口</view>
    </view>
    <view class="page__bd page__bd_spacing">
        <navigator url="/pages/portal/index2?id=19901" hover-class="navigator-hover">
            <button class="weui-btn" type="primary">名片:尹平辉</button>
        </navigator>
        <navigator url="/pages/portal/index2?id=19906" hover-class="navigator-hover">
            <button class="weui-btn" type="default" plain="true" style="margin-top:15px;">名片:任建斌</button>
        </navigator>
        <navigator url="/pages/portal/index2?id=19905" hover-class="navigator-hover" >
            <button class="weui-btn" type="default" plain="true" style="margin-top:15px;">名片:张益君</button>
        </navigator>
       
        <view class="button-sp-area" style='position:fixed; bottom:0;right:.5rem;' wx:if="{{true}}">
            <button class="weui-btn mini-btn" type="warn" size="mini" bindtap='go2chatlist'>我的客户</button>
        </view>
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
            showMainpage : false
        }
        async onLoad(options) {            
            this.key = options.key || options.scene;
        }
        methods = {
            go2chatlist(evt){
                wx.navigateTo({url:"/pages/card/chatlist"})
            }
        }
    }
</script>

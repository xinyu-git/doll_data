<template>
<view class="page">
    
</view>

</template>
<script>
    import wepy from 'wepy'
    import config from '../../config/api'
    export default class Register extends wepy.page {
        config = {"navigationBarTitleText": "我的名片"}
        components= {
        }
        data = {
            key: '',
           
        }
        async onLoad(options) {
            //进入到页面的时候，对告诉服务器，要lock住这个key
            this.key = options.key || options.scene;
        }
        methods = {
            
        }
    }
</script>
 
<template>
<view class="page">
    
</view>

</template>
<script>
    import wepy from 'wepy'
    import config from '../../config/api'
    export default class loginPc extends wepy.page {
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
    @import '../../zanui/btn.wxss'
</style>
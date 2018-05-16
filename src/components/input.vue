<style type="scss">
    .input {
        color: #333;
        position: fixed;
        bottom: 0;
        width: 100%;
        border-top: 1px solid #e1e1e3;
        background-color: #f5f5f7;
        .input_layout {
            position: relative;
            margin: 10rpx 12rpx;
            .input_text {
                padding:8rpx 12rpx;
                font-size: 15px;
                color: #333;
                background-color: #FFFFFF;
                border-radius:2px;
            }
        }
    }
</style>
<template>
    <view class="input">
        <view class="input_layout">
            <input placeholder="{{placeholder}}" @input="input" value="{{readyToSend}}" type="text" class="input_text" confirm-type="send" cursor-spacing="10" bindconfirm="send"></input>
        </view>
    </view>
</template>
<script>
    /* input 组件，后期考虑支持表情、录音、图片功能 */
    import wepy from 'wepy';

    export default class Input extends wepy.component {
    
        props = {
            //默认 placeholder，支持传递参数
            placeholder: {
                type: String,
                default: '说点什么吧'
            }
        }

        data = {
            readyToSend: ''
        };

        methods = {
            async send (evt) {
                if (this.readyToSend) {
                    await this.$emit('parent-send',this.readyToSend)
                    this.readyToSend = '';
                    this.$apply();
                }
            },
            input (evt) {
                this.readyToSend = evt.detail.value;
            }
        };

        onLoad () {
            this.readyToSend = '';
        }
    }
</script>

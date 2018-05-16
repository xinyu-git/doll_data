<template>
    <view>
        <view style="color:#7ec792;font-size:15px;" class="zan-panel-title">{{title}}</view>
        <view class="zan-panel">
            <repeat for="{{comments}}">
                <view class="zan-cell" style="align-items:normal;">
                    <view class="comment-headimg">
                        <image class="weui-media-box__thumb " src="{{item.user.headImg}}" />
                    </view>
                    <view class="zan-cell__bd">
                        <view class="zan-cell__text">
                            {{item.nickName || item.user.fullname || item.user.nickname}}
                        </view>
                        <view class="zan-cell__desc">{{item.content}}</view>
                    </view>
                </view>
            </repeat>
            <block wx:if="{{comments.length==0}}">
                <view class="zan-cell zan-c-gray-dark" style="text-align:center;min-height:160px;">
                    <view class="zan-cell__bd">暂无评论</view>
                </view>
            </block>
        </view>
    </view>
</template>

<script>
import wepy from 'wepy'

export default class Comments extends wepy.component {
  props = {
    title:String,
    comments: {
        type: Object
    }
  }

  data = {}

  methods = {
  }

  onLoad(){
      this.comments.splice(0);
  }
}
</script>
<style>
    @import '../zanui/panel.wxss';
    @import '../zanui/cell.wxss';
    @import '../zanui/color.wxss';

    .comment-headimg {
        width:74rpx;
        height:74rpx;
        display:block;
        margin-right:24rpx;
    }

    .weui-media-box__thumb{
        width:100%;
        height:100%;
        border-radius:100%;
    }

</style>
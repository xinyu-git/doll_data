<template>
<view class="page">
    <view class="page_container">
        <view class='page-head'>
            <view class="dollName_box">
                <view class="doll_name">机器：<text>{{machename}}</text></view>
            </view>
            <view class="doll_handle">
                <view class="doll_add"><button @tap="newAdd">新增</button></view>
            </view>
            <view class="page-cell">
                <view class="page-cell__bd">名称</view>
                <view class="page-cell__ft">数量</view>
            </view>
        </view>
        <view class="page-body body-Margin">
            <scroll-view class='body-v' scroll-y >
                <view class="dollList">
                    <block wx:for="{{dollList}}" wx:for-item="item" wx:key="item.id">
                        <view class="touch-item {{item.isTouchMove ? 'touch-move-active' : ''}}" data-index="{{index}}" @touchstart="touchstart" @touchmove="touchmove">
                            <view class="weui-cell doll-item content">
                                <view class="weui-cell__bd">{{item.name}}</view>
                                <view class="weui-cell__ft"><input type="number" value="{{item.stocknums}}" data-index="{{index}}" @input="bindInput"  data-name="stockNums" /></view>
                            </view> 
                            <view class="del" @tap.stop="del" data-index="{{index}}" data-id="{{item.id}}">删除</view>
                        </view>
                    </block>                  
                </view>
            </scroll-view>            
        </view>
        <view class="page-footer">
            <button type="primary" @tap="replenish"> 确定 </button>
        </view>
    </view>
</view>
</template>
<script>
    import wepy from 'wepy';
    import api from "../../config/api";
    //通过继承自wepy.page的类创建页面逻辑
    export default class dollReplenishment extends wepy.page {
        config = {
            navigationBarTitleText: "娃娃机补货",
            navigationBarBackgroundColor:'#f2f2f2'
        };
        //可用于页面模板绑定的数据
        data = {
            editor:false,
            dollList:[],
            macheid:null,
            type:null,
            machename:null,
            idArr:[],
            stocktype:0,
            replenishArr:[],
            startX: 0, //开始坐标
            startY: 0
        };
    
        //事件处理函数(集中保存在methods对象中)
        methods = {
            async replenish(){
                let that=this; 
                let repArr=that.dollList;
                console.log(that.dollList);
                for(let i=0;i<repArr.length;i++){
                    if(repArr[i].stocknums!=0){
                        that.replenishArr.push({
                            stockid:repArr[i].id,
                            stockname:repArr[i].name,
                            macheid:that.macheid,
                            stocktype:that.stocktype,
                            stocknums:repArr[i].stocknums,
                            marks:''
                        })
                    }
                }
                console.log(that.replenishArr)
                if(that.replenishArr.length>0){
                    //return false;
                    let result = await this.$parent.globalData.post(
                        `${api.server1}/inventorys/updateBatchInventory`,
                        {
                            data:JSON.stringify(that.replenishArr)
                        }
                    );
                    console.log(result)
                    if(result.code==0){
                        wx.navigateTo({ url: `result?stocktype=0&resultMsg=${result.msg}`});
                    }else{
                        wx.showModal({
                             confirmColor: "#7ec792",
                             title: "提示",
                             showCancel: false,
                             content: result.msg || "出错了，请重试"
                         });
                    }
                }else{
                    wx.showModal({
                        confirmColor: "#7ec792",
                        title: "提示",
                        showCancel: false,
                        content: "请选择要补货的娃娃"
                    });
                }
                this.$apply();
            },
            bindInput(e) {
                let that=this;         
                let dataList=that.dollList;
                let itemIndex=e.target.dataset.index || e.currentTarget.dataset.index
                let dollItem=dataList[itemIndex]
                let stocknums=e.detail.value;
                dataList[itemIndex].stocknums=stocknums;
                that.dollList=dataList;
                this.$apply();
            },
            //手指触摸动作开始 记录起点X坐标
            touchstart(e) {
                let that=this;
                //开始触摸时 重置所有删除
                this.dollList.forEach(function (v, i) {
                  if (v.isTouchMove)//只操作为true的
                    v.isTouchMove = false;
                })
                that.startX=e.changedTouches[0].clientX;
                that.startY=e.changedTouches[0].clientY;
                this.$apply();
            },
            //滑动事件处理
            touchmove: function (e) {
                let that = this;
                let index = e.currentTarget.dataset.index;//当前索引
                let startX = that.data.startX;//开始X坐标
                let startY = that.data.startY;//开始Y坐标
                let touchMoveX = e.changedTouches[0].clientX;//滑动变化坐标
                let touchMoveY = e.changedTouches[0].clientY;//滑动变化坐标
                //获取滑动角度
                let angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
                that.dollList.forEach(function (v, i) {
                    v.isTouchMove = false
                    //滑动超过30度角 return
                    if (Math.abs(angle) > 30) return;
                    if (i == index) {
                        //右滑
                      if (touchMoveX > startX){
                          v.isTouchMove = false
                      }else{//左滑
                          v.isTouchMove = true
                      }   
                    }
                })
                //更新数据
                this.$apply();
            },
            //删除事件
            async del(e) {
                let that=this;
                let delIndex=e.currentTarget.dataset.index;
                let delId=e.currentTarget.dataset.id;
                let baby_stock_id=that.dollList[delIndex].baby_stock_id;
                let result = await this.$parent.globalData.post(
                    `${api.server1}/inventorys/delInventory`,
                    {
                        macheid:that.macheid,
                        stockid:delId
                    }
                );
                //删除idArr中的baby_stock_id
                for(let i=0;i<that.idArr.length;i++){
                    if(that.idArr[i]==baby_stock_id){
                        that.idArr.splice(i,1);
                    }
                }
                that.dollList.splice(delIndex, 1);              
                this.$apply();
            },
            //新增
            newAdd(e){
                wx.navigateTo({ url: `dollList?idArr=${this.idArr}` });
            }
        };
        async onShow(){
            this.getDollList();
            this.$apply();
        };
        //页面的生命周期函数
        async onLoad() {
            this.macheid=this.$parent.globalData.macheid;
            this.type=this.$parent.globalData.type;
            this.machename=this.$parent.globalData.machename;
        };
        async getDollList(){
            let that=this;
            let idArrTemp=[];//临时存储页面中的娃娃baby_stock_id
            let result = await this.$parent.globalData.get(`${api.server1}/inventorys/queryInventory?macheid=${that.macheid}&type=${that.type}`)
            if(result.code==0){
                that.dollList=JSON.parse(result.data);
            }
            //在idArrTemp里存放baby_stock_id
            for(let i=0;i<that.dollList.length;i++){
                idArrTemp.push(that.dollList[i].baby_stock_id)
            }
            this.dataFilter(that.dollList);
            that.idArr=idArrTemp;//将idArrTemp赋值给idArr  用于触发新增去列表页，过滤已有的娃娃
            this.$apply();
            console.log(that.dollList)
        };
        //数据过滤
        dataFilter(data){
            for(let i=0;i<data.length;i++){
                data[i].stocknums=0;
            }           
            return data;
        };
        /**
            * 计算滑动角度
            * @param {Object} start 起点坐标
             * @param {Object} end 终点坐标
        */
        angle(start, end) {
            let _X = end.X - start.X;
            let _Y = end.Y - start.Y;
                //返回角度 /Math.atan()返回数字的反正切值
            return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
        };
    }
</script>
<style lang="less">
    .body-Margin{margin-top:310rpx;margin-bottom:120rpx;}
    .doll-item{padding:10rpx 15rpx;}
    .doll-item .weui-cell__ft{color:#000;text-align:left;}
    .doll-item .weui-cell__ft input{border:1px solid #ccc;width:100rpx;padding:5rpx 5rpx;}
    .doll_handle{display: flex;justify-content:flex-end;padding:10rpx 15rpx;font-size:30rpx;align-items: center;border-bottom: 1px solid #ccc;background: #fff;}
    .doll_handle button{font-size:30rpx;background: #27b3f0;color:#fff;}
    .weui-btn_warn{background:#E64340;}
    .weui-btn_mini {
        display: inline-block;
        padding: 0 1.32em;
        line-height: 2.3;
        font-size: 13px;
    }
    .doll-item .weui-cell__hd button{color:#fff;margin-left:1em;margin-top:0.5em;}
    .touch-item {
  display: flex;
  justify-content: space-between;
  border-bottom:1px solid #ccc;
  width: 100%;
  overflow: hidden
}
.content {
  width: 100%;
  padding: 10px;
  line-height: 22px;
  margin-right:0;
  -webkit-transition: all 0.4s;
  transition: all 0.4s;
  -webkit-transform: translateX(90px);
  transform: translateX(90px);
  margin-left: -90px
}
.del {
  background-color: orangered;
  width: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  -webkit-transform: translateX(90px);
  transform: translateX(90px);
  -webkit-transition: all 0.4s;
  transition: all 0.4s;
}
.touch-move-active .content,
.touch-move-active .del {
  -webkit-transform: translateX(0);
  transform: translateX(0);
}
</style>

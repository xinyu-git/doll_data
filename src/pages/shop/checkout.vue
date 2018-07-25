<template>
<view class="page">
  <view class="address-box">
        <view class="address-item" wx:if="{{addressList}}" bindtap="chooseAddress">
            <view class="l">
                <text class="name">{{checkedAddress.userName}}</text>
            </view>
            <view class="m">
                <text class="mobile">{{checkedAddress.telNumber}}</text>
                <text class="address">{{checkedAddress.provinceName + checkedAddress.cityName + checkedAddress.countyName + checkedAddress.detailInfo}}</text>
            </view>
            <view class="r">
                <image src="/static/images/address_right.png"></image>
            </view>
        </view>
        <view class="address-item address-empty" bindtap="chooseAddress" wx:if="{{Address}}">
            <view class="m">
               选择收货地址
            </view>
            <view class="r">
                <image src="/static/images/address_right.png"></image>
            </view>
        </view>
    </view>
    <view class="coupon-box">
        <view class="coupon-item">
            <view class="l">
                <text class="name">请选择优惠券</text>
                <text class="txt">0张</text>
            </view>
            <view class="r">
                <image src="/static/images/address_right.png"></image>
            </view>
        </view>
    </view>

    <view class="order-box">
        <view class="order-item">
            <view class="l">
                <text class="name">商品合计</text>
            </view>
            <view class="r">
                <text class="txt">￥{{goodsTotalPrice}}</text>
            </view>
        </view>
        <view class="order-item">
            <view class="l">
                <text class="name">运费</text>
            </view>
            <view class="r">
                <text class="txt">￥{{freightPrice}}</text>
            </view>
        </view>
        <view class="order-item no-border">
            <view class="l">
                <text class="name">优惠券</text>
            </view>
            <view class="r">
                <text class="txt">-￥{{couponPrice}}</text>
            </view>
        </view>
    </view>

    <view class="goods-items">
        <view class="item" wx:for="{{checkedGoodsList}}" wx:key="{{item.id}}">
            <view class="img">
                <image src="{{item.list_pic_url}}"></image>
            </view>
            <view class="info">
                <view class="t">
                    <text class="name">{{item.goods_name}}</text>
                    <text class="number">x{{item.number}}</text>
                </view>
                <view class="m">{{item.goods_specifition_name_value}}</view>
                <view class="b">￥{{item.retail_price}}</view>
            </view>
        </view>
    </view>

    <view class="order-total">
        <view class="l">实付：￥{{actualPrice}}</view>
        <view class="r" bindtap="submitOrder">去付款</view>
    </view>
</view>
</template>
<script>
import wepy from "wepy";
import api from "../../config/api";
//import pay from '../../services/pay.js';
export default class Index extends wepy.page {
  config = {
    enablePullDownRefresh: false,
    navigationBarTitleText: "确认订单"
  };
  data = {
    checkedGoodsList: [],
    checkedAddress: {
      userName: "",
      telNumber: "",
      provinceName: "",
      cityName: "",
      countyName: "",
      detailInfo: "",
      postalCode: "",
      nationalCode: "",
      errMsg: ""
    },
    checkedCoupon: [],
    couponList: [],
    goodsTotalPrice: 0.0, //商品总价
    freightPrice: 0.0, //快递费
    couponPrice: 0.0, //优惠券的价格
    orderTotalPrice: 0.0, //订单总价
    actualPrice: 0.0, //实际需要支付的总价
    addressId: 0,
    couponId: 0,
    addressList: false,
    Address: true,
    number: 0,
    goodsid: null,
    resultgoods: {},
    user_id: null,
    goodsId: null,
    type: 1,
    productId: null,
    retail_price: null,
    pic_url: null
  };
  async onLoad(options) {
    this.number = options.number;
    this.goodsId = options.goodsid;
    this.productId = options.productId;
    this.pic_url = options.pic_url;
    this.retail_price = options.retail_price;
    if (this.number && this.goodsId) {
      this.getGoodsInfo();
      this.type = 2;
    } else {
      this.getCheckoutInfo();
    }
    try {
      let couponId = wx.getStorageSync("couponId");
      if (couponId) {
        this.couponId = couponId;
      }
    } catch (e) {
      // Do something when catch error
    }
  }
  async getCheckoutInfo() {
    //console.log(this.addressId);
    //console.log(this.couponId);
    let resultorder = await this.$parent.globalData.get(
      `${api.server}/api/shop/cart/checkout?addressId=${
        this.addressId
      }&couponId=${this.couponId}&shopId=${this.$parent.globalData.shopId}`
    );
    //console.log(resultorder);
    if (resultorder.errno === 0) {
      this.checkedGoodsList = resultorder.data.checkedGoodsList;
      this.actualPrice = resultorder.data.actualPrice;
      this.checkedCoupon = resultorder.data.checkedCoupon;
      this.couponList = resultorder.data.couponList;
      this.couponPrice = resultorder.data.couponPrice;
      this.freightPrice = resultorder.data.freightPrice;
      this.goodsTotalPrice = resultorder.data.goodsTotalPrice;
      this.orderTotalPrice = resultorder.data.orderTotalPrice;
      for (let i in resultorder.data.checkedGoodsList) {
        this.productId = resultorder.data.checkedGoodsList[i].product_id;
      }
    }
    this.$apply();
  }
  async getGoodsInfo() {
    let listArry = {};
    //获取商品的详细
    let resultgoods = await this.$parent.globalData.get(
      `${api.server}/api/shop/goods/detail?id=${this.goodsId}`
    );
    this.goodsTotalPrice = resultgoods.data.info.retail_price * this.number;
    this.freightPrice = resultgoods.data.info.extra_price;
    listArry.list_pic_url = this.pic_url;
    listArry.id = resultgoods.data.info.id;
    listArry.goods_name = resultgoods.data.info.name;
    listArry.retail_price = this.retail_price;
    this.actualPrice = this.retail_price * this.number;
    listArry.number = this.number;
    this.checkedGoodsList[0] = listArry;
    this.$apply();
  }
  async saveAddress() {
    let userInfo = wx.getStorageSync("user:detail");
    this.user_id = userInfo.id;
    //存地址
    let resultAddress = await this.$parent.globalData.post(
      `${api.server}/api/shop/address/checkAddress`,
      {
        user_id: this.user_id,
        userName: this.checkedAddress.userName,
        telNumber: this.checkedAddress.telNumber,
        provinceName: this.checkedAddress.provinceName,
        postalCode: this.checkedAddress.postalCode,
        nationalCode: this.checkedAddress.nationalCode,
        errMsg: this.checkedAddress.errMsg,
        detailInfo: this.checkedAddress.detailInfo,
        countyName: this.checkedAddress.countyName,
        cityName: this.checkedAddress.cityName
      }
    );
    if (resultAddress.errno === 0) {
      this.addressId = resultAddress.data.id;
    }
    this.$apply();
  }
  methods = {
    //用户选择收货地址
    chooseAddress() {
      var that = this;
      if (wx.chooseAddress) {
        wx.chooseAddress({
          success: function(res) {
            //console.log(res);
            that.checkedAddress.userName = res.userName;
            that.checkedAddress.telNumber = res.telNumber;
            that.checkedAddress.provinceName = res.provinceName;
            that.checkedAddress.cityName = res.cityName;
            that.checkedAddress.countyName = res.countyName;
            that.checkedAddress.detailInfo = res.detailInfo;
            that.checkedAddress.postalCode = res.postalCode;
            that.checkedAddress.nationalCode = res.nationalCode;
            that.checkedAddress.errMsg = res.errMsg;
            that.addressList = true;
            that.Address = false;
            that.saveAddress();
            that.$apply();
          }
        });
      } else {
        console.log("当前微信版本不支持chooseAddress");
      }
    },
    //去付款
    async submitOrder() {
      if (!this.checkedAddress.userName) {
        wx.showToast({
          title: "请选择收货地址",
          icon: "none",
          duration: 2000
        });
        return false;
      }

      let params = {};
      console.log(params);
      if (this.type === 1) {
        params = {
          addressId: this.addressId,
          couponId: this.couponId,
          type: this.type,
          shopId: this.$parent.globalData.shopId
        };
      } else {
        params = {
          addressId: this.addressId,
          couponId: this.couponId,
          goodsId: this.goodsId,
          number: this.number,
          type: this.type,
          shopId: this.$parent.globalData.shopId,
          productId: this.productId
        };
      }

      let resultorder = await this.$parent.globalData.post(
        `${api.server}/api/shop/order/submit`,
        params
      );
      //console.log(resultorder)
      if (resultorder.errno === 0) {
        const orderId = resultorder.data.orderInfo.id;
        let resultpay = this.$parent.globalData.get(
          `${api.server}/api/shop/pay/prepay?orderId=${orderId}`
        );
        //console.log(resultpay);
        if (resultpay.errno === 0) {
          const payParam = resultpay.data;
          wx.requestPayment({
            timeStamp: payParam.timeStamp,
            nonceStr: payParam.nonceStr,
            package: payParam.package,
            signType: payParam.signType,
            paySign: payParam.paySign,
            success: function(resultpay) {
              wx.redirectTo({
                url: "/pages/shop/payresult?status=0&orderId=" + orderId
              });
            },
            fail: function(resultpay) {
              wx.redirectTo({
                url: "/pages/shop/payresult?status=0&orderId=" + orderId
              });
            },
            complete: function(resultpay) {
              wx.redirectTo({
                url: "/pages/shop/payresult?status=0&orderId=" + orderId
              });
            }
          });
        } else {
          wx.redirectTo({
            url: "/pages/shop/payresult?status=0&orderId=" + orderId
          });
        }
      } else {
        wx.showToast({
          title: "下单失败",
          icon: "none",
          duration: 2000
        });
      }
    }
  };
}
</script>
<style>
.address-box {
  width: 100%;
  height: 166.55rpx;
  background: #fffced
    url("http://yanxuan.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/address-bg-bd30f2bfeb.png")
    0 0 repeat-x;
  background-size: 62.5rpx 10.5rpx;
  margin-bottom: 20rpx;
  padding-top: 10.5rpx;
}

.address-item {
  display: flex;
  height: 155.55rpx;
  background: #fff;
  padding: 41.6rpx 0 41.6rpx 31.25rpx;
}

.address-item.address-empty {
  line-height: 75rpx;
  text-align: center;
}

.address-box .l {
  width: 125rpx;
  height: 100%;
}

.address-box .l .name {
  margin-left: 6.25rpx;
  margin-top: -7.25rpx;
  display: block;
  width: 125rpx;
  height: 43rpx;
  line-height: 43rpx;
  font-size: 30rpx;
  color: #333;
  margin-bottom: 5rpx;
}

.address-box .l .default {
  margin-left: 6.25rpx;
  display: block;
  width: 62rpx;
  height: 33rpx;
  border-radius: 5rpx;
  border: 1px solid #b4282d;
  font-size: 20.5rpx;
  text-align: center;
  line-height: 29rpx;
  color: #b4282d;
}

.address-box .m {
  flex: 1;
  height: 72.25rpx;
  color: #999;
}

.address-box .mobile {
  display: block;
  height: 29rpx;
  line-height: 29rpx;
  margin-bottom: 6.25rpx;
  font-size: 30rpx;
  color: #333;
}

.address-box .address {
  display: block;
  height: 37.5rpx;
  line-height: 37.5rpx;
  font-size: 25rpx;
  color: #666;
}

.address-box .r {
  width: 77rpx;
  height: 77rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.address-box .r image {
  width: 52.078rpx;
  height: 52.078rpx;
}

.coupon-box {
  width: 100%;
  height: auto;
  overflow: hidden;
  background: #fff;
}

.coupon-box .coupon-item {
  height: 108.3rpx;
  overflow: hidden;
  background: #fff;
  display: flex;
  padding-left: 31.25rpx;
}

.coupon-box .l {
  flex: 1;
  height: 43rpx;
  line-height: 43rpx;
  padding-top: 35rpx;
}

.coupon-box .l .name {
  float: left;
  font-size: 30rpx;
  color: #666;
}

.coupon-box .l .txt {
  float: right;
  font-size: 30rpx;
  color: #666;
}

.coupon-box .r {
  margin-top: 15.5rpx;
  width: 77rpx;
  height: 77rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.coupon-box .r image {
  width: 52.078rpx;
  height: 52.078rpx;
}

.order-box {
  margin-top: 20rpx;
  width: 100%;
  height: auto;
  overflow: hidden;
  background: #fff;
}

.order-box .order-item {
  height: 104.3rpx;
  overflow: hidden;
  background: #fff;
  display: flex;
  margin-left: 31.25rpx;
  padding-right: 31.25rpx;
  padding-top: 26rpx;
  border-bottom: 1px solid #d9d9d9;
}

.order-box .order-item .l {
  float: left;
  height: 52rpx;
  width: 50%;
  line-height: 52rpx;
  overflow: hidden;
}

.order-box .order-item .r {
  float: right;
  text-align: right;
  width: 50%;
  height: 52rpx;
  line-height: 52rpx;
  overflow: hidden;
}

.order-box .order-item.no-border {
  border-bottom: none;
}

.goods-items {
  margin-top: 20rpx;
  width: 100%;
  height: auto;
  overflow: hidden;
  background: #fff;
  padding-left: 31.25rpx;
  margin-bottom: 120rpx;
}

.goods-items .item {
  height: 192rpx;
  padding-right: 31.25rpx;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
}

.goods-items .item.no-border {
  border-bottom: none;
}

.goods-items .item:last-child {
  border-bottom: none;
}

.goods-items .img {
  height: 145.83rpx;
  width: 145.83rpx;
  background-color: #f4f4f4;
  margin-right: 20rpx;
}

.goods-items .img image {
  height: 145.83rpx;
  width: 145.83rpx;
}

.goods-items .info {
  flex: 1;
  height: 145.83rpx;
  padding-top: 5rpx;
}

.goods-items .t {
  height: 34rpx;
  line-height: 34rpx;
  margin-bottom: 10rpx;
  overflow: hidden;
  font-size: 30rpx;
  color: #333;
}

.goods-items .t .name {
  display: block;
  float: left;
}

.goods-items .t .number {
  display: block;
  float: right;
  text-align: right;
  margin-right: 30rpx;
}

.goods-items .m {
  height: 29rpx;
  overflow: hidden;
  line-height: 29rpx;
  margin-bottom: 25rpx;
  font-size: 25rpx;
  color: #666;
}

.goods-items .b {
  height: 41rpx;
  overflow: hidden;
  line-height: 41rpx;
  font-size: 30rpx;
  color: #333;
}

.order-total {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 100rpx;
  width: 100%;
  display: flex;
}

.order-total .l {
  flex: 1;
  height: 100rpx;
  line-height: 100rpx;
  color: #b4282d;
  background: #fff;
  font-size: 33rpx;
  padding-left: 31.25rpx;
  border-top: 1rpx solid rgba(0, 0, 0, 0.2);
  border-bottom: 1rpx solid rgba(0, 0, 0, 0.2);
}

.order-total .r {
  width: 233rpx;
  height: 100rpx;
  background: #b4282d;
  border: 1px solid #b4282d;
  line-height: 100rpx;
  text-align: center;
  color: #fff;
  font-size: 30rpx;
}
</style>

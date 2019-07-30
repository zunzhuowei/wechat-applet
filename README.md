# wechat-applet
微信小程序

## NOTE
### 模板引用
1. import 只能引用 wxml 中的模板；
2. inculde 只能引用 wxml的组件标签；

### 程序生命周期
1. onLaunch
2. onShow
3. onHide
4. onError

### 页面生命周期
1. onLoad
2. onShow
3. onReady
4. onHide
5. onUnload

### footer.wxml 模板
```html
<!-- 模板 -->
<template name="footer">
    <view class="weui-footer weui-footer_fixed-bottom">
        <view class="weui-footer__links">
            <navigator url="" class="weui-footer__link">{{company}}</navigator>
        </view>
        <view class="weui-footer__text">Copyright © {{copyright}}</view>
    </view>
</template>

<!-- 组件 -->
<view class="weui-footer weui-footer_fixed-bottom">
    <view class="weui-footer__links">
        <navigator url="" class="weui-footer__link">WeUI首页</navigator>
    </view>
    <view class="weui-footer__text">Copyright © 2008-2016 weui.io</view>
</view>
```
```html
<!-- 组件引用 index.wxml -->
<include  src="../../templates/footer/footer.wxml"/>

<!-- 模板引用 register.wxml -->
<template is="footer" data="{{...footer}}"/>

```
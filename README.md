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

### 跳转
* wx.switchTab(Object object)
> 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
  参数
```html
{
  "tabBar": {
    "list": [{
      "pagePath": "index",
      "text": "首页"
    },{
      "pagePath": "other",
      "text": "其他"
    }]
  }
}

wx.switchTab({
  url: '/index'
})
```
* wx.reLaunch(Object object)
> 关闭所有页面，打开到应用内的某个页面
```html
wx.reLaunch({
  url: 'test?id=1'
})

// test
Page({
  onLoad (option) {
    console.log(option.query)
  }
})
```
* wx.redirectTo(Object object)
> 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。
```html
wx.redirectTo({
  url: 'test?id=1'
})
```
* wx.navigateTo(Object object)
> 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。使用 wx.navigateBack 可以返回到原页面。小程序中页面栈最多十层。
```html
wx.navigateTo({
  url: 'test?id=1',
  events: {
    // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
    acceptDataFromOpenedPage: function(data) {
      console.log(data)
    },
    someEvent: function(data) {
      console.log(data)
    }
    ...
  },
  success: function(res) {
    // 通过eventChannel向被打开页面传送数据
    res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
  }
})

//test.js
Page({
  onLoad: function(option){
    console.log(option.query)
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('acceptDataFromOpenedPage', {data: 'test'});
    eventChannel.emit('someEvent', {data: 'test'});
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      console.log(data)
    })
  }
})
```
* wx.navigateBack(Object object)
> 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages 获取当前的页面栈，决定需要返回几层。
```html

// 注意：调用 navigateTo 跳转时，调用该方法的页面会被加入堆栈，而 redirectTo 方法则不会。见下方示例代码

// 此处是A页面
wx.navigateTo({
  url: 'B?id=1'
})

// 此处是B页面
wx.navigateTo({
  url: 'C?id=1'
})

// 在C页面内 navigateBack，将返回A页面
wx.navigateBack({
  delta: 2
})
```
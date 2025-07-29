# SoCump 🌐

**Social App Browser Detection and Redirect**

检测社交应用内置浏览器并引导用户跳转到外部浏览器的轻量级解决方案。

## ✨ 功能特性

- 🔍 **智能检测** - 自动识别微信、QQ、支付宝、微博等社交应用内置浏览器
- 🚀 **自动跳转** - 在普通浏览器中自动跳转到目标链接
- 📱 **用户引导** - 在社交应用中显示友好的跳转引导界面
- 📋 **一键复制** - 支持一键复制链接到剪贴板
- 🎨 **响应式设计** - 完美适配移动端和桌面端
- ⚡ **轻量级** - 无依赖，纯JavaScript实现
- 🛠️ **易于集成** - 简单的API，快速集成到现有项目

## 🚀 快速开始

### 方法一：直接使用完整版本

1. 将 `socump.js` 和 `index.html` 文件放到您的服务器上
2. 通过URL参数指定目标链接：

```
https://yoursite.com/index.html?url=https://target-site.com
```

### 方法二：集成到现有项目

在您的HTML页面中引入简化版本：

```html
<script src="socump.min.js"></script>
```

脚本会自动检测并处理跳转逻辑。

### 方法三：手动控制

```javascript
// 检测当前浏览器类型
if (SoCump.isWeChat()) {
    console.log('在微信中打开');
    SoCump.showRedirectTip();
}

// 手动触发检测
SoCump.autoDetect();

// 复制链接到剪贴板
SoCump.copyToClipboard('https://example.com');
```

## 📱 支持的浏览器

| 浏览器 | 检测支持 | 跳转支持 | 说明 |
|--------|----------|----------|------|
| 微信内置浏览器 | ✅ | ✅ | 完全支持 |
| QQ内置浏览器 | ✅ | ✅ | 完全支持 |
| QQ浏览器 | ✅ | ⚠️ | 部分支持 |
| 支付宝内置浏览器 | ✅ | ✅ | 完全支持 |
| 微博内置浏览器 | ✅ | ✅ | 完全支持 |
| 普通浏览器 | ✅ | ✅ | 自动跳转 |

## 🔧 API 文档

### 检测方法

```javascript
SoCump.isWeChat()      // 检测是否在微信中
SoCump.isQQ()          // 检测是否在QQ中
SoCump.isQQBrowser()   // 检测是否在QQ浏览器中
SoCump.isAlipay()      // 检测是否在支付宝中
SoCump.isWeibo()       // 检测是否在微博中
SoCump.isInSocialApp() // 检测是否在任何社交应用中
```

### 功能方法

```javascript
SoCump.autoDetect()                    // 自动检测并处理
SoCump.showRedirectTip()              // 显示跳转提示
SoCump.copyToClipboard(text)          // 复制文本到剪贴板
```

## 📖 使用示例

### 示例1：基础跳转

```html
<!DOCTYPE html>
<html>
<head>
    <title>跳转示例</title>
</head>
<body>
    <h1>正在跳转...</h1>
    <script src="socump.min.js"></script>
</body>
</html>
```

访问：`https://yoursite.com/page.html?url=https://target.com`

### 示例2：自定义处理

```javascript
// 自定义检测逻辑
if (SoCump.isInSocialApp()) {
    // 在社交应用中，显示自定义提示
    alert('请在浏览器中打开此链接');
} else {
    // 在普通浏览器中，直接跳转
    window.location.href = 'https://target.com';
}
```

### 示例3：与现有项目集成

```javascript
// 在页面加载时检测
document.addEventListener('DOMContentLoaded', function() {
    if (SoCump.isInSocialApp()) {
        // 隐藏页面内容，显示跳转提示
        document.body.style.display = 'none';
        SoCump.showRedirectTip();
    }
});
```

## 📁 文件说明

- `index.html` - 完整的跳转引导页面
- `socump.js` - 完整版JavaScript库
- `socump.min.js` - 简化版JavaScript库（推荐用于集成）
- `demo.html` - 功能演示和使用说明页面

## 🌟 最佳实践

1. **URL参数传递**：使用 `url` 或 `target` 参数传递目标链接
2. **HTTPS支持**：确保在HTTPS环境下使用以获得最佳兼容性
3. **移动端优化**：页面已针对移动端进行优化
4. **用户体验**：提供清晰的操作指引和反馈

## 🔒 安全说明

- 脚本会验证传入的URL格式
- 不会执行任何恶意代码
- 仅进行浏览器检测和页面跳转
- 支持Content Security Policy (CSP)

## 📄 许可证

MIT License - 可自由使用、修改和分发。

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个项目！

---

**SoCump** - 让链接分享更简单 🚀

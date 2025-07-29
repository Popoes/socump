/**
 * SoCump - Social App Browser Detection and Redirect
 * 检测社交应用内置浏览器并引导用户跳转到外部浏览器
 */

class SoCump {
    constructor() {
        this.targetUrl = this.getTargetUrl();
        this.init();
    }

    /**
     * 获取目标URL
     * 优先级：URL参数 > 当前页面URL
     */
    getTargetUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        const targetUrl = urlParams.get('url') || urlParams.get('target');
        
        if (targetUrl) {
            try {
                // 验证URL格式
                new URL(targetUrl);
                return targetUrl;
            } catch (e) {
                console.warn('Invalid target URL:', targetUrl);
            }
        }
        
        return window.location.href;
    }

    /**
     * 检测是否在微信内置浏览器中
     */
    isWeChat() {
        const ua = navigator.userAgent.toLowerCase();
        return ua.includes('micromessenger');
    }

    /**
     * 检测是否在QQ内置浏览器中
     */
    isQQ() {
        const ua = navigator.userAgent.toLowerCase();
        return ua.includes('qq/') && !ua.includes('mqqbrowser');
    }

    /**
     * 检测是否在QQ浏览器中
     */
    isQQBrowser() {
        const ua = navigator.userAgent.toLowerCase();
        return ua.includes('mqqbrowser');
    }

    /**
     * 检测是否在支付宝内置浏览器中
     */
    isAlipay() {
        const ua = navigator.userAgent.toLowerCase();
        return ua.includes('alipayclient');
    }

    /**
     * 检测是否在微博内置浏览器中
     */
    isWeibo() {
        const ua = navigator.userAgent.toLowerCase();
        return ua.includes('weibo');
    }

    /**
     * 检测是否在任何社交应用内置浏览器中
     */
    isInSocialApp() {
        return this.isWeChat() || this.isQQ() || this.isQQBrowser() || 
               this.isAlipay() || this.isWeibo();
    }

    /**
     * 获取当前浏览器类型
     */
    getBrowserType() {
        if (this.isWeChat()) return 'wechat';
        if (this.isQQ()) return 'qq';
        if (this.isQQBrowser()) return 'qqbrowser';
        if (this.isAlipay()) return 'alipay';
        if (this.isWeibo()) return 'weibo';
        return 'normal';
    }

    /**
     * 获取浏览器名称
     */
    getBrowserName() {
        const type = this.getBrowserType();
        const names = {
            'wechat': '微信',
            'qq': 'QQ',
            'qqbrowser': 'QQ浏览器',
            'alipay': '支付宝',
            'weibo': '微博',
            'normal': '浏览器'
        };
        return names[type] || '未知浏览器';
    }

    /**
     * 更新页面内容
     */
    updatePageContent() {
        const browserName = this.getBrowserName();
        const title = document.querySelector('h1');
        const description = document.querySelector('.description');
        const urlDisplay = document.getElementById('urlDisplay');

        if (title) {
            title.textContent = `请在浏览器中打开`;
        }

        if (description) {
            description.textContent = `检测到您正在${browserName}内置浏览器中访问，为了更好的体验，请在外部浏览器中打开此链接。`;
        }

        if (urlDisplay) {
            urlDisplay.textContent = this.targetUrl;
        }

        // 更新页面标题
        document.title = `请在浏览器中打开 - ${browserName}跳转提示`;
    }

    /**
     * 自动跳转（如果不在社交应用中）
     */
    autoRedirect() {
        if (!this.isInSocialApp() && this.targetUrl !== window.location.href) {
            // 延迟跳转，给用户看到提示的时间
            setTimeout(() => {
                window.location.href = this.targetUrl;
            }, 1000);
        }
    }

    /**
     * 尝试在外部浏览器中打开
     */
    openInBrowser() {
        const browserType = this.getBrowserType();
        
        // 不同浏览器的处理方式
        switch (browserType) {
            case 'wechat':
                // 微信中尝试使用 location.href
                this.showCopyUrlTip();
                break;
            case 'qq':
                // QQ中尝试使用 window.open
                this.tryWindowOpen();
                break;
            default:
                // 其他情况直接跳转
                window.location.href = this.targetUrl;
        }
    }

    /**
     * 尝试使用 window.open
     */
    tryWindowOpen() {
        try {
            const newWindow = window.open(this.targetUrl, '_blank');
            if (!newWindow) {
                this.showCopyUrlTip();
            }
        } catch (e) {
            this.showCopyUrlTip();
        }
    }

    /**
     * 显示复制链接提示
     */
    showCopyUrlTip() {
        alert('请手动复制链接地址，然后在浏览器中打开');
        this.copyToClipboard(this.targetUrl);
    }

    /**
     * 复制文本到剪贴板
     */
    copyToClipboard(text) {
        // 现代浏览器
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(() => {
                this.showToast('链接已复制到剪贴板');
            }).catch(() => {
                this.fallbackCopyTextToClipboard(text);
            });
        } else {
            // 降级方案
            this.fallbackCopyTextToClipboard(text);
        }
    }

    /**
     * 降级复制方案
     */
    fallbackCopyTextToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                this.showToast('链接已复制到剪贴板');
            } else {
                this.showToast('复制失败，请手动复制');
            }
        } catch (err) {
            this.showToast('复制失败，请手动复制');
        }
        
        document.body.removeChild(textArea);
    }

    /**
     * 显示提示消息
     */
    showToast(message) {
        // 创建提示元素
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            font-size: 14px;
            z-index: 10000;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        // 3秒后移除
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    /**
     * 初始化
     */
    init() {
        // 等待DOM加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setup();
            });
        } else {
            this.setup();
        }
    }

    /**
     * 设置页面
     */
    setup() {
        // 如果不在社交应用中，自动跳转
        if (!this.isInSocialApp()) {
            this.autoRedirect();
            return;
        }

        // 更新页面内容
        this.updatePageContent();

        // 绑定全局函数
        window.copyUrl = () => this.copyToClipboard(this.targetUrl);
        window.openInBrowser = () => this.openInBrowser();
    }
}

// 创建实例
const socump = new SoCump();

// 导出供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SoCump;
}

// 全局访问
window.SoCump = SoCump;
# 合耀科技官网主页

这是合耀科技官网首页的静态版本，适合先部署到 Cloudflare Pages 或 Vercel，后续完成 ICP 备案后迁移到国内服务器或静态托管服务。

## 文件结构

- `index.html`：首页结构和页面内容
- `privacy.html`：隐私政策页面
- `styles.css`：视觉样式、响应式布局和动画
- `script.js`：微信号复制、表单提示、滚动入场动画
- `functions/api/lead.js`：Cloudflare Pages 表单接口，转发官网咨询到飞书机器人
- `assets/heyao-logo.jpg`：从现有品牌图中裁切的临时 Logo
- `assets/brand-source.jpg`：原始品牌截图备份
- `docs/project-knowledge-base.md`：项目上下文知识库

## 本地预览

直接双击 `index.html` 即可打开。

也可以用任意静态服务器预览，例如：

```powershell
python -m http.server 8080
```

然后访问：

```text
http://localhost:8080
```

## 后续待接入

- 高清透明 Logo 或 SVG Logo
- 微信二维码
- 正式隐私政策页面
- ICP 备案号
- 国内 CDN 和 HTTPS 证书

## Cloudflare 环境变量

表单通知依赖 Cloudflare Pages 环境变量：

```text
FEISHU_WEBHOOK
```

不要把飞书 Webhook 写进前端代码或提交到 GitHub。

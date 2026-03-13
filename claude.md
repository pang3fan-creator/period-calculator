# Period Calculator

隐私优先、极致丝滑的女性经期管理工具。无登录、本地存储、多语言支持。

---

## Quick Start

```bash
npm install          # 安装依赖
npm run dev          # 启动开发服务器 (localhost:3000)
npm run build        # 生产构建
npm run start        # 启动生产服务器
npm run lint         # 代码检查
npm run format       # 代码格式化
npm test             # 运行测试 (102+ 测试用例)
```

---

## 项目结构

```
src/
├── app/[locale]/           # Next.js App Router 页面
│   ├── page.tsx            # 首页
│   ├── irregular-period-calculator/
│   ├── ovulation-period-calculator/
│   ├── about/
│   ├── privacy-policy/
│   ├── editorial-policy/
│   ├── period-calculator-vs-flo-clue/
│   └── blog/[slug]/
├── components/             # React 组件
│   ├── layout/             # 布局组件 (Header, Footer, Breadcrumb)
│   ├── ui/                 # UI 组件
│   └── seo/                # SEO 组件 (JsonLd)
├── config/                 # 配置文件
├── i18n/                   # 国际化配置
├── lib/                    # 工具函数
│   ├── calculator/         # 计算算法
│   ├── calendar/           # ICS 日历生成
│   └── storage/            # 本地存储
└── messages/               # 多语言翻译文件
```

---

## 技术栈

- **框架**: Next.js (App Router)
- **样式**: Tailwind CSS (莫兰迪色系)
- **国际化**: next-intl (en/es/fr)
- **主题**: next-themes (深色模式)
- **部署**: Vercel
- **数据**: LocalStorage (禁止上传服务器)

---

## SEO 规范

- 每个路由使用 Metadata API 动态生成 TDK
- 结构化数据: WebApplication, FAQPage, HowTo
- Editorial Policy 页面说明公式来源 (ACOG/NHS)

---

## 开发经验与常见问题

### 1. Tailwind 类使用注意
- 进度条背景使用 `bg-*` 类，不要用 `fill-*`（仅对 SVG 有效）

### 2. 不规律计算器可视化组件
- Predicted Window 使用对称算法，mostLikely 永远在横条正中间
- 解决方案：添加动态范围区域体现预测不确定性

### 3. 组件设计模式
- 每个计算器页面应有专属的 HowTo 组件，而非复用首页组件

### 4. next-intl 多语言路径处理
- `usePathname()` 返回的路径包含语言前缀（如 `/es/about`），解析时需过滤
- 从 `@/i18n/routing` 导入的 Link 会自动添加语言前缀
- 过滤语言段: `segments.filter((s, i) => i !== 0 || !SUPPORTED_LOCALES.includes(s))`

### 5. 隐私合规
- GDPR/CCPA: 数据不存服务器，仅需简单 Cookie 告知
- Privacy Policy 中详述本地存储机制

### 6. 测试注意事项
- Node.js v24 + vitest 4.x 可能出现 "No test suite found" 临时性错误
- 解决方案：`npx vitest run --reporter=verbose`
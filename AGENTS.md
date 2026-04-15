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
npm test             # 运行测试 (102+ 测试用例)
```

---

## 常见坑点

### 多语言 URL 拼接

```markdown
❌ 错误: /${locale}/path → 产生 /frpath
❌ 错误: /${locale === "en" ? "" : locale}/path → 产生 //path
✅ 正确: 使用 buildUrl(locale, "/path") 从 @/lib/url 导入
```

### next-intl 路径处理

- `usePathname()` 返回的路径包含语言前缀（如 `/es/about`），解析时需过滤
- 过滤语言段: `segments.filter((s, i) => i !== 0 || !SUPPORTED_LOCALES.includes(s))`

### 测试问题

Node.js v24 + vitest 4.x 可能出现 "No test suite found" 错误：
```bash
npx vitest run --reporter=verbose
```

### 博客系统

- MDX 内容位于 `src/content/blog/{locale}/*.mdx`
- **next-mdx-remote/rsc 不支持 import**：组件必须通过 `mdx-components.tsx` 注册
- **静态文件避开动态路由**：`/blog/[slug]` 会捕获 `/blog/image.png`，图片放 `public/images/`

### 不规律计算器可视化

Predicted Window 使用对称算法，mostLikely 永远在横条正中间。需要添加动态范围区域体现预测不确定性。

### Tailwind 类使用

进度条背景使用 `bg-*` 类，不要用 `fill-*`（仅对 SVG 有效）

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
│   └── blog/[slug]/        # 博客详情页（无列表页，工具导向站点）
├── components/             # React 组件
│   ├── layout/             # 布局组件
│   ├── ui/                 # UI 组件
│   └── seo/                # SEO 组件 (JsonLd)
├── config/                 # 配置文件
├── i18n/                   # 国际化配置
├── lib/                    # 工具函数
│   ├── calculator/         # 计算算法
│   ├── calendar/           # ICS 日历生成
│   ├── storage/            # 本地存储
│   └── url.ts              # 多语言 URL 生成
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

### 基础配置

- 每个路由使用 Metadata API 动态生成 TDK
- 结构化数据: WebApplication, FAQPage, HowTo
- Editorial Policy 页面说明公式来源 (ACOG/NHS)

### JSON-LD Schema 规范

| 规范 | 说明 |
|------|------|
| Schema 类型 | 工具页面用 `WebApplication`，博客用 `BlogPosting` |
| 日期格式 | ISO 8601 含时区 (`2026-03-16T00:00:00+00:00`) |
| 多语言支持 | Schema 文本从翻译文件获取，`inLanguage` 标识语言 |
| @graph 模式 | 多 Schema 用 `@graph` 组织，配合 `@id` 引用 |
| BreadcrumbList | 只包含实际存在的页面，不支持 `inLanguage` 属性 |
| SearchAction | 仅当有实际搜索功能时添加 |

### hreflang 规范

- 所有页面都应包含 x-default 指向默认语言版本
- 使用 `buildUrl(locale, "/path")` 生成 canonical/hreflang URL

### sitemap 维护

新增页面时需同步更新 `src/app/sitemap.ts` 的 `pages` 数组。

---

## 隐私合规

- 数据不存服务器，仅需简单 Cookie 告知
- Privacy Policy 中详述本地存储机制
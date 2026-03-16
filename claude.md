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
│   └── blog/[slug]/            # 博客详情页（无列表页，工具导向站点）
├── components/                 # React 组件
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

### 7. JSON-LD Schema 最佳实践
- **Schema 类型选择**: 使用 `WebApplication`（非 SoftwareApplication），工具页面不使用 `Article`
- **博客文章 Schema**: 使用 `BlogPosting`（Article 的子类型，语义更明确）
- **SearchAction**: 仅当网站有实际搜索功能时添加，否则会被视为误导
- **多语言支持**: Schema 文本内容（featureList、description、breadcrumb）应从翻译文件获取
- **@graph 模式**: 使用 `@graph` 组织多 Schema，配合 `@id` 引用避免重复
- **FAQ/HowTo 数据**: 从翻译文件动态获取，不要在页面硬编码
- **日期格式**: 必须使用 ISO 8601 含时区格式（`2026-03-16T00:00:00+00:00`，非 `2026-03-16`）
- **BreadcrumbList 层级**: 只能包含实际存在的页面，不可虚构中间层级

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

### 7. 博客系统
- MDX 内容位于 `src/content/blog/{locale}/*.mdx`
- 使用 `next-mdx-remote/rsc` 渲染，`gray-matter` 解析 frontmatter
- 只有详情页 `[slug]`，无列表页（工具导向站点不需要文章发现功能）
- **next-mdx-remote/rsc 不支持 import**：组件必须通过 `mdx-components.tsx` 注册
- **静态文件避开动态路由路径**：`/blog/[slug]` 会捕获 `/blog/image.png`，图片放 `public/images/`
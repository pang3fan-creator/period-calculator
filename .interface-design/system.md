# Period Calculator 设计系统

本文档从现有代码中提取的设计模式，用于保持 UI 一致性。

---

## 间距系统

### 基础单位

- **Base**: 4px
- **Scale**: 4, 8, 12, 16, 24, 32, 48, 64, 80

### 应用场景

| 类名                    | 值   | 用途                 |
| ----------------------- | ---- | -------------------- |
| `p-1` / `px-1` / `py-1` | 4px  | 紧凑间距             |
| `p-2` / `px-2` / `py-2` | 8px  | 小间距               |
| `p-3` / `px-3` / `py-3` | 12px | 中等间距             |
| `p-4` / `px-4` / `py-4` | 16px | 标准间距             |
| `p-6` / `px-6` / `py-6` | 24px | 大间距（卡片内边距） |
| `p-8` / `px-8` / `py-8` | 32px | 超大间距             |
| `gap-1`                 | 4px  | 元素间紧凑间距       |
| `gap-2`                 | 8px  | 元素间小间距         |
| `gap-3`                 | 12px | 元素间中等间距       |
| `gap-4`                 | 16px | 元素间标准间距       |
| `gap-6`                 | 24px | 元素间大间距         |

### 垂直间距 (space-y)

| 类名         | 值   | 用途                 |
| ------------ | ---- | -------------------- |
| `space-y-1` | 4px  | 紧凑垂直间距         |
| `space-y-2` | 8px  | 小垂直间距           |
| `space-y-3` | 12px | 中等垂直间距         |
| `space-y-4` | 16px | 表单区块间距         |
| `space-y-6` | 24px | 页面区块间距         |
| `space-y-8` | 32px | 大区块间距           |

### 安全触摸区域

- **最小值**: `min-h-[48px]` / `min-w-[48px]`
- **用途**: 所有可点击元素（按钮、链接、图标）

---

## 圆角系统

| 类名           | 值     | 用途                 |
| -------------- | ------ | -------------------- |
| `rounded-lg`   | 8px    | 小圆角               |
| `rounded-xl`   | 12px   | 中圆角               |
| `rounded-2xl`  | 16px   | 大圆角（按钮、面板） |
| `rounded-3xl`  | 24px   | 超大圆角（卡片）     |
| `rounded-full` | 9999px | 圆形（徽章、指示器） |

---

## 按钮组件

### 基础样式

```tsx
className = "min-h-[48px] rounded-2xl font-body transition-all";
```

### 变体

| 变体        | 样式                                                                  |
| ----------- | --------------------------------------------------------------------- |
| `primary`   | `bg-primary-400 text-white hover:bg-primary-500`                      |
| `secondary` | `bg-warmbeige-100 text-gray-800 dark:bg-dark-card dark:text-gray-100` |
| `ghost`     | `bg-transparent text-gray-700 dark:text-gray-300`                     |

### 尺寸

| 尺寸 | 水平内边距    | 垂直内边距    | 字体        |
| ---- | ------------- | ------------- | ----------- |
| `sm` | `px-4` (16px) | `py-2` (8px)  | `text-sm`   |
| `md` | `px-6` (24px) | `py-3` (12px) | `text-base` |
| `lg` | `px-8` (32px) | `py-4` (16px) | `text-lg`   |

### 示例代码

```tsx
<Button variant="primary" size="md">
  点击我
</Button>
```

---

## 卡片组件

### 样式

```tsx
className = "shadow-card dark:bg-dark-card rounded-3xl bg-white p-6";
```

### 属性

| 属性   | 值                               | 说明         |
| ------ | -------------------------------- | ------------ |
| 背景   | `bg-white` / `dark:bg-dark-card` | 支持深色模式 |
| 阴影   | `shadow-card`                    | 轻微阴影     |
| 圆角   | `rounded-3xl` (24px)             | 超大圆角     |
| 内边距 | `p-6` (24px) / `sm:p-8` (32px)   | 响应式内边距 |

### 卡片变体

```tsx
// 带边框卡片（常用）
className = "border border-warmbeige-200 dark:border-dark-border rounded-3xl p-6 sm:p-8"

// 悬停效果卡片
className = "hover:border-primary-200 dark:hover:border-primary-700 rounded-3xl border bg-white p-5 md:p-6"
```

### 示例代码

```tsx
<Card>
  <h2>卡片标题</h2>
  <p>卡片内容</p>
</Card>
```

---

## 深度策略

### 阴影层级

| 类名          | 用途                     |
| ------------- | ------------------------ |
| `shadow-card` | 卡片默认阴影             |
| `shadow-soft` | 轻微阴影（悬停效果）     |
| `shadow-warm` | 温暖色调阴影（强调元素） |

### 边框使用

```tsx
// 顶部边框（分隔线）
className = "border-t border-warmbeige-200";

// 深色模式边框
className = "border-t border-warmbeige-200 dark:border-dark-border";
```

### 优先级

1. **优先使用阴影**：用于卡片、面板、悬浮元素
2. **边框用于分隔**：用于页面区域分隔、列表项分隔

---

## 可访问性

### 焦点样式

所有交互元素必须包含：

```tsx
className =
  "focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 outline-none";
```

### 触摸目标

```tsx
// 最小触摸尺寸
className = "min-h-[48px] min-w-[48px]";

// 带内边距的触摸目标
className = "p-3"; // 12px + 内容
```

### ARIA 属性

```tsx
// 装饰性图标（必须）
<svg aria-hidden="true">
  <path d="..." />
</svg>

// 仅图标按钮
<button aria-label="关闭">

// 选项卡状态
<button aria-selected="true">
```

### SVG 图标模式

所有装饰性 SVG 必须包含：

```tsx
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  aria-hidden="true"
>
  <path d="..." />
</svg>
```

---

## 输入框/表单组件

### 输入框样式

```tsx
className = "border-primary-200 dark:border-dark-border focus:border-primary-400 focus:ring-primary-100 min-h-[48px] w-full rounded-xl border-2 bg-white px-4 py-3 text-gray-800 transition-colors focus:ring-4 dark:text-gray-100"
```

### 滑块样式

```tsx
className = "bg-primary-100 dark:bg-dark-border accent-primary-400 h-2 w-full cursor-pointer appearance-none rounded-full"
```

### 表单按钮变体

| 类型     | 样式                                                                 |
| -------- | -------------------------------------------------------------------- |
| 主要按钮 | `bg-primary-400 hover:bg-primary-500 shadow-warm rounded-2xl px-6 py-3` |
| 次要按钮 | `border-primary-200 hover:border-primary-300 rounded-2xl border-2 px-6 py-3` |

---

## 颜色使用

### 主色调（Dusty Rose）

| 类名                   | 用途                 |
| ---------------------- | -------------------- |
| `bg-primary-400`       | 主要按钮、活跃状态   |
| `text-primary-400`     | 链接、标题、强调文本 |
| `hover:bg-primary-500` | 悬停状态             |

### 背景色

| 类名                             | 用途               |
| -------------------------------- | ------------------ |
| `bg-ivory-50` / `bg-ivory-100`   | 页面背景           |
| `bg-warmbeige-100`               | 次要按钮、浅色区域 |
| `bg-white` / `dark:bg-dark-card` | 卡片背景           |
| `bg-dark-bg`                     | 深色模式页面背景   |

### 文本色

| 类名            | 用途                 |
| --------------- | -------------------- |
| `text-gray-800` | 主要文本（浅色模式） |
| `text-gray-100` | 主要文本（深色模式） |
| `text-gray-600` | 次要文本             |
| `text-gray-400` | 占位符、禁用状态     |

---

## 字体系统

### 字体族

```css
--font-heading: var(--font-playfair), serif; /* 标题 */
--font-body: var(--font-inter), sans-serif; /* 正文 */
```

### 应用

```tsx
// 标题
className = "font-heading";

// 正文
className = "font-body";
```

---

## 动画

### 预定义动画

```css
--animate-fade-in: fade-in 0.5s ease-in-out;
--animate-slide-up: slide-up 0.4s ease-out;
```

### 过渡

```tsx
// 标准过渡
className = "transition-all";

// 快速过渡
className = "transition-colors duration-200";

// 缓慢过渡
className = "transition-transform duration-300 ease-out";
```

---

## 深色模式实现

### 深色类策略

```css
/* Tailwind v4 配置 */
@custom-variant dark (&:where(.dark, .dark *));
```

### 深色模式样式模式

```tsx
// 背景和文本
className = "bg-white dark:bg-dark-card text-gray-800 dark:text-gray-100";

// 边框
className = "border-warmbeige-200 dark:border-dark-border";

// 悬停状态
className = "hover:bg-warmbeige-50 dark:hover:bg-dark-surface";
```

---

## 布局模式

### 粘性页脚

```tsx
<body className="flex min-h-screen flex-col">
  <Header />
  <main className="flex-1">{children}</main>
  <Footer />
</body>
```

### 网格布局

```tsx
// 四列均分（移动端底部导航）
className = "grid grid-cols-4";

// 两列布局
className = "grid grid-cols-2 gap-2";
```

---

## 移动端导航

### 底部导航栏

```tsx
className = "border-warmbeige-200 dark:border-dark-border fixed right-0 bottom-0 left-0 z-50 border-t backdrop-blur-md"
```

### 导航项

```tsx
className = "focus-visible:ring-primary-400 flex flex-col items-center justify-center gap-1 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
```

---

## 日历组件

### 日历单元格

```tsx
className = "flex h-11 min-h-[44px] items-center justify-center rounded-2xl text-sm font-medium transition-all"
```

### 日历容器

```tsx
className = "shadow-card dark:bg-dark-card flex w-full flex-col gap-6 rounded-3xl bg-white p-6 md:p-8"
```

---

## 参考文件

- `src/components/ui/button.tsx` - 按钮组件
- `src/components/ui/card.tsx` - 卡片组件
- `src/components/ui/skeleton.tsx` - 骨架屏组件
- `src/components/layout/header.tsx` - 页头组件
- `src/components/layout/footer.tsx` - 页脚组件
- `src/components/layout/mobile-nav.tsx` - 移动端导航
- `src/components/calculator/calculator-form.tsx` - 表单组件
- `src/components/calculator/calendar-view.tsx` - 日历组件
- `src/app/globals.css` - 全局样式和主题变量
- `src/app/[locale]/privacy-policy/page.tsx` - 政策页面（SVG 图标模式）
- `src/app/[locale]/editorial-policy/page.tsx` - 编辑政策页面

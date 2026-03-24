# Period Calculator 设计系统

> 最后更新: 2026-03-23

---

## 间距系统

### 基础单位

- **Base**: 4px
- **Scale**: 4, 8, 12, 16, 24, 32, 48, 64, 80

### 常用间距（按频率排序）

| 类名 | 值 | 出现次数 | 用途 |
|------|-----|---------|------|
| `gap-3` | 12px | 25次 | 卡片内元素间距 |
| `gap-4` | 16px | 20次 | 主要间距 |
| `gap-6` | 24px | 14次 | 区块间距 |
| `gap-8` | 32px | 7次 | 大区块间距 |

### 垂直间距 (space-y)

| 类名 | 值 | 用途 |
|------|-----|------|
| `space-y-3` | 12px | 紧凑垂直间距（FAQ项之间） |
| `space-y-4` | 16px | 表单区块间距 |
| `space-y-6` | 24px | 页面区块间距 |
| `space-y-8` | 32px | 大区块间距（表单元素之间） |

### 安全触摸区域

- **最小值**: `min-h-[48px]` / `min-w-[48px]`
- **出现次数**: 98次
- **用途**: 所有可点击元素（按钮、链接、图标）

---

## 圆角系统

| 类名 | 值 | 出现次数 | 用途 |
|------|-----|---------|------|
| `rounded-2xl` | 16px | 29次 | 按钮、小卡片、输入框 |
| `rounded-3xl` | 24px | 8次 | 主卡片容器 |
| `rounded-xl` | 12px | 少量 | 下拉菜单、语言选择器 |

**建议**:
- 按钮/输入框: `rounded-2xl`
- 卡片: `rounded-3xl`
- 下拉菜单: `rounded-xl`

---

## 深度策略

**混合策略**: 边框为主，阴影为辅

| 类型 | 出现次数 | 用途 |
|------|---------|------|
| `border-2` | 39次 | 卡片边框、输入框边框 |
| `shadow-*` | 16次 | 悬浮元素、强调效果 |

### 阴影层级

| 类名 | 用途 |
|------|------|
| `shadow-card` | 卡片阴影（轻柔） |
| `shadow-soft` | Header、下拉菜单 |
| `shadow-warm` | 主按钮（粉色光晕） |

### 边框模式

```tsx
// 标准卡片边框
className = "border-2 border-warmbeige-200 dark:border-dark-border"

// 输入框边框
className = "border-2 border-primary-200 focus:border-primary-400"
```

---

## 按钮组件

### 基础样式

```tsx
className = "min-h-[48px] rounded-2xl font-body transition-all";
```

### 变体

| 变体 | 样式 |
|------|------|
| `primary` | `bg-primary-400 text-white hover:bg-primary-500` |
| `secondary` | `bg-warmbeige-100 text-gray-800 dark:bg-dark-card dark:text-gray-100` |
| `ghost` | `bg-transparent text-gray-700 dark:text-gray-300` |

### 尺寸

| 尺寸 | 水平内边距 | 垂直内边距 | 字体 |
|------|-----------|-----------|------|
| `sm` | `px-4` (16px) | `py-2` (8px) | `text-sm` |
| `md` | `px-6` (24px) | `py-3` (12px) | `text-base` |
| `lg` | `px-8` (32px) | `py-4` (16px) | `text-lg` |

---

## 卡片组件

### 标准卡片

```tsx
// 带阴影（默认）
className = "shadow-card dark:bg-dark-card rounded-3xl bg-white p-6 md:p-8"

// 带边框
className = "border-warmbeige-200 dark:border-dark-border dark:bg-dark-card rounded-3xl border-2 bg-white p-6"
```

### 卡片属性

| 属性 | 值 | 说明 |
|------|-----|------|
| 背景 | `bg-white` / `dark:bg-dark-card` | 支持深色模式 |
| 边框 | `border-2 border-warmbeige-200` | 温暖色调边框 |
| 圆角 | `rounded-3xl` (24px) | 超大圆角 |
| 内边距 | `p-6` / `md:p-8` | 响应式内边距 |

---

## 输入框组件

### 文本输入框

```tsx
className = "border-primary-200 dark:border-dark-border focus:border-primary-400 focus:ring-primary-100 min-h-[48px] w-full rounded-xl border-2 bg-white px-4 py-3 text-gray-800 transition-colors focus:ring-4 dark:text-gray-100"
```

### 滑块

```tsx
className = "bg-primary-100 dark:bg-dark-border accent-primary-400 h-2 w-full cursor-pointer appearance-none rounded-full"
```

### 日期选择器

```tsx
className = "border-primary-200 dark:bg-dark-card dark:border-dark-border focus:border-primary-400 focus:ring-primary-100 dark:focus:ring-primary-900/30 min-h-[48px] w-full cursor-pointer rounded-xl border-2 bg-white px-4 py-3 text-gray-800 transition-colors focus:ring-4 dark:text-gray-100"
```

---

## 颜色系统

### 主色调（Dusty Rose）

| Shade | Hex | 用途 |
|-------|-----|------|
| 50 | `#fdf2f4` | Lightest tint |
| 100 | `#fbe5ea` | Backgrounds |
| 200 | `#f8ced8` | Borders |
| 400 | `#eb7e97` | **Primary brand** |
| 500 | `#df5579` | Hover states |

### 背景色

| Token | Light Mode | Dark Mode |
|-------|------------|-----------|
| Page | `ivory-100` | `dark-bg` |
| Card | `white` / `warmbeige-50` | `dark-card` |
| Surface | `warmbeige-100` | `dark-surface` |

### 语义色（日历可视化）

| 事件 | Border | Background |
|------|--------|------------|
| Period | `rose-300` | `rose-50` |
| Ovulation | `violet-400` | `violet-50` |
| Fertile | `emerald-400` | `emerald-50` |
| PMS | `amber-300` | `amber-50` |

---

## 字体系统

### 字体族

```css
--font-heading: var(--font-playfair), serif;  /* h1-h6 */
--font-body: var(--font-inter), sans-serif;   /* body text */
```

### 标题尺寸

| 元素 | Mobile | Desktop |
|------|--------|---------|
| h1 | `text-3xl` | `text-4xl` |
| h2 | `text-2xl` | `text-3xl` |
| h3 | `text-xl` | `text-2xl` |

---

## 布局模式

### 预测卡片网格

```tsx
<div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
  {cards.map(card => (
    <div className="flex items-center gap-3 p-3 sm:gap-4 sm:p-5
                    rounded-3xl border-2">
      {/* Icon + Content */}
    </div>
  ))}
</div>
```

### FAQ 手风琴

```tsx
<div className="space-y-3">
  {items.map(item => (
    <div className="rounded-3xl border-2 border-warmbeige-200 bg-white">
      <button className="min-h-[48px] w-full p-4 text-left">
        {/* Question */}
      </button>
      <div className={isOpen ? "max-h-96" : "max-h-0"}>
        {/* Answer */}
      </div>
    </div>
  ))}
</div>
```

### 表单布局

```tsx
<form className="space-y-8">
  {/* Each input group */}
  <div className="space-y-3">
    <label>...</label>
    <input>...</input>
  </div>
</form>
```

---

## 可访问性

### 焦点样式

所有交互元素必须包含：

```tsx
className = "focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 outline-none";
```

### 触摸目标

```tsx
// 最小触摸尺寸 (WCAG 2.1)
className = "min-h-[48px] min-w-[48px]";
```

### ARIA 属性

```tsx
// 装饰性图标（必须）
<svg aria-hidden="true">

// 仅图标按钮
<button aria-label="关闭">

// 展开状态
<button aria-expanded={isOpen}>
```

---

## 动画

### 预定义动画

```css
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-up {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Usage */
animate-fade-in   /* 0.5s ease-in-out */
animate-slide-up  /* 0.4s ease-out */
```

### 过渡

```tsx
// 标准过渡
className = "transition-all"

// 颜色过渡
className = "transition-colors duration-200"

// 变换过渡
className = "transition-transform duration-300"
```

---

## 深色模式

### 类策略

```css
/* Tailwind v4 配置 */
@custom-variant dark (&:where(.dark, .dark *));
```

### 样式模式

```tsx
// 背景和文本
className = "bg-white dark:bg-dark-card text-gray-800 dark:text-gray-100"

// 边框
className = "border-warmbeige-200 dark:border-dark-border"

// 悬停状态
className = "hover:bg-warmbeige-50 dark:hover:bg-dark-surface"
```

---

## 参考文件

- `src/components/ui/button.tsx` - 按钮组件
- `src/components/ui/card.tsx` - 卡片组件
- `src/components/layout/header.tsx` - 页头组件
- `src/components/layout/footer.tsx` - 页脚组件
- `src/components/calculator/calculator-form.tsx` - 表单组件
- `src/components/calculator/calendar-view.tsx` - 日历组件
- `src/components/calculator/prediction-cards.tsx` - 预测卡片
- `src/components/home/faq.tsx` - FAQ 组件
- `src/lib/theme/ovulation-theme.ts` - 排卵期主题配置
- `src/app/globals.css` - 全局样式和主题变量
# 导航栏扩展设计文档

**日期**: 2026-03-23
**状态**: 已批准
**范围**: 在首页导航栏添加 Irregular Period Calculator 和 Ovulation Period Calculator 链接，并实现移动端响应式折叠菜单。

---

## 1. 背景

当前导航栏仅包含 Logo、主题切换和语言选择器。用户需要快速访问两个核心计算器页面，但目前只能通过首页或直接输入 URL 访问。

## 2. 设计目标

1. 在导航栏中添加两个计算器链接，提升用户发现和访问效率
2. 保持现有导航栏的视觉风格和交互模式
3. 实现移动端响应式适配，确保小屏幕设备可用

## 3. 设计方案

### 3.1 布局方案

**方案 C：直接链接 + 汉堡菜单**

| 设备 | 布局 |
|------|------|
| 桌面端 (≥768px) | Logo → 两个链接 → 主题切换 → 语言选择 |
| 移动端 (<768px) | Logo → 汉堡菜单图标 → 主题切换 → 语言选择 |

### 3.2 链接样式

参考 Logo 样式，采用略轻的视觉层级：

| 属性 | 值 |
|------|-----|
| 字体 | `font-heading` (与 Logo 一致) |
| 字重 | `font-medium` (500) |
| 颜色 | `text-gray-600` / `dark:text-gray-300` |
| 字号 | `text-sm` (14px) |
| 悬停 | `hover:text-gray-800` / `dark:hover:text-gray-100` |

### 3.3 移动端汉堡菜单

**菜单位置**: 导航栏下方展开（与语言选择器行为一致）

**动画效果**: 向下滑入 + 淡入，200ms ease-out

**关闭行为**:
- 点击菜单外部关闭
- 按 ESC 键关闭
- 点击菜单项后关闭

### 3.4 响应式断点

使用 Tailwind CSS 的 `md:` 断点（768px）：
- `md:flex` - 桌面端显示链接
- `md:hidden` - 桌面端隐藏汉堡图标
- `hidden md:flex` - 移动端隐藏链接，桌面端显示
- `flex md:hidden` - 移动端显示汉堡图标，桌面端隐藏

## 4. 实现要点

### 4.1 涉及文件

| 文件 | 变更内容 |
|------|---------|
| `src/components/layout/Header.tsx` | 添加导航链接和汉堡菜单逻辑 |
| `messages/en.json` | 确认翻译键 `nav.irregularCalculator`, `nav.ovulationCalculator` |
| `messages/es.json` | 同上 |
| `messages/fr.json` | 同上 |

### 4.2 状态管理

新增状态：
- `menuOpen: boolean` - 控制移动端菜单展开/收起
- `menuRef: RefObject<HTMLDivElement>` - 用于检测外部点击

### 4.3 可访问性

- 汉堡菜单按钮需添加 `aria-expanded` 和 `aria-label`
- 菜单容器需添加 `role="menu"`
- 菜单项需添加 `role="menuitem"`
- 支持键盘导航（Tab / Shift+Tab）

## 5. 验证标准

1. **桌面端**: 两个链接正确显示在 Logo 右侧，样式符合设计
2. **移动端**: 汉堡菜单图标正确显示，点击展开菜单
3. **交互**: 菜单动画流畅，关闭行为正确
4. **多语言**: 所有语言版本链接文字正确
5. **深色模式**: 颜色适配正确
6. **可访问性**: 键盘导航和屏幕阅读器支持

## 6. 风险与缓解

| 风险 | 缓解措施 |
|------|---------|
| 导航栏宽度超限 | 使用响应式设计，移动端折叠 |
| 菜单遮挡内容 | 菜单使用 `absolute` 定位，不占用文档流 |
| 深色模式对比度 | 使用 Tailwind dark: 前缀确保对比度 |

---

## 附录：视觉参考

### 桌面端布局
```
[Period Calculator] [Irregular Period Calculator] [Ovulation Period Calculator]    [🌙] [EN ▾]
```

### 移动端布局（菜单收起）
```
[Period Calculator]                    [☰] [🌙] [EN ▾]
```

### 移动端布局（菜单展开）
```
[Period Calculator]                    [☰] [🌙] [EN ▾]
┌─────────────────────────────────────┐
│ Irregular Period Calculator         │
│ Ovulation Period Calculator         │
└─────────────────────────────────────┘
```
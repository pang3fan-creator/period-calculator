# 研究发现

## 项目结构分析

### 首页组件位置

- 主页面：`src/app/[locale]/page.tsx`
- 现有组件目录：`src/components/home/`
- 现有二屏组件：`src/components/home/how-to-calculate.tsx`

### 翻译系统

- 使用 `next-intl`
- 翻译文件位置：`messages/{locale}.json`
- 首页翻译 key：`home.title`, `home.subtitle`

### 设计规范（来自 PRD）

- 风格：温馨、柔和、专业（Morandi 莫兰迪色系）
- 交互：按钮使用大圆角（`rounded-2xl`）
- 结果显示采用平滑渐入动画

## 参考组件结构

### HowToCalculate 组件模式

```tsx
export function HowToCalculate() {
  const t = useTranslations("home");
  // 使用 Tailwind 进行样式设计
  // 支持深色模式
}
```

### 可能的 FAQ 内容来源

- PRD 提到"3.6k 问题库"
- 高频问题：经期推迟、安全期计算、不规律周期备孕

## 待确认问题

1. 三屏科普内容需要多详细？（简述 vs 详述）
2. FAQ 数量限制？（3-5 个还是更多）
3. 是否需要 Schema Markup（FAQPage）？

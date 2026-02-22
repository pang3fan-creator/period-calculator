# 首页三屏完善计划

## 背景

根据 PRD 文档，首页需要包含：

- **首屏**：核心计算器 + 隐私声明 ✅ 已完成
- **二屏**：计算原理说明（How to Calculate）✅ 已完成
- **三屏**：深度科普（为什么月经推迟、不规律周期的意义）📌 待实现
- **底屏**：FAQ 模块（针对高频问题）📌 待实现

## 目标

完善首页的三屏（深度科普）和底屏（FAQ）部分，提升内容深度和 SEO 效果。

## 当前页面结构

- 文件：`src/app/[locale]/page.tsx`
- 已有组件：`src/components/home/how-to-calculate.tsx`（二屏）
- 翻译文件：`messages/en.json`, `es.json`, `fr.json`

## 实现方案

### Phase 1: 三屏 - 深度科普组件

创建 `src/components/home/deep-knowledge.tsx`，包含：

1. **为什么月经会推迟？**
   - 压力影响：精神压力会抑制下丘脑功能
   - 体重变化：过轻或过重都会影响激素分泌
   - 多囊卵巢综合征（PCOS）：常见的内分泌失调
   - 其他健康因素：甲状腺问题、锻炼过度

2. **不规律周期的意义**
   - 什么是正常范围（21-35 天）
   - 何时需要就医（周期 > 35 天或 < 21 天）
   - 生活方式调整建议

3. **设计要求**
   - 温馨柔和的莫兰迪色系
   - 大圆角卡片设计（rounded-2xl）
   - 平滑渐入动画

### Phase 2: 底屏 - FAQ 组件

创建 `src/components/home/faq.tsx`，包含 6-10 个高频问题：

1. **常见问题**
   - 经期推迟多久算异常？
   - 如何计算安全期？
   - 周期不规律如何备孕？
   - 经期提前是什么原因？
   - 月经量多少算正常？
   - 更年期月经会变化吗？

2. **交互设计**
   - 手风琴式展开/收起
   - 平滑动画过渡

### Phase 3: 集成到首页

修改 `src/app/[locale]/page.tsx`，添加新组件

### Phase 4: 多语言支持

更新 `messages/en.json`, `es.json`, `fr.json` 翻译

## 关键文件

- `src/app/[locale]/page.tsx` - 添加新组件
- `src/components/home/deep-knowledge.tsx` - 新建
- `src/components/home/faq.tsx` - 新建
- `messages/en.json` - 更新翻译
- `messages/es.json` - 更新翻译
- `messages/fr.json` - 更新翻译

## 验证方式

1. 运行 `npm run dev` 验证页面渲染
2. 检查多语言切换是否正常工作
3. 验证移动端响应式布局

---

**用户偏好确认：**

- 科普内容：详细版（每个主题包含原因、建议、注意事项）
- FAQ 数量：6-10 个
- SEO Schema：暂不添加，后续统一审核

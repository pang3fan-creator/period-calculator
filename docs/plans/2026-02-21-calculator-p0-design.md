# Period Calculator P0 设计文档

**日期**: 2026-02-21
**状态**: Approved
**作者**: Claude + 主人

---

## 一、功能定位

**简洁快速型计算器** - 专注核心体验，秒出结果。

- 只实现基础模式：输入上次月经首日 + 周期长度 + 经期长度
- 不实现复杂的历史数据输入（不规律周期模式留待未来）
- 页面加载即用，无需注册登录

---

## 二、用户交互流程

```
输入阶段 → 计算阶段 → 结果阶段 → 数据保存
```

1. **输入阶段**：用户填写表单（日期选择器 + 滑块/输入框）

2. **计算阶段**：点击"计算"按钮，算法预测结果

3. **结果阶段**：表单下方直接展开显示结果区域，包含：
   - 4张预测卡片（下次月经、排卵日、易孕期、PMS期）
   - 预测窗口日历视图（从今天到下次月经结束后）
   - "添加到 Google Calendar" 按钮和"重新计算"按钮

4. **数据保存**：每次计算自动更新 LocalStorage

---

## 三、组件结构

```
src/components/calculator/
├── period-calculator.tsx      # 主容器（状态管理、LocalStorage）
├── calculator-form.tsx        # 输入表单
├── results-display.tsx        # 结果展示容器
├── prediction-cards.tsx       # 4张预测卡片
├── calendar-view.tsx          # 预测窗口日历
└── index.ts                   # 导出桶

src/lib/calculator/
├── cycle-calculator.ts        # 核心算法
└── validation.ts              # 表单验证

src/lib/storage/
└── localStorage.ts            # 数据持久化
```

---

## 四、UI 设计细节

### 输入表单

| 字段 | 类型 | 范围 | 默认值 |
|------|------|------|--------|
| 上次月经首日 | date picker | - | 今天 |
| 周期长度 | slider + input | 21-35 | 28 |
| 经期长度 | slider + input | 2-7 | 5 |

- 计算/重置按钮：最小高度 48px，圆角 16px
- 移动端友好，所有可交互元素 >= 48px

### 预测卡片

移动端单列，桌面端4列：

| 卡片 | 颜色标识 |
|------|----------|
| 下次月经 | 红色左边框 + 浅红背景 |
| 排卵日 | 蓝色左边框 + 浅蓝背景 |
| 易孕期 | 蓝色左边框 + 浅蓝背景 |
| PMS期 | 黄色左边框 + 浅黄背景 |

### 日历视图

- 7列网格（周一到周日）
- 预测日期：彩色边框 + 对应浅色背景
- 支持深色模式
- 显示从今天到下次月经结束后的日期范围

---

## 五、数据流与核心算法

### 数据流

```
用户输入 → calculator-form (onSubmit)
    ↓
period-calculator (调用算法)
    ↓
cycle-calculator.calculateCycle()
    ↓
返回 PredictionResult
    ↓
更新 state → 触发 results-display 渲染
    ↓
保存到 LocalStorage
```

### 核心算法（基于 ACOG 标准）

```typescript
function calculateCycle(data: CycleData): PredictionResult {
  const { lastPeriodStart, cycleLength, periodLength } = data;

  // 下次月经 = 上次首日 + 周期长度
  const nextPeriodStart = addDays(lastPeriodStart, cycleLength);
  const nextPeriodEnd = addDays(nextPeriodStart, periodLength - 1);

  // 排卵日 = 下次月经首日 - 14天
  const ovulationDate = addDays(nextPeriodStart, -14);

  // 易孕窗口 = 排卵日前5天 到 后1天
  const fertileWindowStart = addDays(ovulationDate, -5);
  const fertileWindowEnd = addDays(ovulationDate, 1);

  // PMS期 = 下次月经首日 - 7天
  const pmsStart = addDays(nextPeriodStart, -7);

  return { nextPeriodStart, nextPeriodEnd, fertileWindowStart, fertileWindowEnd, ovulationDate, pmsStart };
}
```

---

## 六、Google Calendar 集成

不生成 .ics 文件，直接使用 Google Calendar Web Intent：

```typescript
function addToGoogleCalendar(result: PredictionResult): void {
  const baseUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE";

  const params = new URLSearchParams({
    text: "Period Prediction",
    dates: formatICSDate(result.nextPeriodStart) + "/" + formatICSDate(result.nextPeriodEnd),
    details: "Next period predicted by Period Calculator"
  });

  window.open(`${baseUrl}&${params.toString()}`, "_blank");
}
```

---

## 七、LocalStorage 策略

- 每次计算时自动更新保存时间
- 数据"新鲜"，始终反映用户最近一次的输入
- 无过期时间，除非用户手动清除浏览器数据

---

## 八、莫兰迪色系

| 元素 | 颜色 | CSS |
|------|------|-----|
| 月经期 | 浅红 | `bg-red-100 border-red-300` |
| 易孕期 | 浅蓝 | `bg-blue-100 border-blue-300` |
| PMS期 | 浅黄 | `bg-yellow-100 border-yellow-300` |

深色模式对应 `dark:bg-red-900/30 dark:border-red-700` 等。

---

## 九、关键文件

- `src/components/calculator/period-calculator.tsx` - 主容器
- `src/components/calculator/calendar-view.tsx` - 日历视图
- `src/lib/calculator/cycle-calculator.ts` - 核心算法
- `src/lib/storage/localStorage.ts` - 数据持久化

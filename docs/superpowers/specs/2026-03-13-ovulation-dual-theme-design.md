# 排卵计算器双主题风格设计方案

## Context

**问题**：当前排卵计算器的 "Trying to conceive" 和 "Avoiding pregnancy" 两个选项仅影响是否显示避孕警告，对计算结果和视觉呈现无实质影响。用户希望这两个选项变得更有意义，产生真正有价值的差异化体验。

**需求**：
- 保留这两个选项
- 在视觉层面实现全面差异化
- 聚焦于结果展示区

**设计方案**：双主题风格
- **备孕模式**：浪漫温柔风（粉紫渐变、柔和圆润、温馨鼓励）
- **避孕模式**：冷静专业风（灰蓝色系、简洁直线、警示提醒）

**预期成果**：用户根据自身目的获得截然不同但都专业可信的视觉体验，让选项具有真正的选择价值。

---

## 设计目标

让用户根据自身目的获得**截然不同但都专业可信**的视觉体验：
- **备孕模式**：温馨鼓励、激发希望、引导行动
- **避孕模式**：冷静专业、警示风险、强调谨慎

---

## 双主题风格定义

### 备孕模式：浪漫温柔风

| 维度 | 设计决策 |
|------|----------|
| **主色调** | 粉紫色系（`primary-rose` + `violet` 渐变） |
| **辅助色** | 柔和绿色用于易孕期（`emerald`）、暖金色点缀 |
| **圆角** | 更圆润（`rounded-3xl` / `rounded-full`） |
| **阴影** | 柔和光晕效果（`shadow-lg shadow-primary-200/30`） |
| **图标** | 心形、花朵、星星等温暖元素 |
| **装饰** | 微妙的渐变背景、柔和光晕 |
| **文案** | 鼓励性、正向引导 |

### 避孕模式：冷静专业风

| 维度 | 设计决策 |
|------|----------|
| **主色调** | 灰蓝色系（`slate` + `trust-blue`） |
| **警示色** | 琥珀色/红色用于风险期（`amber` / `red`） |
| **圆角** | 标准圆角（`rounded-xl` / `rounded-2xl`） |
| **阴影** | 清晰边界、无光晕（`border` 为主） |
| **图标** | 盾牌、警告、信息图标 |
| **装饰** | 无装饰、纯色背景 |
| **文案** | 客观、警示性、专业术语 |

---

## 结果展示区差异化设计

### 1. 预测卡片（OvulationPredictionCards）

#### 备孕模式卡片

```
┌─────────────────────────────────────────────────┐
│  💕 排卵日（特色卡片 - 全宽）                      │
│     粉紫渐变背景 + 光晕效果                         │
│     "最佳受孕时机" 标签                            │
└─────────────────────────────────────────────────┘

┌──────────────────┐  ┌──────────────────┐
│ 🌸 易孕期         │  │ 🌙 下次经期       │
│ 绿色温馨边框       │  │ 柔和红色边框      │
│ "把握机会"        │  │ "提前准备"        │
└──────────────────┘  └──────────────────┘

┌──────────────────┐
│ ✨ PMS 预警       │
│ 金色柔和边框       │
│ "关爱自己"        │
└──────────────────┘
```

#### 避孕模式卡片

```
┌─────────────────────────────────────────────────┐
│  ⚠️ 高风险期（特色卡片 - 全宽）                    │
│     琥珀色警示背景 + 清晰边框                       │
│     "建议采取避孕措施" 标签                        │
└─────────────────────────────────────────────────┘

┌──────────────────┐  ┌──────────────────┐
│ 🛡️ 风险期         │  │ 📅 下次经期       │
│ 红色警示边框       │  │ 中性灰色边框      │
│ "严格避孕"        │  │ "预期日期"        │
└──────────────────┘  └──────────────────┘

┌──────────────────┐
│ ℹ️ PMS 预警       │
│ 中性蓝色边框       │
│ "提前知晓"        │
└──────────────────┘
```

### 2. 颜色系统对照表

| 元素 | 备孕模式 | 避孕模式 |
|------|----------|----------|
| **排卵日边框** | `border-violet-400` 渐变 | `border-amber-500` |
| **排卵日背景** | `bg-gradient-to-r from-pink-50 to-violet-50` | `bg-amber-50` |
| **易孕期边框** | `border-emerald-400` | `border-red-400` |
| **易孕期背景** | `bg-emerald-50` | `bg-red-50` |
| **易孕期标签** | "最佳受孕窗口" | "高风险期" |
| **下次经期边框** | `border-rose-300` | `border-slate-300` |
| **下次经期背景** | `bg-rose-50` | `bg-slate-50` |
| **PMS 边框** | `border-amber-300` | `border-blue-300` |
| **PMS 背景** | `bg-amber-50` | `bg-blue-50` |
| **卡片圆角** | `rounded-3xl` | `rounded-2xl` |
| **卡片阴影** | `shadow-lg shadow-primary-200/30` | 无 |

### 3. 日历视图差异化

#### 备孕模式日历
- 易孕期：**绿色高亮** + 小花装饰
- 排卵日：**粉紫渐变** + 心形标记
- 图例文案："🌸 最佳受孕窗口"

#### 避孕模式日历
- 易孕期：**红色警示** + 斜线纹理
- 排卵日：**琥珀色高亮** + 警告图标
- 图例文案："⚠️ 高风险期"

### 4. 文案差异化

| 场景 | 备孕模式 | 避孕模式 |
|------|----------|----------|
| **排卵日标题** | "最佳受孕时机" | "排卵日（高风险）" |
| **易孕期描述** | "精子可存活 5 天，把握这段黄金窗口" | "此期间受孕概率最高，需严格避孕" |
| **下次经期** | "预计开始时间，提前做好准备" | "预期经期开始日期" |
| **PMS 提醒** | "关爱自己，注意休息" | "经前综合征预警期" |
| **行动按钮** | "添加到日历" | "设置提醒" |

---

## 技术实现方案

### 1. 主题配置对象

```typescript
// src/lib/theme/ovulation-theme.ts

type OvulationPurpose = 'conceive' | 'avoid';

interface OvulationTheme {
  // 颜色配置
  colors: {
    ovulation: { border: string; bg: string; text: string };
    fertile: { border: string; bg: string; text: string };
    period: { border: string; bg: string; text: string };
    pms: { border: string; bg: string; text: string };
  };
  // 样式配置
  rounded: string;
  shadow: string;
  // 图标配置
  icons: {
    ovulation: string;
    fertile: string;
    period: string;
    pms: string;
  };
  // 文案 key 前缀
  textPrefix: 'conceive' | 'avoid';
}

export const ovulationThemes: Record<OvulationPurpose, OvulationTheme> = {
  conceive: {
    colors: {
      ovulation: { border: 'border-violet-400', bg: 'bg-gradient-to-r from-pink-50 to-violet-50', text: 'text-violet-700' },
      fertile: { border: 'border-emerald-400', bg: 'bg-emerald-50', text: 'text-emerald-700' },
      period: { border: 'border-rose-300', bg: 'bg-rose-50', text: 'text-rose-700' },
      pms: { border: 'border-amber-300', bg: 'bg-amber-50', text: 'text-amber-700' },
    },
    rounded: 'rounded-3xl',
    shadow: 'shadow-lg shadow-primary-200/30',
    icons: { ovulation: '💕', fertile: '🌸', period: '🌙', pms: '✨' },
    textPrefix: 'conceive',
  },
  avoid: {
    colors: {
      ovulation: { border: 'border-amber-500', bg: 'bg-amber-50', text: 'text-amber-700' },
      fertile: { border: 'border-red-400', bg: 'bg-red-50', text: 'text-red-700' },
      period: { border: 'border-slate-300', bg: 'bg-slate-50', text: 'text-slate-700' },
      pms: { border: 'border-blue-300', bg: 'bg-blue-50', text: 'text-blue-700' },
    },
    rounded: 'rounded-2xl',
    shadow: '',
    icons: { ovulation: '⚠️', fertile: '🛡️', period: '📅', pms: 'ℹ️' },
    textPrefix: 'avoid',
  },
};
```

### 2. 组件改造

**OvulationPredictionCards 组件**：
- 接收 `purpose` prop
- 根据 `purpose` 从主题配置获取样式类
- 文案使用 `t(`${theme.textPrefix}.${key}`)` 获取差异化翻译

**CalendarView 组件**：
- 新增 `purpose` prop
- `getDayCellStyles` 函数根据 purpose 返回不同样式

### 3. 翻译文件扩展

```json
// messages/en.json
{
  "conceive": {
    "ovulationTitle": "Best Time to Conceive",
    "fertileTitle": "Fertile Window",
    "fertileDesc": "Sperm can survive up to 5 days. Seize this golden opportunity.",
    "periodTitle": "Next Period",
    "pmsTitle": "Self-Care Alert"
  },
  "avoid": {
    "ovulationTitle": "Ovulation Day (High Risk)",
    "fertileTitle": "High Risk Period",
    "fertileDesc": "Highest pregnancy probability. Strict contraception required.",
    "periodTitle": "Expected Period",
    "pmsTitle": "PMS Warning Period"
  }
}
```

---

## 受影响文件清单

| 文件 | 改动类型 | 说明 |
|------|----------|------|
| `src/lib/theme/ovulation-theme.ts` | 新建 | 主题配置对象 |
| `src/components/calculator/ovulation-prediction-cards.tsx` | 修改 | 接收 purpose，应用主题样式 |
| `src/components/calculator/calendar-view.tsx` | 修改 | 日历样式差异化 |
| `messages/en.json` | 修改 | 新增差异化文案 |
| `messages/es.json` | 修改 | 新增差异化文案 |
| `messages/fr.json` | 修改 | 新增差异化文案 |

---

## 验证方案

1. **视觉验证**：
   - 切换两种模式，确认卡片、日历颜色和样式正确切换
   - 检查深色模式下的颜色表现

2. **文案验证**：
   - 切换语言，确认两种模式的差异化文案正确显示

3. **功能验证**：
   - 确认计算结果不变，仅视觉呈现差异
   - 确认日历导出功能正常

4. **测试覆盖**：
   - 为主题配置添加单元测试
   - 为组件添加 purpose prop 的渲染测试
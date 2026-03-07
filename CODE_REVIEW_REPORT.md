# Period Calculator 代码审查报告

**项目**: period-calculator  
**审查日期**: 2026-03-07  
**审查者**: 小青 💚  
**仓库**: https://github.com/pang3fan-creator/period-calculator

---

## 📋 审查概览

| 指标 | 数值 |
|------|------|
| 审查文件数 | 25+ |
| 严重问题 | 2 |
| 警告问题 | 5 |
| 建议改进 | 4 |
| 总体评分 | **B+** |

---

## 🐛 发现的问题

### [严重] 安全问题

#### 1. localStorage 存储敏感数据未加密
- **位置**: `src/lib/storage/localStorage.ts`
- **风险**: 用户的生理数据（月经周期信息）以明文存储在 localStorage 中，可能被恶意脚本读取
- **影响**: 隐私泄露风险
- **建议**: 
  - 虽然项目强调"本地存储保护隐私"，但建议对敏感数据进行简单混淆或加密
  - 或在隐私政策中明确说明存储方式

#### 2. 测试命令跨平台兼容性问题
- **位置**: `package.json` line 9
- **问题**: 测试脚本使用 `powershell -Command "npx vitest run"`，在 Linux/macOS 环境下无法运行
- **影响**: CI/CD 流水线可能失败
- **建议**: 修改为 `"test": "vitest run"`

---

### [警告] 代码质量问题

#### 3. SVG 图标重复定义
- **位置**: 
  - `src/components/calculator/results-display.tsx`
  - `src/components/calculator/irregular-period-calculator.tsx`
- **问题**: 相同的 SVG 图标组件（如 `CalendarPlusIcon`, `RefreshIcon`, `GoogleIcon` 等）在多个文件中重复定义
- **影响**: 代码冗余，维护困难
- **建议**: 提取到 `src/components/icons/` 目录统一管理

#### 4. 未使用的函数参数
- **位置**: `src/components/calculator/results-display.tsx` line 75
- **问题**: `cycleData` 参数被声明但未使用，仅用 `void cycleData` 忽略
- **建议**: 如果确实不需要，应从接口中移除；如果将来需要，添加注释说明

#### 5. 滚动事件未使用 throttle/debounce
- **位置**: `src/components/layout/header.tsx` line 35-54
- **问题**: `scroll` 事件监听器没有使用 throttle 或 debounce，可能导致性能问题
- **影响**: 滚动时频繁触发重渲染
- **建议**: 使用 `lodash.throttle` 或自定义 throttle 函数

#### 6. 测试覆盖率不足
- **位置**: `src/lib/calculator/`
- **问题**: 仅有 `cycle-calculator.test.ts`，缺少以下模块的测试：
  - `irregular-calculator.ts`
  - `validation.ts`
  - `ics-generator.ts`
  - `localStorage.ts`
- **建议**: 增加单元测试覆盖

#### 7. JSON-LD 组件使用 dangerouslySetInnerHTML
- **位置**: `src/components/seo/json-ld.tsx`
- **问题**: 使用 `dangerouslySetInnerHTML` 注入 JSON-LD
- **风险**: 如果数据被污染，可能导致 XSS
- **缓解**: 当前数据源是服务器端的翻译数据，风险较低
- **建议**: 添加数据验证，确保只包含有效的 JSON 对象

---

### [建议] 改进建议

#### 8. 缺少错误边界（Error Boundary）
- **位置**: 应用根组件
- **问题**: 没有全局错误边界捕获渲染错误
- **建议**: 添加 `ErrorBoundary` 组件，提供友好的错误页面

#### 9. Header 组件中的隐藏超时可能内存泄漏
- **位置**: `src/components/layout/header.tsx` line 43-48
- **问题**: `hideTimeoutRef` 在组件卸载时清理，但如果快速切换页面可能有问题
- **现状**: 已有清理逻辑，风险较低
- **建议**: 无需修改，当前实现正确

#### 10. TypeScript 类型可以更严格
- **位置**: 多处
- **问题**: 部分类型使用 `Record<string, unknown>` 可以更精确
- **示例**: `src/components/seo/json-ld.tsx` 的 `data` 参数
- **建议**: 定义具体的 Schema 类型

#### 11. PWA 配置待验证
- **位置**: `public/manifest.json`（如果存在）
- **问题**: PRD 提到 PWA 支持，但未验证配置是否完整
- **建议**: 检查 manifest.json、Service Worker 配置

---

## ✅ 做得好的地方

### 安全方面
1. ✅ **无硬编码凭证** - 搜索敏感词未发现密码、密钥泄露
2. ✅ **无环境变量文件** - 项目中没有 `.env` 文件被提交
3. ✅ **HSTS 安全头** - `next.config.ts` 配置了 `Strict-Transport-Security`
4. ✅ **外部链接安全** - 使用 `noopener,noreferrer` 防止 tabnabbing

### 代码质量
1. ✅ **良好的 TypeScript 类型定义** - 类型清晰，注释完善
2. ✅ **ESLint 通过** - 无 lint 错误
3. ✅ **医疗标准引用** - 算法基于 ACOG 指南，有明确引用
4. ✅ **国际化支持完善** - 使用 `next-intl`，支持多语言
5. ✅ **无障碍性考虑** - 使用 `aria-*` 属性，键盘支持

### 架构设计
1. ✅ **关注点分离** - Calculator、Storage、Validation 模块划分清晰
2. ✅ **Server/Client Component 分离** - 正确使用 Next.js App Router
3. ✅ **SEO 优化完善** - JSON-LD Schema、Metadata API 使用正确

---

## 📊 详细问题分类

### 按严重程度

| 级别 | 数量 | 描述 |
|------|------|------|
| 🔴 Critical | 0 | 无阻断性问题 |
| 🟠 High | 2 | 测试命令跨平台问题、localStorage 加密 |
| 🟡 Medium | 5 | 代码重复、性能优化、测试覆盖 |
| 🟢 Low | 4 | 类型优化、PWA 配置验证 |

### 按类别

| 类别 | 数量 |
|------|------|
| 安全性 | 2 |
| 代码质量 | 4 |
| 性能 | 1 |
| 可维护性 | 2 |
| 测试 | 2 |

---

## 🔧 修复建议优先级

### P0 - 立即修复
1. 修复 `package.json` 测试命令的跨平台兼容性问题

### P1 - 短期修复
2. 提取重复的 SVG 图标组件
3. 增加 `irregular-calculator.ts` 单元测试
4. 为 Header 滚动事件添加 throttle

### P2 - 中期改进
5. 完善 localStorage 数据加密或明确说明存储方式
6. 增加更多模块的测试覆盖
7. 添加全局 Error Boundary

### P3 - 长期优化
8. 优化 TypeScript 类型定义
9. 验证 PWA 配置完整性

---

## 📈 代码质量指标

```
ESLint:          ✅ 通过 (0 errors, 0 warnings)
TypeScript:      ✅ 类型正确
测试覆盖:        ⚠️ 仅核心算法有测试
文档:            ✅ 注释完善，引用清晰
安全扫描:        ✅ 无敏感信息泄露
```

---

## 💚 小青总结

这个经期计算器项目整体质量不错！代码结构清晰，TypeScript 使用规范，安全意识也到位。主要问题集中在：

1. **测试命令跨平台兼容性** - 这是最需要立即修复的问题
2. **代码重复** - SVG 图标应该提取复用
3. **测试覆盖率** - 需要增加更多模块的测试

项目最大的优点是**安全意识到位**：无凭证泄露、正确配置安全头、外部链接安全。这对于一个处理敏感生理数据的应用来说非常重要。

建议主人优先修复测试命令和图标重复的问题，其他可以逐步改进。

---

**审查完成时间**: 2026-03-07 17:30 (Asia/Shanghai)  
**下次审查建议**: 重大功能更新后
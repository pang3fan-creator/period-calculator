export interface CycleData {
  lastPeriodStart: Date;
  cycleLength: number;
  periodLength: number;
}

export interface PredictionResult {
  nextPeriodStart: Date;
  nextPeriodEnd: Date;
  fertileWindowStart: Date;
  fertileWindowEnd: Date;
  ovulationDate: Date;
  pmsStart: Date;
  pmsEnd: Date;
}

// 不规律周期计算器类型
export interface IrregularCycleData {
  historicalCycles: Date[]; // 历史月经开始日期数组（至少3个）
  periodLength: number; // 月经持续天数
}

export type ConfidenceLevel = "high" | "medium" | "low";

export interface PredictedWindow {
  earliest: Date; // 最早可能开始日期
  latest: Date; // 最晚可能开始日期
  mostLikely: Date; // 最可能日期（均值）
}

export interface IrregularPredictionResult {
  predictedWindow: PredictedWindow;
  averageCycleLength: number;
  standardDeviation: number;
  confidenceLevel: ConfidenceLevel;
  // 与现有 PredictionResult 兼容的字段
  nextPeriodStart: Date;
  nextPeriodEnd: Date;
  fertileWindowStart: Date;
  fertileWindowEnd: Date;
  ovulationDate: Date;
  pmsStart: Date;
  pmsEnd: Date;
}

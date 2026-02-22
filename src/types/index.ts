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

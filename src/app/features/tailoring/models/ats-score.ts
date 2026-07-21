export interface AtsCheckItem {
  name: string;
  passed: boolean;
  detail: string;
}

export interface AtsScoreResult {
  score: number;
  checks: AtsCheckItem[];
}


export enum MuscleGroup {
  Chest = '胸部',
  Back = '背部',
  Legs = '腿部',
  Shoulders = '肩部',
  Arms = '手臂',
  Core = '核心',
  Cardio = '有氧'
}

// 這裡的 key 對應 MuscleMap 組件中的 SVG ID
export type MuscleID = 
  | 'chest' | 'abs' | 'obliques' // 前面
  | 'quads' | 'calves' | 'biceps' | 'forearms' | 'front-delts' // 前面四肢
  | 'traps' | 'lats' | 'lower-back' // 背面
  | 'glutes' | 'hamstrings' | 'triceps' | 'rear-delts'; // 背面四肢

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  description: string;
  targetMuscles: MuscleID[]; // 用於高亮地圖
  primaryMusclesText: string[]; // 顯示文字 (如：胸大肌)
  difficulty: '初階' | '中階' | '高階';
  variants: string[]; // 例如 ['徒手', '啞鈴', '槓鈴']
  images: string[]; // 預設圖片 (輪播)
  variantImages?: Record<string, string[]>; // 變體對應圖片: { '啞鈴': ['url1', 'url2'] }
}

// 購物車/計畫中的單項 (包含選擇的變體與訓練量)
export interface PlanItem {
  instanceId: string; // 唯一 ID
  exerciseId: string;
  variant: string;
  name: string;
  // 新增訓練量設定
  sets: number;
  reps: number;
  weight: number; // 單位 kg，0 代表自重
  completed: boolean; // 用於 TODO List
}

// 自訂組合 (User Presets)
export interface CustomPreset {
  id: string;
  name: string;
  items: Omit<PlanItem, 'instanceId' | 'completed'>[]; // 儲存時不需要 instanceId 和完成狀態
  createdAt: number;
}

// 歷史紀錄
export interface WorkoutRecord {
  id: string;
  date: string; // ISO String
  items: PlanItem[];
  totalSets: number;
  totalVolume: number; // 簡單的總量計算
}

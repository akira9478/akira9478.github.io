
import { Exercise, MuscleGroup } from './types';

// 使用 GitHub 上整理好的 Everkinetic 圖庫 (Raw Links)
// 來源: https://github.com/yuhonas/free-exercise-db
const IMG_BASE = "https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises";

export const EXERCISES: Exercise[] = [
  // --- 胸部 ---
  {
    id: 'chest-1',
    name: '伏地挺身 Push-up',
    muscleGroup: MuscleGroup.Chest,
    description: '經典的上肢推力動作，透過改變雙手距離與角度刺激不同部位。',
    targetMuscles: ['chest', 'front-delts', 'triceps', 'abs'],
    primaryMusclesText: ['胸大肌', '前三角肌', '三頭肌'],
    difficulty: '初階',
    variants: ['標準 Standard', '跪姿 Kneeling', '寬距 Wide', '鑽石 (窄距) Diamond'],
    images: [
      `${IMG_BASE}/Pushups/0.jpg`,
      `${IMG_BASE}/Pushups/1.jpg`
    ],
    variantImages: {
      '跪姿 Kneeling': [`${IMG_BASE}/Kneeling_Pushups/0.jpg`, `${IMG_BASE}/Kneeling_Pushups/1.jpg`],
      '寬距 Wide': [`${IMG_BASE}/Wide_Hands_Pushup/0.jpg`, `${IMG_BASE}/Wide_Hands_Pushup/1.jpg`],
      '鑽石 (窄距) Diamond': [`${IMG_BASE}/Diamond_Pushup/0.jpg`, `${IMG_BASE}/Diamond_Pushup/1.jpg`]
    }
  },
  {
    id: 'chest-2',
    name: '臥推 Bench Press',
    muscleGroup: MuscleGroup.Chest,
    description: '健身房王牌動作，能最大化發展上身推力與肌肉量。',
    targetMuscles: ['chest', 'front-delts', 'triceps'],
    primaryMusclesText: ['胸大肌', '三頭肌'],
    difficulty: '中階',
    variants: ['槓鈴平板 Barbell Flat', '啞鈴平板 Dumbbell Flat', '上斜啞鈴 Incline', '下斜啞鈴 Decline'],
    images: [
      `${IMG_BASE}/Barbell_Bench_Press_-_Medium_Grip/0.jpg`,
      `${IMG_BASE}/Barbell_Bench_Press_-_Medium_Grip/1.jpg`
    ],
    variantImages: {
      '啞鈴平板 Dumbbell Flat': [`${IMG_BASE}/Dumbbell_Bench_Press/0.jpg`, `${IMG_BASE}/Dumbbell_Bench_Press/1.jpg`],
      '上斜啞鈴 Incline': [`${IMG_BASE}/Incline_Dumbbell_Bench_Press/0.jpg`, `${IMG_BASE}/Incline_Dumbbell_Bench_Press/1.jpg`],
      '下斜啞鈴 Decline': [`${IMG_BASE}/Decline_Dumbbell_Bench_Press/0.jpg`, `${IMG_BASE}/Decline_Dumbbell_Bench_Press/1.jpg`]
    }
  },
  {
    id: 'chest-3',
    name: '飛鳥夾胸 Chest Fly',
    muscleGroup: MuscleGroup.Chest,
    description: '孤立胸肌的動作，專注於肌肉的伸展與收縮感。',
    targetMuscles: ['chest', 'front-delts'],
    primaryMusclesText: ['胸大肌 (內側)'],
    difficulty: '中階',
    variants: ['啞鈴飛鳥 Dumbbell', '繩索夾胸 Cable', '機械式夾胸 Machine'],
    images: [
      `${IMG_BASE}/Dumbbell_Flyes/0.jpg`,
      `${IMG_BASE}/Dumbbell_Flyes/1.jpg`
    ],
    variantImages: {
       '繩索夾胸 Cable': [`${IMG_BASE}/Cable_Crossover/0.jpg`, `${IMG_BASE}/Cable_Crossover/1.jpg`],
       '機械式夾胸 Machine': [`${IMG_BASE}/Butterfly/0.jpg`, `${IMG_BASE}/Butterfly/1.jpg`]
    }
  },

  // --- 背部 ---
  {
    id: 'back-1',
    name: '引體向上 Pull-up',
    muscleGroup: MuscleGroup.Back,
    description: '垂直拉力動作，打造倒三角體型的關鍵。',
    targetMuscles: ['lats', 'biceps', 'traps', 'forearms'],
    primaryMusclesText: ['闊背肌', '二頭肌', '圓肌'],
    difficulty: '高階',
    variants: ['正手 Pull-up', '反手 Chin-up', '機械下拉 Lat Pulldown'],
    images: [
      `${IMG_BASE}/Pullups/0.jpg`,
      `${IMG_BASE}/Pullups/1.jpg`
    ],
    variantImages: {
      '反手 Chin-up': [`${IMG_BASE}/Chinups/0.jpg`, `${IMG_BASE}/Chinups/1.jpg`],
      '機械下拉 Lat Pulldown': [`${IMG_BASE}/Cable_Pulldown/0.jpg`, `${IMG_BASE}/Cable_Pulldown/1.jpg`]
    }
  },
  {
    id: 'back-2',
    name: '俯身划船 Barbell Row',
    muscleGroup: MuscleGroup.Back,
    description: '水平拉力動作，增加背部厚度與改善圓肩。',
    targetMuscles: ['lats', 'traps', 'rear-delts', 'biceps', 'lower-back'],
    primaryMusclesText: ['闊背肌', '斜方肌', '菱形肌'],
    difficulty: '中階',
    variants: ['槓鈴俯身 Barbell Bent-over', '單手啞鈴 Dumbbell', '反向划船 Inverted'],
    images: [
      `${IMG_BASE}/Bent_Over_Barbell_Row/0.jpg`,
      `${IMG_BASE}/Bent_Over_Barbell_Row/1.jpg`
    ],
    variantImages: {
      '單手啞鈴 Dumbbell': [`${IMG_BASE}/Dumbbell_Row/0.jpg`, `${IMG_BASE}/Dumbbell_Row/1.jpg`],
      '反向划船 Inverted': [`${IMG_BASE}/Inverted_Row/0.jpg`, `${IMG_BASE}/Inverted_Row/1.jpg`]
    }
  },
  {
    id: 'back-3',
    name: '硬舉 Deadlift',
    muscleGroup: MuscleGroup.Back,
    description: '全身性力量動作，強化後側鏈條，提升整體力量。',
    targetMuscles: ['lower-back', 'glutes', 'hamstrings', 'traps', 'forearms', 'quads'],
    primaryMusclesText: ['豎脊肌', '臀大肌', '腿後側'],
    difficulty: '高階',
    variants: ['傳統槓鈴 Conventional', '羅馬尼亞 RDL', '相撲 Sumo'],
    images: [
      `${IMG_BASE}/Barbell_Deadlift/0.jpg`,
      `${IMG_BASE}/Barbell_Deadlift/1.jpg`
    ],
    variantImages: {
      '羅馬尼亞 RDL': [`${IMG_BASE}/Romanian_Deadlift/0.jpg`, `${IMG_BASE}/Romanian_Deadlift/1.jpg`],
      '相撲 Sumo': [`${IMG_BASE}/Sumo_Deadlift/0.jpg`, `${IMG_BASE}/Sumo_Deadlift/1.jpg`]
    }
  },

  // --- 腿部 ---
  {
    id: 'legs-1',
    name: '深蹲 Squat',
    muscleGroup: MuscleGroup.Legs,
    description: '動作之王。訓練下肢力量、爆發力與核心穩定的最佳選擇。',
    targetMuscles: ['quads', 'glutes', 'hamstrings', 'lower-back', 'abs'],
    primaryMusclesText: ['股四頭肌', '臀大肌', '內收肌'],
    difficulty: '中階',
    variants: ['徒手 Bodyweight', '槓鈴頸後 Back Squat', '高腳杯 Goblet', '前蹲舉 Front Squat'],
    images: [
      `${IMG_BASE}/Barbell_Squat/0.jpg`,
      `${IMG_BASE}/Barbell_Squat/1.jpg`
    ],
    variantImages: {
      '徒手 Bodyweight': [`${IMG_BASE}/Air_Squat/0.jpg`, `${IMG_BASE}/Air_Squat/1.jpg`],
      '高腳杯 Goblet': [`${IMG_BASE}/Goblet_Squat/0.jpg`, `${IMG_BASE}/Goblet_Squat/1.jpg`],
      '前蹲舉 Front Squat': [`${IMG_BASE}/Front_Squat/0.jpg`, `${IMG_BASE}/Front_Squat/1.jpg`]
    }
  },
  {
    id: 'legs-2',
    name: '弓箭步 Lunge',
    muscleGroup: MuscleGroup.Legs,
    description: '單腳功能性訓練，改善左右肌力不均與平衡感。',
    targetMuscles: ['quads', 'glutes', 'hamstrings', 'calves'],
    primaryMusclesText: ['股四頭肌', '臀大肌'],
    difficulty: '中階',
    variants: ['啞鈴前行 Walking', '原地啞鈴 Dumbbell', '保加利亞分腿蹲 Bulgarian Split'],
    images: [
      `${IMG_BASE}/Dumbbell_Lunges/0.jpg`,
      `${IMG_BASE}/Dumbbell_Lunges/1.jpg`
    ],
    variantImages: {
      '啞鈴前行 Walking': [`${IMG_BASE}/Dumbbell_Lunges/0.jpg`, `${IMG_BASE}/Dumbbell_Lunges/1.jpg`], 
      '保加利亞分腿蹲 Bulgarian Split': [`${IMG_BASE}/Split_Squat/0.jpg`, `${IMG_BASE}/Split_Squat/1.jpg`]
    }
  },
  {
    id: 'legs-3',
    name: '腿推舉 Leg Press',
    muscleGroup: MuscleGroup.Legs,
    description: '機械式輔助訓練，能安全地對腿部肌群施加高強度負荷。',
    targetMuscles: ['quads', 'hamstrings'],
    primaryMusclesText: ['股四頭肌', '腿後側'],
    difficulty: '初階',
    variants: ['機械腿推 Leg Press', '坐姿腿屈伸 Leg Extension', '趴姿腿後勾 Leg Curl'],
    images: [
      `${IMG_BASE}/Leg_Press/0.jpg`,
      `${IMG_BASE}/Leg_Press/1.jpg`
    ],
    variantImages: {
      '坐姿腿屈伸 Leg Extension': [`${IMG_BASE}/Leg_Extensions/0.jpg`, `${IMG_BASE}/Leg_Extensions/1.jpg`],
      '趴姿腿後勾 Leg Curl': [`${IMG_BASE}/Lying_Leg_Curls/0.jpg`, `${IMG_BASE}/Lying_Leg_Curls/1.jpg`]
    }
  },
  {
    id: 'legs-4',
    name: '提踵 Calf Raise',
    muscleGroup: MuscleGroup.Legs,
    description: '針對小腿肌群的訓練，增加腳踝穩定性與爆發力。',
    targetMuscles: ['calves'],
    primaryMusclesText: ['腓腸肌', '比目魚肌'],
    difficulty: '初階',
    variants: ['啞鈴負重 Weighted', '徒手 Standing', '坐姿機械 Seated'],
    images: [
      `${IMG_BASE}/Dumbbell_Calf_Raise/0.jpg`,
      `${IMG_BASE}/Dumbbell_Calf_Raise/1.jpg`
    ],
    variantImages: {
      '徒手 Standing': [`${IMG_BASE}/Standing_Calf_Raises/0.jpg`, `${IMG_BASE}/Standing_Calf_Raises/1.jpg`],
      '坐姿機械 Seated': [`${IMG_BASE}/Seated_Calf_Raise/0.jpg`, `${IMG_BASE}/Seated_Calf_Raise/1.jpg`]
    }
  },

  // --- 肩部 ---
  {
    id: 'shoulders-1',
    name: '肩推 Shoulder Press',
    muscleGroup: MuscleGroup.Shoulders,
    description: '垂直推力動作，打造飽滿的肩膀線條。',
    targetMuscles: ['front-delts', 'triceps', 'traps'],
    primaryMusclesText: ['前三角肌', '中三角肌', '三頭肌'],
    difficulty: '中階',
    variants: ['站姿槓鈴 Barbell', '坐姿啞鈴 Dumbbell', '阿諾推舉 Arnold'],
    images: [
      `${IMG_BASE}/Barbell_Shoulder_Press/0.jpg`,
      `${IMG_BASE}/Barbell_Shoulder_Press/1.jpg`
    ],
    variantImages: {
      '坐姿啞鈴 Dumbbell': [`${IMG_BASE}/Seated_Dumbbell_Shoulder_Press/0.jpg`, `${IMG_BASE}/Seated_Dumbbell_Shoulder_Press/1.jpg`],
      '阿諾推舉 Arnold': [`${IMG_BASE}/Arnold_Press/0.jpg`, `${IMG_BASE}/Arnold_Press/1.jpg`]
    }
  },
  {
    id: 'shoulders-2',
    name: '側平舉 Lateral Raise',
    muscleGroup: MuscleGroup.Shoulders,
    description: '孤立中束三角肌，讓肩膀看起來更寬的關鍵動作。',
    targetMuscles: ['front-delts', 'rear-delts'], 
    primaryMusclesText: ['中三角肌'],
    difficulty: '初階',
    variants: ['啞鈴 Dumbbell', '繩索 Cable'],
    images: [
      `${IMG_BASE}/Side_Lateral_Raise/0.jpg`,
      `${IMG_BASE}/Side_Lateral_Raise/1.jpg`
    ],
    variantImages: {
       '繩索 Cable': [`${IMG_BASE}/Cable_Lateral_Raise/0.jpg`, `${IMG_BASE}/Cable_Lateral_Raise/1.jpg`]
    }
  },

  // --- 手臂 ---
  {
    id: 'arms-1',
    name: '二頭彎舉 Bicep Curl',
    muscleGroup: MuscleGroup.Arms,
    description: '手臂屈曲動作，增加上臂圍度。',
    targetMuscles: ['biceps', 'forearms'],
    primaryMusclesText: ['肱二頭肌'],
    difficulty: '初階',
    variants: ['槓鈴 Barbell', '啞鈴 Dumbbell', '集中彎舉 Concentration', '錘式 Hammer'],
    images: [
      `${IMG_BASE}/Barbell_Curl/0.jpg`,
      `${IMG_BASE}/Barbell_Curl/1.jpg`
    ],
    variantImages: {
      '啞鈴 Dumbbell': [`${IMG_BASE}/Dumbbell_Bicep_Curl/0.jpg`, `${IMG_BASE}/Dumbbell_Bicep_Curl/1.jpg`],
      '錘式 Hammer': [`${IMG_BASE}/Hammer_Curls/0.jpg`, `${IMG_BASE}/Hammer_Curls/1.jpg`],
      '集中彎舉 Concentration': [`${IMG_BASE}/Concentration_Curls/0.jpg`, `${IMG_BASE}/Concentration_Curls/1.jpg`]
    }
  },
  {
    id: 'arms-2',
    name: '三頭伸展 Tricep Ext',
    muscleGroup: MuscleGroup.Arms,
    description: '手臂伸展動作，消除掰掰袖，增加推力。',
    targetMuscles: ['triceps'],
    primaryMusclesText: ['肱三頭肌'],
    difficulty: '初階',
    variants: ['繩索下壓 Cable Pushdown', '啞鈴頸後 Overhead', '板凳臂屈伸 Dips'],
    images: [
      `${IMG_BASE}/Pushdowns/0.jpg`,
      `${IMG_BASE}/Pushdowns/1.jpg`
    ],
    variantImages: {
      '板凳臂屈伸 Dips': [`${IMG_BASE}/Bench_Dips/0.jpg`, `${IMG_BASE}/Bench_Dips/1.jpg`],
      '啞鈴頸後 Overhead': [`${IMG_BASE}/Seated_Triceps_Press/0.jpg`, `${IMG_BASE}/Seated_Triceps_Press/1.jpg`]
    }
  },

  // --- 核心 ---
  {
    id: 'core-1',
    name: '平板支撐 Plank',
    muscleGroup: MuscleGroup.Core,
    description: '等長收縮訓練，建立深層核心穩定性。',
    targetMuscles: ['abs', 'obliques', 'front-delts'],
    primaryMusclesText: ['腹橫肌', '腹直肌'],
    difficulty: '初階',
    variants: ['標準 Standard', '側向 Side Plank'],
    images: [
      `${IMG_BASE}/Plank/0.jpg`,
      `${IMG_BASE}/Plank/1.jpg`
    ],
    variantImages: {
      '側向 Side Plank': [`${IMG_BASE}/Side_Plank/0.jpg`, `${IMG_BASE}/Side_Plank/1.jpg`]
    }
  },
  {
    id: 'core-2',
    name: '捲腹 Crunch',
    muscleGroup: MuscleGroup.Core,
    description: '針對腹直肌的收縮訓練，打造六塊肌線條。',
    targetMuscles: ['abs'],
    primaryMusclesText: ['腹直肌'],
    difficulty: '初階',
    variants: ['徒手捲腹 Crunch', '懸垂抬腿 Hanging Leg Raise'],
    images: [
      `${IMG_BASE}/Crunches/0.jpg`,
      `${IMG_BASE}/Crunches/1.jpg`
    ],
    variantImages: {
      '懸垂抬腿 Hanging Leg Raise': [`${IMG_BASE}/Hanging_Leg_Raise/0.jpg`, `${IMG_BASE}/Hanging_Leg_Raise/1.jpg`]
    }
  },

  // --- 有氧 ---
  {
    id: 'cardio-1',
    name: '波比跳 Burpees',
    muscleGroup: MuscleGroup.Cardio,
    description: '短時間高強度的全身爆發，快速燃脂。',
    targetMuscles: ['quads', 'calves', 'abs', 'chest', 'lats'], // 全身
    primaryMusclesText: ['心肺', '全身肌群'],
    difficulty: '中階',
    variants: ['波比跳 Burpees', '開合跳 Jumping Jacks', '登山者 Mountain Climber'],
    images: [
      `${IMG_BASE}/Burpees/0.jpg`,
      `${IMG_BASE}/Burpees/1.jpg`
    ],
    variantImages: {
      '開合跳 Jumping Jacks': [`${IMG_BASE}/Jumping_Jacks/0.jpg`, `${IMG_BASE}/Jumping_Jacks/1.jpg`],
      '登山者 Mountain Climber': [`${IMG_BASE}/Mountain_Climbers/0.jpg`, `${IMG_BASE}/Mountain_Climbers/1.jpg`]
    }
  }
];

export const PRESETS = {
  FULL_BODY: ['legs-1', 'chest-1', 'back-2', 'shoulders-1', 'core-1'],
  UPPER_BODY: ['chest-2', 'back-1', 'shoulders-1', 'arms-1', 'arms-2'],
  LOWER_BODY: ['legs-1', 'legs-3', 'legs-2', 'legs-4', 'core-2'],
  ATHLETE_BALANCE: ['back-3', 'legs-2', 'shoulders-1', 'back-1', 'core-1'] // 運動員平衡
};

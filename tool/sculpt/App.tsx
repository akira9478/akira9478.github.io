
import React, { useState, useEffect } from 'react';
import { Play, Plus, Trash2, Info, ChevronRight, Activity, Dumbbell, Zap, Layers, User, Check, Calendar, ChevronLeft, Save, History, Share2, Download, Upload, X, Copy } from 'lucide-react';
import { EXERCISES, PRESETS } from './constants';
import { Exercise, MuscleGroup, PlanItem, WorkoutRecord, CustomPreset } from './types';
import ExerciseIllustration from './components/ExerciseIllustration';
import InfoModal from './components/InfoModal';

// --- Helpers ---
const generateHashFromItems = (items: PlanItem[]) => {
  if (items.length === 0) return '';
  const simpleData = items.map(item => ({
    id: item.exerciseId,
    v: item.variant,
    s: item.sets,
    r: item.reps,
    w: item.weight
  }));
  // Use UTF-8 compatible encoding
  return btoa(unescape(encodeURIComponent(JSON.stringify(simpleData))));
};

const decodeItemsFromHash = (hash: string) => {
  try {
    const jsonStr = decodeURIComponent(escape(atob(hash)));
    return JSON.parse(jsonStr);
  } catch (e) {
    throw new Error("Invalid hash");
  }
}

const copyToClipboard = (text: string) => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).catch(err => console.error("Clipboard write failed", err));
  } else {
    // Fallback
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
    document.body.removeChild(textArea);
  }
};

// --- Hooks ---
const useLockBodyScroll = (isLocked: boolean) => {
  useEffect(() => {
    if (!isLocked) return;

    // 1. Record the current scroll position
    const scrollY = window.scrollY;
    
    // 2. Lock the body with position: fixed and negative top
    // This physically locks the viewport but keeps the visual position
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflowY = 'scroll'; // Force scrollbar to prevent layout shift

    return () => {
      // 3. Restore styles
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
      
      // 4. Restore scroll position instantly
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    };
  }, [isLocked]);
};

// --- Toast Component ---
const Toast: React.FC<{ message: string, onClose: () => void }> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-slate-800 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 animate-slide-up">
      <Check size={16} className="text-green-400" />
      <span className="text-sm font-bold">{message}</span>
    </div>
  );
};

// --- Modals ---

// 1. Plan Config Modal
interface PlanConfigModalProps {
  exercise: Exercise;
  variant: string;
  onClose: () => void;
  onConfirm: (sets: number, reps: number, weight: number) => void;
}

const PlanConfigModal: React.FC<PlanConfigModalProps> = ({ exercise, variant, onClose, onConfirm }) => {
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);
  const [weight, setWeight] = useState(0);

  // Lock scroll
  useLockBodyScroll(true);

  return (
    <div className="fixed inset-0 z-[70] flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={onClose}></div>
      <div className="relative z-10 bg-white w-full md:w-96 p-6 rounded-t-3xl md:rounded-2xl shadow-xl animate-slide-up">
        <div className="flex justify-between items-start mb-4">
           <div>
            <h3 className="text-xl font-bold text-slate-900">{exercise.name}</h3>
            <p className="text-sm text-blue-600 font-medium">{variant}</p>
           </div>
           <button onClick={onClose} className="p-1 bg-slate-100 rounded-full text-slate-500"><X size={20}/></button>
        </div>
        
        <div className="space-y-6 mb-8">
          <div>
            <label className="flex justify-between text-sm font-bold text-slate-700 mb-3">
              組數 (Sets)
              <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-xs">{sets} 組</span>
            </label>
            <input type="range" min="1" max="10" value={sets} onChange={e => setSets(Number(e.target.value))} className="w-full accent-slate-900 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1"><span>1</span><span>10</span></div>
          </div>
          <div>
            <label className="flex justify-between text-sm font-bold text-slate-700 mb-3">
              每組次數 (Reps)
              <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-xs">{reps} 下</span>
            </label>
            <input type="range" min="1" max="30" value={reps} onChange={e => setReps(Number(e.target.value))} className="w-full accent-slate-900 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1"><span>1</span><span>30</span></div>
          </div>
          <div>
            <label className="flex justify-between text-sm font-bold text-slate-700 mb-2">
              負重 (Kg)
              <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-xs">{weight} kg</span>
            </label>
            <div className="flex items-center gap-3">
              <button onClick={() => setWeight(Math.max(0, weight - 2.5))} className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-200 transition">-</button>
              <input 
                type="number" 
                value={weight} 
                onChange={e => setWeight(Math.max(0, Number(e.target.value)))}
                className="flex-1 text-center bg-slate-50 border border-slate-200 rounded-xl py-2 font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none" 
              />
              <button onClick={() => setWeight(weight + 2.5)} className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-200 transition">+</button>
            </div>
            <p className="text-[10px] text-slate-400 mt-2 text-center">* 輸入 0 代表自重訓練</p>
          </div>
        </div>

        <button 
          onClick={() => onConfirm(sets, reps, weight)}
          className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 shadow-lg shadow-slate-300 transition flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          加入訓練清單
        </button>
      </div>
    </div>
  );
};

// 2. Import Modal
interface ImportModalProps {
  onImport: (items: PlanItem[]) => void;
  onClose: () => void;
}

const ImportModal: React.FC<ImportModalProps> = ({ onImport, onClose }) => {
  const [importCode, setImportCode] = useState('');
  const [error, setError] = useState('');

  useLockBodyScroll(true);

  const handleImport = () => {
    try {
      if (!importCode) return;
      
      const simpleData = decodeItemsFromHash(importCode.trim());
      
      if (!Array.isArray(simpleData)) throw new Error("Invalid Format");

      const newItems: PlanItem[] = simpleData.map((item: any) => {
        const exercise = EXERCISES.find(e => e.id === item.id);
        if (!exercise) return null;
        return {
          instanceId: Date.now().toString() + Math.random().toString(),
          exerciseId: item.id,
          variant: item.v || exercise.variants[0],
          name: exercise.name,
          sets: item.s || 3,
          reps: item.r || 10,
          weight: item.w || 0,
          completed: false
        };
      }).filter((i): i is PlanItem => i !== null);

      if (newItems.length === 0) throw new Error("No valid exercises found");

      onImport(newItems);
      onClose();
    } catch (e) {
      console.error(e);
      setError("代碼無效。請確認代碼完整性。");
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}></div>
      <div className="relative z-10 bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl animate-slide-up">
        <h3 className="text-lg font-bold text-slate-900 mb-4">匯入訓練代碼</h3>
        <div className="space-y-4">
            <p className="text-sm text-slate-500">貼上朋友分享的訓練代碼來載入菜單。</p>
            <textarea 
              value={importCode}
              onChange={(e) => { setImportCode(e.target.value); setError(''); }}
              placeholder="在此貼上代碼..."
              className="w-full h-32 bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-mono focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
            {error && <p className="text-xs text-red-500 font-bold">{error}</p>}
            <button 
              onClick={handleImport}
              className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition flex items-center justify-center gap-2"
            >
              <Download size={18} />
              載入訓練
            </button>
            <button onClick={onClose} className="w-full py-3 text-slate-400 font-bold hover:text-slate-600 text-sm">關閉</button>
        </div>
      </div>
    </div>
  );
}

// 3. Save Preset Modal
interface SavePresetModalProps {
  onSave: (name: string) => void;
  onClose: () => void;
}

const SavePresetModal: React.FC<SavePresetModalProps> = ({ onSave, onClose }) => {
  const [name, setName] = useState('');
  useLockBodyScroll(true);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}></div>
      <div className="relative z-10 bg-white w-full max-w-sm p-6 rounded-2xl shadow-2xl animate-slide-up">
        <h3 className="text-lg font-bold text-slate-900 mb-2">儲存組合</h3>
        <p className="text-sm text-slate-500 mb-4">為這個訓練菜單取個名字，方便下次快速載入。</p>
        
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="例如：週一胸背訓練"
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 outline-none mb-4"
          autoFocus
        />
        
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 text-slate-500 font-bold hover:bg-slate-50 rounded-xl transition">取消</button>
          <button 
            disabled={!name.trim()}
            onClick={() => onSave(name)}
            className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            儲存
          </button>
        </div>
      </div>
    </div>
  );
};


const App: React.FC = () => {
  // --- State ---
  type ViewState = 'hero' | 'builder' | 'workout' | 'history';
  const [view, setView] = useState<ViewState>('hero');
  
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup | '全部'>('全部');
  const [myPlan, setMyPlan] = useState<PlanItem[]>([]);
  const [history, setHistory] = useState<WorkoutRecord[]>([]);
  const [customPresets, setCustomPresets] = useState<CustomPreset[]>([]);
  
  const [activeInfoExercise, setActiveInfoExercise] = useState<Exercise | null>(null);
  const [pendingConfig, setPendingConfig] = useState<{exercise: Exercise, variant: string} | null>(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showSavePresetModal, setShowSavePresetModal] = useState(false);
  
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  // --- Effects ---
  useEffect(() => {
    const savedHistory = localStorage.getItem('sculpt_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }

    const savedPresets = localStorage.getItem('sculpt_custom_presets');
    if (savedPresets) {
      try {
        setCustomPresets(JSON.parse(savedPresets));
      } catch (e) {
        console.error("Failed to parse custom presets", e);
      }
    }
  }, []);

  // Scroll to top when view changes, but not inside modals
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  // --- Handlers ---
  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const handleStart = () => {
    setView('builder');
  };

  const handleVariantChange = (exerciseId: string, variant: string) => {
    setSelectedVariants(prev => ({ ...prev, [exerciseId]: variant }));
  };

  const initiateAdd = (exercise: Exercise) => {
    const variant = selectedVariants[exercise.id] || exercise.variants[0];
    setPendingConfig({ exercise, variant });
  };

  const confirmAdd = (sets: number, reps: number, weight: number) => {
    if (!pendingConfig) return;
    
    const newItem: PlanItem = {
      instanceId: Date.now().toString() + Math.random().toString(),
      exerciseId: pendingConfig.exercise.id,
      variant: pendingConfig.variant,
      name: pendingConfig.exercise.name,
      sets,
      reps,
      weight,
      completed: false
    };

    setMyPlan([...myPlan, newItem]);
    setPendingConfig(null);
  };

  const removeFromPlan = (instanceId: string) => {
    setMyPlan(myPlan.filter((item) => item.instanceId !== instanceId));
  };

  const toggleItemComplete = (instanceId: string) => {
    setMyPlan(myPlan.map(item => 
      item.instanceId === instanceId ? { ...item, completed: !item.completed } : item
    ));
  };

  const loadPreset = (presetIds: string[]) => {
    const newItems: PlanItem[] = [];
    presetIds.forEach(id => {
      const exercise = EXERCISES.find(e => e.id === id);
      if (exercise) {
        newItems.push({
          instanceId: Date.now().toString() + Math.random().toString() + id,
          exerciseId: exercise.id,
          variant: exercise.variants[0],
          name: exercise.name,
          sets: 3, 
          reps: 10, 
          weight: 0, 
          completed: false
        });
      }
    });
    setMyPlan(newItems);
  };

  const loadCustomPreset = (preset: CustomPreset) => {
    const newItems: PlanItem[] = preset.items.map(item => ({
       ...item,
       instanceId: Date.now().toString() + Math.random().toString(),
       completed: false
    }));
    setMyPlan(newItems);
  };

  const deleteCustomPreset = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newPresets = customPresets.filter(p => p.id !== id);
    setCustomPresets(newPresets);
    localStorage.setItem('sculpt_custom_presets', JSON.stringify(newPresets));
  };

  const copyCustomPreset = (preset: CustomPreset, e: React.MouseEvent) => {
    e.stopPropagation();
    const mockPlanItems = preset.items.map(p => ({...p, instanceId: '', completed: false}));
    const hash = generateHashFromItems(mockPlanItems);
    copyToClipboard(hash);
    showToast("組合代碼已複製！");
  };

  const handleCopyCurrentPlan = () => {
    const hash = generateHashFromItems(myPlan);
    copyToClipboard(hash);
    showToast("當前清單代碼已複製！");
  }

  const handleSavePreset = (name: string) => {
    if (myPlan.length === 0) return;
    
    const newPreset: CustomPreset = {
      id: Date.now().toString(),
      name,
      items: myPlan.map(({ instanceId, completed, ...rest }) => rest),
      createdAt: Date.now()
    };

    const updatedPresets = [...customPresets, newPreset];
    setCustomPresets(updatedPresets);
    localStorage.setItem('sculpt_custom_presets', JSON.stringify(updatedPresets));
    setShowSavePresetModal(false);
    showToast("組合已儲存！");
  };

  const saveWorkout = () => {
    const record: WorkoutRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      items: myPlan,
      totalSets: myPlan.reduce((acc, item) => acc + (item.completed ? item.sets : 0), 0),
      totalVolume: myPlan.reduce((acc, item) => acc + (item.completed ? item.sets * item.reps * (item.weight || 1) : 0), 0)
    };

    const newHistory = [record, ...history];
    setHistory(newHistory);
    localStorage.setItem('sculpt_history', JSON.stringify(newHistory));
    
    // Reset
    setMyPlan([]);
    setView('history');
    showToast("訓練紀錄已儲存！");
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('zh-TW', {
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filter logic
  const filteredExercises = selectedMuscle === '全部'
    ? EXERCISES
    : EXERCISES.filter((e) => e.muscleGroup === selectedMuscle);

  // --- Views ---

  const Hero = () => (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 text-center animate-fade-in">
      <div className="max-w-2xl animate-slide-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-6">
          <Activity size={16} />
          <span>Intelligent Fitness Architect</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight mb-6 leading-tight">
          雕塑你的 <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">意志與體態。</span>
        </h1>
        <p className="text-xl text-slate-600 mb-10 leading-relaxed">
          精準選擇動作、設定負重與組數。<br/>
          今天就開始執行你的專屬訓練菜單。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <button
            onClick={handleStart}
            className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full bg-slate-900 px-8 font-medium text-white transition-all duration-300 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-300/50"
          >
            <span className="mr-2 text-lg">開始規劃</span>
            <ChevronRight className="transition-transform group-hover:translate-x-1" />
          </button>
          
          <button
            onClick={() => setView('history')}
            className="inline-flex h-14 items-center justify-center rounded-full bg-white border border-slate-200 px-8 font-medium text-slate-700 transition-all hover:bg-slate-50"
          >
            <History className="mr-2" size={20}/>
            歷史紀錄
          </button>
        </div>
      </div>
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl -z-10 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
    </div>
  );

  const HistoryView = () => (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center shadow-sm">
        <button onClick={() => setView(myPlan.length > 0 ? 'builder' : 'hero')} className="mr-4 p-2 hover:bg-slate-100 rounded-full">
           <ChevronLeft />
        </button>
        <h2 className="text-xl font-bold text-slate-900">訓練歷史紀錄</h2>
      </header>
      
      <main className="max-w-3xl mx-auto p-6">
        {history.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
               <History size={40} />
            </div>
            <p className="text-slate-500">尚無訓練紀錄，快去完成第一次訓練吧！</p>
            <button onClick={() => setView('builder')} className="mt-4 text-blue-600 font-bold hover:underline">去規劃訓練</button>
          </div>
        ) : (
          <div className="space-y-6">
             {history.map(record => (
               <div key={record.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative group">
                 <div className="flex justify-between items-start mb-4 border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                       <div className="bg-green-100 p-2 rounded-lg text-green-700">
                         <Calendar size={20} />
                       </div>
                       <div>
                         <h3 className="font-bold text-slate-800">{formatDate(record.date)}</h3>
                         <span className="text-xs text-slate-500">總組數: {record.totalSets}</span>
                       </div>
                    </div>
                    
                    <button 
                      onClick={() => {
                          const hash = generateHashFromItems(record.items);
                          copyToClipboard(hash);
                          showToast("紀錄代碼已複製！");
                      }}
                      className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="複製此紀錄代碼"
                    >
                       <Copy size={18} />
                    </button>
                 </div>
                 <div className="space-y-3">
                    {record.items.map((item, idx) => (
                      <div key={idx} className={`flex justify-between items-center text-sm ${item.completed ? 'text-slate-700' : 'text-slate-400 line-through'}`}>
                        <div className="flex items-center gap-2">
                           <span className="font-medium">{item.name}</span>
                           <span className="text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-500">{item.variant}</span>
                        </div>
                        <div className="font-mono text-xs text-slate-600">
                          {item.weight > 0 ? `${item.weight}kg` : '自重'} x {item.sets}組 x {item.reps}下
                        </div>
                      </div>
                    ))}
                 </div>
               </div>
             ))}
          </div>
        )}
      </main>
    </div>
  );

  const WorkoutMode = () => (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
       <header className="px-6 py-6 flex justify-between items-center bg-slate-800/50 backdrop-blur border-b border-slate-700">
         <h2 className="text-2xl font-bold flex items-center gap-3">
           <Activity className="text-green-400" />
           訓練進行中
         </h2>
         <button onClick={() => setView('builder')} className="text-slate-400 text-sm hover:text-white">
           返回編輯
         </button>
       </header>

       <main className="flex-1 p-6 overflow-y-auto pb-32">
         <div className="max-w-2xl mx-auto space-y-4">
           {myPlan.map((item, idx) => (
             <div 
               key={item.instanceId} 
               onClick={() => toggleItemComplete(item.instanceId)}
               className={`relative overflow-hidden rounded-2xl transition-all cursor-pointer border ${item.completed ? 'bg-green-900/20 border-green-500/50' : 'bg-slate-800 border-slate-700 hover:border-slate-500'}`}
             >
               <div className="p-5 flex items-center justify-between z-10 relative">
                 <div className="flex items-center gap-4">
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${item.completed ? 'bg-green-500 border-green-500' : 'border-slate-500'}`}>
                      {item.completed && <Check size={16} className="text-white" />}
                   </div>
                   <div>
                     <h3 className={`text-lg font-bold ${item.completed ? 'text-green-400 line-through' : 'text-white'}`}>{item.name}</h3>
                     <p className="text-slate-400 text-sm mt-1 flex items-center gap-2">
                       <span className="bg-slate-700 px-2 rounded text-xs text-white">{item.variant}</span>
                       <span>•</span>
                       <span>{item.sets} 組</span>
                       <span>•</span>
                       <span>{item.reps} 下</span>
                       <span>•</span>
                       <span className="text-yellow-400 font-bold">{item.weight > 0 ? `${item.weight} kg` : '自重'}</span>
                     </p>
                   </div>
                 </div>
               </div>
               {item.completed && <div className="absolute inset-0 bg-green-500/10 pointer-events-none"></div>}
             </div>
           ))}
           
           {myPlan.every(i => i.completed) && myPlan.length > 0 && (
             <div className="text-center py-8 animate-pulse">
               <p className="text-green-400 font-bold text-xl">太棒了！所有項目已完成！</p>
             </div>
           )}
         </div>
       </main>

       <div className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 p-6 z-50">
         <div className="max-w-2xl mx-auto flex gap-4">
            <button 
              onClick={() => setView('builder')}
              className="flex-1 py-4 rounded-xl font-bold bg-slate-700 text-slate-300 hover:bg-slate-600 transition"
            >
              稍後繼續
            </button>
            <button 
              onClick={saveWorkout}
              className="flex-[2] py-4 rounded-xl font-bold bg-green-600 text-white hover:bg-green-500 shadow-lg shadow-green-900/50 transition flex items-center justify-center gap-2"
            >
              <Save size={20} />
              完成並儲存紀錄
            </button>
         </div>
       </div>
    </div>
  );

  const Builder = () => (
    <div className={`min-h-screen bg-slate-50`}>
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-xl cursor-pointer" onClick={() => setView('hero')}>
          <div className="bg-slate-900 text-white p-1 rounded">
             <Layers size={20} />
          </div>
          SCULPT
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowImportModal(true)} 
            className="flex items-center gap-1 text-slate-500 hover:text-blue-600 p-2 transition font-bold text-xs bg-slate-100 rounded-lg"
          >
            <Upload size={16} /> 匯入
          </button>
          <button onClick={() => setView('history')} className="text-slate-500 hover:text-slate-900 p-2">
            <History size={20} />
          </button>
          <div className="flex items-center gap-2 text-sm font-medium bg-slate-100 px-3 py-1 rounded-full text-slate-600">
            <User size={16} />
            <span>清單: {myPlan.length}</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-8 pb-40">
        
        {/* Quick Presets */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
             <h2 className="text-2xl font-bold text-slate-800">快速組合</h2>
             <span className="text-sm text-slate-400">一鍵載入菜單</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* System Presets */}
            <button onClick={() => loadPreset(PRESETS.ATHLETE_BALANCE)} className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition text-left group">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-lg text-slate-800">運動員平衡</span>
                <Activity className="text-green-500 group-hover:scale-110 transition" size={20} />
              </div>
              <p className="text-slate-500 text-sm">上下肢均衡發展，核心穩定。</p>
            </button>
            <button onClick={() => loadPreset(PRESETS.FULL_BODY)} className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition text-left group">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-lg text-slate-800">全身燃脂</span>
                <Zap className="text-yellow-500 group-hover:scale-110 transition" size={20} />
              </div>
              <p className="text-slate-500 text-sm">經典多關節動作組合。</p>
            </button>
            <button onClick={() => loadPreset(PRESETS.UPPER_BODY)} className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition text-left group">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-lg text-slate-800">上肢雕塑</span>
                <Dumbbell className="text-blue-500 group-hover:scale-110 transition" size={20} />
              </div>
              <p className="text-slate-500 text-sm">針對胸背肩手訓練。</p>
            </button>
            <button onClick={() => loadPreset(PRESETS.LOWER_BODY)} className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition text-left group">
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-lg text-slate-800">下肢強化</span>
                <Activity className="text-red-500 group-hover:scale-110 transition" size={20} />
              </div>
              <p className="text-slate-500 text-sm">深蹲與硬舉，強壯地基。</p>
            </button>
            
            {/* User Custom Presets */}
            {customPresets.map(preset => (
              <div key={preset.id} className="relative group">
                <button 
                  onClick={() => loadCustomPreset(preset)} 
                  className="w-full h-full p-6 bg-blue-50 rounded-xl border border-blue-100 shadow-sm hover:shadow-md hover:border-blue-300 transition text-left"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-lg text-blue-900 truncate pr-4">{preset.name}</span>
                    <span className="text-blue-300"><Layers size={20} /></span>
                  </div>
                  <p className="text-blue-700/60 text-sm">{preset.items.length} 個動作</p>
                </button>
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                  <button 
                    onClick={(e) => copyCustomPreset(preset, e)}
                    className="p-1.5 bg-white rounded-full text-slate-300 hover:text-blue-500 hover:bg-blue-50 shadow-sm"
                    title="複製分享代碼"
                  >
                    <Copy size={14} />
                  </button>
                  <button 
                    onClick={(e) => deleteCustomPreset(preset.id, e)}
                    className="p-1.5 bg-white rounded-full text-slate-300 hover:text-red-500 hover:bg-red-50 shadow-sm"
                    title="刪除此組合"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Filters */}
        <section className="mb-8 sticky top-20 z-30 py-2 bg-slate-50/95 backdrop-blur">
          <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
            {['全部', ...Object.values(MuscleGroup)].map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMuscle(m as MuscleGroup | '全部')}
                className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all shadow-sm ${
                  selectedMuscle === m
                    ? 'bg-slate-900 text-white shadow-slate-300'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-white hover:border-slate-400'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </section>

        {/* Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((exercise) => {
            const currentVariant = selectedVariants[exercise.id] || exercise.variants[0];
            const displayImages = exercise.variantImages?.[currentVariant] || exercise.images;

            return (
              <div key={exercise.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col">
                {/* Visual Area - Illustration */}
                <div className="relative h-48 bg-slate-100">
                  {/* FORCE SINGLE STATIC IMAGE IN BUILDER VIEW */}
                  <ExerciseIllustration name={exercise.name} images={displayImages.length > 0 ? [displayImages[0]] : []} className="h-full w-full" />
                  
                  {/* Difficulty Tag */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-slate-600 border border-slate-200 shadow-sm">
                    {exercise.difficulty}
                  </div>

                  {/* Info Button */}
                  <button
                    onClick={() => setActiveInfoExercise(exercise)}
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur rounded-full text-slate-400 hover:text-blue-600 transition border border-slate-200 hover:border-blue-200 z-10 shadow-sm"
                    title="查看詳情與肌群"
                  >
                    <Info size={18} />
                  </button>
                </div>
                
                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="mb-3">
                    <h3 className="font-bold text-lg text-slate-900">{exercise.name}</h3>
                    <p className="text-slate-500 text-xs mt-1 line-clamp-2">{exercise.description}</p>
                  </div>

                  <div className="mt-auto space-y-3">
                    {/* Variant Selector */}
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">
                        選擇變體/器材
                      </label>
                      <select 
                        value={currentVariant}
                        onChange={(e) => handleVariantChange(exercise.id, e.target.value)}
                        className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors cursor-pointer hover:bg-slate-100"
                      >
                        {exercise.variants.map(v => (
                          <option key={v} value={v}>{v}</option>
                        ))}
                      </select>
                    </div>

                    <button
                      onClick={() => initiateAdd(exercise)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all bg-slate-900 text-white hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-200"
                    >
                       <Plus size={16} /> 加入/設定組數
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </main>

      {/* Sticky Bottom Bar (My Plan) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-40">
        <div className="max-w-7xl mx-auto p-4 flex flex-col md:flex-row gap-4 md:items-center justify-between">
          
          {/* List Preview (Horizontal Scroll) */}
          <div className="flex-1 overflow-x-auto no-scrollbar">
            {myPlan.length === 0 ? (
               <div className="text-slate-400 text-sm flex items-center gap-2 py-2">
                 <Dumbbell size={16} />
                 尚未加入動作，請從上方選擇...
               </div>
            ) : (
              <div className="flex gap-3">
                {myPlan.map((item) => (
                  <div key={item.instanceId} className="flex-shrink-0 bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-2 py-2 flex items-center gap-3 group hover:border-blue-200 transition-colors min-w-[150px]">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-800">{item.name}</span>
                      <span className="text-[10px] text-blue-600 truncate max-w-[100px]">{item.variant}</span>
                      <span className="text-[10px] text-slate-500 mt-0.5">
                         {item.weight > 0 ? `${item.weight}kg` : '自重'} × {item.sets}組
                      </span>
                    </div>
                    <button 
                      onClick={() => removeFromPlan(item.instanceId)}
                      className="text-slate-300 hover:text-red-500 p-1 transition-colors ml-auto"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex gap-2 shrink-0">
             {myPlan.length > 0 && (
               <>
                 <button
                   onClick={handleCopyCurrentPlan}
                   className="bg-slate-100 text-slate-600 px-4 py-3 rounded-xl font-bold hover:bg-slate-200 transition flex items-center gap-2"
                   title="複製分享代碼"
                 >
                   <Share2 size={18} />
                 </button>
                 <button
                   onClick={() => setShowSavePresetModal(true)}
                   className="bg-slate-100 text-slate-600 px-4 py-3 rounded-xl font-bold hover:bg-slate-200 transition flex items-center gap-2"
                   title="儲存為我的組合"
                 >
                   <Save size={18} />
                 </button>
               </>
             )}
            <button
              disabled={myPlan.length === 0}
              onClick={() => setView('workout')}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
            >
              <Play size={18} fill="currentColor" />
              <span className="hidden md:inline">開始訓練</span>
              <span className="md:hidden">開始 ({myPlan.length})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {view === 'hero' && <Hero />}
      {view === 'builder' && <Builder />}
      {view === 'workout' && <WorkoutMode />}
      {view === 'history' && <HistoryView />}
      
      {/* Toast Notification */}
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}

      {/* Global Modals */}
      {activeInfoExercise && (
        <InfoModal 
          exercise={activeInfoExercise} 
          onClose={() => setActiveInfoExercise(null)} 
        />
      )}

      {pendingConfig && (
        <PlanConfigModal
          exercise={pendingConfig.exercise}
          variant={pendingConfig.variant}
          onClose={() => setPendingConfig(null)}
          onConfirm={confirmAdd}
        />
      )}

      {showImportModal && (
        <ImportModal
          onImport={(items) => {
            setMyPlan(items);
            setView('builder');
            showToast("成功匯入訓練菜單！");
          }}
          onClose={() => setShowImportModal(false)}
        />
      )}

      {showSavePresetModal && (
        <SavePresetModal
          onSave={handleSavePreset}
          onClose={() => setShowSavePresetModal(false)}
        />
      )}
    </>
  );
};

export default App;

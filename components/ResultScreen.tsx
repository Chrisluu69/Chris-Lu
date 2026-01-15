
import React, { useEffect, useState } from 'react';
import { QuizResult, Era } from '../types';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { getAcademicInsight } from '../geminiService';

interface ResultScreenProps {
  result: QuizResult;
  questions: any[];
  onRestart: () => void;
}

const eraMap: Record<Era, string> = {
  [Era.CLASSICAL]: '古典',
  [Era.MODERN]: '現代',
  [Era.POST_MODERN]: '後現代'
};

const ResultScreen: React.FC<ResultScreenProps> = ({ result, questions, onRestart }) => {
  const [insight, setInsight] = useState<string>("正在合成理論範式...");
  const [loadingInsight, setLoadingInsight] = useState(true);

  // Calculate score breakdown by era
  const eraData = Object.values(Era).map(era => {
    const eraQuestions = questions.filter(q => q.era === era);
    const correctCount = result.answers.filter(ans => {
      const q = questions.find(qu => qu.id === ans.questionId);
      return q?.era === era && ans.isCorrect;
    }).length;
    
    return {
      era: eraMap[era],
      score: eraQuestions.length > 0 ? (correctCount / eraQuestions.length) * 100 : 0,
      fullMark: 100
    };
  });

  useEffect(() => {
    const fetchInsight = async () => {
      const text = await getAcademicInsight(result.score, result.total);
      setInsight(text);
      setLoadingInsight(false);
    };
    fetchInsight();
  }, [result]);

  return (
    <div className="w-full max-w-4xl animate-fadeIn py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-serif text-slate-900 mb-4">最終評估報告</h1>
        <div className="inline-block px-8 py-4 border-2 border-slate-900 rounded-full">
          <span className="text-6xl font-serif">{result.score}</span>
          <span className="text-3xl font-serif text-slate-400 mx-2">/</span>
          <span className="text-4xl font-serif text-slate-500">{result.total}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div className="h-[300px] w-full">
          <h3 className="text-center text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">理論親和力分析</h3>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={eraData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="era" tick={{ fill: '#64748b', fontSize: 14 }} />
              <Radar
                name="熟練度"
                dataKey="score"
                stroke="#1e293b"
                fill="#1e293b"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-stone-100 p-8 rounded-2xl border border-stone-200">
          <h3 className="text-slate-900 font-serif text-2xl mb-4 italic">社會學凝視 (The Gaze)</h3>
          <p className={`text-slate-700 leading-relaxed font-serif text-xl ${loadingInsight ? 'animate-pulse' : ''}`}>
            「{insight}」
          </p>
          <div className="mt-8 pt-6 border-t border-stone-200 text-xs text-slate-400 uppercase tracking-widest">
            由 Gemini 學術引擎生成
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onRestart}
          className="px-12 py-4 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all font-medium tracking-wide uppercase text-sm"
        >
          回歸理論基石
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;


import React from 'react';
import { Question, Era } from '../types';

interface QuestionCardProps {
  question: Question;
  selectedOption: number | null;
  onSelect: (index: number) => void;
  showFeedback: boolean;
}

const eraMap: Record<Era, string> = {
  [Era.CLASSICAL]: '古典',
  [Era.MODERN]: '現代',
  [Era.POST_MODERN]: '後現代'
};

const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  selectedOption, 
  onSelect,
  showFeedback
}) => {
  return (
    <div className="w-full max-w-2xl animate-fadeIn">
      <div className="mb-2">
        <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-widest bg-slate-100 text-slate-500 rounded border border-slate-200">
          {eraMap[question.era]}社會學理論
        </span>
      </div>
      
      <h2 className="text-2xl md:text-3xl font-serif text-slate-900 mb-8 leading-tight">
        {question.text}
      </h2>

      <div className="space-y-4">
        {question.options.map((option, idx) => {
          let stateStyles = "border-slate-300 hover:border-slate-800 hover:bg-slate-50";
          
          if (showFeedback) {
            if (idx === question.correctIndex) {
              stateStyles = "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500";
            } else if (idx === selectedOption) {
              stateStyles = "border-rose-500 bg-rose-50 ring-1 ring-rose-500";
            } else {
              stateStyles = "border-slate-200 opacity-50";
            }
          } else if (selectedOption === idx) {
            stateStyles = "border-slate-800 bg-slate-50 ring-1 ring-slate-800";
          }

          return (
            <button
              key={idx}
              disabled={showFeedback}
              onClick={() => onSelect(idx)}
              className={`w-full text-left p-5 border rounded-lg transition-all flex items-center group ${stateStyles}`}
            >
              <span className="w-8 h-8 rounded-full border border-inherit flex items-center justify-center mr-4 text-sm font-medium shrink-0 group-hover:bg-slate-800 group-hover:text-white transition-colors">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="text-lg text-slate-800">{option}</span>
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <div className="mt-8 p-6 bg-stone-100 border-l-4 border-slate-800 rounded-r-lg animate-slideUp">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">學術釋義 (Exegesis)</p>
          <p className="text-slate-700 leading-relaxed italic font-serif text-lg">
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;

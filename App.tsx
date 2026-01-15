
import React, { useState, useEffect, useCallback } from 'react';
import { Question, QuizResult } from './types';
import { INITIAL_QUESTIONS } from './constants';
import { generateExtraQuestions } from './geminiService';
import ProgressBar from './components/ProgressBar';
import QuestionCard from './components/QuestionCard';
import ResultScreen from './components/ResultScreen';

const App: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS);
  const [currentIndex, setCurrentIndex] = useState<number>(-1); // -1 is start screen
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [answers, setAnswers] = useState<QuizResult['answers']>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const startQuiz = async () => {
    setLoading(true);
    const extras = await generateExtraQuestions(3);
    if (extras.length > 0) {
      setQuestions([...INITIAL_QUESTIONS, ...extras].sort(() => Math.random() - 0.5));
    }
    setCurrentIndex(0);
    setLoading(false);
  };

  const handleSelect = (index: number) => {
    setSelectedOption(index);
    setShowFeedback(true);
    
    const isCorrect = index === questions[currentIndex].correctIndex;
    if (isCorrect) setScore(prev => prev + 1);
    
    setAnswers(prev => [...prev, {
      questionId: questions[currentIndex].id,
      isCorrect,
      userIndex: index
    }]);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setIsFinished(true);
    }
  };

  const restart = () => {
    setCurrentIndex(-1);
    setSelectedOption(null);
    setShowFeedback(false);
    setScore(0);
    setAnswers([]);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-stone-50">
        <ResultScreen 
          result={{ score, total: questions.length, answers }} 
          questions={questions}
          onRestart={restart}
        />
      </div>
    );
  }

  if (currentIndex === -1) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-stone-50">
        <div className="max-w-2xl text-center">
          <h1 className="text-6xl md:text-7xl font-serif text-slate-900 mb-6 font-light">社會學<br/>智慧挑戰</h1>
          <p className="text-xl text-slate-600 mb-12 font-serif italic">
            「社會學的想像力使我們能夠理解歷史與傳記，以及兩者在社會中的關係。」 — C·賴特·米爾斯
          </p>
          <button 
            disabled={loading}
            onClick={startQuiz}
            className="group relative px-12 py-5 bg-slate-900 text-white rounded-full overflow-hidden transition-all hover:pr-16"
          >
            <span className="relative z-10 font-medium uppercase tracking-widest text-sm">
              {loading ? '理論建構中...' : '開始探究'}
            </span>
            <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
              →
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <header className="p-6 md:p-10 flex justify-between items-center border-b border-stone-200 bg-white/50 backdrop-blur-sm sticky top-0 z-20">
        <div>
          <h3 className="font-serif text-xl text-slate-900">社會學學術評測</h3>
          <p className="text-xs text-slate-400 uppercase tracking-tighter">古典 • 現代 • 後現代</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-serif text-slate-900">
            {currentIndex + 1} <span className="text-slate-300">/</span> {questions.length}
          </div>
        </div>
      </header>

      <ProgressBar current={currentIndex + 1} total={questions.length} />

      <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-12">
        <QuestionCard 
          question={questions[currentIndex]}
          selectedOption={selectedOption}
          onSelect={handleSelect}
          showFeedback={showFeedback}
        />
      </main>

      <footer className="p-6 md:p-10 border-t border-stone-200 bg-white/50 backdrop-blur-sm flex justify-center sticky bottom-0 z-20">
        <button
          onClick={nextQuestion}
          disabled={!showFeedback}
          className={`px-16 py-4 rounded-lg font-medium uppercase tracking-widest text-sm transition-all shadow-sm ${
            showFeedback 
              ? 'bg-slate-900 text-white hover:bg-slate-800' 
              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
          }`}
        >
          {currentIndex === questions.length - 1 ? '查看最終評估' : '繼續探究'}
        </button>
      </footer>
    </div>
  );
};

export default App;

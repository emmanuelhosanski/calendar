import React from 'react';
import { CalendarCard } from '../components/CalendarCard';
import { useMode } from '../hooks/useMode';
import { AlertCircle } from 'lucide-react';

export const Home: React.FC = () => {
  const { isTestMode, toggleMode } = useMode();
  const [showError, setShowError] = React.useState(false);
  
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  
  const handleFutureClick = () => {
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  };

  const isCardActive = (day: number) => {
    if (isTestMode) {
      return true;
    }
    return currentMonth === 11 && day <= currentDay;
  };

  const shouldWiggle = (day: number) => {
    if (isTestMode) {
      return day === 24; // Last card wiggles in test mode
    }
    return currentMonth === 11 && day === currentDay; // Today's card wiggles in real mode
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 px-4 py-6 sm:p-8">
      <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold text-purple-800 text-center mb-2">
          Calendrier de l'avent
        </h1>
        <div className="text-center text-2xl mb-8">
          🧸❤️🧸
        </div>

        {showError && (
          <div className="fixed top-4 right-4 left-4 sm:left-auto bg-red-500 text-white p-4 rounded-lg shadow-lg flex items-center gap-2 animate-bounce">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">Pas si vite ! Cette surprise n'est pas encore prête 🎅 ! </p>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
          {Array.from({ length: 24 }, (_, i) => i + 1).map((day) => (
            <CalendarCard
              key={day}
              day={day}
              isActive={isCardActive(day)}
              shouldWiggle={shouldWiggle(day)}
              isTestMode={isTestMode}
              onFutureClick={handleFutureClick}
            />
          ))}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm p-4 border-t border-purple-100">
          <div className="max-w-7xl mx-auto flex justify-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isTestMode}
                onChange={toggleMode}
              />
              <div className="w-14 h-7 bg-purple-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-purple-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-900">
                {isTestMode ? 'Mode Test' : 'Mode Réel'}
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
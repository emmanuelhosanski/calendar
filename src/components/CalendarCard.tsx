import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Music, Lock } from 'lucide-react';

interface CalendarCardProps {
  day: number;
  isActive: boolean;
  shouldWiggle: boolean;
  isTestMode: boolean;
  onFutureClick: () => void;
}

const colors = [
  'bg-red-400', 'bg-green-400', 'bg-blue-400', 'bg-yellow-400',
  'bg-purple-400', 'bg-pink-400', 'bg-indigo-400', 'bg-orange-400',
  'bg-teal-400', 'bg-cyan-400', 'bg-rose-400', 'bg-violet-400',
  'bg-emerald-400', 'bg-sky-400', 'bg-amber-400', 'bg-lime-400',
  'bg-fuchsia-400', 'bg-blue-400', 'bg-red-400', 'bg-green-400',
  'bg-purple-400', 'bg-yellow-400', 'bg-pink-400', 'bg-indigo-400'
];

export const CalendarCard: React.FC<CalendarCardProps> = ({ 
  day, 
  isActive, 
  shouldWiggle,
  isTestMode, 
  onFutureClick 
}) => {
  const navigate = useNavigate();
  const color = colors[day - 1];
  const baseColor = isActive ? color : 'bg-gray-300';

  const handleClick = () => {
    if (isTestMode || isActive) {
      navigate(`/day/${day}`);
    } else {
      onFutureClick();
    }
  };

  return (
    <motion.div
      whileHover={isActive ? { scale: 1.05 } : {}}
      whileTap={isActive ? { scale: 0.95 } : {}}
      animate={shouldWiggle ? { rotate: [-40, 30] } : {}}
      transition={shouldWiggle ? { 
        rotate: { repeat: Infinity, duration: 0.5, repeatType: "reverse" },
        scale: { duration: 0.2 }
      } : {
        scale: { duration: 0.2 }
      }}
      onClick={handleClick}
      className={`${baseColor} rounded-xl p-4 sm:p-6 aspect-square shadow-lg cursor-pointer 
        transform transition-all duration-300 hover:shadow-xl
        flex flex-col items-center justify-center group relative`}
    >
      <div className="text-white text-2xl sm:text-4xl font-bold mb-2">{day}</div>
      {isActive ? (
        <Music className="w-6 h-6 sm:w-8 sm:h-8 text-white opacity-50 group-hover:opacity-100 transition-opacity" />
      ) : (
        <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-white/50" />
      )}
    </motion.div>
  );
};
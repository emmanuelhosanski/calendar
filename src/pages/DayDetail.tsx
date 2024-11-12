import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Image as LucideImage, Music, Type } from 'lucide-react';
import { AudioPlayer } from '../components/AudioPlayer';
import { songs } from '../data/songs';

const colors = [
  'from-red-400', 'from-green-400', 'from-blue-400', 'from-yellow-400',
  'from-purple-400', 'from-pink-400', 'from-indigo-400', 'from-orange-400',
  'from-teal-400', 'from-cyan-400', 'from-rose-400', 'from-violet-400',
  'from-emerald-400', 'from-sky-400', 'from-amber-400', 'from-lime-400',
  'from-fuchsia-400', 'from-blue-400', 'from-red-400', 'from-green-400',
  'from-purple-400', 'from-yellow-400', 'from-pink-400', 'from-indigo-400'
];

const buttonColors = [
  'bg-red-500 hover:bg-red-600', 'bg-green-500 hover:bg-green-600',
  'bg-blue-500 hover:bg-blue-600', 'bg-yellow-500 hover:bg-yellow-600',
  'bg-purple-500 hover:bg-purple-600', 'bg-pink-500 hover:bg-pink-600',
  'bg-indigo-500 hover:bg-indigo-600', 'bg-orange-500 hover:bg-orange-600',
  'bg-teal-500 hover:bg-teal-600', 'bg-cyan-500 hover:bg-cyan-600',
  'bg-rose-500 hover:bg-rose-600', 'bg-violet-500 hover:bg-violet-600',
  'bg-emerald-500 hover:bg-emerald-600', 'bg-sky-500 hover:bg-sky-600',
  'bg-amber-500 hover:bg-amber-600', 'bg-lime-500 hover:bg-lime-600',
  'bg-fuchsia-500 hover:bg-fuchsia-600', 'bg-blue-500 hover:bg-blue-600',
  'bg-red-500 hover:bg-red-600', 'bg-green-500 hover:bg-green-600',
  'bg-purple-500 hover:bg-purple-600', 'bg-yellow-500 hover:bg-yellow-600',
  'bg-pink-500 hover:bg-pink-600', 'bg-indigo-500 hover:bg-indigo-600'
];

export const DayDetail: React.FC = () => {
  const { day } = useParams();
  const navigate = useNavigate();
  const [showHint1, setShowHint1] = React.useState(false);
  const [showHint2, setShowHint2] = React.useState(false);
  const [showAnswer, setShowAnswer] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const dayNumber = parseInt(day || '1', 10);
  const color = colors[dayNumber - 1];
  const buttonColor = buttonColors[dayNumber - 1];
  
  const song = songs.find(s => s.id === dayNumber);

  React.useEffect(() => {
    if (song) {
      // Preload audio
      const audio = new Audio(song.audioUrl);
      audio.addEventListener('canplaythrough', () => {
        setIsLoading(false);
      });
      audio.addEventListener('error', () => {
        setIsLoading(false);
        console.error('Error loading audio');
      });
      // Preload image
      const img = new Image();
      img.src = song.imageHint;
    }
  }, [song]);

  if (!song) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Chanson non trouvée</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${color} to-white p-8`}>
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className={`mb-8 flex items-center gap-2 ${buttonColor} text-white rounded-lg px-4 py-2`}
        >
          <ChevronLeft className="w-5 h-5" />
          Retour au calendrier
        </button>
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Jour {day} 
            </h1>
            <div className="text-center text-3xl mb-8">
            Quelle est cette chanson ?
            </div>
            <div className="mb-12">
              {isLoading ? (
                <div className="flex items-center justify-center h-40">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                </div>
              ) : (
                <AudioPlayer audioUrl={song.audioUrl} color={buttonColor} />
              )}
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setShowHint1(!showHint1)}
                  className={`flex items-center justify-center gap-2 p-4 rounded-lg transition-colors ${buttonColor} text-white`}
                >
                  <LucideImage className="w-5 h-5" />
                  {showHint1 ? 'Cacher' : 'Indice 1'}
                </button>
                <button
                  onClick={() => setShowHint2(!showHint2)}
                  className={`flex items-center justify-center gap-2 p-4 rounded-lg transition-colors ${buttonColor} text-white`}
                >
                  <Type className="w-5 h-5" />
                  {showHint2 ? 'Cacher' : 'Indice 2'}
                </button>
              </div>
              {showHint1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-lg overflow-hidden"
                >
                  <img
                    src={song.imageHint}
                    alt="Indice visuel"
                    className="w-full h-64 object-cover"
                  />
                </motion.div>
              )}
              {showHint2 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-4 bg-gray-50 rounded-lg"
                >
                  <p className="text-gray-700 italic whitespace-pre-wrap text-sm">{song.lyricsHint}</p>
                </motion.div>
              )}
              <button
                onClick={() => setShowAnswer(!showAnswer)}
                className={`w-full p-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${buttonColor} text-white`}
              >
                <Music className="w-5 h-5" />
                {showAnswer ? 'Cacher la réponse' : 'Voir la réponse'}
              </button>
              {showAnswer && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`p-6 rounded-lg text-white ${buttonColor}`}
                >
                  <h2 className="text-2xl font-bold mb-2">{song.title}</h2>
                  <p className="text-xl">par {song.artist}</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

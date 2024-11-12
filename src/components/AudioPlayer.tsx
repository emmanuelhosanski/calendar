import React from 'react';
import { Play, Pause, Music } from 'lucide-react';
import { motion } from 'framer-motion';

interface AudioPlayerProps {
  audioUrl: string;
  color: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, color }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const togglePlay = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          setIsPlaying(false);
          console.error('Audio play error:', error);
          alert('Impossible de lire l\'audio. Veuillez vérifier que le fichier existe ou autorisez la lecture sur votre appareil.');
        }
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-6">
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ duration: 2, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
        >
          <Music className="w-20 h-20 text-gray-300" />
        </motion.div>
        {isPlaying && (
          <>
            <motion.div
              className="absolute top-0 left-0 w-full h-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="w-full h-full rounded-full border-2 border-current opacity-20" />
            </motion.div>
            <motion.div
              className="absolute top-0 left-0 w-full h-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              <div className="w-full h-full rounded-full border-2 border-current opacity-10" />
            </motion.div>
          </>
        )}
      </div>
      
      <button
        onClick={togglePlay}
        className={`${color} text-white p-4 rounded-full transition-colors`}
      >
        {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
      </button>
      
      <audio
        ref={audioRef}
        preload="none"
        onError={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      >
        <source src={audioUrl} type="audio/mpeg" />
        Votre navigateur ne prend pas en charge l'élément audio.
      </audio>
    </div>
  );
};
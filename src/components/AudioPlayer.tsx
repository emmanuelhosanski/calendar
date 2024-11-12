import React from 'react';

interface AudioPlayerProps {
  audioUrl: string;
  color: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, color }) => {
  const audioRef = React.useRef<HTMLAudioElement>(null);

  return (
    <div className="flex flex-col items-center p-4">
      <audio
        ref={audioRef}
        preload="none"
        controls
        className="w-full"
      >
        <source src={audioUrl} type="audio/mpeg" />
        Votre navigateur ne prend pas en charge l'élément audio.
      </audio>
    </div>
  );
};


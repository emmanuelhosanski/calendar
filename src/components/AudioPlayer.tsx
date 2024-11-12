import React from 'react';

interface AudioPlayerProps {
  audioUrl: string;
  color: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, color }) => {
  const [initialized, setInitialized] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  // User gesture to initialize audio for iOS
  const initializeAudio = () => {
    if (audioRef.current && !initialized) {
      audioRef.current.load(); // Initialize the audio element
      setInitialized(true);
    }
  };

  return (
    <div
      className="flex flex-col items-center p-4"
      onClick={initializeAudio} // Listen for a tap to initialize the audio
    >
      {!initialized && (
        <button
          className={`${color} text-white p-4 rounded-lg mb-4`}
          onClick={initializeAudio}
        >
          Tap to enable audio
        </button>
      )}
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

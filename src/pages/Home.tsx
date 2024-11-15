import React from 'react';
import { CalendarCard } from '../components/CalendarCard';
import { useMode } from '../hooks/useMode';
import { AlertCircle } from 'lucide-react';

const images = [
  '/images/bear1.png',
  '/images/bear2.png',
  '/images/bear3.png',
  '/images/bear4.png',
  '/images/bear5.png',
  '/images/bear6.png',
  '/images/bear7.png',
  '/images/bear8.png',
  '/images/bear9.png',
  '/images/bear10.png',
  '/images/bear11.png',
  '/images/bear12.png',
  '/images/bear13.png',
];

export const Home: React.FC = () => {
  const { isTestMode, toggleMode } = useMode();
  const [showError, setShowError] = React.useState(false);
  const [clickCount, setClickCount] = React.useState(0);

  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();

  // Handle clicks on "Calendrier de l'avent" for Test Mode activation
  const handleTitleClick = () => {
    setClickCount((prev) => prev + 1);

    if (clickCount + 1 === 4) {
      toggleMode();
      setClickCount(0);
    }
  };

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

  const triggerEasterEgg = () => {
    // Select a random image
    const randomImage = images[Math.floor(Math.random() * images.length)];
    const img = document.createElement('img');
    img.src = randomImage;
    img.style.position = 'fixed';
    img.style.width = '100px';
    img.style.zIndex = '1000';
    img.style.top = '50%';
    img.style.left = '50%';
    document.body.appendChild(img);

    // Set initial direction, speed, and random angle
    const speed = Math.random() * 4 + 2; // Random speed between 2 and 6
    let angle = Math.random() * Math.PI * 2; // Random angle between 0 and 2π
    let dx = Math.cos(angle) * speed;
    let dy = Math.sin(angle) * speed;
    let bounces = 0;
    const maxBounces = 10;

    const animate = () => {
      const rect = img.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Check for collision with screen edges and bounce
      if (rect.left <= 0 || rect.right >= vw) {
        dx = -dx;
        bounces++;
      }
      if (rect.top <= 0 || rect.bottom >= vh) {
        dy = -dy;
        bounces++;
      }

      // Move the image
      img.style.left = `${rect.left + dx}px`;
      img.style.top = `${rect.top + dy}px`;

      // Remove the image after a certain number of bounces
      if (bounces < maxBounces) {
        requestAnimationFrame(animate);
      } else {
        img.remove();
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 px-4 py-6 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-3xl sm:text-4xl font-bold text-purple-800 text-center mb-2"
          onClick={handleTitleClick}
          style={{ cursor: 'pointer' }}
        >
          Calendrier de l'avent
        </h1>
        <div className="text-center text-2xl mb-8" onClick={triggerEasterEgg} style={{ cursor: 'pointer' }}>
          🧸❤️🧸
        </div>

        {showError && (
          <div className="fixed top-4 right-4 left-4 sm:left-auto bg-red-500 text-white p-4 rounded-lg shadow-lg flex items-center gap-2 animate-bounce">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">Pas si vite ! Cette surprise n'est pas encore prête 🎅 !</p>
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
      </div>
    </div>
  );
};

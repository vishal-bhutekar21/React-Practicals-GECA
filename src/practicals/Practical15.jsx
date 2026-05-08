import React, { useEffect, useRef, useState } from 'react';
import '../styles/grocery.css';

// SVG Components for better graphics
const PlayerCar = () => (
  <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
    <defs>
      <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#10b981', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <rect x="20" y="30" width="60" height="40" rx="8" fill="url(#carGradient)" />
    <circle cx="35" cy="70" r="6" fill="#1f2937" />
    <circle cx="65" cy="70" r="6" fill="#1f2937" />
    <rect x="30" y="35" width="12" height="12" rx="2" fill="#a7f3d0" opacity="0.6" />
    <rect x="58" y="35" width="12" height="12" rx="2" fill="#a7f3d0" opacity="0.6" />
  </svg>
);

const ObstacleCar = () => (
  <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
    <defs>
      <linearGradient id="obstacleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <rect x="20" y="30" width="60" height="40" rx="8" fill="url(#obstacleGradient)" />
    <circle cx="35" cy="70" r="6" fill="#1f2937" />
    <circle cx="65" cy="70" r="6" fill="#1f2937" />
    <rect x="30" y="35" width="12" height="12" rx="2" fill="#fca5a5" opacity="0.5" />
    <rect x="58" y="35" width="12" height="12" rx="2" fill="#fca5a5" opacity="0.5" />
  </svg>
);

const CoinIcon = () => (
  <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
    <defs>
      <radialGradient id="coinGradient" cx="35%" cy="35%">
        <stop offset="0%" style={{ stopColor: '#fef3c7', stopOpacity: 1 }} />
        <stop offset="70%" style={{ stopColor: '#fbbf24', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#d97706', stopOpacity: 1 }} />
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="48" fill="url(#coinGradient)" />
    <circle cx="50" cy="50" r="42" fill="none" stroke="#b45309" strokeWidth="2" />
    <text x="50" y="65" textAnchor="middle" fontSize="40" fontWeight="bold" fill="#78350f">$</text>
  </svg>
);

function useCarGame(initialLane = 2) {
  const [lane, setLane] = useState(initialLane);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [obstacles, setObstacles] = useState([]);
  const [coins, setCoins] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [highScore, setHighScore] = useState(localStorage.getItem('carGameHighScore') ? parseInt(localStorage.getItem('carGameHighScore')) : 0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (gameOver && lives <= 0) return;

    const tick = () => {
      setObstacles((prev) => {
        const next = prev
          .map((obstacle) => ({ ...obstacle, row: obstacle.row + 1 }))
          .filter((obstacle) => obstacle.row <= 9);

        const spawnChance = Math.min(0.45, 0.35 + level * 0.02);
        if (Math.random() < spawnChance) {
          next.push({ id: Math.random(), lane: Math.ceil(Math.random() * 3), row: -1, type: 'obstacle' });
        }

        if (Math.random() < 0.08) {
          next.push({ id: Math.random(), lane: Math.ceil(Math.random() * 3), row: -1, type: 'coin' });
        }

        return next;
      });

      setCoins((prev) => {
        const next = prev
          .map((coin) => ({ ...coin, row: coin.row + 1 }))
          .filter((coin) => coin.row <= 9);
        return next;
      });

      setScore((current) => {
        const nextScore = current + 10;
        const newLevel = Math.floor(nextScore / 500) + 1;
        setLevel(newLevel);
        const baseSpeed = 500 - newLevel * 30;
        setSpeed(Math.max(150, baseSpeed));
        if (nextScore > highScore) setHighScore(nextScore);
        return nextScore;
      });
    };

    intervalRef.current = setInterval(tick, speed);
    return () => clearInterval(intervalRef.current);
  }, [gameOver, speed, lives, level, highScore]);

  useEffect(() => {
    const collision = obstacles.some((obstacle) => obstacle.type === 'obstacle' && obstacle.row >= 8 && obstacle.lane === lane);
    if (collision) {
      const newLives = lives - 1;
      setLives(newLives);
      setObstacles((prev) => prev.filter((o) => !(o.row >= 8 && o.lane === lane && o.type === 'obstacle')));
      if (newLives <= 0) {
        setGameOver(true);
        localStorage.setItem('carGameHighScore', Math.max(highScore, score));
      }
    }

    const coinCollection = coins.some((coin) => coin.row >= 8 && coin.lane === lane);
    if (coinCollection) {
      setScore((current) => current + 50);
      setCoins((prev) => prev.filter((c) => !(c.row >= 8 && c.lane === lane)));
    }
  }, [obstacles, coins, lane, lives, score, highScore]);

  const moveLeft = () => setLane((current) => Math.max(1, current - 1));
  const moveRight = () => setLane((current) => Math.min(3, current + 1));
  const reset = () => {
    setLane(initialLane);
    setScore(0);
    setLives(3);
    setLevel(1);
    setObstacles([]);
    setCoins([]);
    setGameOver(false);
    setSpeed(500);
  };

  return {
    lane,
    score,
    lives,
    level,
    obstacles,
    coins,
    gameOver,
    moveLeft,
    moveRight,
    reset,
    highScore,
  };
}


export default function Practical15() {
  const game = useCarGame(2);
  const [touchStart, setTouchStart] = useState(0);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') game.moveLeft();
      if (e.key === 'ArrowRight') game.moveRight();
      if (e.key === ' ') e.preventDefault();
      if (e.key === 'Enter' && game.gameOver) game.reset();
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [game]);

  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientX;
    if (touchStart - touchEnd > 50) game.moveRight();
    if (touchEnd - touchStart > 50) game.moveLeft();
  };

  const lanes = [1, 2, 3];
  const canvasWidth = 320;
  const canvasHeight = 480;

  return (
    <div className="g-container" style={{ minHeight: '100vh', paddingBottom: 60, background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
      <nav className="g-navbar" style={{ background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)', boxShadow: '0 4px 20px rgba(16, 185, 129, 0.3)' }}>
        <h2 className="g-navbar-brand" style={{ color: 'white', margin: 0 }}>🏁 Ultimate Car Racing Game</h2>
      </nav>

      <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 24px' }}>
        <p style={{ color: '#cbd5e1', fontSize: '1.1rem', marginBottom: 32, textAlign: 'center' }}>
          Navigate the infinite road, collect coins, avoid enemy cars. Arrow keys or touch to play.
        </p>

        <div style={{ display: 'grid', gap: 32, alignItems: 'start', gridTemplateColumns: 'auto 1fr', justifyContent: 'center' }}>
          {/* Game Canvas */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{
              position: 'relative',
              width: canvasWidth,
              height: canvasHeight,
              background: 'linear-gradient(180deg, #1e3a8a 0%, #0f172a 100%)',
              borderRadius: 28,
              overflow: 'hidden',
              border: '8px solid #10b981',
              boxShadow: '0 20px 60px rgba(16, 185, 129, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.05)',
              cursor: 'pointer'
            }}
          >
            {/* Road lines animation */}
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '100% 40px', animation: 'scroll 0.6s linear infinite', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 3, background: 'repeating-linear-gradient(180deg, #f4d03f 0%, #f4d03f 20px, transparent 20px, transparent 40px)', transform: 'translateX(-50%)', pointerEvents: 'none', boxShadow: '0 0 10px rgba(244, 208, 63, 0.5)' }} />

            {/* Lane dividers */}
            {lanes.map((lane) => (
              <div
                key={`lane-${lane}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: `${20 + (lane - 1) * 30}%`,
                  width: '30%',
                  height: '100%',
                  borderLeft: lane > 1 ? '1px dashed rgba(255,255,255,0.15)' : 'none',
                  borderRight: lane < 3 ? '1px dashed rgba(255,255,255,0.15)' : 'none',
                }}
              />
            ))}

            {/* Obstacles and Coins */}
            {game.obstacles.map((obstacle) => (
              <div
                key={`${obstacle.id}`}
                style={{
                  position: 'absolute',
                  width: '22%',
                  height: '14%',
                  borderRadius: 12,
                  left: `${20 + (obstacle.lane - 1) * 30}%`,
                  top: `${obstacle.row * (100 / 9)}%`,
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {obstacle.type === 'coin' ? <CoinIcon /> : <ObstacleCar />}
              </div>
            ))}

            {/* Player car */}
            <div
              style={{
                position: 'absolute',
                width: '22%',
                height: '16%',
                left: `${20 + (game.lane - 1) * 30}%`,
                top: '82%',
                transform: 'translateX(-50%)',
                transition: 'all 0.15s ease-out',
                filter: 'drop-shadow(0 8px 25px rgba(16, 185, 129, 0.6))',
              }}
            >
              <PlayerCar />
            </div>

            {/* Game Over overlay */}
            {game.gameOver && (
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.9)', display: 'grid', placeItems: 'center', padding: 20, textAlign: 'center', backdropFilter: 'blur(2px)' }}>
                <div style={{ animation: 'pulse 0.6s ease-in-out' }}>
                  <div style={{ fontSize: '3.5rem', marginBottom: 12 }}>💥</div>
                  <h3 style={{ margin: '0 0 12px 0', fontSize: '1.8rem', color: '#fbbf24' }}>Game Over!</h3>
                  <p style={{ color: '#cbd5e1', margin: '8px 0' }}>Final Score: <strong style={{ color: '#10b981' }}>{game.score}</strong></p>
                  <p style={{ color: '#64748b', margin: '4px 0 16px 0', fontSize: '0.9rem' }}>Press Enter to restart</p>
                </div>
              </div>
            )}
          </div>

          {/* Stats Panel */}
          <div style={{ display: 'grid', gap: 16, gridTemplateColumns: '1fr 1fr' }}>
            {/* Score Card */}
            <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', padding: 24, borderRadius: 18, boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -10, right: -10, fontSize: '4rem', opacity: 0.1 }}>🏆</div>
              <div style={{ color: '#d1fae5', fontSize: '0.85rem', marginBottom: 8, textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>Score</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white' }}>{game.score}</div>
              <div style={{ color: '#a7f3d0', fontSize: '0.8rem', marginTop: 8 }}>+10 per tick, +50 coins</div>
            </div>

            {/* Level Card */}
            <div style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', padding: 24, borderRadius: 18, boxShadow: '0 8px 20px rgba(245, 158, 11, 0.3)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -10, right: -10, fontSize: '4rem', opacity: 0.1 }}>⚡</div>
              <div style={{ color: '#fef3c7', fontSize: '0.85rem', marginBottom: 8, textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>Level</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'white' }}>{game.level}</div>
              <div style={{ color: '#fcd34d', fontSize: '0.8rem', marginTop: 8 }}>Speed: {Math.max(150, 500 - game.level * 30)}ms</div>
            </div>

            {/* Lives Card */}
            <div style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', padding: 24, borderRadius: 18, boxShadow: '0 8px 20px rgba(239, 68, 68, 0.3)', gridColumn: '1 / -1', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -10, right: -10, fontSize: '4rem', opacity: 0.1 }}>❤️</div>
              <div style={{ color: '#fee2e2', fontSize: '0.85rem', marginBottom: 12, textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>Lives Remaining</div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                {[...Array(3)].map((_, i) => (
                  <div key={i} style={{ flex: 1, height: 50, borderRadius: 12, background: i < game.lives ? 'linear-gradient(135deg, #fca5a5 0%, #f87171 100%)' : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 'bold', boxShadow: i < game.lives ? '0 4px 12px rgba(252, 165, 165, 0.4)' : 'none', border: i < game.lives ? '2px solid #fee2e2' : '2px dashed #7f1d1d' }}>
                    {i < game.lives ? '❤️' : '💔'}
                  </div>
                ))}
              </div>
            </div>

            {/* High Score Card */}
            <div style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', padding: 24, borderRadius: 18, boxShadow: '0 8px 20px rgba(139, 92, 246, 0.3)', gridColumn: '1 / -1', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -10, right: -10, fontSize: '4rem', opacity: 0.1 }}>👑</div>
              <div style={{ color: '#ede9fe', fontSize: '0.85rem', marginBottom: 8, textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>Best Score (Saved)</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#e9d5ff' }}>{game.highScore}</div>
            </div>

            {game.gameOver && (
              <button
                onClick={game.reset}
                style={{
                  gridColumn: '1 / -1',
                  padding: '16px 32px',
                  borderRadius: 14,
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: 'white',
                  border: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(16, 185, 129, 0.4)',
                  transition: 'all 0.3s',
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 12px 28px rgba(16, 185, 129, 0.5)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.4)';
                }}
              >
                🔄 Restart Game
              </button>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div style={{ marginTop: 40, background: 'rgba(255,255,255,0.05)', padding: 28, borderRadius: 18, border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
          <h3 style={{ marginTop: 0, color: '#e0f2fe', display: 'flex', alignItems: 'center', gap: 8 }}>📖 Game Guide</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: 16, borderRadius: 12, border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <div style={{ color: '#10b981', fontWeight: 700, marginBottom: 6, fontSize: '1rem' }}>⬅️ ➡️ Move Car</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Use arrow keys or swipe to change lanes and dodge obstacles</div>
            </div>
            <div style={{ background: 'rgba(251, 191, 36, 0.1)', padding: 16, borderRadius: 12, border: '1px solid rgba(251, 191, 36, 0.3)' }}>
              <div style={{ color: '#fbbf24', fontWeight: 700, marginBottom: 6, fontSize: '1rem' }}>💰 Collect Coins</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Drive into golden coins for 50 bonus points each</div>
            </div>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: 16, borderRadius: 12, border: '1px solid rgba(239, 68, 68, 0.3)' }}>
              <div style={{ color: '#ef4444', fontWeight: 700, marginBottom: 6, fontSize: '1rem' }}>🚗 Avoid Cars</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Red cars are enemies! Hit them and lose a life</div>
            </div>
            <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: 16, borderRadius: 12, border: '1px solid rgba(139, 92, 246, 0.3)' }}>
              <div style={{ color: '#8b5cf6', fontWeight: 700, marginBottom: 6, fontSize: '1rem' }}>📈 Level Up</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Every 500 points increases level and game speed</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', padding: '20px', color: '#64748b', fontSize: '0.9rem', marginTop: 40 }}>
        <p style={{ margin: '0 0 4px 0' }}>Name : Vishal Rajesh Bhutekar</p>
        <p style={{ margin: 0 }}>Roll no: BT24S05F002</p>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(40px); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}


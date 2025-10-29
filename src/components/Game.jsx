import React, { useState, useEffect, useRef } from 'react';
import '../assets/Game.css';

const Game = () => {
  const [player, setPlayer] = useState({ x: 50, y: 300, jumping: false });
  const [velocityY, setVelocityY] = useState(0);
  const [score, setScore] = useState(0);
  const worldWidth = 2000; // the full map width
  const viewWidth = 800;   // visible screen width
  const [coins, setCoins] = useState(
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: 200 + i * 150,
      y: 280,
      collected: false
    }))
  );

  const keys = useRef({ left: false, right: false, up: false });

  // Handle key input
  useEffect(() => {
    const down = e => {
      if (e.key === 'ArrowLeft') keys.current.left = true;
      if (e.key === 'ArrowRight') keys.current.right = true;
      if (e.key === ' ' || e.key === 'ArrowUp') keys.current.up = true;
    };
    const up = e => {
      if (e.key === 'ArrowLeft') keys.current.left = false;
      if (e.key === 'ArrowRight') keys.current.right = false;
      if (e.key === ' ' || e.key === 'ArrowUp') keys.current.up = false;
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

  // Game loop
  useEffect(() => {
    const loop = setInterval(() => {
      setPlayer(prev => {
        let { x, y } = prev;

        // horizontal movement
        if (keys.current.left) x -= 8;
        if (keys.current.right) x += 8;
        if (x < 0) x = 0;
        if (x > worldWidth - 30) x = worldWidth - 30;

        // jumping
        if ((keys.current.up && y >= 300) && velocityY === 0) {
          setVelocityY(-15);
        }

        // gravity
        let newVelocityY = velocityY + 1;
        y += newVelocityY;
        if (y > 300) {
          y = 300;
          newVelocityY = 0;
        }
        setVelocityY(newVelocityY);
        return { ...prev, x, y };
      });
    }, 30);

    return () => clearInterval(loop);
  }, [velocityY]);

  // Coin collection
  useEffect(() => {
    setCoins(coins.map(c => {
      if (!c.collected && Math.abs(player.x - c.x) < 25 && Math.abs(player.y - c.y) < 25) {
        setScore(s => s + 1);
        return { ...c, collected: true };
      }
      return c;
    }));
  }, [player]);

  // Camera offset (scrolling)
  const cameraX = Math.max(0, Math.min(player.x - viewWidth / 2, worldWidth - viewWidth));

  return (
    <div className="game">
      <div className="score">Coins: {score}</div>

      <div
        className="world"
        style={{ transform: `translateX(${-cameraX}px)` }}
      >
        <div className="ground" />

        <div className="player" style={{ left: player.x, top: player.y }} />

        {coins.map(c => !c.collected && (
          <div key={c.id} className="coin" style={{ left: c.x, top: c.y }} />
        ))}

        {/* Sample blocks */}
        <div className="block" style={{ left: 400, top: 250 }} />
        <div className="block" style={{ left: 800, top: 200 }} />
        <div className="block" style={{ left: 1200, top: 250 }} />
        <div className="block" style={{ left: 1600, top: 200 }} />
      </div>
    </div>
);
};

export default Game;

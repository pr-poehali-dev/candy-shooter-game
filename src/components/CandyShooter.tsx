import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Character {
  id: number;
  name: string;
  emoji: string;
  color: string;
}

interface CandyShooterProps {
  character: Character;
  onGameOver: (score: number) => void;
}

interface Position {
  x: number;
  y: number;
}

interface Candy extends Position {
  vx: number;
  vy: number;
  color: string;
  emoji: string;
}

interface Enemy extends Position {
  vx: number;
  vy: number;
  size: number;
  emoji: string;
  health: number;
}

const CandyShooter = ({ character, onGameOver }: CandyShooterProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'over'>('ready');
  
  const gameRef = useRef({
    player: { x: 0, y: 0, size: 40 },
    candies: [] as Candy[],
    enemies: [] as Enemy[],
    score: 0,
    animationId: 0,
    lastEnemySpawn: 0,
  });

  const getCandyEmoji = (characterId: number) => {
    const candyMap: { [key: number]: string } = {
      1: '🍪',
      2: '🍓',
      3: '✨',
      4: '🍬',
    };
    return candyMap[characterId] || '🍬';
  };

  const getEnemyEmoji = () => {
    const enemies = ['👾', '👻', '🦇', '🧟', '💀', '🎃'];
    return enemies[Math.floor(Math.random() * enemies.length)];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    gameRef.current.player = {
      x: canvas.width / 2,
      y: canvas.height - 60,
      size: 40,
    };

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      gameRef.current.player.x = canvas.width / 2;
      gameRef.current.player.y = canvas.height - 60;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const shootCandy = (targetX: number, targetY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const game = gameRef.current;
    const dx = targetX - game.player.x;
    const dy = targetY - game.player.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const speed = 8;

    const candy: Candy = {
      x: game.player.x,
      y: game.player.y,
      vx: (dx / distance) * speed,
      vy: (dy / distance) * speed,
      color: character.color,
      emoji: getCandyEmoji(character.id),
    };

    game.candies.push(candy);
  };

  const spawnEnemy = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const game = gameRef.current;
    const enemy: Enemy = {
      x: Math.random() * canvas.width,
      y: -50,
      vx: (Math.random() - 0.5) * 2,
      vy: 1 + Math.random() * 2,
      size: 35,
      emoji: getEnemyEmoji(),
      health: 1,
    };

    game.enemies.push(enemy);
  };

  const checkCollision = (candy: Candy, enemy: Enemy): boolean => {
    const dx = candy.x - enemy.x;
    const dy = candy.y - enemy.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < enemy.size;
  };

  const gameLoop = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || gameState !== 'playing') return;

    const game = gameRef.current;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${game.player.size}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(character.emoji, game.player.x, game.player.y);

    game.candies = game.candies.filter(candy => {
      candy.x += candy.vx;
      candy.y += candy.vy;

      if (candy.x < 0 || candy.x > canvas.width || candy.y < 0 || candy.y > canvas.height) {
        return false;
      }

      ctx.font = '30px Arial';
      ctx.fillText(candy.emoji, candy.x, candy.y);
      return true;
    });

    const now = Date.now();
    if (now - game.lastEnemySpawn > 1500) {
      spawnEnemy();
      game.lastEnemySpawn = now;
    }

    game.enemies = game.enemies.filter(enemy => {
      enemy.x += enemy.vx;
      enemy.y += enemy.vy;

      if (enemy.y > canvas.height) {
        setGameState('over');
        setIsPlaying(false);
        onGameOver(game.score);
        return false;
      }

      for (let i = game.candies.length - 1; i >= 0; i--) {
        if (checkCollision(game.candies[i], enemy)) {
          game.candies.splice(i, 1);
          enemy.health--;
          
          if (enemy.health <= 0) {
            game.score += 10;
            setScore(game.score);
            return false;
          }
        }
      }

      ctx.font = `${enemy.size}px Arial`;
      ctx.fillText(enemy.emoji, enemy.x, enemy.y);
      return true;
    });

    game.animationId = requestAnimationFrame(gameLoop);
  };

  const startGame = () => {
    gameRef.current.candies = [];
    gameRef.current.enemies = [];
    gameRef.current.score = 0;
    gameRef.current.lastEnemySpawn = Date.now();
    setScore(0);
    setGameState('playing');
    setIsPlaying(true);
    gameLoop();
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    shootCandy(x, y);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    
    gameRef.current.player.x = Math.max(40, Math.min(canvas.width - 40, x));
  };

  useEffect(() => {
    return () => {
      if (gameRef.current.animationId) {
        cancelAnimationFrame(gameRef.current.animationId);
      }
    };
  }, []);

  return (
    <Card className="p-6 bg-white/95 backdrop-blur-sm border-4 border-candy-pink rounded-3xl shadow-2xl">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-3xl font-heading text-candy-pink">
            Счёт: {score}
          </div>
          <div className="text-2xl">
            {character.emoji} {character.name}
          </div>
        </div>

        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          onMouseMove={handleMouseMove}
          className="w-full h-[500px] bg-gradient-to-b from-sky-200 to-sky-100 rounded-2xl cursor-crosshair border-4 border-candy-blue"
          style={{ touchAction: 'none' }}
        />

        <div className="flex gap-4 justify-center">
          {gameState === 'ready' && (
            <Button
              onClick={startGame}
              className="bg-gradient-to-r from-candy-pink to-candy-yellow text-white text-xl px-8 py-6 rounded-full shadow-xl hover:scale-105 transition-transform font-heading"
            >
              Начать игру! 🎮
            </Button>
          )}
          
          {gameState === 'playing' && (
            <div className="text-center">
              <p className="text-lg text-gray-600">
                Кликай мышкой, чтобы стрелять! 🎯
              </p>
              <p className="text-sm text-gray-500">
                Не дай врагам дойти до земли!
              </p>
            </div>
          )}

          {gameState === 'over' && (
            <div className="text-center space-y-4">
              <h3 className="text-3xl font-heading text-candy-pink">
                Игра окончена! 😢
              </h3>
              <p className="text-xl">Финальный счёт: {score}</p>
              <Button
                onClick={startGame}
                className="bg-gradient-to-r from-candy-pink to-candy-yellow text-white text-xl px-8 py-6 rounded-full shadow-xl hover:scale-105 transition-transform font-heading"
              >
                Играть снова! 🔄
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default CandyShooter;

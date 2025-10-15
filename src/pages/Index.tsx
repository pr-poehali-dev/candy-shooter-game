import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Character {
  id: number;
  name: string;
  candy: string;
  effect: string;
  emoji: string;
  color: string;
}

interface Level {
  id: number;
  name: string;
  stars: number;
  maxStars: number;
  locked: boolean;
}

interface Player {
  name: string;
  score: number;
  rank: number;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  unlocked: boolean;
  icon: string;
}

const Index = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<number>(1);

  const characters: Character[] = [
    { id: 1, name: 'GingerBrave', candy: '🍪 Cookie Blast', effect: 'Тройной выстрел печеньками', emoji: '🍪', color: 'candy-yellow' },
    { id: 2, name: 'Strawberry Cookie', candy: '🍓 Berry Boom', effect: 'Взрывные ягоды с замедлением', emoji: '🍓', color: 'candy-pink' },
    { id: 3, name: 'Wizard Cookie', candy: '✨ Magic Candy', effect: 'Магические конфеты с эффектом молнии', emoji: '✨', color: 'candy-purple' },
    { id: 4, name: 'Mint Choco Cookie', candy: '🍬 Mint Shot', effect: 'Ледяной залп с заморозкой', emoji: '🍬', color: 'candy-blue' },
  ];

  const levels: Level[] = [
    { id: 1, name: 'Сахарный лес', stars: 3, maxStars: 3, locked: false },
    { id: 2, name: 'Шоколадная гора', stars: 2, maxStars: 3, locked: false },
    { id: 3, name: 'Карамельная пещера', stars: 1, maxStars: 3, locked: false },
    { id: 4, name: 'Мармеладное болото', stars: 0, maxStars: 3, locked: false },
    { id: 5, name: 'Королевский замок', stars: 0, maxStars: 3, locked: true },
  ];

  const leaderboard: Player[] = [
    { name: 'CookieMaster', score: 125000, rank: 1 },
    { name: 'SweetShooter', score: 98500, rank: 2 },
    { name: 'CandyKing', score: 87300, rank: 3 },
    { name: 'BiscuitHero', score: 76200, rank: 4 },
    { name: 'SugarQueen', score: 65100, rank: 5 },
  ];

  const achievements: Achievement[] = [
    { id: 1, title: 'Первый выстрел', description: 'Сделай первый выстрел конфетой', unlocked: true, icon: '🎯' },
    { id: 2, title: 'Меткий стрелок', description: 'Попади 50 раз подряд', unlocked: true, icon: '🏹' },
    { id: 3, title: 'Сладкий коллекционер', description: 'Собери всех персонажей', unlocked: false, icon: '🍭' },
    { id: 4, title: 'Король конфет', description: 'Набери 100 000 очков', unlocked: true, icon: '👑' },
    { id: 5, title: 'Легенда Cookie Run', description: 'Пройди все уровни на 3 звезды', unlocked: false, icon: '⭐' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-candy-pink via-candy-yellow to-candy-blue p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8 animate-float">
          <h1 className="text-5xl md:text-7xl font-heading text-white mb-2 drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]" style={{
            textShadow: '4px 4px 0px #FF6B35, 6px 6px 0px #9D4EDD'
          }}>
            COOKIE RUN
          </h1>
          <h2 className="text-3xl md:text-5xl font-heading text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]" style={{
            textShadow: '3px 3px 0px #FD7700, 5px 5px 0px #87CEEB'
          }}>
            CANDY SHOOTER
          </h2>
          <div className="flex gap-2 justify-center mt-4">
            {['🍪', '🍓', '🍬', '🍭', '✨'].map((candy, i) => (
              <span key={i} className="text-3xl animate-bounce-candy" style={{ animationDelay: `${i * 0.1}s` }}>
                {candy}
              </span>
            ))}
          </div>
        </header>

        <Tabs defaultValue="home" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6 bg-white/90 backdrop-blur-sm p-2 rounded-3xl shadow-lg">
            <TabsTrigger value="home" className="rounded-2xl data-[state=active]:bg-candy-pink data-[state=active]:text-white">
              <Icon name="Home" className="w-5 h-5 mr-2" />
              Главная
            </TabsTrigger>
            <TabsTrigger value="characters" className="rounded-2xl data-[state=active]:bg-candy-yellow data-[state=active]:text-white">
              <Icon name="Users" className="w-5 h-5 mr-2" />
              Персонажи
            </TabsTrigger>
            <TabsTrigger value="levels" className="rounded-2xl data-[state=active]:bg-candy-purple data-[state=active]:text-white">
              <Icon name="MapPin" className="w-5 h-5 mr-2" />
              Уровни
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="rounded-2xl data-[state=active]:bg-candy-blue data-[state=active]:text-white">
              <Icon name="Trophy" className="w-5 h-5 mr-2" />
              Рейтинг
            </TabsTrigger>
            <TabsTrigger value="achievements" className="rounded-2xl data-[state=active]:bg-candy-gold data-[state=active]:text-white">
              <Icon name="Award" className="w-5 h-5 mr-2" />
              Достижения
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-6">
            <Card className="p-8 bg-white/95 backdrop-blur-sm border-4 border-candy-pink rounded-3xl shadow-2xl">
              <div className="text-center space-y-6">
                <div className="text-8xl mb-4 animate-pulse-glow">
                  {characters.find(c => c.id === selectedCharacter)?.emoji}
                </div>
                <h2 className="text-4xl font-heading text-candy-pink">
                  {characters.find(c => c.id === selectedCharacter)?.name}
                </h2>
                <p className="text-xl text-gray-700">
                  {characters.find(c => c.id === selectedCharacter)?.candy}
                </p>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-candy-pink to-candy-yellow text-white text-2xl px-12 py-8 rounded-full shadow-xl hover:scale-105 transition-transform font-heading"
                >
                  ИГРАТЬ! 🎮
                </Button>
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="bg-candy-pink/20 p-4 rounded-2xl">
                    <div className="text-3xl font-bold text-candy-pink">1,234</div>
                    <div className="text-sm text-gray-600">Лучший счёт</div>
                  </div>
                  <div className="bg-candy-yellow/20 p-4 rounded-2xl">
                    <div className="text-3xl font-bold text-candy-yellow">42</div>
                    <div className="text-sm text-gray-600">Уровень</div>
                  </div>
                  <div className="bg-candy-blue/20 p-4 rounded-2xl">
                    <div className="text-3xl font-bold text-candy-blue">⭐ 89</div>
                    <div className="text-sm text-gray-600">Звёзды</div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="characters" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {characters.map((character) => (
                <Card 
                  key={character.id}
                  className={`p-6 cursor-pointer transition-all hover:scale-105 border-4 rounded-3xl ${
                    selectedCharacter === character.id 
                      ? `bg-${character.color}/20 border-${character.color} shadow-2xl` 
                      : 'bg-white/95 border-white hover:border-candy-pink'
                  }`}
                  onClick={() => setSelectedCharacter(character.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-6xl animate-bounce-candy">{character.emoji}</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-heading mb-2">{character.name}</h3>
                      <Badge className={`bg-${character.color} text-white mb-3`}>
                        {character.candy}
                      </Badge>
                      <p className="text-gray-700">{character.effect}</p>
                      <Button 
                        className={`mt-4 bg-${character.color} text-white rounded-full hover:scale-105 transition-transform`}
                      >
                        Выбрать персонажа
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="levels" className="space-y-4">
            {levels.map((level) => (
              <Card 
                key={level.id}
                className={`p-6 border-4 rounded-3xl ${
                  level.locked 
                    ? 'bg-gray-200 border-gray-400 opacity-60' 
                    : 'bg-white/95 border-candy-purple hover:scale-105 transition-all cursor-pointer'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`text-4xl ${level.locked ? 'grayscale' : ''}`}>
                      {level.locked ? '🔒' : '🎯'}
                    </div>
                    <div>
                      <h3 className="text-2xl font-heading">{level.name}</h3>
                      <div className="flex gap-1 mt-2">
                        {[...Array(level.maxStars)].map((_, i) => (
                          <span key={i} className="text-2xl">
                            {i < level.stars ? '⭐' : '☆'}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {!level.locked && (
                    <Button className="bg-candy-purple text-white rounded-full px-8 hover:scale-105 transition-transform">
                      Играть
                    </Button>
                  )}
                </div>
                {!level.locked && level.stars < level.maxStars && (
                  <Progress value={(level.stars / level.maxStars) * 100} className="mt-4" />
                )}
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-4">
            <Card className="p-6 bg-gradient-to-br from-candy-gold/30 to-candy-yellow/30 border-4 border-candy-gold rounded-3xl">
              <h2 className="text-3xl font-heading text-center mb-6 flex items-center justify-center gap-2">
                <Icon name="Trophy" className="w-8 h-8 text-candy-gold" />
                Топ игроков
              </h2>
              <div className="space-y-3">
                {leaderboard.map((player) => (
                  <div 
                    key={player.rank}
                    className={`flex items-center justify-between p-4 rounded-2xl ${
                      player.rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white' :
                      player.rank === 2 ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800' :
                      player.rank === 3 ? 'bg-gradient-to-r from-orange-400 to-orange-600 text-white' :
                      'bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-3xl font-bold w-12 text-center">
                        {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : player.rank === 3 ? '🥉' : `#${player.rank}`}
                      </div>
                      <div className="text-xl font-heading">{player.name}</div>
                    </div>
                    <div className="text-2xl font-bold">{player.score.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <Card 
                  key={achievement.id}
                  className={`p-6 border-4 rounded-3xl ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-br from-candy-gold/30 to-yellow-100 border-candy-gold' 
                      : 'bg-gray-100 border-gray-300 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`text-5xl ${achievement.unlocked ? 'animate-pulse-glow' : 'grayscale'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-heading mb-1">{achievement.title}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      {achievement.unlocked && (
                        <Badge className="mt-2 bg-candy-gold text-white">
                          Получено! ✓
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;

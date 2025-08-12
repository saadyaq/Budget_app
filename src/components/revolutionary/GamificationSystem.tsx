import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated, config } from '@react-spring/web';
import styled from 'styled-components';
import {
  Trophy,
  Star,
  Flame,
  Zap,
  Target,
  Crown,
  Gem,
  Sparkles,
  Medal,
  Award
} from 'lucide-react';
import { GlassCard } from './GlassCard';
import { revolutionaryTheme } from '../../styles/theme';

const GamificationContainer = styled(motion.div)`
  padding: ${revolutionaryTheme.spacing.xl};
`;

const StreakCard = styled(GlassCard)`
  padding: ${revolutionaryTheme.spacing.xl};
  text-align: center;
  position: relative;
  overflow: visible;
`;

const StreakFlame = styled(motion.div)`
  font-size: 4rem;
  margin-bottom: ${revolutionaryTheme.spacing.md};
  filter: drop-shadow(0 0 20px ${revolutionaryTheme.gamification.streak.fire});
`;

const StreakCounter = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 800;
  background: ${revolutionaryTheme.gamification.streak.gold};
  background: linear-gradient(135deg, ${revolutionaryTheme.gamification.streak.gold} 0%, ${revolutionaryTheme.gamification.streak.fire} 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  text-shadow: 0 0 30px ${revolutionaryTheme.gamification.streak.fire};
`;

const BadgeGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${revolutionaryTheme.spacing.md};
  margin-top: ${revolutionaryTheme.spacing.xl};
`;

const Badge = styled(motion.div)<{ $rarity: string; $unlocked: boolean }>`
  aspect-ratio: 1;
  background: ${props => props.$unlocked 
    ? revolutionaryTheme.gamification.badges[props.$rarity as keyof typeof revolutionaryTheme.gamification.badges]
    : 'linear-gradient(135deg, #666 0%, #333 100%)'};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
  filter: ${props => props.$unlocked ? 'none' : 'grayscale(100%)'};
  box-shadow: ${props => props.$unlocked 
    ? `0 0 30px ${props.$rarity === 'legendary' ? revolutionaryTheme.gamification.streak.gold : 
        props.$rarity === 'epic' ? '#9C27B0' : 
        props.$rarity === 'rare' ? '#2196F3' : '#4CAF50'}40`
    : 'none'};
    
  &::before {
    content: '';
    position: absolute;
    inset: -4px;
    background: ${props => props.$unlocked 
      ? revolutionaryTheme.gamification.badges[props.$rarity as keyof typeof revolutionaryTheme.gamification.badges]
      : 'none'};
    border-radius: 50%;
    z-index: -1;
    opacity: 0.3;
  }
`;

const ProgressRing = styled.svg`
  transform: rotate(-90deg);
  width: 120px;
  height: 120px;
`;

const ProgressCircle = styled.circle<{ $progress: number }>`
  fill: none;
  stroke: ${revolutionaryTheme.colors.signature.emerald};
  stroke-width: 8;
  stroke-linecap: round;
  stroke-dasharray: ${2 * Math.PI * 50};
  stroke-dashoffset: ${props => 2 * Math.PI * 50 * (1 - props.$progress / 100)};
  transition: stroke-dashoffset 2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  filter: drop-shadow(0 0 10px ${revolutionaryTheme.colors.signature.emerald});
`;

const AchievementPopup = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${revolutionaryTheme.gradients.glassmorphism.light};
  backdrop-filter: ${revolutionaryTheme.effects.glassmorphism.backdropFilter};
  border: ${revolutionaryTheme.effects.glassmorphism.border};
  border-radius: 24px;
  padding: ${revolutionaryTheme.spacing.xl};
  text-align: center;
  z-index: 1000;
  box-shadow: ${revolutionaryTheme.effects.glassmorphism.boxShadow};
`;

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

interface GamificationSystemProps {
  streak: number;
  achievements: Achievement[];
  onAchievementUnlock?: (achievement: Achievement) => void;
}

export const GamificationSystem: React.FC<GamificationSystemProps> = ({
  streak,
  achievements,
  onAchievementUnlock,
}) => {
  const [showAchievement, setShowAchievement] = useState<Achievement | null>(null);
  const [selectedBadge, setSelectedBadge] = useState<Achievement | null>(null);

  // Animations des flammes selon le streak
  const flameAnimation = useSpring({
    transform: streak > 0 ? 'scale(1) rotate(0deg)' : 'scale(0.8) rotate(-10deg)',
    config: config.wobbly,
  });

  const streakAnimation = useSpring({
    from: { number: 0 },
    to: { number: streak },
    config: config.molasses,
  });

  // Particules de feu autour du streak
  const fireParticles = React.useMemo(() => 
    Array.from({ length: streak > 7 ? 12 : Math.max(streak, 3) }, (_, i) => ({
      id: i,
      angle: (360 / Math.max(streak, 3)) * i,
      distance: 80 + Math.random() * 40,
      size: 4 + Math.random() * 6,
    })),
    [streak]
  );

  // Animation de déblocage d'achievement
  const unlockAnimation = {
    initial: { scale: 0, opacity: 0, rotate: -180 },
    animate: { 
      scale: [0, 1.2, 1], 
      opacity: 1, 
      rotate: [- 180, 360, 0],
      transition: {
        duration: 1,
        ease: revolutionaryTheme.easing.elastic
      }
    },
    exit: { scale: 0, opacity: 0, transition: { duration: 0.5 } }
  };

  // Déclencher l'animation d'unlock
  useEffect(() => {
    const newlyUnlocked = achievements.find(a => 
      a.unlocked && a.progress === a.maxProgress && !showAchievement
    );
    
    if (newlyUnlocked) {
      setShowAchievement(newlyUnlocked);
      setTimeout(() => setShowAchievement(null), 4000);
      onAchievementUnlock?.(newlyUnlocked);
    }
  }, [achievements, onAchievementUnlock, showAchievement]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return revolutionaryTheme.gamification.streak.gold;
      case 'epic': return '#9C27B0';
      case 'rare': return '#2196F3';
      default: return '#4CAF50';
    }
  };

  return (
    <>
      <GamificationContainer>
        {/* Streak Counter avec particules de feu */}
        <StreakCard hover glow>
          <div style={{ position: 'relative' }}>
            {/* Particules de feu animées */}
            {fireParticles.map(particle => (
              <motion.div
                key={particle.id}
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  width: particle.size,
                  height: particle.size,
                  backgroundColor: revolutionaryTheme.gamification.streak.fire,
                  borderRadius: '50%',
                  boxShadow: `0 0 ${particle.size * 2}px ${revolutionaryTheme.gamification.streak.fire}`,
                }}
                animate={{
                  x: Math.cos((particle.angle * Math.PI) / 180) * particle.distance,
                  y: Math.sin((particle.angle * Math.PI) / 180) * particle.distance,
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: particle.id * 0.1,
                  ease: "easeInOut"
                }}
              />
            ))}

            <animated.div style={flameAnimation}>
              <StreakFlame>
                🔥
              </StreakFlame>
            </animated.div>
            
            <div>
              <StreakCounter>
                {streak} jours
              </StreakCounter>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ 
                color: 'white', 
                fontSize: '1.2rem', 
                marginTop: revolutionaryTheme.spacing.md 
              }}
            >
              Streak de budget épique! 🎯
            </motion.p>

            {streak >= 7 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring", bounce: 0.6 }}
                style={{ 
                  marginTop: revolutionaryTheme.spacing.md,
                  display: 'flex',
                  justifyContent: 'center',
                  gap: revolutionaryTheme.spacing.sm 
                }}
              >
                <Crown color={revolutionaryTheme.gamification.streak.gold} size={32} />
                <Gem color={revolutionaryTheme.colors.neon.cyan} size={32} />
                <Crown color={revolutionaryTheme.gamification.streak.gold} size={32} />
              </motion.div>
            )}
          </div>
        </StreakCard>

        {/* Galerie des badges */}
        <GlassCard className="mt-8" hover>
          <motion.div style={{ padding: revolutionaryTheme.spacing.xl }}>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ 
                color: 'white', 
                fontSize: '1.5rem', 
                marginBottom: revolutionaryTheme.spacing.lg,
                textAlign: 'center'
              }}
            >
              🏆 Collection d'Achievements
            </motion.h2>

            <BadgeGrid>
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ 
                    delay: index * 0.1, 
                    type: "spring", 
                    bounce: 0.6 
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedBadge(achievement)}
                >
                  <Badge
                    $rarity={achievement.rarity}
                    $unlocked={achievement.unlocked}
                  >
                    {achievement.unlocked && (
                      <motion.div
                        animate={{ 
                          rotate: 360,
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        }}
                      >
                        {achievement.icon}
                      </motion.div>
                    )}
                    
                    {!achievement.unlocked && achievement.progress > 0 && (
                      <div style={{ position: 'relative' }}>
                        <ProgressRing>
                          <circle
                            cx="60"
                            cy="60"
                            r="50"
                            fill="none"
                            stroke="rgba(255,255,255,0.2)"
                            strokeWidth="8"
                          />
                          <ProgressCircle
                            cx="60"
                            cy="60"
                            r="50"
                            $progress={(achievement.progress / achievement.maxProgress) * 100}
                          />
                        </ProgressRing>
                        
                        <div style={{ 
                          position: 'absolute', 
                          top: '50%', 
                          left: '50%', 
                          transform: 'translate(-50%, -50%)' 
                        }}>
                          {achievement.icon}
                        </div>
                      </div>
                    )}
                  </Badge>
                </motion.div>
              ))}
            </BadgeGrid>
          </motion.div>
        </GlassCard>
      </GamificationContainer>

      {/* Popup d'achievement débloqué */}
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AchievementPopup
              initial={{ scale: 0, opacity: 0, rotate: -180 }}
              animate={{ 
                scale: [0, 1.2, 1], 
                opacity: 1, 
                rotate: [-180, 360, 0]
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                duration: 1,
                ease: [0.68, -0.55, 0.265, 1.55]
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Trophy size={64} color={getRarityColor(showAchievement.rarity)} />
              </motion.div>
              
              <h2 style={{ 
                color: 'white', 
                fontSize: '2rem', 
                margin: `${revolutionaryTheme.spacing.lg} 0` 
              }}>
                Achievement Débloqué!
              </h2>
              
              <h3 style={{ 
                color: getRarityColor(showAchievement.rarity), 
                fontSize: '1.5rem',
                margin: `${revolutionaryTheme.spacing.md} 0` 
              }}>
                {showAchievement.name}
              </h3>
              
              <p style={{ 
                color: 'rgba(255,255,255,0.8)', 
                fontSize: '1.1rem' 
              }}>
                {showAchievement.description}
              </p>

              {/* Confetti effect */}
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  style={{
                    position: 'absolute',
                    width: 8,
                    height: 8,
                    backgroundColor: getRarityColor(showAchievement.rarity),
                    borderRadius: '50%',
                    left: '50%',
                    top: '50%',
                  }}
                  animate={{
                    x: (Math.random() - 0.5) * 400,
                    y: (Math.random() - 0.5) * 400,
                    opacity: [1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.1,
                    ease: "easeOut"
                  }}
                />
              ))}
            </AchievementPopup>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
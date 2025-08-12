import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useSpring, animated, config } from '@react-spring/web';
import styled from 'styled-components';
import { 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  Target, 
  Sparkles,
  Flame,
  Award,
  Coins
} from 'lucide-react';
import { GlassCard } from './GlassCard';
import { revolutionaryTheme, getMoodTheme } from '../../styles/theme';

// Styled components avec gradients animés
const DashboardContainer = styled(animated.div)`
  min-height: 100vh;
  background: ${revolutionaryTheme.gradients.aurora.animated};
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  position: relative;
  overflow: hidden;
  
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const FloatingOrb = styled(motion.div)<{ $color: string; $size: number }>`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  background: radial-gradient(circle, ${props => props.$color}40 0%, transparent 70%);
  border-radius: 50%;
  filter: blur(1px);
  pointer-events: none;
`;

const DashboardGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${revolutionaryTheme.spacing.xl};
  padding: ${revolutionaryTheme.spacing.xl};
  max-width: 1400px;
  margin: 0 auto;
`;

const BalanceCard = styled(GlassCard)`
  grid-column: 1 / -1;
  padding: ${revolutionaryTheme.spacing.xl};
  text-align: center;
  position: relative;
`;

const BalanceAmount = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 800;
  background: ${revolutionaryTheme.gradients.aurora.primary};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  text-shadow: 0 0 30px rgba(156, 39, 176, 0.3);
`;

const StreakCounter = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${revolutionaryTheme.spacing.sm};
  margin-top: ${revolutionaryTheme.spacing.lg};
`;

const MetricCard = styled(GlassCard)<{ $trend: 'up' | 'down' | 'neutral' }>`
  padding: ${revolutionaryTheme.spacing.lg};
  position: relative;
  cursor: pointer;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${props => 
      props.$trend === 'up' ? revolutionaryTheme.gradients.mood.excellent :
      props.$trend === 'down' ? revolutionaryTheme.gradients.mood.danger :
      revolutionaryTheme.gradients.mood.neutral
    };
    border-radius: 4px 4px 0 0;
  }
`;

interface DashboardData {
  balance: number;
  income: number;
  expenses: number;
  savings: number;
  streak: number;
  financialScore: number;
}

export const RevolutionaryDashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData>({
    balance: 4280.50,
    income: 3500,
    expenses: 1220.50,
    savings: 850,
    streak: 12,
    financialScore: 85,
  });

  const [showCelebration, setShowCelebration] = useState(false);
  const controls = useAnimation();

  // Animation d'entrée spectaculaire
  const containerAnimation = useSpring({
    from: { opacity: 0, transform: 'scale(0.8)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: config.wobbly,
  });

  // Orbes flottantes en arrière-plan
  const orbs = React.useMemo(() => 
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      color: [
        revolutionaryTheme.colors.neon.cyan,
        revolutionaryTheme.colors.neon.magenta,
        revolutionaryTheme.colors.signature.coral,
        revolutionaryTheme.colors.signature.emerald,
      ][Math.floor(Math.random() * 4)],
      size: Math.random() * 100 + 50,
      duration: Math.random() * 20 + 10,
    })),
    []
  );

  // Animation de celebration pour les achievements
  const triggerCelebration = () => {
    setShowCelebration(true);
    controls.start({
      scale: [1, 1.2, 1],
      rotate: [0, 360],
      transition: { duration: 0.8, ease: [0.68, -0.55, 0.265, 1.55] }
    });
    setTimeout(() => setShowCelebration(false), 2000);
  };

  // Particles de célébration
  const celebrationParticles = React.useMemo(() => 
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + Math.random() * 100,
      color: [
        revolutionaryTheme.colors.neon.cyan,
        revolutionaryTheme.colors.signature.coral,
        revolutionaryTheme.colors.neon.lime,
        revolutionaryTheme.colors.neon.yellow,
      ][Math.floor(Math.random() * 4)],
      delay: i * 0.1,
    })),
    []
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  return (
    <DashboardContainer style={containerAnimation}>
      {/* Orbes flottantes d'arrière-plan */}
      <AnimatePresence>
        {orbs.map(orb => (
          <FloatingOrb
            key={orb.id}
            $color={orb.color}
            $size={orb.size}
            initial={{ x: orb.x, y: orb.y, opacity: 0 }}
            animate={{
              x: [orb.x, orb.x + 200, orb.x - 200, orb.x],
              y: [orb.y, orb.y - 300, orb.y - 100, orb.y],
              opacity: [0, 0.3, 0.1, 0],
            }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </AnimatePresence>

      {/* Particles de célébration */}
      <AnimatePresence>
        {showCelebration && celebrationParticles.map(particle => (
          <motion.div
            key={particle.id}
            style={{
              position: 'absolute',
              left: particle.x,
              top: particle.y,
              width: 8,
              height: 8,
              backgroundColor: particle.color,
              borderRadius: '50%',
              boxShadow: `0 0 10px ${particle.color}`,
            }}
            initial={{ y: window.innerHeight, opacity: 1, scale: 0 }}
            animate={{ y: -100, opacity: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 3,
              delay: particle.delay,
              ease: "easeOut"
            }}
          />
        ))}
      </AnimatePresence>

      <DashboardGrid>
        {/* Balance principale avec effet WOW */}
        <BalanceCard hover glow gradient="excellent">
          <motion.div
            animate={controls}
            onClick={triggerCelebration}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", bounce: 0.6 }}
            >
              <Sparkles size={32} color={revolutionaryTheme.colors.neon.lime} />
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              style={{ 
                margin: '16px 0 8px 0', 
                color: 'white',
                fontSize: '1.2rem',
                fontWeight: 600
              }}
            >
              Solde Total
            </motion.p>
            
            <BalanceAmount
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: "spring", bounce: 0.4 }}
            >
              {formatCurrency(data.balance)}
            </BalanceAmount>

            <StreakCounter>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Flame color={revolutionaryTheme.gamification.streak.fire} size={24} />
              </motion.div>
              <span style={{ color: 'white', fontWeight: 600, fontSize: '1.1rem' }}>
                {data.streak} jours de streak!
              </span>
            </StreakCounter>
          </motion.div>
        </BalanceCard>

        {/* Cartes métriques animées */}
        <MetricCard hover $trend="up" float>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <TrendingUp color={revolutionaryTheme.colors.signature.emerald} size={32} />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Coins color={revolutionaryTheme.colors.neon.lime} size={24} />
              </motion.div>
            </div>
            <h3 style={{ color: 'white', fontSize: '1.1rem', margin: '0 0 8px 0' }}>
              Revenus ce mois
            </h3>
            <p style={{ 
              color: revolutionaryTheme.colors.signature.emerald, 
              fontSize: '2rem', 
              fontWeight: 700,
              margin: 0 
            }}>
              {formatCurrency(data.income)}
            </p>
          </motion.div>
        </MetricCard>

        <MetricCard hover $trend="down" float>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <TrendingDown color={revolutionaryTheme.colors.signature.coral} size={32} />
              <Zap color={revolutionaryTheme.colors.neon.yellow} size={24} />
            </div>
            <h3 style={{ color: 'white', fontSize: '1.1rem', margin: '0 0 8px 0' }}>
              Dépenses ce mois
            </h3>
            <p style={{ 
              color: revolutionaryTheme.colors.signature.coral, 
              fontSize: '2rem', 
              fontWeight: 700,
              margin: 0 
            }}>
              {formatCurrency(data.expenses)}
            </p>
          </motion.div>
        </MetricCard>

        <MetricCard hover $trend="up" float>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <Target color={revolutionaryTheme.colors.signature.cobalt} size={32} />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Award color={revolutionaryTheme.gamification.badges.legendary.split(' ')[0].replace('linear-gradient(135deg,', '').split(' ')[0]} size={24} />
              </motion.div>
            </div>
            <h3 style={{ color: 'white', fontSize: '1.1rem', margin: '0 0 8px 0' }}>
              Épargne
            </h3>
            <p style={{ 
              color: revolutionaryTheme.colors.signature.cobalt, 
              fontSize: '2rem', 
              fontWeight: 700,
              margin: 0 
            }}>
              {formatCurrency(data.savings)}
            </p>
          </motion.div>
        </MetricCard>
      </DashboardGrid>
    </DashboardContainer>
  );
};
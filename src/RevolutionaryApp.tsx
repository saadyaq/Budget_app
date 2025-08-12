import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { 
  Home, 
  TrendingUp, 
  Target, 
  Trophy, 
  Settings,
  Sparkles,
  Volume2,
  VolumeX
} from 'lucide-react';
import { RevolutionaryDashboard } from './components/revolutionary/RevolutionaryDashboard';
import { GamificationSystem } from './components/revolutionary/GamificationSystem';
import { revolutionaryTheme } from './styles/theme';

// Global styles avec animations
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: #000;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  // Curseur personnalisé avec effet glow
  * {
    cursor: none;
  }

  #custom-cursor {
    position: fixed;
    width: 20px;
    height: 20px;
    background: radial-gradient(circle, ${revolutionaryTheme.colors.neon.cyan} 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: difference;
    transition: transform 0.1s ease;
  }

  // Scrollbar stylisée
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(0,0,0,0.1);
  }

  ::-webkit-scrollbar-thumb {
    background: ${revolutionaryTheme.gradients.aurora.primary};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${revolutionaryTheme.colors.signature.coral};
  }
`;

const AppContainer = styled(motion.div)`
  min-height: 100vh;
  position: relative;
`;

const BottomNavigation = styled(motion.nav)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${revolutionaryTheme.effects.glassmorphism.background};
  backdrop-filter: ${revolutionaryTheme.effects.glassmorphism.backdropFilter};
  border-top: ${revolutionaryTheme.effects.glassmorphism.border};
  padding: 16px;
  z-index: 100;
  
  @media (min-width: 768px) {
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    width: 400px;
    border-radius: 24px 24px 0 0;
    border: ${revolutionaryTheme.effects.glassmorphism.border};
  }
`;

const NavGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  max-width: 400px;
  margin: 0 auto;
`;

const NavButton = styled(motion.button)<{ $active: boolean }>`
  background: ${props => props.$active 
    ? revolutionaryTheme.gradients.aurora.primary
    : 'transparent'};
  border: none;
  border-radius: 16px;
  padding: 12px;
  color: ${props => props.$active ? 'white' : 'rgba(255,255,255,0.7)'};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    color: white;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0) scale(0.95);
  }
`;

const NotificationBadge = styled(motion.div)`
  position: absolute;
  top: -8px;
  right: -8px;
  background: ${revolutionaryTheme.colors.signature.coral};
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  box-shadow: 0 0 10px ${revolutionaryTheme.colors.signature.coral};
`;

const SoundToggle = styled(motion.button)`
  position: fixed;
  top: 24px;
  right: 24px;
  background: ${revolutionaryTheme.effects.glassmorphism.background};
  backdrop-filter: ${revolutionaryTheme.effects.glassmorphism.backdropFilter};
  border: ${revolutionaryTheme.effects.glassmorphism.border};
  border-radius: 50%;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  z-index: 200;

  &:hover {
    background: ${revolutionaryTheme.colors.signature.coral}40;
    transform: scale(1.1);
  }
`;

// Easter egg disco mode
const DiscoOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, 
    ${revolutionaryTheme.colors.neon.cyan}20,
    ${revolutionaryTheme.colors.neon.magenta}20,
    ${revolutionaryTheme.colors.neon.lime}20,
    ${revolutionaryTheme.colors.neon.yellow}20);
  background-size: 400% 400%;
  animation: disco 0.5s ease infinite;
  pointer-events: none;
  z-index: 9998;

  @keyframes disco {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
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

export const RevolutionaryApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [discoMode, setDiscoMode] = useState(false);
  const [konami, setKonami] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Données de démonstration
  const [achievements] = useState<Achievement[]>([
    {
      id: 'first-budget',
      name: 'Premier Budget',
      description: 'Créer son premier budget mensuel',
      icon: <Target size={32} color="white" />,
      rarity: 'common',
      unlocked: true,
      progress: 1,
      maxProgress: 1,
    },
    {
      id: 'week-streak',
      name: 'Semaine Parfaite',
      description: '7 jours de suivi consécutifs',
      icon: <Sparkles size={32} color="white" />,
      rarity: 'rare',
      unlocked: true,
      progress: 7,
      maxProgress: 7,
    },
    {
      id: 'savings-master',
      name: 'Maître de l\'Épargne',
      description: 'Épargner 1000€ en un mois',
      icon: <Trophy size={32} color="white" />,
      rarity: 'epic',
      unlocked: false,
      progress: 650,
      maxProgress: 1000,
    },
    {
      id: 'budget-legend',
      name: 'Légende du Budget',
      description: '30 jours de streak parfait',
      icon: <Sparkles size={32} color="white" />,
      rarity: 'legendary',
      unlocked: false,
      progress: 12,
      maxProgress: 30,
    },
  ]);

  // Navigation avec haptic feedback (simulé)
  const navigateWithFeedback = (tab: string) => {
    setActiveTab(tab);
    // Simule le haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  // Curseur personnalisé avec effet de traînée
  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      const cursor = document.getElementById('custom-cursor');
      if (cursor) {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
      }
    };

    window.addEventListener('mousemove', updateCursor);
    return () => window.removeEventListener('mousemove', updateCursor);
  }, []);

  // Konami code pour le mode rétro
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const konamiCode = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightKeyBKeyA';
      const newKonami = konami + e.code;
      
      if (konamiCode.startsWith(newKonami)) {
        setKonami(newKonami);
        if (newKonami === konamiCode) {
          setDiscoMode(true);
          setTimeout(() => setDiscoMode(false), 10000);
          setKonami('');
        }
      } else {
        setKonami('');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [konami]);

  // Double-tap logo pour disco mode
  const handleLogoDoubleClick = () => {
    setDiscoMode(!discoMode);
    setTimeout(() => setDiscoMode(false), 5000);
  };

  const tabs = [
    { id: 'home', icon: Home, label: 'Accueil', notifications: 0 },
    { id: 'analytics', icon: TrendingUp, label: 'Analytics', notifications: 2 },
    { id: 'goals', icon: Target, label: 'Objectifs', notifications: 1 },
    { id: 'achievements', icon: Trophy, label: 'Trophées', notifications: 0 },
    { id: 'settings', icon: Settings, label: 'Réglages', notifications: 0 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <RevolutionaryDashboard />;
      case 'achievements':
        return (
          <GamificationSystem
            streak={12}
            achievements={achievements}
            onAchievementUnlock={(achievement) => {
              console.log('Achievement unlocked:', achievement.name);
              // Ici on pourrait jouer un son, vibrer, etc.
            }}
          />
        );
      default:
        return (
          <div style={{ 
            padding: '100px 20px', 
            textAlign: 'center', 
            color: 'white',
            fontSize: '1.5rem' 
          }}>
            🚧 {tabs.find(t => t.id === activeTab)?.label} - Coming Soon! 🚧
          </div>
        );
    }
  };

  return (
    <ThemeProvider theme={revolutionaryTheme}>
      <GlobalStyle />
      
      {/* Curseur personnalisé */}
      <div id="custom-cursor" />

      {/* Disco mode overlay */}
      <AnimatePresence>
        {discoMode && (
          <DiscoOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      <AppContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Toggle son */}
        <SoundToggle
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSoundEnabled(!soundEnabled)}
        >
          {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </SoundToggle>

        {/* Contenu principal */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation bottom révolutionnaire */}
        <BottomNavigation
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 1, type: "spring", bounce: 0.3 }}
        >
          <NavGrid>
            {tabs.map((tab, index) => (
              <NavButton
                key={tab.id}
                $active={activeTab === tab.id}
                onClick={() => navigateWithFeedback(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                onDoubleClick={tab.id === 'home' ? handleLogoDoubleClick : undefined}
              >
                <div style={{ position: 'relative' }}>
                  <tab.icon size={24} />
                  {tab.notifications > 0 && (
                    <NotificationBadge
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.6 }}
                    >
                      {tab.notifications}
                    </NotificationBadge>
                  )}
                </div>
                <span>{tab.label}</span>

                {/* Indicateur actif avec glow */}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    style={{
                      position: 'absolute',
                      bottom: -8,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 4,
                      height: 4,
                      backgroundColor: revolutionaryTheme.colors.neon.cyan,
                      borderRadius: '50%',
                      boxShadow: `0 0 10px ${revolutionaryTheme.colors.neon.cyan}`,
                    }}
                    transition={{ type: "spring", bounce: 0.6 }}
                  />
                )}
              </NavButton>
            ))}
          </NavGrid>
        </BottomNavigation>
      </AppContainer>
    </ThemeProvider>
  );
};
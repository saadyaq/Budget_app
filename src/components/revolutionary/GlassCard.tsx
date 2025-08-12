import React from 'react';
import { motion } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
import styled from 'styled-components';
import { revolutionaryTheme } from '../../styles/theme';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  float?: boolean;
  onClick?: () => void;
  gradient?: keyof typeof revolutionaryTheme.gradients.mood;
}

const StyledGlassCard = styled(animated.div)<{ 
  $hover?: boolean; 
  $glow?: boolean; 
  $gradient?: string;
}>`
  backdrop-filter: ${revolutionaryTheme.effects.glassmorphism.backdropFilter};
  background: ${props => props.$gradient || revolutionaryTheme.effects.glassmorphism.background};
  border: ${revolutionaryTheme.effects.glassmorphism.border};
  box-shadow: ${props => props.$glow 
    ? `${revolutionaryTheme.effects.glassmorphism.boxShadow}, ${revolutionaryTheme.effects.glow.soft}`
    : revolutionaryTheme.effects.glassmorphism.boxShadow};
  border-radius: ${revolutionaryTheme.effects.glassmorphism.borderRadius};
  transition: all 0.3s ${revolutionaryTheme.easing.smooth};
  cursor: ${props => props.$hover ? 'pointer' : 'default'};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  
  ${props => props.$hover && `
    &:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: ${revolutionaryTheme.effects.glassmorphism.boxShadow}, 
                  ${revolutionaryTheme.effects.glow.intense};
      
      &::before {
        left: 100%;
      }
    }
    
    &:active {
      transform: translateY(-4px) scale(0.98);
    }
  `}
`;

const FloatingParticle = styled(motion.div)`
  position: absolute;
  width: 4px;
  height: 4px;
  background: ${revolutionaryTheme.colors.neon.cyan};
  border-radius: 50%;
  opacity: 0.6;
  box-shadow: 0 0 10px ${revolutionaryTheme.colors.neon.cyan};
`;

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hover = false,
  glow = false,
  float = false,
  onClick,
  gradient,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  // Physics-based floating animation
  const floatAnimation = useSpring({
    transform: float 
      ? `translateY(${Math.sin(Date.now() * 0.001) * 5}px)`
      : 'translateY(0px)',
    config: { tension: 200, friction: 50 },
  });

  // Breathing effect when hovered
  const breatheAnimation = useSpring({
    transform: isHovered && hover ? 'scale(1.02)' : 'scale(1)',
    boxShadow: isHovered && glow
      ? `${revolutionaryTheme.effects.glassmorphism.boxShadow}, ${revolutionaryTheme.effects.glow.intense}`
      : revolutionaryTheme.effects.glassmorphism.boxShadow,
    config: { tension: 300, friction: 30 },
  });

  // Particle effects for premium cards
  const particles = React.useMemo(() => 
    Array.from({ length: glow ? 8 : 0 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: i * 0.5,
    })),
    [glow]
  );

  const gradientBackground = gradient 
    ? revolutionaryTheme.gradients.mood[gradient]
    : undefined;

  return (
    <StyledGlassCard
      style={{ ...floatAnimation, ...breatheAnimation }}
      className={className}
      $hover={hover}
      $glow={glow}
      $gradient={gradientBackground}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating particles for premium feel */}
      {particles.map(particle => (
        <FloatingParticle
          key={particle.id}
          initial={{ 
            x: `${particle.x}%`, 
            y: `${particle.y}%`,
            opacity: 0,
            scale: 0
          }}
          animate={{
            y: [`${particle.y}%`, `${particle.y - 20}%`, `${particle.y}%`],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6, 
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        {children}
      </motion.div>
    </StyledGlassCard>
  );
};
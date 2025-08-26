/**
 * Coming Soon Component
 * Displays a beautiful coming soon message for pages under construction
 */

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { 
  Sparkles, 
  ArrowLeft,
  Gamepad2
} from 'lucide-react';
import '@/styles/components/features/coming-soon.css';

interface ComingSoonProps {
  /** Page title */
  title: string;
  /** Page description */
  description?: string;
  /** Icon to display */
  icon?: React.ReactNode;
  /** Custom gradient colors */
  gradientFrom?: string;
  gradientTo?: string;
  /** Show back to games button */
  showBackButton?: boolean;
  /** Custom class name */
  className?: string;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({
  title,
  description,
  icon,
  gradientFrom = '#667eea',
  gradientTo = '#764ba2',
  showBackButton = true,
  className = ''
}) => {
  const router = useRouter();

  return (
    <div className={`coming-soon-container ${className}`}>
      <div className="coming-soon-content">
        {/* Animated background */}
        <div className="coming-soon-bg">
          <div className="coming-soon-gradient" style={{
            background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`
          }} />
          <div className="coming-soon-orbs">
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="orb orb-3" />
          </div>
        </div>

        {/* Content Card */}
        <Card
          variant="default"
          size="xl"
          glass={false}
          shadow="2xl"
          bordered={true}
          className="coming-soon-card"
        >
          {icon && (
            <div className="coming-soon-icon">
              {icon}
            </div>
          )}
          
          <h1 className="coming-soon-title">{title}</h1>
          
          <Badge
            variant="primary"
            size="lg"
            className="coming-soon-badge"
            icon={<Sparkles className="w-4 h-4" />}
            gap="sm"
          >
            Coming Soon
          </Badge>
          
          {description && (
            <p className="coming-soon-description">{description}</p>
          )}
          
          <div className="coming-soon-progress">
            <ProgressBar 
              variant="gradient"
              size="md"
              loading
              shine
              rounded="full"
              glow
              gradientColors={{
                from: gradientFrom || '#667eea',
                via: '#a855f7',
                to: gradientTo || '#764ba2'
              }}
            />
            <span className="progress-text">In Development</span>
          </div>

          {showBackButton && (
            <div className="coming-soon-actions">
              <Button
                variant="ghost"
                size="lg"
                onClick={() => router.back()}
                className="back-button"
              >
                <ArrowLeft className="w-5 h-5" />
                Go Back
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={() => router.push('/games')}
                className="games-button"
              >
                <Gamepad2 className="w-5 h-5" />
                Browse Games
              </Button>
            </div>
          )}
        </Card>

        {/* Decorative elements */}
        <div className="coming-soon-decoration">
          <div className="decoration-circle decoration-circle-1" />
          <div className="decoration-circle decoration-circle-2" />
          <div className="decoration-circle decoration-circle-3" />
        </div>
      </div>
    </div>
  );
};

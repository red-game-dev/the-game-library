/**
 * ProfileCard Component
 * A visually attractive profile display component for user information
 */

'use client';

import React from 'react';
import { User, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Image } from '@/components/ui/Image';
import '@/styles/components/features/profile-card.css';

export interface ProfileCardProps {
  /** User name */
  name: string;
  /** User avatar URL */
  avatar?: string;
  /** User balance */
  balance?: number;
  /** Previous balance for change indicator */
  previousBalance?: number;
  /** Card variant */
  variant?: 'default' | 'compact' | 'drawer';
  /** Show balance change indicator */
  showBalanceChange?: boolean;
  /** Show currency symbol */
  showCurrency?: boolean;
  /** Currency symbol */
  currencySymbol?: string;
  /** Custom className */
  className?: string;
  /** Click handler */
  onClick?: () => void;
  /** Test ID */
  testId?: string;
}

/**
 * ProfileCard Component
 */
export const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  avatar,
  balance,
  previousBalance,
  variant = 'default',
  showBalanceChange = true,
  showCurrency = true,
  currencySymbol = '$',
  className = '',
  onClick,
  testId = 'profile-card'
}) => {
  // Calculate balance change
  const balanceChange = balance && previousBalance ? balance - previousBalance : 0;
  const hasIncrease = balanceChange > 0;
  const changePercent = previousBalance && previousBalance !== 0 
    ? Math.abs((balanceChange / previousBalance) * 100) 
    : 0;

  // Format balance with proper decimals
  const formatBalance = (value: number) => {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  // Render avatar or default icon
  const renderAvatar = () => {
    if (avatar) {
      return (
        <Image 
          src={avatar} 
          alt={name}
          className="profile-card-avatar-image"
          width={48}
          height={48}
        />
      );
    }
    return (
      <div className="profile-card-avatar-placeholder">
        <User className="profile-card-avatar-icon" />
      </div>
    );
  };

  return (
    <div
      className={`
        profile-card
        profile-card-${variant}
        ${onClick ? 'profile-card-clickable' : ''}
        ${className}
      `}
      onClick={onClick}
      data-testid={testId}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {/* Avatar Section */}
      <div className="profile-card-avatar">
        {renderAvatar()}
        {variant !== 'compact' && balance && balance >= 10000 && (
          <div className="profile-card-avatar-badge">
            <Badge variant="solid-warning" size="xs">VIP</Badge>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="profile-card-info">
        <div className="profile-card-name">
          {name}
        </div>
        
        {balance !== undefined && (
          <div className="profile-card-balance-container">
            <div className="profile-card-balance">
              {variant === 'compact' ? (
                <>
                  {showCurrency && (
                    <span className="profile-card-currency">{currencySymbol}</span>
                  )}
                  <span className="profile-card-balance-value">
                    {formatBalance(balance)}
                  </span>
                </>
              ) : (
                <>
                  <span className="profile-card-balance-label">Balance:</span>
                  {showCurrency && (
                    <span className="profile-card-currency">{currencySymbol}</span>
                  )}
                  <span className="profile-card-balance-value">
                    {formatBalance(balance)}
                  </span>
                </>
              )}
            </div>

            {/* Balance Change Indicator */}
            {showBalanceChange && balanceChange !== 0 && variant !== 'compact' && (
              <div className={`profile-card-change ${balanceChange > 0 ? 'profile-card-change-up' : 'profile-card-change-down'}`}>
                {balanceChange > 0 ? (
                  <TrendingUp className="profile-card-change-icon" />
                ) : (
                  <TrendingDown className="profile-card-change-icon" />
                )}
                <span className="profile-card-change-value">
                  {balanceChange > 0 ? '+' : ''}{formatBalance(balanceChange)}
                </span>
                {changePercent > 0 && (
                  <span className="profile-card-change-percent">
                    ({changePercent.toFixed(1)}%)
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Wallet Icon for drawer variant */}
        {variant === 'drawer' && (
          <div className="profile-card-wallet">
            <Wallet className="profile-card-wallet-icon" />
          </div>
        )}
      </div>

      {/* Decorative Elements */}
      {variant === 'drawer' && (
        <div className="profile-card-decoration">
          <div className="profile-card-decoration-glow" />
          <div className="profile-card-decoration-pattern" />
        </div>
      )}
    </div>
  );
};

ProfileCard.displayName = 'ProfileCard';

export default ProfileCard;
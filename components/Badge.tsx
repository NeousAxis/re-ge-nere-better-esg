import React from 'react';
import { useTranslation } from '../context/LanguageContext';

interface BadgeProps {
  progress: number;
}

export const Badge: React.FC<BadgeProps> = ({ progress }) => {
  const { t } = useTranslation();

  const badgeLevels = {
    initié: {
      title: t('badge.initiated.title'),
      icon: '🥉',
      color: 'text-yellow-700',
      bgColor: 'bg-yellow-100 border-yellow-200',
      description: t('badge.initiated.description'),
    },
    engagé: {
      title: t('badge.committed.title'),
      icon: '🥈',
      color: 'text-slate-700',
      bgColor: 'bg-slate-200 border-slate-300',
      description: t('badge.committed.description'),
    },
    leader: {
      title: t('badge.leader.title'),
      icon: '🥇',
      color: 'text-amber-600',
      bgColor: 'bg-amber-100 border-amber-200',
      description: t('badge.leader.description'),
    }
  };

  const level = progress < 34 ? 'initié' : progress < 67 ? 'engagé' : 'leader';
  const { title, icon, color, bgColor, description } = badgeLevels[level];

  return (
    <div className={`p-5 rounded-2xl border flex items-center gap-5 ${bgColor}`}>
      <div className="text-5xl">{icon}</div>
      <div>
        <h3 className={`text-xl font-bold ${color}`}>{title}</h3>
        <p className="text-slate-600 mt-1 text-sm">{description}</p>
      </div>
    </div>
  );
};
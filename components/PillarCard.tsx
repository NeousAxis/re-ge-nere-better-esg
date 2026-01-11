
import React from 'react';
import { Tag } from './Tag';
import { Pillar, ActionStatus, UserAction } from '../types';
import { ActionItem } from './ActionItem';
import { useTranslation } from '../context/LanguageContext';

interface PillarCardProps {
  title: string;
  pillarLetter: 'E' | 'S' | 'G';
  pillar: Pillar;
  userActions: Record<string, UserAction>;
  onStatusChange: (actionId: string, status: ActionStatus) => void;
  onTextChange: (actionId: string, text: string) => void;
  onDateChange: (actionId: string, date: string) => void;
  onCreateAction: (pillar: 'E' | 'S' | 'G') => void;
  onDeleteAction: (actionId: string) => void;
  color: 'green' | 'blue' | 'orange';
  onUpdateKpi: (pillar: 'E' | 'S' | 'G', index: number, text: string) => void;
  onCompletionChange: (actionId: string, percentage: number) => void;
}

const colorClasses = {
  green: {
    bg: 'bg-green-50/30',
    border: 'border-green-100',
    text: 'text-green-800',
    iconBg: 'bg-green-100',
    progressBg: 'bg-green-500',
    accent: 'border-green-500',
  },
  blue: {
    bg: 'bg-blue-50/30',
    border: 'border-blue-100',
    text: 'text-blue-800',
    iconBg: 'bg-blue-100',
    progressBg: 'bg-blue-500',
    accent: 'border-blue-500',
  },
  orange: {
    bg: 'bg-orange-50/30',
    border: 'border-orange-100',
    text: 'text-orange-800',
    iconBg: 'bg-orange-100',
    progressBg: 'bg-orange-500',
    accent: 'border-orange-500',
  },
};

const CheckIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const EditableKpi = ({ text, index, pillar, onUpdate }: { text: string; index: number; pillar: 'E' | 'S' | 'G'; onUpdate: (p: 'E' | 'S' | 'G', i: number, t: string) => void }) => {
  const [value, setValue] = React.useState(text);

  React.useEffect(() => {
    setValue(text);
  }, [text]);

  const handleBlur = () => {
    if (value !== text) {
      onUpdate(pillar, index, value);
    }
  };

  return (
    <textarea
      className="w-full bg-transparent border-none focus:ring-0 p-0 text-slate-700 font-semibold text-sm leading-snug resize-none overflow-hidden"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
      }}
      onBlur={handleBlur}
      rows={2}
      onFocus={(e) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
      }}
    />
  );
};

export const PillarCard: React.FC<PillarCardProps> = ({ title, pillarLetter, pillar, userActions, onStatusChange, onTextChange, onDateChange, onCreateAction, onDeleteAction, onUpdateKpi, onCompletionChange, color, initialProgress = 0 }) => {
  const classes = colorClasses[color];
  const { t } = useTranslation();

  const pillarUserActions = (Object.entries(userActions) as [string, UserAction][])
    .filter(([, action]) => action.pillar === pillarLetter)
    .sort(([idA], [idB]) => idA.localeCompare(idB));

  const completedActions = pillarUserActions.filter(([, action]) => action.status === 'completed').length;
  const totalActions = pillarUserActions.length;
  const actionProgress = totalActions > 0 ? Math.round((completedActions / totalActions) * 100) : 0;

  // Combine logic: Start at initialProgress. Actions can add to it, or we just take the max?
  // User wants to see they are NOT at 0.
  // Let's assume progress is: Initial + (Remaining * Action%) 
  // e.g. Initial 25%. Remaining 75%. Actions 50% done -> 25 + (75*0.5) = 62.5%
  const remaining = 100 - initialProgress;
  const progress = Math.round(initialProgress + (remaining * (actionProgress / 100)));

  return (
    <div className={`${classes.bg} border-t-4 ${classes.accent} border-x border-b border-slate-200 rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col`}>
      <div className="p-8">
        <h3 className={`text-3xl font-black ${classes.text}`}>{title}</h3>
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className={`text-xs uppercase font-black tracking-widest ${classes.text}`}>{t('pillar.progress')}</span>
            <span className={`text-lg font-black ${classes.text}`}>{progress}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3">
            <div
              className={`${classes.progressBg} h-3 rounded-full transition-all duration-1000 shadow-inner shadow-black/10`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="p-8 bg-white flex-grow flex flex-col">
        <h4 className="text-sm uppercase font-black tracking-tighter text-slate-400 mb-6">{t('pillar.kpi_title')}</h4>
        <ul className="space-y-4">
          {pillar.kpis.map((kpi, index) => (
            <li key={index} className="flex flex-col items-start bg-slate-50 p-3 rounded-2xl border border-slate-100 hover:border-slate-300 transition-colors focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-100">
              <div className="flex items-start w-full">
                <div className={`flex-shrink-0 w-8 h-8 rounded-xl ${classes.iconBg} ${classes.text} flex items-center justify-center mr-4 mt-0.5 shadow-sm`}>
                  <CheckIcon />
                </div>
                <EditableKpi text={kpi.text} index={index} pillar={pillarLetter} onUpdate={onUpdateKpi} />
              </div>
              {/* Optional: Show tags here if we want to support them in dashboard view too? 
                   The user didn't explicitly ask for tags in the "Model" card in dashboard, 
                   but it might be nice. For now, let's just fix the breakage. 
                   Wait, user said "dans les indicateurs il y a les Scopes... je veux les voir rajouté dans l'onglet tableau de bord". 
                   So YES, I should display tags here too for consistency if they exist.
               */}
              {kpi.tags && kpi.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 ml-12 mt-2">
                  {kpi.tags.map(tag => <Tag key={tag} tag={tag} />)}
                </div>
              )}
            </li>
          ))}
        </ul>

        <hr className="my-10 border-slate-100" />

        <div className="flex items-center justify-between mb-6">
          <h4 className="text-sm uppercase font-black tracking-tighter text-slate-400">{t('pillar.actions_title')}</h4>
          <p className="text-[10px] text-slate-400 italic">{t('pillar.actions_subtitle')}</p>
        </div>
        <div className="space-y-6 flex-grow">
          {pillarUserActions.map(([actionId, userAction]) => (
            <ActionItem
              key={actionId}
              actionId={actionId}
              userAction={userAction}
              onStatusChange={onStatusChange}
              onTextChange={onTextChange}
              onDateChange={onDateChange}
              onDelete={onDeleteAction}
              onCompletionChange={onCompletionChange}
            />
          ))}
        </div>

        <div className="mt-8">
          <button
            onClick={() => onCreateAction(pillarLetter)}
            className="w-full text-center py-4 px-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 hover:bg-slate-50 hover:border-slate-300 transition-all font-bold text-sm"
          >
            {t('pillar.add_action_button')}
          </button>
        </div>
      </div>
    </div>
  );
};

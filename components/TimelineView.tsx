
import React from 'react';
import { UserAction } from '../types';
import { useTranslation } from '../context/LanguageContext';
import { Tag } from './Tag';

interface TimelineViewProps {
  userActions: Record<string, UserAction>;
}

export const TimelineView: React.FC<TimelineViewProps> = ({ userActions }) => {
  const { t } = useTranslation();

  // FIX: Explicitly cast entries to [string, UserAction][] to ensure that 'action', 'a', and 'b' are correctly typed as UserAction, resolving property access errors on 'unknown'.
  const sortedActions = (Object.entries(userActions) as [string, UserAction][])
    .filter(([, action]) => action.dueDate)
    .sort(([, a], [, b]) => (a.dueDate || '').localeCompare(b.dueDate || ''));

  if (sortedActions.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
        <div className="text-4xl mb-4">🗓️</div>
        <p className="text-slate-500">{t('timeline.empty')}</p>
      </div>
    );
  }

  const pillarColors = {
    E: 'bg-green-100 text-green-800 border-green-200',
    S: 'bg-blue-100 text-blue-800 border-blue-200',
    G: 'bg-orange-100 text-orange-800 border-orange-200',
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-10 text-center">
        <h3 className="text-2xl font-bold text-slate-800">{t('timeline.title')}</h3>
        <p className="text-slate-500 mt-2">{t('timeline.subtitle')}</p>
      </div>

      <div className="relative border-l-2 border-slate-200 ml-4 sm:ml-6 space-y-8 pb-8">
        {sortedActions.map(([id, action]) => (
          <div key={id} className="relative pl-8 sm:pl-12 group">
            {/* Dot */}
            <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white shadow-sm ring-2 ring-slate-100 ${
              action.status === 'completed' ? 'bg-green-500' : action.status === 'in_progress' ? 'bg-yellow-400' : 'bg-slate-300'
            }`}></div>
            
            {/* Date Tag */}
            <div className="mb-2">
              <span className="inline-block px-3 py-1 bg-slate-800 text-white text-xs font-bold rounded-lg shadow-sm">
                {new Date(action.dueDate || '').toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>

            {/* Content Card */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm transition-transform hover:translate-x-1 group-hover:border-blue-200">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                 <span className={`text-[10px] uppercase font-black px-2 py-0.5 rounded border ${pillarColors[action.pillar]}`}>
                    {t('timeline.pillar_label')} {action.pillar}
                 </span>
                 {action.tags.map(tag => <Tag key={tag} tag={tag} />)}
              </div>
              <p className="text-slate-800 font-medium leading-relaxed">{action.text}</p>
              
              <div className="mt-4 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  action.status === 'completed' ? 'bg-green-500' : action.status === 'in_progress' ? 'bg-yellow-400' : 'bg-slate-300'
                }`}></div>
                <span className="text-xs text-slate-500 font-semibold">{t(`action.status.${action.status}`)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

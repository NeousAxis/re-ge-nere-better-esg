
import React, { useState, useEffect } from 'react';
import { UserAction, ActionStatus } from '../types';
import { Tag } from './Tag';
import { useTranslation } from '../context/LanguageContext';

interface ActionItemProps {
  actionId: string;
  userAction: UserAction;
  onStatusChange: (actionId: string, status: ActionStatus) => void;
  onTextChange: (actionId: string, text: string) => void;
  onDateChange: (actionId: string, date: string) => void;
  onDelete: (actionId: string) => void;
  onCompletionChange: (actionId: string, percentage: number) => void;
}

const DeleteIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.067-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>
);

export const ActionItem: React.FC<ActionItemProps> = ({ actionId, userAction, onStatusChange, onTextChange, onDateChange, onDelete, onCompletionChange }) => {
  const [editText, setEditText] = useState(userAction.text);
  const { t } = useTranslation();

  useEffect(() => {
    setEditText(userAction.text);
  }, [userAction.text]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditText(e.target.value);
  };

  const handleTextBlur = () => {
    if (editText.trim() && editText !== userAction.text) {
      onTextChange(actionId, editText);
    } else {
      setEditText(userAction.text);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDateChange(actionId, e.target.value);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = e.target.checked ? 'completed' : 'not_started';
    onStatusChange(actionId, newStatus);
    if (e.target.checked && !userAction.completionPercentage) {
      onCompletionChange(actionId, 100);
    }
  };

  return (
    <div className="p-5 bg-white border border-slate-200 rounded-2xl group relative shadow-sm hover:shadow-md transition-all">
      <button
        onClick={() => onDelete(actionId)}
        className="absolute -top-2 -right-2 w-8 h-8 bg-white border border-slate-200 text-slate-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all z-10 shadow-sm"
        aria-label={t('action.delete_aria_label')}
      >
        <DeleteIcon />
      </button>

      <textarea
        value={editText}
        onChange={handleTextChange}
        onBlur={handleTextBlur}
        className="text-slate-800 font-bold text-sm mb-4 bg-transparent border-0 p-0 w-full focus:ring-0 focus:outline-none resize-none rounded-md leading-relaxed"
        rows={Math.max(2, Math.ceil(editText.length / 40))}
      />

      <div className="flex flex-col gap-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {userAction.tags.map(tag => <Tag key={tag} tag={tag} />)}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
          {/* Date Picker */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-black text-slate-400">{t('action.due_date')}</span>
            <input
              type="date"
              value={userAction.dueDate || ''}
              onChange={handleDateChange}
              className="text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-blue-100 focus:outline-none"
            />
          </div>

          {/* Status Checkbox */}
          <label className={`flex items-center gap-2 cursor-pointer px-3 py-1.5 rounded-xl border transition-all ${userAction.status === 'completed' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'}`}>
            <input
              type="checkbox"
              checked={userAction.status === 'completed'}
              onChange={handleCheckboxChange}
              className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <span className="text-[10px] uppercase font-black tracking-wider">
              {userAction.status === 'completed' ? t('action.status.completed') : t('action.status.not_started')}
            </span>
          </label>
        </div>

        {/* Completion Percentage Slider */}
        {userAction.status === 'completed' && (
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-black text-slate-400">Réalisation</span>
              <span className="text-sm font-bold text-green-700">{userAction.completionPercentage || 100}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="10"
              value={userAction.completionPercentage || 100}
              onChange={(e) => onCompletionChange(actionId, parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

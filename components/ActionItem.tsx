
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
}

const statusStyles = {
    not_started: 'bg-slate-100 text-slate-600',
    in_progress: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800'
}

const DeleteIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.067-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
);


export const ActionItem: React.FC<ActionItemProps> = ({ actionId, userAction, onStatusChange, onTextChange, onDateChange, onDelete }) => {
  const [editText, setEditText] = useState(userAction.text);
  const { t } = useTranslation();

  const statusOptions: { value: ActionStatus; label: string }[] = [
    { value: 'not_started', label: t('action.status.not_started') },
    { value: 'in_progress', label: t('action.status.in_progress') },
    { value: 'completed', label: t('action.status.completed') },
  ];

  useEffect(() => {
    setEditText(userAction.text);
  }, [userAction.text]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(actionId, e.target.value as ActionStatus);
  };
  
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditText(e.target.value);
  };

  const handleTextBlur = () => {
      if(editText.trim() && editText !== userAction.text) {
           onTextChange(actionId, editText);
      } else {
           setEditText(userAction.text);
      }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDateChange(actionId, e.target.value);
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

          {/* Status Select */}
          <div className="relative">
            <select 
              value={userAction.status} 
              onChange={handleSelectChange}
              className={`text-[10px] uppercase tracking-wider font-black py-1.5 pl-3 pr-8 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400/20 ${statusStyles[userAction.status]}`}
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3 text-slate-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

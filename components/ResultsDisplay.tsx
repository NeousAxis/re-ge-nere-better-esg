
import React, { useState } from 'react';
import { ModelCompany, ActionStatus, UserAction } from '../types';
import { PillarCard } from './PillarCard';
import { Badge } from './Badge';
import { useTranslation } from '../context/LanguageContext';
import { TimelineView } from './TimelineView';

interface ResultsDisplayProps {
  company: ModelCompany;
  userActions: Record<string, UserAction>;
  onStatusChange: (actionId: string, status: ActionStatus) => void;
  onTextChange: (actionId: string, text: string) => void;
  onDateChange: (actionId: string, date: string) => void;
  onCreateAction: (pillar: 'E' | 'S' | 'G') => void;
  onDeleteAction: (actionId: string) => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ company, userActions, onStatusChange, onTextChange, onDateChange, onCreateAction, onDeleteAction }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'timeline'>('dashboard');
  const [isNotionExporting, setIsNotionExporting] = useState(false);
  const { t } = useTranslation();

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleExportNotion = () => {
    setIsNotionExporting(true);
    // Simulate API call
    setTimeout(() => {
      setIsNotionExporting(false);
      alert("Exportation réussie ! Votre base de données re-GE-nere a été créée dans votre espace Notion.");
    }, 2000);
  };

  const allUserActions = Object.values(userActions);
  const completedCount = allUserActions.filter((a: UserAction) => a.status === 'completed').length;
  const totalCount = allUserActions.length;
  const overallProgress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="mt-6 w-full max-w-7xl mx-auto">
      {/* Notion Export & Utility Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-slate-100 p-2 rounded-lg">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.5 3C3.67157 3 3 3.67157 3 4.5V19.5C3 20.3284 3.67157 21 4.5 21H19.5C20.3284 21 21 20.3284 21 19.5V4.5C21 3.67157 20.3284 3 19.5 3H4.5ZM7 7.5V16.5H8.5L12 11.5V16.5H13.5V7.5H12L8.5 12.5V7.5H7ZM15.5 7.5V16.5H17V7.5H15.5Z" fill="#0F172A"/>
             </svg>
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800">Integration Notion</h4>
            <p className="text-xs text-slate-500">Connectez vos KPIs à votre workspace.</p>
          </div>
        </div>
        <button 
          onClick={handleExportNotion}
          disabled={isNotionExporting}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 text-white text-sm font-bold py-2.5 px-6 rounded-xl hover:bg-black transition-all disabled:bg-slate-400"
        >
          {isNotionExporting ? (
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          ) : (
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                <path d="M12 4V16M12 16L8 12M12 16L16 12M4 20H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
          )}
          {t('results.export_notion')}
        </button>
      </div>

      <div className="text-center mb-8">
        <p className="text-slate-500 text-sm uppercase tracking-widest font-semibold">{t('results.reference_company_preamble')}</p>
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mt-2">{company.name}</h2>
        <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">{company.profile}</p>
      </div>
      
      <div className="mb-10 max-w-4xl mx-auto">
        <Badge progress={overallProgress} />
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={handleSave} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-10 rounded-2xl shadow-lg shadow-blue-200 transition-all transform hover:scale-105">
                {t('results.save_button')}
            </button>
            {isSaved && <p className="text-green-600 font-bold animate-pulse">{t('results.save_success')}</p>}
        </div>
      </div>

      {/* TABS */}
      <div className="flex border-b border-slate-200 mb-8 overflow-x-auto no-scrollbar">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`px-8 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'dashboard' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          {t('results.tabs.dashboard')}
        </button>
        <button 
          onClick={() => setActiveTab('timeline')}
          className={`px-8 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
            activeTab === 'timeline' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          {t('results.tabs.timeline')}
        </button>
      </div>

      {activeTab === 'dashboard' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up">
          <PillarCard
            title={t('pillar.E.title')}
            pillarLetter="E"
            pillar={company.pillars.E}
            userActions={userActions}
            onStatusChange={onStatusChange}
            onTextChange={onTextChange}
            onDateChange={onDateChange}
            onCreateAction={onCreateAction}
            onDeleteAction={onDeleteAction}
            color="green"
          />
          <PillarCard
            title={t('pillar.S.title')}
            pillarLetter="S"
            pillar={company.pillars.S}
            userActions={userActions}
            onStatusChange={onStatusChange}
            onTextChange={onTextChange}
            onDateChange={onDateChange}
            onCreateAction={onCreateAction}
            onDeleteAction={onDeleteAction}
            color="blue"
          />
          <PillarCard
            title={t('pillar.G.title')}
            pillarLetter="G"
            pillar={company.pillars.G}
            userActions={userActions}
            onStatusChange={onStatusChange}
            onTextChange={onTextChange}
            onDateChange={onDateChange}
            onCreateAction={onCreateAction}
            onDeleteAction={onDeleteAction}
            color="orange"
          />
        </div>
      ) : (
        <div className="animate-fade-in-up">
          <TimelineView userActions={userActions} />
        </div>
      )}

      <div className="mt-16 max-w-4xl mx-auto text-center p-10 bg-white border border-slate-200 rounded-3xl shadow-sm">
          <h3 className="text-xl font-bold text-slate-800">{t('results.disclaimer.title')}</h3>
          <p className="mt-4 text-slate-600 max-w-3xl mx-auto leading-relaxed">
              {t('results.disclaimer.text')}
          </p>
          <hr className="my-8 border-slate-100" />
          <h4 className="text-sm uppercase tracking-widest font-black text-slate-400 mb-6">{t('results.disclaimer.partners_title')}</h4>
           <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              {(t('results.disclaimer.partners')).map((partner: { name: string; url: string }, index: number) => (
                  <li key={index}>
                      <a href={partner.url} target="_blank" rel="noopener noreferrer" className="bg-slate-50 px-4 py-2 rounded-xl text-blue-600 hover:bg-blue-600 hover:text-white font-bold transition-all inline-block border border-slate-100">
                        {partner.name}
                      </a>
                  </li>
              ))}
          </ul>
      </div>

    </div>
  );
};

export default ResultsDisplay;


import React, { useState } from 'react';
import { ModelCompany, ActionStatus, UserAction } from '../types';
import { PillarCard } from './PillarCard';
import { Badge } from './Badge';
import { Tag } from './Tag';
import { useTranslation } from '../context/LanguageContext';
import { TimelineView } from './TimelineView';

interface ResultsDisplayProps {
  company: ModelCompany;
  userActions: Record<string, UserAction>;
  formData: FormData;
  onStatusChange: (actionId: string, status: ActionStatus) => void;
  onTextChange: (actionId: string, text: string) => void;
  onDateChange: (actionId: string, date: string) => void;
  onCreateAction: (pillar: 'E' | 'S' | 'G') => void;
  onDeleteAction: (actionId: string) => void;
  onUpdateKpi: (pillar: 'E' | 'S' | 'G', index: number, text: string) => void;
  onCompletionChange: (actionId: string, percentage: number) => void;
  onReset: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ company, userActions, formData, onStatusChange, onTextChange, onDateChange, onCreateAction, onDeleteAction, onUpdateKpi, onCompletionChange, onReset }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'timeline' | 'assessment' | 'reference'>('dashboard');
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

  const allUserActions: UserAction[] = Object.values(userActions);
  const completedCount = allUserActions.filter((a) => a.status === 'completed').length;
  const totalCount = allUserActions.length;

  // Advanced Scoring Algorithm: Per-Pillar calculation
  const calculatePillarScores = () => {
    // 1. Base Maturity (Applies to all)
    let base = 5;
    const maturity = formData.maturity ? formData.maturity.toLowerCase() : '';
    if (maturity.includes('engagé')) base = 40;
    else if (maturity.includes('progression')) base = 25;
    else base = 10; // "Je découvre"

    // 2. Helper for Structural Bonuses & Awareness
    const getPillarScore = (pillar: 'E' | 'S' | 'G') => {
      let score = base;
      const negativeKeywords = ['absence', 'manque', 'faible', 'aucun'];

      // Specific Bonuses
      if (pillar === 'E') {
        // Supply Chain: Locale = +15 (Short circuits), National = +5
        const supply = formData.supplyChain ? formData.supplyChain.toLowerCase() : '';
        if (supply.includes('locale')) score += 15;
        else if (supply.includes('nationale')) score += 5;

        // Awareness E
        const impacts = formData.impactMaterialityE || [];
        const hasNegative = impacts.some(imp => negativeKeywords.some(kw => imp.toLowerCase().includes(kw)));
        if (!hasNegative && impacts.length > 0) score += 10; // Awareness Bonus
        if (hasNegative) score -= 5;
      }

      if (pillar === 'S') {
        // Workforce: Locale = +15 (Local employment)
        const wf = formData.workforceOrigin ? formData.workforceOrigin.toLowerCase() : '';
        if (wf.includes('locale')) score += 15;
        else if (wf.includes('mixte')) score += 5;

        // Awareness S
        const impacts = formData.impactMaterialityS || [];
        const hasNegative = impacts.some(imp => negativeKeywords.some(kw => imp.toLowerCase().includes(kw)));
        if (!hasNegative && impacts.length > 0) score += 10;
        if (hasNegative) score -= 5;
      }

      if (pillar === 'G') {
        // Governance is harder to proxy with simple structure questions, so we rely heavily on Awareness
        const impacts = formData.impactMaterialityG || [];
        const hasNegative = impacts.some(imp => negativeKeywords.some(kw => imp.toLowerCase().includes(kw)));
        if (!hasNegative && impacts.length > 0) score += 15; // Higher bonus for awareness in G
        if (hasNegative) score -= 5;

        // Bonus for "Risks" awareness (Financial materiality)
        if (formData.financialMaterialityRisk && formData.financialMaterialityRisk.length > 0) score += 5;
      }

      return Math.max(5, Math.min(95, score));
    };

    return {
      E: getPillarScore('E'),
      S: getPillarScore('S'),
      G: getPillarScore('G')
    };
  };

  const scores = calculatePillarScores();
  const algorithmAvg = Math.round((scores.E + scores.S + scores.G) / 3);

  // Action Progress Calculation (Global)
  const actionProgressPercent = totalCount > 0 ? (completedCount / totalCount) : 0;

  // Overall Progress logic:
  const remainingGlobal = 100 - algorithmAvg;
  const overallProgress = Math.max(algorithmAvg, Math.round(algorithmAvg + (remainingGlobal * actionProgressPercent)));

  // Per Pillar Progress Calculation for Cards
  const getPillarProgress = (pillar: 'E' | 'S' | 'G', initial: number) => {
    // Filter actions for this pillar
    const pActions = allUserActions.filter(a => a.pillar === pillar);
    const pTotal = pActions.length;
    const pCompleted = pActions.filter(a => a.status === 'completed').length;
    const pRatio = pTotal > 0 ? pCompleted / pTotal : 0;

    const remaining = 100 - initial;
    return Math.max(initial, Math.round(initial + (remaining * pRatio)));
  };

  const progressE = getPillarProgress('E', scores.E);
  const progressS = getPillarProgress('S', scores.S);
  const progressG = getPillarProgress('G', scores.G);


  return (
    <div className="mt-6 w-full max-w-7xl mx-auto">

      {/* Header removed from here, moved to Assessment Tab */}

      <div className="mb-10 max-w-4xl mx-auto">
        <Badge progress={overallProgress} />
      </div>

      {/* TABS */}
      <div className="flex border-b border-slate-200 mb-8 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-8 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'dashboard' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
        >
          {t('results.tabs.dashboard')}
        </button>
        <button
          onClick={() => setActiveTab('timeline')}
          className={`px-8 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'timeline' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
        >
          {t('results.tabs.timeline')}
        </button>
        <button
          onClick={() => setActiveTab('assessment')}
          className={`px-8 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'assessment' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
        >
          {t('results.tabs.assessment')}
        </button>
        <button
          onClick={() => setActiveTab('reference')}
          className={`px-8 py-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'reference' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
        >
          {t('results.tabs.reference')}
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
            initialProgress={scores.E}
            onUpdateKpi={onUpdateKpi}
            onCompletionChange={onCompletionChange}
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
            initialProgress={scores.S}
            onUpdateKpi={onUpdateKpi}
            onCompletionChange={onCompletionChange}
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
            initialProgress={scores.G}
            onUpdateKpi={onUpdateKpi}
            onCompletionChange={onCompletionChange}
          />
        </div>
      ) : activeTab === 'timeline' ? (
        <div className="animate-fade-in-up">
          <TimelineView userActions={userActions} />
        </div>
      ) : activeTab === 'assessment' ? (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm animate-fade-in-up max-w-4xl mx-auto">
          {/* Header Removed per user request */}
          <h3 className="text-2xl font-black text-slate-800 mb-6">{t('results.tabs.assessment')}</h3>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            {Object.entries(formData).map(([key, value]) => {
              // Only filter out maturity as it's not a direct Q&A field usually
              if (key === 'maturity') return null;

              const label = key; // Ideally translate keys if needed
              const displayValue = Array.isArray(value) ? value.join(', ') : value;
              return (
                <div key={key} className="border-b border-slate-50 pb-4">
                  <dt className="text-xs uppercase font-bold text-slate-400 mb-1">{label}</dt>
                  <dd className="text-slate-800 font-medium">{displayValue}</dd>
                </div>
              )
            })}
          </dl>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm animate-fade-in-up">
          <div className="text-center mb-10">
            <p className="text-slate-500 text-sm uppercase tracking-widest font-semibold">{t('results.reference_company_preamble')}</p>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight mt-4 mb-6">{company.name}</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mb-8"></div>
            <p className="text-slate-600 text-lg leading-relaxed text-center whitespace-pre-line max-w-4xl mx-auto">{company.profile}</p>
          </div>

          <hr className="my-10 border-slate-100" />

          <p className="text-center text-slate-500 mb-6 font-medium text-lg">
            Vous êtes à <span className="text-blue-600 font-bold text-2xl">{overallProgress}%</span> de votre modèle de référence <strong>{company.name}</strong>.
          </p>

          <div className="flex justify-center w-full mb-10">
            <div className="flex justify-center gap-6 text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-50 py-3 px-6 rounded-full border border-slate-100 shadow-sm">
              <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>Env. {progressE}%</div>
              <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>Soc. {progressS}%</div>
              <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-orange-500 mr-2"></span>Gouv. {progressG}%</div>
            </div>
          </div>

          <h3 className="text-2xl font-black text-slate-800 text-center mb-8 uppercase tracking-tight">Comparatif de Performance Identifié</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Model KPIs */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-200 pb-2">ACTIONS ENTREPRISE DE REFERENCE</h4>
              <div className="space-y-6">
                <div>
                  <h5 className="font-bold text-green-700 mb-2">Environnement</h5>
                  <ul className="list-disc list-inside text-sm text-slate-600 space-y-3">
                    {company.pillars.E.kpis.map((k, i) => (
                      <li key={i} className="flex flex-col gap-1.5">
                        <span>{k.text}</span>
                        {k.tags && k.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 ml-5">
                            {k.tags.map(tag => <Tag key={tag} tag={tag} />)}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-bold text-blue-700 mb-2">Social</h5>
                  <ul className="list-disc list-inside text-sm text-slate-600 space-y-3">
                    {company.pillars.S.kpis.map((k, i) => (
                      <li key={i} className="flex flex-col gap-1.5">
                        <span>{k.text}</span>
                        {k.tags && k.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 ml-5">
                            {k.tags.map(tag => <Tag key={tag} tag={tag} />)}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-bold text-orange-700 mb-2">Gouvernance</h5>
                  <ul className="list-disc list-inside text-sm text-slate-600 space-y-3">
                    {company.pillars.G.kpis.map((k, i) => (
                      <li key={i} className="flex flex-col gap-1.5">
                        <span>{k.text}</span>
                        {k.tags && k.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 ml-5">
                            {k.tags.map(tag => <Tag key={tag} tag={tag} />)}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Client KPIs / Setup */}
            <div className="bg-white rounded-2xl p-6 border-2 border-dashed border-slate-200">
              <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-200 pb-2">VOS ACTIONS</h4>
              <div className="space-y-6">
                <div>
                  <h5 className="font-bold text-green-700 mb-2">Environnement</h5>
                  <ul className="list-disc list-inside text-sm text-slate-600 space-y-3">
                    {allUserActions.filter(a => a.pillar === 'E').length > 0 ? (
                      allUserActions.filter(a => a.pillar === 'E').map((action, i) => (
                        <li key={i} className="flex flex-col gap-1.5">
                          <span>{action.text}</span>
                          <div className="flex flex-wrap gap-1 ml-5">
                            {action.tags && action.tags.length > 0 && action.tags.map(tag => <Tag key={tag} tag={tag} />)}
                          </div>
                        </li>
                      ))
                    ) : (
                      <li className="italic text-slate-400">Aucun indicateur défini</li>
                    )}
                  </ul>
                </div>
                <div>
                  <h5 className="font-bold text-blue-700 mb-2">Social</h5>
                  <ul className="list-disc list-inside text-sm text-slate-600 space-y-3">
                    {allUserActions.filter(a => a.pillar === 'S').length > 0 ? (
                      allUserActions.filter(a => a.pillar === 'S').map((action, i) => (
                        <li key={i} className="flex flex-col gap-1.5">
                          <span>{action.text}</span>
                          <div className="flex flex-wrap gap-1 ml-5">
                            {action.tags && action.tags.length > 0 && action.tags.map(tag => <Tag key={tag} tag={tag} />)}
                          </div>
                        </li>
                      ))
                    ) : (
                      <li className="italic text-slate-400">Aucun indicateur défini</li>
                    )}
                  </ul>
                </div>
                <div>
                  <h5 className="font-bold text-orange-700 mb-2">Gouvernance</h5>
                  <ul className="list-disc list-inside text-sm text-slate-600 space-y-3">
                    {allUserActions.filter(a => a.pillar === 'G').length > 0 ? (
                      allUserActions.filter(a => a.pillar === 'G').map((action, i) => (
                        <li key={i} className="flex flex-col gap-1.5">
                          <span>{action.text}</span>
                          <div className="flex flex-wrap gap-1 ml-5">
                            {action.tags && action.tags.length > 0 && action.tags.map(tag => <Tag key={tag} tag={tag} />)}
                          </div>
                        </li>
                      ))
                    ) : (
                      <li className="italic text-slate-400">Aucun indicateur défini</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save Button Area - Moved to bottom */}
      {/* Auto-save enabled, button hidden */}
      <div className="mt-8 text-center">
        {isSaved && <p className="text-green-600 font-bold animate-pulse text-sm">✓ {t('results.save_success')}</p>}
      </div>

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

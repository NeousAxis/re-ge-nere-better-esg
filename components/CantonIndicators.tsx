import React from 'react';
import { useTranslation } from '../context/LanguageContext';
import {
  REGIONS,
  getRegionByTerritory,
  getSectorSet,
  CERCLE_INDICATORS,
  DIMENSION_META,
  CercleDimension,
} from '../constants/regions';

interface CantonIndicatorsProps {
  /** Clé de région (GE, VD, …) renseignée après le questionnaire, ou undefined. */
  canton?: string;
  sector?: string;
  onCantonChange?: (canton: string) => void;
}

const DIM_ORDER: CercleDimension[] = ['ENV', 'SOC', 'ECO'];

const dimClasses: Record<CercleDimension, { text: string; bg: string; border: string; dot: string; chip: string }> = {
  ENV: { text: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200', dot: 'bg-green-500', chip: 'bg-green-50 border-green-100' },
  SOC: { text: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200', dot: 'bg-blue-500', chip: 'bg-blue-50 border-blue-100' },
  ECO: { text: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200', dot: 'bg-orange-500', chip: 'bg-orange-50 border-orange-100' },
};

const TrendArrow: React.FC<{ trend?: 'up' | 'down' }> = ({ trend }) => {
  if (!trend) return null;
  return (
    <span className={`inline-flex items-center text-xs font-bold ${trend === 'up' ? 'text-green-600' : 'text-blue-600'}`} title="Évolution visée">
      {trend === 'up' ? '↑' : '↓'}
    </span>
  );
};

export const CantonIndicators: React.FC<CantonIndicatorsProps> = ({ canton, sector, onCantonChange }) => {
  const { language } = useTranslation();
  const L = language as 'fr' | 'en';
  const tr = (fr: string, en: string) => (L === 'fr' ? fr : en);

  const region = canton ? (REGIONS.find(r => r.key === canton) || getRegionByTerritory(canton)) : null;
  const sectorSet = getSectorSet(sector);

  const grouped = DIM_ORDER.map(dim => ({
    dim,
    items: CERCLE_INDICATORS.filter(i => i.dimension === dim),
  }));

  // Sélecteur de canton (toujours présent, source de vérité fiable).
  const selectStyle: React.CSSProperties = {
    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
    backgroundPosition: 'right 0.75rem center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '1.5em 1.5em',
  };

  const selector = (
    <div className="max-w-xl mx-auto">
      <label className="block text-sm font-bold text-slate-700 mb-2">
        {tr('Dans quel canton se situe votre entreprise ?', 'In which canton is your company located?')}
      </label>
      <select
        value={region?.key || ''}
        onChange={e => onCantonChange?.(e.target.value)}
        className="w-full p-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-800 font-semibold appearance-none pr-10"
        style={selectStyle}
      >
        <option value="" disabled>{tr('— Choisissez votre canton —', '— Choose your canton —')}</option>
        {REGIONS.map(r => (
          <option key={r.key} value={r.key}>{r.name[L]}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="animate-fade-in-up max-w-5xl mx-auto space-y-8">
      {/* Intro */}
      <div className="text-center">
        <h3 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
          {tr('Indicateurs de votre canton', 'Your canton’s indicators')}
        </h3>
        <p className="mt-3 text-slate-600 max-w-3xl mx-auto leading-relaxed">
          {tr(
            'Des indicateurs officiels, clairs et chiffrés, issus des plans directeurs cantonaux et du Cercle Indicateurs (OFS / ARE) — le système national de mesure du développement durable des cantons.',
            'Official, clear and quantified indicators, drawn from the cantonal master plans and the Cercle Indicateurs (FSO / ARE) — Switzerland’s national system for measuring cantonal sustainable development.'
          )}
        </p>
      </div>

      {/* Canton selector card */}
      <div className={`rounded-3xl p-6 sm:p-8 border shadow-sm ${region ? 'bg-white border-slate-200' : 'bg-blue-50 border-blue-200'}`}>
        {!region && (
          <p className="text-center text-slate-700 font-semibold mb-5">
            {tr(
              '👉 Indiquez le canton où se situe votre entreprise pour afficher vos indicateurs clés officiels.',
              '👉 Select the canton where your company is located to display your official key indicators.'
            )}
          </p>
        )}
        {selector}
        {region && (
          <p className="text-center text-xs text-slate-400 mt-3">
            {tr('Vous pouvez changer de canton à tout moment.', 'You can change canton at any time.')}
          </p>
        )}
      </div>

      {/* Nothing else until a canton is chosen */}
      {!region ? (
        <div className="text-center text-slate-400 text-sm py-6">
          {tr('Aucun indicateur affiché tant que le canton n’est pas renseigné.', 'No indicators shown until a canton is selected.')}
        </div>
      ) : (
        <>
          {/* Region header */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600 text-white font-black text-lg shadow-md">
                {region.key}
              </span>
              <div>
                <h4 className="text-xl font-black text-slate-900">{region.name[L]}</h4>
                <p className="text-xs uppercase tracking-widest font-bold text-slate-400">
                  {region.isFederal ? tr('Niveau fédéral', 'Federal level') : tr('Canton', 'Canton')}
                </p>
              </div>
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
              <div>
                <dt className="font-bold text-slate-500">{tr('Plan directeur', 'Master plan')}</dt>
                <dd className="text-slate-800">{region.planDirecteur[L]}</dd>
              </div>
              <div>
                <dt className="font-bold text-slate-500">{tr('Référentiel d’indicateurs', 'Indicator framework')}</dt>
                <dd className="text-slate-800">{region.indicatorFramework[L]}</dd>
              </div>
              {region.climateTarget && (
                <div className="sm:col-span-2">
                  <dt className="font-bold text-slate-500">{tr('Objectif climat', 'Climate target')}</dt>
                  <dd className="text-slate-800">{region.climateTarget[L]}</dd>
                </div>
              )}
            </dl>

            {region.dataNote && (
              <p className="mt-4 text-xs text-slate-500 italic bg-slate-50 border border-slate-100 rounded-xl p-3">
                {region.dataNote[L]}
              </p>
            )}

            {region.keyValues.length > 0 && (
              <div className="mt-6">
                <h5 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-3">
                  {tr('Valeurs officielles du canton', 'Official cantonal values')}
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {region.keyValues.map((v, i) => {
                    const c = dimClasses[v.dimension];
                    return (
                      <div key={i} className={`rounded-2xl border ${c.border} ${c.bg} p-4`}>
                        <p className="text-lg font-black text-slate-900 leading-tight">{v.value[L]}</p>
                        <p className={`text-xs font-bold mt-1 ${c.text}`}>{v.label[L]}</p>
                        {v.year && <p className="text-[11px] text-slate-400 mt-0.5">{v.year}</p>}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {region.sources.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {region.sources.map((s, i) => (
                  <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white transition-colors px-3 py-1.5 rounded-lg border border-blue-100">
                    {s.label[L]} ↗
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Sector indicators */}
          {sectorSet && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <h4 className="text-lg font-black text-slate-900 mb-1">
                {tr('Indicateurs pour votre secteur', 'Indicators for your sector')} — <span className="text-blue-600">{sectorSet.label[L]}</span>
              </h4>
              {sectorSet.note && <p className="text-sm text-slate-500 mb-5">{sectorSet.note[L]}</p>}

              <div className="space-y-6">
                {DIM_ORDER.map(dim => {
                  const items = sectorSet.indicators.filter(i => i.dimension === dim);
                  if (items.length === 0) return null;
                  const c = dimClasses[dim];
                  return (
                    <div key={dim}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${c.dot}`} />
                        <h5 className={`text-sm font-black uppercase tracking-wide ${c.text}`}>{DIMENSION_META[dim].label[L]}</h5>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                          <thead>
                            <tr className="text-left text-[11px] uppercase tracking-wider text-slate-400">
                              <th className="py-2 pr-3 font-bold">{tr('Indicateur', 'Indicator')}</th>
                              <th className="py-2 px-3 font-bold">{tr('Repère', 'Benchmark')}</th>
                              <th className="py-2 px-3 font-bold">{tr('Cible', 'Target')}</th>
                              <th className="py-2 pl-3 font-bold">{tr('Ancrage cantonal', 'Cantonal anchor')}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {items.map((ind, i) => (
                              <tr key={i} className="border-t border-slate-100 align-top">
                                <td className="py-2.5 pr-3 font-semibold text-slate-800">
                                  {ind.label[L]} <TrendArrow trend={ind.trend} />
                                </td>
                                <td className="py-2.5 px-3 text-slate-600">{ind.benchmark[L]}</td>
                                <td className="py-2.5 px-3 font-bold text-slate-900">{ind.target[L]}</td>
                                <td className="py-2.5 pl-3 text-slate-500">🏛️ {ind.anchor[L]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })}
              </div>

              {sectorSet.sources.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {sectorSet.sources.map((s, i) => (
                    <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white transition-colors px-3 py-1.5 rounded-lg border border-blue-100">
                      {s.label[L]} ↗
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Full Cercle Indicateurs reference */}
          <details className="bg-white rounded-3xl border border-slate-200 shadow-sm group">
            <summary className="cursor-pointer list-none p-6 sm:p-8 flex items-center justify-between">
              <div>
                <h4 className="text-lg font-black text-slate-900">
                  {tr('Référentiel complet — Cercle Indicateurs', 'Full framework — Cercle Indicateurs')}
                </h4>
                <p className="text-sm text-slate-500 mt-1">
                  {tr('32 indicateurs officiels, 3 dimensions — identiques pour tous les cantons.', '32 official indicators, 3 dimensions — identical for every canton.')}
                </p>
              </div>
              <span className="text-slate-400 text-sm font-bold group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="px-6 sm:px-8 pb-8 space-y-6">
              {grouped.map(({ dim, items }) => {
                const c = dimClasses[dim];
                return (
                  <div key={dim}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`w-2.5 h-2.5 rounded-full ${c.dot}`} />
                      <h5 className={`text-sm font-black uppercase tracking-wide ${c.text}`}>{DIMENSION_META[dim].label[L]}</h5>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {items.map(ind => (
                        <div key={ind.id} className={`rounded-xl border ${c.chip} p-3`}>
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-semibold text-slate-800">{ind.label[L]}</p>
                            <TrendArrow trend={ind.trend} />
                          </div>
                          <p className="text-[11px] text-slate-500 mt-1">
                            <span className="uppercase tracking-wide font-bold text-slate-400">{ind.theme[L]}</span> · {ind.unit[L]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
              <p className="text-xs text-slate-400 pt-2">
                {tr('Source : OFS / ARE, « Cercle Indicateurs – Fiches d’indicateurs Cantons », 2021.', 'Source: FSO / ARE, “Cercle Indicateurs – Cantonal indicator sheets”, 2021.')}
              </p>
            </div>
          </details>
        </>
      )}
    </div>
  );
};

export default CantonIndicators;

// constants/regions.ts
//
// Référentiel d'INDICATEURS CANTONAUX & FÉDÉRAUX + déclinaison SECTORIELLE pour re-GE-nere.
//
// Source cantonale : « Cercle Indicateurs » — système national d'indicateurs de
// développement durable pour les cantons et les villes, piloté par la Confédération
// (Office fédéral du développement territorial ARE + Office fédéral de la statistique OFS,
// avec l'OFEV et l'OFSP). Réf. : OFS/ARE, « Cercle Indicateurs – Fiches d'indicateurs
// Cantons », Neuchâtel, 2021.
// Les valeurs cantonales (keyValues) et les repères sectoriels proviennent de sources
// officielles / reconnues (voir `sources`). Rien n'est inventé : toute valeur non
// confirmée est omise ou remplacée par une direction cible. Niveau fédéral : MONET 2030.

export type CercleDimension = 'ENV' | 'ECO' | 'SOC';
export type Trend = 'up' | 'down';

interface I18n {
  fr: string;
  en: string;
}

export interface CercleIndicator {
  id: string;
  dimension: CercleDimension;
  theme: I18n;
  label: I18n;
  unit: I18n;
  /** Évolution visée par le référentiel (augmentation / diminution). */
  trend: Trend;
}

export const DIMENSION_META: Record<CercleDimension, { label: I18n; pillar: 'E' | 'S' | 'G'; color: string }> = {
  ENV: { label: { fr: 'Environnement', en: 'Environment' }, pillar: 'E', color: 'green' },
  SOC: { label: { fr: 'Société', en: 'Society' }, pillar: 'S', color: 'blue' },
  ECO: { label: { fr: 'Économie', en: 'Economy' }, pillar: 'G', color: 'orange' },
};

// ---------------------------------------------------------------------------
// Les 32 indicateurs centraux du Cercle Indicateurs (référentiel identique pour
// tous les cantons ; seules les valeurs diffèrent). Unités et « évolution visée »
// tirées textuellement des fiches OFS/ARE 2021.
// ---------------------------------------------------------------------------
export const CERCLE_INDICATORS: CercleIndicator[] = [
  // ----- Environnement -----
  { id: 'env-biodiversite', dimension: 'ENV', theme: { fr: 'Biodiversité', en: 'Biodiversity' }, label: { fr: 'Diversité des espèces végétales', en: 'Plant species diversity' }, unit: { fr: 'espèces/km²', en: 'species/km²' }, trend: 'up' },
  { id: 'env-nature', dimension: 'ENV', theme: { fr: 'Nature et paysage', en: 'Nature & landscape' }, label: { fr: 'Superficie des espaces naturels de valeur', en: 'Area of valuable natural spaces' }, unit: { fr: '% du territoire', en: '% of area' }, trend: 'up' },
  { id: 'env-energie', dimension: 'ENV', theme: { fr: "Consommation d'énergie", en: 'Energy consumption' }, label: { fr: "Consommation totale d'énergie", en: 'Total energy consumption' }, unit: { fr: 'kWh/hab.', en: 'kWh/capita' }, trend: 'down' },
  { id: 'env-climat', dimension: 'ENV', theme: { fr: 'Climat', en: 'Climate' }, label: { fr: 'Émissions de CO₂', en: 'CO₂ emissions' }, unit: { fr: 't CO₂/hab.', en: 't CO₂/capita' }, trend: 'down' },
  { id: 'env-dechets', dimension: 'ENV', theme: { fr: 'Consommation des matériaux', en: 'Material consumption' }, label: { fr: 'Déchets urbains', en: 'Municipal waste' }, unit: { fr: 'kg/hab.', en: 'kg/capita' }, trend: 'down' },
  { id: 'env-collecte', dimension: 'ENV', theme: { fr: 'Consommation des matériaux', en: 'Material consumption' }, label: { fr: 'Taux de collecte séparée', en: 'Separate collection rate' }, unit: { fr: '%', en: '%' }, trend: 'up' },
  { id: 'env-eaux', dimension: 'ENV', theme: { fr: 'Régime des eaux', en: 'Water regime' }, label: { fr: 'Écoulement des eaux via les STEP', en: 'Wastewater treated via WWTPs' }, unit: { fr: 'm³/hab.', en: 'm³/capita' }, trend: 'down' },
  { id: 'env-eau-qualite', dimension: 'ENV', theme: { fr: "Qualité de l'eau", en: 'Water quality' }, label: { fr: 'Teneur en nitrates des eaux souterraines', en: 'Nitrate content in groundwater' }, unit: { fr: 'mg/l', en: 'mg/l' }, trend: 'down' },
  { id: 'env-sol', dimension: 'ENV', theme: { fr: 'Utilisation du sol', en: 'Land use' }, label: { fr: 'Surface bâtie', en: 'Built-up area' }, unit: { fr: 'm²/hab.', en: 'm²/capita' }, trend: 'down' },
  { id: 'env-air', dimension: 'ENV', theme: { fr: "Qualité de l'air", en: 'Air quality' }, label: { fr: 'Indice de pollution longue durée (IPL)', en: 'Long-term pollution index (IPL)' }, unit: { fr: 'indice 1–6', en: 'index 1–6' }, trend: 'down' },
  // ----- Économie -----
  { id: 'eco-revenu', dimension: 'ECO', theme: { fr: 'Revenu', en: 'Income' }, label: { fr: 'PIB cantonal', en: 'Cantonal GDP' }, unit: { fr: 'CHF/hab.', en: 'CHF/capita' }, trend: 'up' },
  { id: 'eco-cout-vie', dimension: 'ECO', theme: { fr: 'Coût de la vie', en: 'Cost of living' }, label: { fr: 'Niveau des loyers', en: 'Rent level' }, unit: { fr: 'CHF/m²', en: 'CHF/m²' }, trend: 'down' },
  { id: 'eco-emploi', dimension: 'ECO', theme: { fr: 'Marché du travail', en: 'Labour market' }, label: { fr: 'Taux de chômage', en: 'Unemployment rate' }, unit: { fr: '%', en: '%' }, trend: 'down' },
  { id: 'eco-invest', dimension: 'ECO', theme: { fr: 'Investissements', en: 'Investments' }, label: { fr: "Travaux d'agrandissement, transformation et entretien", en: 'Extension, renovation & maintenance works' }, unit: { fr: '%', en: '%' }, trend: 'up' },
  { id: 'eco-innov', dimension: 'ECO', theme: { fr: 'Innovations', en: 'Innovation' }, label: { fr: 'Emplois dans des branches innovatrices', en: 'Jobs in innovative sectors' }, unit: { fr: '%', en: '%' }, trend: 'up' },
  { id: 'eco-structure', dimension: 'ECO', theme: { fr: 'Structure économique', en: 'Economic structure' }, label: { fr: 'Emplois dans des branches à productivité élevée', en: 'Jobs in high-productivity sectors' }, unit: { fr: '%', en: '%' }, trend: 'up' },
  { id: 'eco-savoir', dimension: 'ECO', theme: { fr: 'Savoir-faire', en: 'Know-how' }, label: { fr: 'Niveau de qualification', en: 'Qualification level' }, unit: { fr: '%', en: '%' }, trend: 'up' },
  { id: 'eco-finances', dimension: 'ECO', theme: { fr: 'Finances publiques', en: 'Public finances' }, label: { fr: "Taux d'endettement net", en: 'Net debt ratio' }, unit: { fr: '%', en: '%' }, trend: 'down' },
  { id: 'eco-impots', dimension: 'ECO', theme: { fr: 'Impôts', en: 'Taxes' }, label: { fr: "Indice d'exploitation du potentiel fiscal", en: 'Fiscal potential exploitation index' }, unit: { fr: 'indice', en: 'index' }, trend: 'down' },
  // ----- Société -----
  { id: 'soc-bruit', dimension: 'SOC', theme: { fr: "Bruit / qualité de l'habitat", en: 'Noise / living quality' }, label: { fr: 'Nuisances sonores dues au trafic', en: 'Traffic noise exposure' }, unit: { fr: '%', en: '%' }, trend: 'down' },
  { id: 'soc-mobilite', dimension: 'SOC', theme: { fr: 'Mobilité', en: 'Mobility' }, label: { fr: "Distance à l'arrêt de transports publics le plus proche", en: 'Distance to nearest public transport stop' }, unit: { fr: 'm', en: 'm' }, trend: 'down' },
  { id: 'soc-sante', dimension: 'SOC', theme: { fr: 'Santé', en: 'Health' }, label: { fr: 'Années de vie potentielles perdues', en: 'Potential years of life lost' }, unit: { fr: "années/100'000 hab.", en: 'years/100,000 pop.' }, trend: 'down' },
  { id: 'soc-securite-accidents', dimension: 'SOC', theme: { fr: 'Sécurité', en: 'Safety' }, label: { fr: 'Accidents de la circulation avec victimes', en: 'Road accidents with casualties' }, unit: { fr: 'accidents/1000 hab.', en: 'accidents/1,000 pop.' }, trend: 'down' },
  { id: 'soc-securite-violence', dimension: 'SOC', theme: { fr: 'Sécurité', en: 'Safety' }, label: { fr: 'Infractions de violence grave', en: 'Serious violent offences' }, unit: { fr: "/100'000 hab.", en: '/100,000 pop.' }, trend: 'down' },
  { id: 'soc-revenus', dimension: 'SOC', theme: { fr: 'Répartition des revenus', en: 'Income distribution' }, label: { fr: 'Contribuables à faible revenu', en: 'Low-income taxpayers' }, unit: { fr: '%', en: '%' }, trend: 'down' },
  { id: 'soc-participation', dimension: 'SOC', theme: { fr: 'Participation', en: 'Participation' }, label: { fr: 'Participation aux élections et votations', en: 'Electoral participation' }, unit: { fr: '%', en: '%' }, trend: 'up' },
  { id: 'soc-culture', dimension: 'SOC', theme: { fr: 'Culture et loisirs', en: 'Culture & leisure' }, label: { fr: 'Dépenses en faveur de la culture et des loisirs', en: 'Spending on culture & leisure' }, unit: { fr: 'CHF/hab.', en: 'CHF/capita' }, trend: 'up' },
  { id: 'soc-formation', dimension: 'SOC', theme: { fr: 'Formation', en: 'Education' }, label: { fr: 'Jeunes en formation', en: 'Young people in education' }, unit: { fr: '%', en: '%' }, trend: 'up' },
  { id: 'soc-aide', dimension: 'SOC', theme: { fr: 'Aide sociale', en: 'Social assistance' }, label: { fr: "Bénéficiaires de l'aide sociale", en: 'Social assistance recipients' }, unit: { fr: '%', en: '%' }, trend: 'down' },
  { id: 'soc-integration', dimension: 'SOC', theme: { fr: 'Intégration', en: 'Integration' }, label: { fr: 'Naturalisations', en: 'Naturalisations' }, unit: { fr: '‰', en: '‰' }, trend: 'up' },
  { id: 'soc-egalite', dimension: 'SOC', theme: { fr: 'Égalité des chances', en: 'Equal opportunity' }, label: { fr: 'Femmes occupant des positions de cadre', en: 'Women in management positions' }, unit: { fr: '%', en: '%' }, trend: 'up' },
  { id: 'soc-solidarite', dimension: 'SOC', theme: { fr: 'Solidarité interrégionale', en: 'Interregional solidarity' }, label: { fr: "Actions d'aide (entraide / coopération)", en: 'Aid contributions' }, unit: { fr: '‰', en: '‰' }, trend: 'up' },
];

// ---------------------------------------------------------------------------
// Régions : cantons romands + Confédération.
// ---------------------------------------------------------------------------
export interface RegionValue {
  dimension: CercleDimension;
  label: I18n;
  value: I18n;
  year?: string;
}

export interface RegionSource {
  label: I18n;
  url: string;
}

export interface Region {
  key: string;
  name: I18n;
  /** Chaînes (minuscules, sans accents) permettant de retrouver la région depuis la réponse « territoire ». */
  aliases: string[];
  isFederal?: boolean;
  planDirecteur: I18n & { url: string };
  indicatorFramework: I18n & { url: string };
  climateTarget?: I18n;
  cercleParticipant: boolean;
  keyValues: RegionValue[];
  sources: RegionSource[];
  /** Note honnête sur la disponibilité des données. */
  dataNote?: I18n;
}

export const REGIONS: Region[] = [
  {
    key: 'GE',
    name: { fr: 'Genève', en: 'Geneva' },
    aliases: ['geneve', 'geneva', 'ge'],
    planDirecteur: {
      fr: 'Plan directeur cantonal 2030 (PDCn 2030)',
      en: 'Cantonal Master Plan 2030 (PDCn 2030)',
      url: 'https://www.ge.ch/dossier/amenager-territoire/planification-cantonale-regionale/plan-directeur-cantonal-2030',
    },
    indicatorFramework: {
      fr: "Cercle Indicateurs (OFS/ARE) + indicateurs de l'environnement genevois",
      en: 'Cercle Indicateurs (FSO/ARE) + Geneva environmental indicators',
      url: 'https://ind.ge-en-vie.ch/climat-2/',
    },
    climateTarget: {
      fr: "Cible : 3,5 t CO₂/hab. d'ici 2030, neutralité carbone (≈ 1 t) d'ici 2050.",
      en: 'Target: 3.5 t CO₂/capita by 2030, carbon neutrality (≈ 1 t) by 2050.',
    },
    cercleParticipant: true,
    keyValues: [
      { dimension: 'ENV', label: { fr: 'Émissions de GES', en: 'GHG emissions' }, value: { fr: '10,5 t CO₂e/hab.', en: '10.5 t CO₂e/capita' }, year: '2023' },
      { dimension: 'ENV', label: { fr: 'Déchets urbains', en: 'Municipal waste' }, value: { fr: '529 kg/hab.', en: '529 kg/capita' }, year: '2022' },
      { dimension: 'ENV', label: { fr: 'Taux de recyclage', en: 'Recycling rate' }, value: { fr: '48,4 %', en: '48.4%' }, year: '2022' },
    ],
    sources: [
      { label: { fr: 'Plan directeur cantonal 2030 (ge.ch)', en: 'Cantonal Master Plan 2030 (ge.ch)' }, url: 'https://www.ge.ch/dossier/amenager-territoire/planification-cantonale-regionale/plan-directeur-cantonal-2030' },
      { label: { fr: 'Indicateurs climat (ge-en-vie)', en: 'Climate indicators (ge-en-vie)' }, url: 'https://ind.ge-en-vie.ch/climat-2/' },
    ],
  },
  {
    key: 'VD',
    name: { fr: 'Vaud', en: 'Vaud' },
    aliases: ['vaud', 'vd'],
    planDirecteur: {
      fr: 'Plan directeur cantonal (PDCn) + Plan climat vaudois',
      en: 'Cantonal Master Plan (PDCn) + Vaud Climate Plan',
      url: 'https://www.vd.ch/environnement/durabilite-et-climat/indicateurs-de-durabilite-du-canton-de-vaud',
    },
    indicatorFramework: {
      fr: 'Cercle Indicateurs + système vaudois de 90 indicateurs de durabilité',
      en: 'Cercle Indicateurs + Vaud system of 90 sustainability indicators',
      url: 'https://www.vd.ch/environnement/durabilite-et-climat/indicateurs-de-durabilite-du-canton-de-vaud',
    },
    climateTarget: {
      fr: "Cible : −50 à −60 % des émissions territoriales d'ici 2030 (réf. 1990), neutralité carbone 2050.",
      en: 'Target: −50 to −60% of territorial emissions by 2030 (vs 1990), carbon neutrality by 2050.',
    },
    cercleParticipant: true,
    keyValues: [
      { dimension: 'ENV', label: { fr: 'Émissions de GES', en: 'GHG emissions' }, value: { fr: '14 t CO₂e/hab. (dont 4,6 t territoriales)', en: '14 t CO₂e/capita (of which 4.6 t territorial)' }, year: '2023' },
      { dimension: 'ENV', label: { fr: 'Déchets urbains', en: 'Municipal waste' }, value: { fr: '408 kg/hab.', en: '408 kg/capita' }, year: '2025' },
      { dimension: 'ENV', label: { fr: 'Taux de collecte séparée', en: 'Separate collection rate' }, value: { fr: '58,2 %', en: '58.2%' }, year: '2025' },
    ],
    sources: [
      { label: { fr: 'Indicateurs de durabilité (vd.ch)', en: 'Sustainability indicators (vd.ch)' }, url: 'https://www.vd.ch/environnement/durabilite-et-climat/indicateurs-de-durabilite-du-canton-de-vaud' },
      { label: { fr: 'Bilan carbone cantonal (vd.ch)', en: 'Cantonal carbon footprint (vd.ch)' }, url: 'https://www.vd.ch/environnement/durabilite-et-climat/politique-climatique/les-trois-axes/axe-documentation/bilan-carbone-cantonal' },
      { label: { fr: 'Statistique des déchets (vaud-stat-dechets.ch)', en: 'Waste statistics (vaud-stat-dechets.ch)' }, url: 'https://www.vaud-stat-dechets.ch/' },
    ],
  },
  {
    key: 'FR',
    name: { fr: 'Fribourg', en: 'Fribourg' },
    aliases: ['fribourg', 'freiburg', 'fr'],
    planDirecteur: {
      fr: 'Plan directeur cantonal (PlanDirecteur)',
      en: 'Cantonal Master Plan',
      url: 'https://www.fr.ch/etat-et-droit/statistiques/cercle-indicateurs-monitoring-developpement-durable-du-canton-de-fribourg',
    },
    indicatorFramework: {
      fr: 'Cercle Indicateurs — monitoring du développement durable de Fribourg',
      en: 'Cercle Indicateurs — Fribourg sustainable development monitoring',
      url: 'https://www.fr.ch/etat-et-droit/statistiques/cercle-indicateurs-monitoring-developpement-durable-du-canton-de-fribourg',
    },
    cercleParticipant: true,
    keyValues: [
      { dimension: 'ENV', label: { fr: 'Déchets urbains', en: 'Municipal waste' }, value: { fr: '377 kg/hab.', en: '377 kg/capita' }, year: '2024' },
      { dimension: 'ENV', label: { fr: 'Taux de collecte séparée', en: 'Separate collection rate' }, value: { fr: '40,1 %', en: '40.1%' }, year: '2024' },
    ],
    sources: [
      { label: { fr: 'Déchets — indicateurs (fr.ch)', en: 'Waste indicators (fr.ch)' }, url: 'https://www.fr.ch/energie-agriculture-et-environnement/environnement/etat-de-lenvironnement-indicateurs/dechets-indicateurs' },
      { label: { fr: 'Cercle Indicateurs Fribourg (fr.ch)', en: 'Cercle Indicateurs Fribourg (fr.ch)' }, url: 'https://www.fr.ch/etat-et-droit/statistiques/cercle-indicateurs-monitoring-developpement-durable-du-canton-de-fribourg' },
    ],
    dataNote: { fr: 'Bilan GES cantonal par habitant : voir Plan climat fribourgeois (source officielle).', en: 'Cantonal GHG per capita: see Fribourg climate plan (official source).' },
  },
  {
    key: 'VS',
    name: { fr: 'Valais', en: 'Valais' },
    aliases: ['valais', 'wallis', 'vs'],
    planDirecteur: {
      fr: 'Plan directeur cantonal (fiches de coordination) + Agenda 2030 Valais',
      en: 'Cantonal Master Plan (coordination sheets) + Valais Agenda 2030',
      url: 'https://www.vs.ch/web/agenda2030',
    },
    indicatorFramework: {
      fr: 'Cercle Indicateurs + Agenda 2030 Valais (bilans carbone)',
      en: 'Cercle Indicateurs + Valais Agenda 2030 (carbon footprints)',
      url: 'https://www.vs.ch/web/agenda2030/bilan-carbone',
    },
    cercleParticipant: true,
    keyValues: [
      { dimension: 'ENV', label: { fr: 'Émissions de GES', en: 'GHG emissions' }, value: { fr: '14 t CO₂e/hab.', en: '14 t CO₂e/capita' }, year: '2025' },
      { dimension: 'ENV', label: { fr: 'Déchets urbains', en: 'Municipal waste' }, value: { fr: '504 kg/hab.', en: '504 kg/capita' }, year: '2024' },
      { dimension: 'ENV', label: { fr: 'Taux de recyclage', en: 'Recycling rate' }, value: { fr: '50 %', en: '50%' }, year: '2024' },
    ],
    sources: [
      { label: { fr: 'Agenda 2030 — bilan carbone (vs.ch)', en: 'Agenda 2030 — carbon footprint (vs.ch)' }, url: 'https://www.vs.ch/web/agenda2030/bilan-carbone' },
      { label: { fr: 'Statistique cantonale des déchets (geo.vs.ch)', en: 'Cantonal waste statistics (geo.vs.ch)' }, url: 'https://geo.vs.ch/web/communication/w/statistique-cantonale-des-d%C3%A9chets-2024' },
    ],
  },
  {
    key: 'NE',
    name: { fr: 'Neuchâtel', en: 'Neuchâtel' },
    aliases: ['neuchatel', 'neuchâtel', 'ne'],
    planDirecteur: {
      fr: 'Plan directeur cantonal + Plan climat neuchâtelois',
      en: 'Cantonal Master Plan + Neuchâtel Climate Plan',
      url: 'https://www.ne.ch/page/plan-climat',
    },
    indicatorFramework: {
      fr: 'Cercle Indicateurs (OFS/ARE) + Plan climat cantonal',
      en: 'Cercle Indicateurs (FSO/ARE) + cantonal Climate Plan',
      url: 'https://www.bfs.admin.ch/bfs/fr/home/statistiques/developpement-durable/cercle-indicateurs.html',
    },
    climateTarget: {
      fr: 'Cible : zéro émission nette d\'ici 2050 (−90 % de GES/hab.), Plan climat neuchâtelois.',
      en: 'Target: net-zero by 2050 (−90% GHG/capita), Neuchâtel Climate Plan.',
    },
    cercleParticipant: true,
    keyValues: [
      { dimension: 'ENV', label: { fr: 'Émissions de GES', en: 'GHG emissions' }, value: { fr: '≈ 5,4 t CO₂e/hab.', en: '≈ 5.4 t CO₂e/capita' } },
      { dimension: 'ENV', label: { fr: 'Taux de tri des déchets', en: 'Waste sorting rate' }, value: { fr: '49,9 %', en: '49.9%' }, year: '2024' },
    ],
    sources: [
      { label: { fr: 'Plan climat neuchâtelois (ne.ch)', en: 'Neuchâtel Climate Plan (ne.ch)' }, url: 'https://www.ne.ch/page/plan-climat' },
      { label: { fr: 'Déchets — canton de Neuchâtel (ne.ch)', en: 'Waste — canton of Neuchâtel (ne.ch)' }, url: 'https://www.ne.ch/themes/energie-et-environnement/environnement/dechets' },
    ],
  },
  {
    key: 'JU',
    name: { fr: 'Jura', en: 'Jura' },
    aliases: ['jura', 'ju'],
    planDirecteur: {
      fr: 'Plan directeur cantonal + Plan climat jurassien',
      en: 'Cantonal Master Plan + Jura Climate Plan',
      url: 'https://www.jura.ch/fr/Autorites/Plan-climat/Domaines-d-actions/Economie-circulaire/Plan-Climat-Jura-Actions-en-matiere-d-economie-circulaire.html',
    },
    indicatorFramework: {
      fr: 'Cercle Indicateurs (OFS/ARE) + Plan climat jurassien',
      en: 'Cercle Indicateurs (FSO/ARE) + Jura Climate Plan',
      url: 'https://www.bfs.admin.ch/bfs/fr/home/statistiques/developpement-durable/cercle-indicateurs.html',
    },
    climateTarget: {
      fr: 'Plan climat jurassien — plan d\'action 2024-2027 (axe économie circulaire).',
      en: 'Jura Climate Plan — 2024-2027 action plan (circular-economy focus).',
    },
    cercleParticipant: true,
    keyValues: [
      { dimension: 'ENV', label: { fr: 'Déchets urbains', en: 'Municipal waste' }, value: { fr: '≈ 422 kg/hab. (182 incinérés + 240 triés)', en: '≈ 422 kg/capita (182 incinerated + 240 sorted)' }, year: '2022' },
      { dimension: 'ENV', label: { fr: 'Taux de collecte séparée', en: 'Separate collection rate' }, value: { fr: '≈ 57 %', en: '≈ 57%' }, year: '2022' },
    ],
    sources: [
      { label: { fr: 'Mémento statistique jurassien (jura.ch)', en: 'Jura statistical yearbook (jura.ch)' }, url: 'https://www.jura.ch/fr/Autorites/Statistique/Publications/Memento-statistique.html' },
      { label: { fr: 'Déchets urbains (jura.ch)', en: 'Municipal waste (jura.ch)' }, url: 'https://www.jura.ch/fr/Autorites/Administration/DEC/ENV/Dechets/Dechets-urbains/Dechets-urbains.html' },
    ],
  },
  {
    key: 'CH',
    name: { fr: 'Confédération (Suisse)', en: 'Confederation (Switzerland)' },
    aliases: ['suisse', 'switzerland', 'swiss', 'confederation', 'confédération', 'federal', 'fédéral', 'plan directeur federal', 'romandie', 'suisse romande', 'plusieurs cantons', 'autre canton', 'ch'],
    isFederal: true,
    planDirecteur: {
      fr: 'Projet de territoire Suisse (cadre fédéral) + plans sectoriels',
      en: 'Swiss Spatial Concept (federal framework) + sectoral plans',
      url: 'https://www.are.admin.ch/are/fr/home/developpement-et-amenagement-du-territoire/strategie-et-planification/projet-de-territoire-suisse.html',
    },
    indicatorFramework: {
      fr: 'MONET 2030 (109 indicateurs, 17 ODD) + Cercle Indicateurs',
      en: 'MONET 2030 (109 indicators, 17 SDGs) + Cercle Indicateurs',
      url: 'https://www.bfs.admin.ch/bfs/fr/home/statistiques/developpement-durable/monet-2030.html',
    },
    climateTarget: {
      fr: "Objectif fédéral : zéro émission nette de gaz à effet de serre d'ici 2050 (Loi climat, 2023).",
      en: 'Federal target: net-zero greenhouse-gas emissions by 2050 (Climate Act, 2023).',
    },
    cercleParticipant: false,
    keyValues: [
      { dimension: 'ENV', label: { fr: 'Empreinte GES', en: 'GHG footprint' }, value: { fr: '≈ 14 t CO₂e/hab. (territorial ≈ 4,3 t)', en: '≈ 14 t CO₂e/capita (territorial ≈ 4.3 t)' } },
      { dimension: 'ENV', label: { fr: 'Déchets urbains', en: 'Municipal waste' }, value: { fr: '≈ 670–700 kg/hab.', en: '≈ 670–700 kg/capita' } },
      { dimension: 'ENV', label: { fr: 'Taux de recyclage', en: 'Recycling rate' }, value: { fr: '≈ 52 %', en: '≈ 52%' } },
    ],
    sources: [
      { label: { fr: 'MONET 2030 (OFS)', en: 'MONET 2030 (FSO)' }, url: 'https://www.bfs.admin.ch/bfs/fr/home/statistiques/developpement-durable/monet-2030.html' },
      { label: { fr: 'Cercle Indicateurs (OFS)', en: 'Cercle Indicateurs (FSO)' }, url: 'https://www.bfs.admin.ch/bfs/fr/home/statistiques/developpement-durable/cercle-indicateurs.html' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Déclinaison SECTORIELLE : indicateurs mesurables au niveau de l'établissement,
// pour CHACUN des 12 secteurs de l'app, rattachés à une thématique cantonale.
// Repères = sources suisses reconnues (OFEV, OFS, SuisseEnergie, associations de
// branche…) ; ils servent de point de comparaison, pas de valeur de l'entreprise.
// ---------------------------------------------------------------------------
export interface SectorIndicator {
  dimension: CercleDimension;
  label: I18n;
  benchmark: I18n;
  target: I18n;
  anchor: I18n;
  trend?: Trend;
}

export interface SectorIndicatorSet {
  key: string;
  label: I18n;
  note?: I18n;
  sources: RegionSource[];
  indicators: SectorIndicator[];
}

const CI_SOURCE: RegionSource = { label: { fr: 'Cercle Indicateurs (OFS/ARE)', en: 'Cercle Indicateurs (FSO/ARE)' }, url: 'https://www.bfs.admin.ch/bfs/fr/home/statistiques/developpement-durable/cercle-indicateurs.html' };

export const SECTOR_INDICATOR_SETS: Record<string, SectorIndicatorSet> = {
  energy: {
    key: 'energy',
    label: { fr: 'Énergie & ressources', en: 'Energy & resources' },
    sources: [CI_SOURCE, { label: { fr: 'Mix électrique CH (AES/SuisseEnergie)', en: 'Swiss electricity mix (VSE/SwissEnergy)' }, url: 'https://www.strom.ch/fr/connaissances/production-delectricite-et-marquage-de-lelectricite' }],
    indicators: [
      { dimension: 'ENV', label: { fr: "Part d'énergie renouvelable fournie", en: 'Share of renewable energy supplied' }, benchmark: { fr: '≈ 79 % (électricité CH, marquage 2022)', en: '≈ 79% (Swiss electricity mix, 2022)' }, target: { fr: '100 %', en: '100%' }, anchor: { fr: "Consommation d'énergie", en: 'Energy consumption' }, trend: 'up' },
      { dimension: 'ENV', label: { fr: "Intensité carbone de l'électricité", en: 'Carbon intensity of electricity' }, benchmark: { fr: 'prod. CH ≈ 30 g · conso ≈ 125 gCO₂/kWh', en: 'CH prod. ≈ 30 g · consumption ≈ 125 gCO₂/kWh' }, target: { fr: '↓', en: '↓' }, anchor: { fr: 'Climat', en: 'Climate' }, trend: 'down' },
      { dimension: 'ENV', label: { fr: 'Émissions directes (Scope 1)', en: 'Direct emissions (Scope 1)' }, benchmark: { fr: '—', en: '—' }, target: { fr: '↓ / zéro net 2050', en: '↓ / net-zero 2050' }, anchor: { fr: 'Climat', en: 'Climate' }, trend: 'down' },
      { dimension: 'ENV', label: { fr: 'Pertes de réseau / efficacité', en: 'Grid losses / efficiency' }, benchmark: { fr: '—', en: '—' }, target: { fr: '↓', en: '↓' }, anchor: { fr: "Consommation d'énergie", en: 'Energy consumption' }, trend: 'down' },
      { dimension: 'ECO', label: { fr: 'Emplois / R&D dans la transition', en: 'Jobs / R&D in the transition' }, benchmark: { fr: '—', en: '—' }, target: { fr: '↑', en: '↑' }, anchor: { fr: 'Innovations', en: 'Innovation' }, trend: 'up' },
    ],
  },
  agriculture: {
    key: 'agriculture',
    label: { fr: 'Agriculture & Agroalimentaire', en: 'Agriculture & Food' },
    sources: [CI_SOURCE, { label: { fr: 'Bio Suisse / OFAG / OFEV', en: 'Bio Suisse / FOAG / FOEN' }, url: 'https://www.bio-suisse.ch/fr/notre-association/portrait/le-bio-en-chiffres.html' }],
    indicators: [
      { dimension: 'ENV', label: { fr: 'Surface en agriculture biologique', en: 'Organic farmland share' }, benchmark: { fr: '18,2 % de la SAU (CH, 2023)', en: '18.2% of farmland (CH, 2023)' }, target: { fr: '↑ (≥ 25 %)', en: '↑ (≥ 25%)' }, anchor: { fr: 'Biodiversité / Utilisation du sol', en: 'Biodiversity / Land use' }, trend: 'up' },
      { dimension: 'ENV', label: { fr: 'Émissions GES par kg produit', en: 'GHG emissions per kg produced' }, benchmark: { fr: 'agriculture = 14 % des émissions CH', en: 'agriculture = 14% of CH emissions' }, target: { fr: '↓', en: '↓' }, anchor: { fr: 'Climat', en: 'Climate' }, trend: 'down' },
      { dimension: 'ENV', label: { fr: 'Usage de produits phytosanitaires / azote', en: 'Pesticide / nitrogen use' }, benchmark: { fr: '—', en: '—' }, target: { fr: '↓', en: '↓' }, anchor: { fr: "Qualité de l'eau (nitrates)", en: 'Water quality (nitrates)' }, trend: 'down' },
      { dimension: 'ENV', label: { fr: 'Surfaces de promotion de la biodiversité', en: 'Biodiversity-promotion areas' }, benchmark: { fr: '≥ 7 % requis (PER)', en: '≥ 7% required (ecological performance)' }, target: { fr: '↑', en: '↑' }, anchor: { fr: 'Biodiversité', en: 'Biodiversity' }, trend: 'up' },
      { dimension: 'ECO', label: { fr: 'Part de produits sous label (bio, IP-SUISSE, AOP)', en: 'Share of labelled products (organic, PDO…)' }, benchmark: { fr: '—', en: '—' }, target: { fr: '↑ %', en: '↑ %' }, anchor: { fr: 'Structure économique', en: 'Economic structure' }, trend: 'up' },
      { dimension: 'ENV', label: { fr: 'Pertes le long de la chaîne', en: 'Losses along the chain' }, benchmark: { fr: '—', en: '—' }, target: { fr: '↓', en: '↓' }, anchor: { fr: 'Consommation des matériaux', en: 'Material consumption' }, trend: 'down' },
    ],
  },
  manufacturing: {
    key: 'manufacturing',
    label: { fr: 'Industrie manufacturière', en: 'Manufacturing' },
    sources: [CI_SOURCE, { label: { fr: 'OFEV — déchets & matériaux', en: 'FOEN — waste & materials' }, url: 'https://www.bafu.admin.ch/bafu/fr/home/themes/dechets.html' }],
    indicators: [
      { dimension: 'ENV', label: { fr: 'Part de matière recyclée dans les produits', en: 'Recycled content in products' }, benchmark: { fr: '—', en: '—' }, target: { fr: '↑ %', en: '↑ %' }, anchor: { fr: 'Consommation des matériaux', en: 'Material consumption' }, trend: 'up' },
      { dimension: 'ENV', label: { fr: 'Intensité énergétique de la production', en: 'Energy intensity of production' }, benchmark: { fr: '—', en: '—' }, target: { fr: '↓ kWh/unité', en: '↓ kWh/unit' }, anchor: { fr: "Consommation d'énergie", en: 'Energy consumption' }, trend: 'down' },
      { dimension: 'ENV', label: { fr: 'Taux de valorisation des déchets', en: 'Waste recovery rate' }, benchmark: { fr: 'recyclage CH ≈ 52 % (réf.)', en: 'CH recycling ≈ 52% (ref.)' }, target: { fr: '↑', en: '↑' }, anchor: { fr: 'Consommation des matériaux', en: 'Material consumption' }, trend: 'up' },
      { dimension: 'ENV', label: { fr: 'Émissions de procédé (Scope 1)', en: 'Process emissions (Scope 1)' }, benchmark: { fr: '—', en: '—' }, target: { fr: '↓ / zéro net 2050', en: '↓ / net-zero 2050' }, anchor: { fr: 'Climat', en: 'Climate' }, trend: 'down' },
      { dimension: 'SOC', label: { fr: 'Accidents professionnels (fréquence)', en: 'Occupational accidents (frequency)' }, benchmark: { fr: '—', en: '—' }, target: { fr: '↓', en: '↓' }, anchor: { fr: 'Sécurité / Santé', en: 'Safety / Health' }, trend: 'down' },
      { dimension: 'ECO', label: { fr: 'Emplois à productivité élevée', en: 'High-productivity jobs' }, benchmark: { fr: '—', en: '—' }, target: { fr: '↑ %', en: '↑ %' }, anchor: { fr: 'Structure économique', en: 'Economic structure' }, trend: 'up' },
    ],
  },
  construction: {
    key: 'construction',
    label: { fr: 'Construction & Immobilier', en: 'Construction & Real estate' },
    sources: [CI_SOURCE, { label: { fr: 'OFEV / Minergie / MoPEC', en: 'FOEN / Minergie / MoPEC' }, url: 'https://www.minergie.ch/fr/' }],
    indicators: [
      { dimension: 'ENV', label: { fr: 'Émissions CO₂ du bâti', en: 'Building CO₂ emissions' }, benchmark: { fr: 'parc immobilier ≈ 24 % des émissions CH', en: 'building stock ≈ 24% of CH emissions' }, target: { fr: '↓ / zéro net 2050', en: '↓ / net-zero 2050' }, anchor: { fr: 'Climat', en: 'Climate' }, trend: 'down' },
      { dimension: 'ENV', label: { fr: 'Performance énergétique', en: 'Energy performance' }, benchmark: { fr: 'neuf MoPEC ≤ 4,8 L/m²·an · Minergie ≈ 38 kWh/m²', en: 'new (MoPEC) ≤ 4.8 L/m²·yr · Minergie ≈ 38 kWh/m²' }, target: { fr: '≤ standard Minergie', en: '≤ Minergie standard' }, anchor: { fr: "Consommation d'énergie", en: 'Energy consumption' }, trend: 'down' },
      { dimension: 'ENV', label: { fr: 'Part de matériaux bas-carbone / biosourcés', en: 'Low-carbon / bio-based materials share' }, benchmark: { fr: '—', en: '—' }, target: { fr: '↑ %', en: '↑ %' }, anchor: { fr: 'Consommation des matériaux', en: 'Material consumption' }, trend: 'up' },
      { dimension: 'ENV', label: { fr: 'Déchets de chantier valorisés', en: 'Construction waste recovered' }, benchmark: { fr: 'construction = 82,5 % des déchets CH (72 Mt)', en: 'construction = 82.5% of CH waste (72 Mt)' }, target: { fr: '↑ % réemploi / recyclage', en: '↑ % reuse / recycling' }, anchor: { fr: 'Consommation des matériaux', en: 'Material consumption' }, trend: 'up' },
      { dimension: 'ENV', label: { fr: 'Emprise au sol / densification', en: 'Land take / densification' }, benchmark: { fr: '—', en: '—' }, target: { fr: '↓ m²/hab.', en: '↓ m²/capita' }, anchor: { fr: 'Utilisation du sol (surface bâtie)', en: 'Land use (built-up area)' }, trend: 'down' },
      { dimension: 'SOC', label: { fr: "Main-d'œuvre locale / clauses d'insertion", en: 'Local labour / inclusion clauses' }, benchmark: { fr: '—', en: '—' }, target: { fr: '↑ %', en: '↑ %' }, anchor: { fr: 'Marché du travail', en: 'Labour market' }, trend: 'up' },
    ],
  },
  transport: {
    key: 'transport',
    label: { fr: 'Transport & Logistique', en: 'Transport & Logistics' },
    sources: [CI_SOURCE, { label: { fr: 'OFS — transport de marchandises / CFF Cargo', en: 'FSO — freight transport / SBB Cargo' }, url: 'https://www.bfs.admin.ch/bfs/fr/home/statistiques/mobilite-transports.html' }],
    indicators: [
      { dimension: 'ENV', label: { fr: 'Émissions par tonne-kilomètre', en: 'Emissions per tonne-kilometre' }, benchmark: { fr: 'route (Euro 5) ≈ 81 g vs rail ≈ 14 gCO₂/t-km', en: 'road (Euro 5) ≈ 81 g vs rail ≈ 14 gCO₂/t-km' }, target: { fr: '↓', en: '↓' }, anchor: { fr: "Climat / Qualité de l'air", en: 'Climate / Air quality' }, trend: 'down' },
      { dimension: 'ENV', label: { fr: 'Part de flotte bas-carbone (élec./biogaz/rail)', en: 'Low-carbon fleet share (electric/biogas/rail)' }, benchmark: { fr: 'part du rail dans le fret CH ≈ 37 %', en: 'rail share of CH freight ≈ 37%' }, target: { fr: '↑ %', en: '↑ %' }, anchor: { fr: 'Climat', en: 'Climate' }, trend: 'up' },
      { dimension: 'ENV', label: { fr: 'Kilomètres à vide / taux de remplissage', en: 'Empty runs / load factor' }, benchmark: { fr: '—', en: '—' }, target: { fr: '↓ km à vide', en: '↓ empty km' }, anchor: { fr: "Consommation d'énergie", en: 'Energy consumption' }, trend: 'down' },
      { dimension: 'SOC', label: { fr: 'Éco-conduite / formation des conducteurs', en: 'Eco-driving / driver training' }, benchmark: { fr: '—', en: '—' }, target: { fr: '100 % formés', en: '100% trained' }, anchor: { fr: 'Sécurité', en: 'Safety' }, trend: 'up' },
      { dimension: 'SOC', label: { fr: 'Accidents de la circulation (flotte)', en: 'Road accidents (fleet)' }, benchmark: { fr: '—', en: '—' }, target: { fr: '↓', en: '↓' }, anchor: { fr: 'Sécurité', en: 'Safety' }, trend: 'down' },
    ],
  },
  tech: {
    key: 'tech',
    label: { fr: 'Technologie & Télécommunications', en: 'Technology & Telecom' },
    sources: [CI_SOURCE, { label: { fr: 'Swiss Datacenter Efficiency Assoc. (SDEA)', en: 'Swiss Datacenter Efficiency Assoc. (SDEA)' }, url: 'https://www.sdea.ch/' }],
    indicators: [
      { dimension: 'ENV', label: { fr: 'Efficacité des centres de données (PUE)', en: 'Data-centre efficiency (PUE)' }, benchmark: { fr: 'moyenne ≈ 1,5–1,6 · performant ≤ 1,2', en: 'average ≈ 1.5–1.6 · efficient ≤ 1.2' }, target: { fr: '≤ 1,2', en: '≤ 1.2' }, anchor: { fr: "Consommation d'énergie", en: 'Energy consumption' }, trend: 'down' },
      { dimension: 'ENV', label: { fr: "Part d'électricité renouvelable", en: 'Renewable electricity share' }, benchmark: { fr: '—', en: '—' }, target: { fr: '100 %', en: '100%' }, anchor: { fr: "Consommation d'énergie", en: 'Energy consumption' }, trend: 'up' },
      { dimension: 'ENV', label: { fr: 'Intensité carbone par service / utilisateur', en: 'Carbon intensity per service / user' }, benchmark: { fr: '—', en: '—' }, target: { fr: '↓', en: '↓' }, anchor: { fr: 'Climat', en: 'Climate' }, trend: 'down' },
      { dimension: 'ENV', label: { fr: 'Durée de vie / réemploi du matériel (e-déchets)', en: 'Hardware lifespan / reuse (e-waste)' }, benchmark: { fr: '—', en: '—' }, target: { fr: '↑', en: '↑' }, anchor: { fr: 'Consommation des matériaux', en: 'Material consumption' }, trend: 'up' },
      { dimension: 'SOC', label: { fr: 'Éthique des données / cybersécurité', en: 'Data ethics / cybersecurity' }, benchmark: { fr: '—', en: '—' }, target: { fr: 'conformité (nLPD)', en: 'compliance (revDPA)' }, anchor: { fr: 'Sécurité', en: 'Safety' } },
      { dimension: 'ECO', label: { fr: 'Emplois dans des branches innovatrices', en: 'Jobs in innovative sectors' }, benchmark: { fr: '—', en: '—' }, target: { fr: '↑ %', en: '↑ %' }, anchor: { fr: 'Innovations', en: 'Innovation' }, trend: 'up' },
    ],
  },
  finance: {
    key: 'finance',
    label: { fr: 'Finance & Assurance', en: 'Finance & Insurance' },
    sources: [CI_SOURCE, { label: { fr: 'Swiss Sustainable Finance', en: 'Swiss Sustainable Finance' }, url: 'https://www.sif.admin.ch/fr/finance-durable' }],
    indicators: [
      { dimension: 'ECO', label: { fr: 'Part des actifs alignés Paris / durables', en: 'Paris-aligned / sustainable assets share' }, benchmark: { fr: 'invest. durable CH > 50 % des fonds (~2000 Mrd)', en: 'CH sustainable investing > 50% of funds (~CHF 2tn)' }, target: { fr: '↑ %', en: '↑ %' }, anchor: { fr: 'Structure économique', en: 'Economic structure' }, trend: 'up' },
      { dimension: 'ENV', label: { fr: 'Empreinte carbone financée (Scope 3)', en: 'Financed carbon footprint (Scope 3)' }, benchmark: { fr: '—', en: '—' }, target: { fr: 'mesurée & ↓', en: 'measured & ↓' }, anchor: { fr: 'Climat', en: 'Climate' }, trend: 'down' },
      { dimension: 'ECO', label: { fr: "Politique d'exclusion (charbon, controverses)", en: 'Exclusion policy (coal, controversies)' }, benchmark: { fr: '—', en: '—' }, target: { fr: 'appliquée', en: 'applied' }, anchor: { fr: 'Structure économique', en: 'Economic structure' } },
      { dimension: 'SOC', label: { fr: "Produits d'investissement à impact social", en: 'Social-impact investment products' }, benchmark: { fr: '—', en: '—' }, target: { fr: '↑', en: '↑' }, anchor: { fr: 'Répartition des revenus', en: 'Income distribution' }, trend: 'up' },
      { dimension: 'ECO', label: { fr: 'Transparence climat (reporting TCFD)', en: 'Climate transparency (TCFD reporting)' }, benchmark: { fr: '—', en: '—' }, target: { fr: 'publié', en: 'published' }, anchor: { fr: 'Transparence', en: 'Transparency' } },
    ],
  },
  commerce: {
    key: 'commerce',
    label: { fr: 'Commerce & Services', en: 'Commerce & Services' },
    sources: [CI_SOURCE],
    indicators: [
      { dimension: 'ECO', label: { fr: 'Part de fournisseurs locaux / régionaux', en: 'Local / regional suppliers share' }, benchmark: { fr: '—', en: '—' }, target: { fr: '↑ %', en: '↑ %' }, anchor: { fr: 'Structure économique', en: 'Economic structure' }, trend: 'up' },
      { dimension: 'ENV', label: { fr: 'Électricité renouvelable', en: 'Renewable electricity' }, benchmark: { fr: '—', en: '—' }, target: { fr: '100 %', en: '100%' }, anchor: { fr: "Consommation d'énergie", en: 'Energy consumption' }, trend: 'up' },
      { dimension: 'ENV', label: { fr: 'Réduction déchets / emballages', en: 'Waste / packaging reduction' }, benchmark: { fr: 'recyclage CH ≈ 52 % (réf.)', en: 'CH recycling ≈ 52% (ref.)' }, target: { fr: '↑ tri · ↓ emballages', en: '↑ sorting · ↓ packaging' }, anchor: { fr: 'Consommation des matériaux', en: 'Material consumption' }, trend: 'down' },
      { dimension: 'ENV', label: { fr: 'Part de produits durables / labellisés', en: 'Sustainable / labelled products share' }, benchmark: { fr: '—', en: '—' }, target: { fr: '↑ %', en: '↑ %' }, anchor: { fr: 'Consommation des matériaux', en: 'Material consumption' }, trend: 'up' },
      { dimension: 'SOC', label: { fr: 'Conditions de travail / part de CDI', en: 'Working conditions / permanent contracts' }, benchmark: { fr: '—', en: '—' }, target: { fr: '↑', en: '↑' }, anchor: { fr: 'Marché du travail', en: 'Labour market' }, trend: 'up' },
    ],
  },
  health: {
    key: 'health',
    label: { fr: 'Santé & Bien-être', en: 'Health & Wellbeing' },
    sources: [CI_SOURCE, { label: { fr: 'Health Care Without Harm', en: 'Health Care Without Harm' }, url: 'https://healthcareclimateaction.org/' }],
    indicators: [
      { dimension: 'ENV', label: { fr: 'Empreinte carbone par journée-patient / lit', en: 'Carbon footprint per patient-day / bed' }, benchmark: { fr: 'santé ≈ 5–8 % des émissions nationales', en: 'health ≈ 5–8% of national emissions' }, target: { fr: '↓', en: '↓' }, anchor: { fr: 'Climat', en: 'Climate' }, trend: 'down' },
      { dimension: 'ENV', label: { fr: 'Achats médicaux éco-responsables (Scope 3)', en: 'Responsible medical procurement (Scope 3)' }, benchmark: { fr: 'Scope 3 ≈ 84 % de l\'empreinte hospitalière', en: 'Scope 3 ≈ 84% of hospital footprint' }, target: { fr: '↑ %', en: '↑ %' }, anchor: { fr: 'Consommation des matériaux', en: 'Material consumption' }, trend: 'up' },
      { dimension: 'ENV', label: { fr: 'Tri / réduction des déchets médicaux', en: 'Medical-waste sorting / reduction' }, benchmark: { fr: '—', en: '—' }, target: { fr: '↑ tri · ↓ volume', en: '↑ sorting · ↓ volume' }, anchor: { fr: 'Consommation des matériaux', en: 'Material consumption' }, trend: 'down' },
      { dimension: 'ENV', label: { fr: 'Gaz anesthésiques à fort PRG', en: 'High-GWP anaesthetic gases' }, benchmark: { fr: '—', en: '—' }, target: { fr: '↓', en: '↓' }, anchor: { fr: 'Climat', en: 'Climate' }, trend: 'down' },
      { dimension: 'SOC', label: { fr: 'Prévention des risques psychosociaux', en: 'Psychosocial-risk prevention' }, benchmark: { fr: '—', en: '—' }, target: { fr: 'plan en place', en: 'plan in place' }, anchor: { fr: 'Santé', en: 'Health' } },
      { dimension: 'SOC', label: { fr: 'Qualité et sécurité des soins', en: 'Care quality & safety' }, benchmark: { fr: '—', en: '—' }, target: { fr: '↑', en: '↑' }, anchor: { fr: 'Santé', en: 'Health' }, trend: 'up' },
    ],
  },
  education: {
    key: 'education',
    label: { fr: 'Éducation & Culture', en: 'Education & Culture' },
    sources: [CI_SOURCE],
    indicators: [
      { dimension: 'ENV', label: { fr: "Consommation d'énergie par étudiant·e / m²", en: 'Energy consumption per student / m²' }, benchmark: { fr: '—', en: '—' }, target: { fr: '↓', en: '↓' }, anchor: { fr: "Consommation d'énergie", en: 'Energy consumption' }, trend: 'down' },
      { dimension: 'ENV', label: { fr: 'Part bio & local en restauration collective', en: 'Organic & local share in catering' }, benchmark: { fr: '18,2 % SAU bio CH (réf.)', en: '18.2% organic farmland CH (ref.)' }, target: { fr: '↑ %', en: '↑ %' }, anchor: { fr: 'Structure économique', en: 'Economic structure' }, trend: 'up' },
      { dimension: 'SOC', label: { fr: 'Mobilité douce / TP des usagers', en: 'Soft mobility / PT among users' }, benchmark: { fr: '—', en: '—' }, target: { fr: '↑ %', en: '↑ %' }, anchor: { fr: 'Mobilité', en: 'Mobility' }, trend: 'up' },
      { dimension: 'SOC', label: { fr: 'Inclusion (boursiers, handicap)', en: 'Inclusion (grants, disability)' }, benchmark: { fr: '—', en: '—' }, target: { fr: '↑', en: '↑' }, anchor: { fr: 'Égalité des chances', en: 'Equal opportunity' }, trend: 'up' },
      { dimension: 'SOC', label: { fr: 'Enjeux durables intégrés aux cursus', en: 'Sustainability embedded in curricula' }, benchmark: { fr: '—', en: '—' }, target: { fr: '↑ % de cursus', en: '↑ % of programmes' }, anchor: { fr: 'Formation', en: 'Education' }, trend: 'up' },
    ],
  },
  hospitality: {
    key: 'hospitality',
    label: { fr: 'Tourisme & Hôtellerie (dont restauration)', en: 'Tourism & Hospitality (incl. catering)' },
    note: { fr: 'Repères issus de sources suisses reconnues (United Against Waste / GastroSuisse).', en: 'Benchmarks from recognised Swiss sources (United Against Waste / GastroSuisse).' },
    sources: [CI_SOURCE, { label: { fr: 'United Against Waste / GastroSuisse', en: 'United Against Waste / GastroSuisse' }, url: 'https://gastrosuisse.ch/fr/branche/developpement-durable/food-waste' }],
    indicators: [
      { dimension: 'ENV', label: { fr: 'Empreinte carbone par nuitée', en: 'Carbon footprint per overnight stay' }, benchmark: { fr: '—', en: '—' }, target: { fr: '↓ kgCO₂e/nuitée', en: '↓ kgCO₂e/night' }, anchor: { fr: 'Climat', en: 'Climate' }, trend: 'down' },
      { dimension: 'ENV', label: { fr: 'Gaspillage alimentaire', en: 'Food waste' }, benchmark: { fr: '124 g/couvert (restauration CH)', en: '124 g/meal (Swiss foodservice)' }, target: { fr: '≤ 33 g/couvert', en: '≤ 33 g/meal' }, anchor: { fr: 'Consommation des matériaux', en: 'Material consumption' }, trend: 'down' },
      { dimension: 'ENV', label: { fr: 'Empreinte carbone du repas', en: 'Meal carbon footprint' }, benchmark: { fr: '≈ 2,5 kgCO₂e/repas', en: '≈ 2.5 kgCO₂e/meal' }, target: { fr: '0,5 kg (trajectoire 1,5 °C)', en: '0.5 kg (1.5 °C pathway)' }, anchor: { fr: 'Climat', en: 'Climate' }, trend: 'down' },
      { dimension: 'ENV', label: { fr: 'Eau par couvert / nuitée', en: 'Water per meal / night' }, benchmark: { fr: '15–25 L/couvert', en: '15–25 L/meal' }, target: { fr: '< 10 L/couvert', en: '< 10 L/meal' }, anchor: { fr: 'Régime des eaux', en: 'Water regime' }, trend: 'down' },
      { dimension: 'ENV', label: { fr: "Part d'énergies renouvelables", en: 'Renewable energy share' }, benchmark: { fr: '—', en: '—' }, target: { fr: '100 % courant vert', en: '100% green power' }, anchor: { fr: "Consommation d'énergie", en: 'Energy consumption' }, trend: 'up' },
      { dimension: 'ENV', label: { fr: 'Approvisionnement local & de saison', en: 'Local & seasonal sourcing' }, benchmark: { fr: '—', en: '—' }, target: { fr: '↑ %', en: '↑ %' }, anchor: { fr: 'Structure économique', en: 'Economic structure' }, trend: 'up' },
      { dimension: 'SOC', label: { fr: 'Emploi local · respect CCNT', en: 'Local employment · collective agreement' }, benchmark: { fr: '—', en: '—' }, target: { fr: '↑ % local · 100 % CCNT', en: '↑ % local · 100% CBA' }, anchor: { fr: 'Marché du travail', en: 'Labour market' }, trend: 'up' },
    ],
  },
  public: {
    key: 'public',
    label: { fr: 'Secteur public & Organisations', en: 'Public sector & Organisations' },
    sources: [CI_SOURCE, { label: { fr: 'MONET 2030 (OFS)', en: 'MONET 2030 (FSO)' }, url: 'https://www.bfs.admin.ch/bfs/fr/home/statistiques/developpement-durable/monet-2030.html' }],
    indicators: [
      { dimension: 'ENV', label: { fr: 'Émissions GES de la collectivité par habitant', en: 'Community GHG emissions per capita' }, benchmark: { fr: '—', en: '—' }, target: { fr: '↓ / zéro net 2050', en: '↓ / net-zero 2050' }, anchor: { fr: 'Climat', en: 'Climate' }, trend: 'down' },
      { dimension: 'ECO', label: { fr: "Part du budget d'investissement alignée climat", en: 'Share of investment budget aligned with climate' }, benchmark: { fr: '—', en: '—' }, target: { fr: '↑ %', en: '↑ %' }, anchor: { fr: 'Finances publiques', en: 'Public finances' }, trend: 'up' },
      { dimension: 'ENV', label: { fr: 'Marchés publics à critères environnementaux', en: 'Public procurement with environmental criteria' }, benchmark: { fr: '—', en: '—' }, target: { fr: '100 %', en: '100%' }, anchor: { fr: 'Consommation des matériaux', en: 'Material consumption' }, trend: 'up' },
      { dimension: 'SOC', label: { fr: 'Participation citoyenne / budget participatif', en: 'Citizen participation / participatory budget' }, benchmark: { fr: '—', en: '—' }, target: { fr: '↑ %', en: '↑ %' }, anchor: { fr: 'Participation', en: 'Participation' }, trend: 'up' },
      { dimension: 'ECO', label: { fr: 'Ouverture des données publiques (open data)', en: 'Open public data' }, benchmark: { fr: '—', en: '—' }, target: { fr: '↑ %', en: '↑ %' }, anchor: { fr: 'Transparence', en: 'Transparency' }, trend: 'up' },
    ],
  },
};

/** Association secteur (FR/EN/sous-secteurs) → jeu d'indicateurs, par mots-clés. Ordre = priorité. */
const SECTOR_MATCHERS: { set: string; kw: string[] }[] = [
  { set: 'energy', kw: ['energie', 'energy', 'ressource', 'petrole', 'petroleum', 'gaz', 'electric', 'renouvelable', 'utilit', 'power'] },
  { set: 'agriculture', kw: ['agricult', 'agroaliment', 'agri-food', 'elevage', 'farming', 'food & '] },
  { set: 'construction', kw: ['construction', 'immobil', 'batiment', 'building', 'real estate', 'btp', 'promotion'] },
  { set: 'transport', kw: ['transport', 'logistique', 'logistics', 'fret', 'freight', 'mobilite'] },
  { set: 'tech', kw: ['technologie', 'technology', 'telecom', 'numerique', 'digital', 'software', 'saas', 'ict', ' it '] },
  { set: 'finance', kw: ['finance', 'assurance', 'insurance', 'banqu', 'bank', 'fintech', 'asset'] },
  { set: 'health', kw: ['sante', 'health', 'bien-etre', 'wellbeing', 'wellness', 'medical', 'clinic', 'hopital', 'hospital', 'pharma'] },
  { set: 'education', kw: ['education', 'culture', 'ecole', 'school', 'universit', 'musee', 'museum', 'edtech', 'learning'] },
  { set: 'hospitality', kw: ['tourisme', 'tourism', 'hotellerie', 'hospitality', 'hotel', 'restaur', 'auberge', 'catering'] },
  { set: 'manufacturing', kw: ['industrie', 'manufactur', 'usine', 'production'] },
  { set: 'public', kw: ['secteur public', 'public sector', 'organisation', 'administration', 'commune', 'ong', 'ngo', 'collectivite', 'government'] },
  { set: 'commerce', kw: ['commerce', 'retail', 'trade', 'magasin', 'boutique', 'vente', 'services'] },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const normalize = (s: string): string =>
  (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();

/** Retrouve la région à partir de la réponse « territoire » du diagnostic. */
export const getRegionByTerritory = (territory?: string): Region | null => {
  if (!territory) return null;
  const t = normalize(territory);
  // Opérations hors de Suisse : aucun référentiel cantonal ne s'applique.
  if (t.includes('international') || t.includes('hors de') || t.includes('outside')) return null;
  for (const region of REGIONS) {
    for (const alias of region.aliases) {
      if (alias.length <= 2) {
        // codes 2 lettres (ge, vd…) : correspondance sur mot entier uniquement
        if (new RegExp(`\\b${alias}\\b`).test(t)) return region;
      } else if (t === alias || t.includes(alias)) {
        return region;
      }
    }
  }
  return null;
};

/** Jeu d'indicateurs sectoriels correspondant au secteur choisi (ou null). */
export const getSectorSet = (sector?: string): SectorIndicatorSet | null => {
  if (!sector) return null;
  const s = ` ${normalize(sector)} `;
  for (const m of SECTOR_MATCHERS) {
    if (m.kw.some(k => s.includes(k))) return SECTOR_INDICATOR_SETS[m.set] || null;
  }
  return null;
};

/** Résumé texte du référentiel cantonal + sectoriel, injecté dans le contexte de l'IA de support. */
export const buildRegionContext = (territory: string | undefined, sector: string | undefined, lang: 'fr' | 'en'): string => {
  const region = getRegionByTerritory(territory);
  const set = getSectorSet(sector);
  if (!region && !set) return '';
  const L = lang;
  const lines: string[] = [];
  if (region) {
    lines.push(L === 'fr' ? `RÉFÉRENTIEL CANTONAL — ${region.name.fr} :` : `CANTONAL FRAMEWORK — ${region.name.en}:`);
    lines.push(`- ${L === 'fr' ? 'Plan directeur' : 'Master plan'}: ${region.planDirecteur[L]}`);
    lines.push(`- ${L === 'fr' ? "Référentiel d'indicateurs" : 'Indicator framework'}: ${region.indicatorFramework[L]}`);
    if (region.climateTarget) lines.push(`- ${L === 'fr' ? 'Objectif climat' : 'Climate target'}: ${region.climateTarget[L]}`);
    if (region.keyValues.length) {
      lines.push(L === 'fr' ? '- Valeurs officielles clés :' : '- Key official values:');
      region.keyValues.forEach(v => lines.push(`   • ${v.label[L]}: ${v.value[L]}${v.year ? ` (${v.year})` : ''}`));
    }
  }
  if (set) {
    lines.push(L === 'fr'
      ? `- Indicateurs sectoriels mesurables (${set.label.fr}) : ${set.indicators.map(i => `${i.label.fr} [${L === 'fr' ? 'repère' : 'ref'} ${i.benchmark.fr} → ${i.target.fr}]`).slice(0, 6).join(' ; ')}.`
      : `- Measurable sector indicators (${set.label.en}): ${set.indicators.map(i => `${i.label.en} [ref ${i.benchmark.en} → ${i.target.en}]`).slice(0, 6).join('; ')}.`);
  }
  lines.push(L === 'fr'
    ? "Appuie tes conseils sur ces indicateurs officiels et chiffrés (pas seulement des recommandations générales)."
    : 'Base your advice on these official, quantified indicators (not only general recommendations).');
  return lines.join('\n');
};

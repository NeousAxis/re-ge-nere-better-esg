
import { ModelCompany } from '../types';

export const MODEL_COMPANIES: ModelCompany[] = [
  {
    id: 1,
    name: 'Solaria Grid',
    sector: 'Énergie & ressources',
    subSectors: ['Pétrole & gaz', 'Énergies renouvelables', 'Électricité & réseaux', 'Eau & assainissement', 'Mines & extraction'],
    profile: 'Production & distribution d’énergie renouvelable. Grande entreprise / opérateur régional.',
    pillars: {
      E: {
        kpis: [
          '–50 % d’émissions directes (Scope 1) en 5 ans.',
          '100 % d’électricité vendue certifiée renouvelable (Scope 2 & 3 usage client).',
        ],
        actions: [
          { id: 'solaria-e-1', text: 'Remplacer 70 % de la flotte thermique par de l’électrique.', tags: ['Scope 1', 'Impact'] },
          { id: 'solaria-e-2', text: 'Signer des PPA renouvelables longue durée pour tous les sites.', tags: ['Scope 2', 'Impact', 'Financière'] },
          { id: 'solaria-e-3', text: 'Proposer à tous les clients un contrat “offre verte” par défaut.', tags: ['Scope 3', 'Impact', 'Financière'] },
        ],
      },
      S: {
        kpis: [
          'Taux d’accidents avec arrêt < 3 pour 1 000 employés.',
          '100 % des sites avec plan de transition juste pour les emplois fossiles.',
        ],
        actions: [
          { id: 'solaria-s-1', text: 'Mettre en place un programme de formation vers les métiers de la transition.', tags: ['Impact'] },
          { id: 'solaria-s-2', text: 'Instaurer un dialogue social formalisé sur chaque site sensible.', tags: ['Impact', 'Financière'] },
          { id: 'solaria-s-3', text: 'Mesurer chaque année l’acceptabilité sociale des projets dans les territoires.', tags: ['Impact', 'Financière'] },
        ],
      },
      G: {
        kpis: [
          '20 % de la rémunération variable du COMEX indexée sur les objectifs climat.',
          'Cartographie des risques climatiques validée par le Conseil.',
        ],
        actions: [
          { id: 'solaria-g-1', text: 'Ajouter un indicateur “réduction d’émissions” dans le bonus des dirigeants.', tags: ['Impact', 'Financière'] },
          { id: 'solaria-g-2', text: 'Créer un comité Climat / RSE rattaché au Conseil.', tags: ['Impact'] },
          { id: 'solaria-g-3', text: 'Intégrer un scénario 1,5 °C dans tous les plans d’investissement > 5 M€.', tags: ['Financière'] },
        ],
      },
    },
  },
  {
    id: 2,
    name: 'TerraFood Coop',
    sector: 'Agriculture & Agroalimentaire',
    subSectors: ['Agriculture / élevage', 'Transformation alimentaire', 'Distribution alimentaire', 'Restauration'],
    profile: 'Coopérative agro locale, transformation + distribution.',
    pillars: {
      E: {
        kpis: ['0 % de déforestation dans la chaîne d’approvisionnement (Scope 3).', '50 % des emballages réutilisables / compostables.'],
        actions: [
          { id: 'terrafood-e-1', text: 'Exclure tous les fournisseurs liés à la déforestation (huile de palme non certifiée, soja à risque…).', tags: ['Scope 3', 'Impact', 'Financière'] },
          { id: 'terrafood-e-2', text: 'Lancer une gamme pilote 100 % vrac ou consigne.', tags: ['Scope 3', 'Impact'] },
          { id: 'terrafood-e-3', text: 'Mettre en place un suivi des émissions par kilo de produit vendu.', tags: ['Scope 1', 'Scope 2', 'Scope 3', 'Financière'] },
        ],
      },
      S: {
        kpis: ['100 % des producteurs avec contrat long terme et prix minimum garanti.', '0 cas de travail forcé / travail enfant dans la chaîne.'],
        actions: [
          { id: 'terrafood-s-1', text: 'Instaurer une charte “prix justes” signée avec tous les agriculteurs.', tags: ['Impact'] },
          { id: 'terrafood-s-2', text: 'Auditer les coopératives / importateurs à risque social.', tags: ['Impact', 'Financière'] },
          { id: 'terrafood-s-3', text: 'Co-financer des équipements (irrigation, stockage) pour sécuriser les revenus des producteurs.', tags: ['Impact', 'Financière'] },
        ],
      },
      G: {
        kpis: ['Politique d’achats responsables publiée et suivie.', 'Rapport annuel d’impact socio-environnemental.'],
        actions: [
          { id: 'terrafood-g-1', text: 'Mettre en place un comité multi-parties prenantes (producteurs, clients, ONG).', tags: ['Impact'] },
          { id: 'terrafood-g-2', text: 'Tracer et publier l’origine de 100 % des matières premières.', tags: ['Impact', 'Financière'] },
          { id: 'terrafood-g-3', text: 'Faire vérifier les données RSE par un tiers externe.', tags: ['Financière'] },
        ],
      },
    },
  },
  {
    id: 3,
    name: 'CircularFab',
    sector: 'Industrie manufacturière',
    subSectors: ['Textile / mode', 'Automobile', 'Électronique', 'Matériaux de construction', 'Chimie & pharmaceutique'],
    profile: 'Industrie spécialisée dans la fabrication à partir de matériaux recyclés.',
    pillars: {
      E: {
        kpis: ['–40 % d’émissions process (Scope 1).', '30 % de matière recyclée dans les produits.'],
        actions: [
          { id: 'circularfab-e-1', text: 'Installer récupération de chaleur sur les fours / presses.', tags: ['Scope 1', 'Impact', 'Financière'] },
          { id: 'circularfab-e-2', text: 'Substituer une partie des matières vierges par des matières recyclées certifiées.', tags: ['Scope 3', 'Impact'] },
          { id: 'circularfab-e-3', text: 'Réaliser une ACV sur le top 5 des produits.', tags: ['Scope 3', 'Financière'] },
        ],
      },
      S: {
        kpis: ['0 accident mortel, TF < seuil sectoriel.', '90 % des salariés formés aux risques industriels.'],
        actions: [
          { id: 'circularfab-s-1', text: 'Programme “sécurité d’abord” avec rituels quotidiens.', tags: ['Impact'] },
          { id: 'circularfab-s-2', text: 'Budget annuel pour ergonomie des postes.', tags: ['Impact', 'Financière'] },
          { id: 'circularfab-s-3', text: 'Audit social des principaux sous-traitants.', tags: ['Impact', 'Financière'] },
        ],
      },
      G: {
        kpis: ['Certifications ISO 9001 / 14001 / 45001.', 'Cartographie des risques réglementaires (REACH…).'],
        actions: [
          { id: 'circularfab-g-1', text: 'Nommer un risk-owner par grand risque industriel.', tags: ['Impact'] },
          { id: 'circularfab-g-2', text: 'Mettre en place un tableau de bord réglementaire trimestriel au COMEX.', tags: ['Financière'] },
          { id: 'circularfab-g-3', text: 'Intégrer critères RSE dans les appels d’offres techniques.', tags: ['Impact', 'Financière'] },
        ],
      },
    },
  },
  {
    id: 4,
    name: 'Regenera Build',
    sector: 'Construction & Immobilier',
    subSectors: ['Promotion immobilière', 'Construction / BTP', 'Architecture / ingénierie', 'Gestion immobilière'],
    profile: 'Promoteur et constructeur axé sur les bâtiments durables et régénératifs.',
    pillars: {
      E: {
        kpis: ['50 % de matériaux bas-carbone / biosourcés.', '0 déchet de chantier enfoui sur projets pilotes.'],
        actions: [
            { id: 'regenera-e-1', text: 'Utiliser des matériaux de construction bas-carbone (bois, béton recyclé).', tags: ['Scope 3', 'Impact'] },
            { id: 'regenera-e-2', text: 'Mettre en place un plan de gestion des déchets de chantier systématique.', tags: ['Impact', 'Financière'] },
            { id: 'regenera-e-3', text: 'Réaliser une Analyse de Cycle de Vie (ACV) pour chaque projet majeur.', tags: ['Financière'] },
        ],
      },
      S: {
        kpis: ['Taux d’accidents < seuil national.', '20 % de budget travaux confié à des entreprises locales / insertion.'],
        actions: [
            { id: 'regenera-s-1', text: 'Déployer une charte de chantier responsable (sécurité, bruit, propreté).', tags: ['Impact'] },
            { id: 'regenera-s-2', text: 'Intégrer une clause d’emploi local dans les appels d’offres.', tags: ['Impact'] },
            { id: 'regenera-s-3', text: 'Organiser des concertations avec les riverains avant chaque projet.', tags: ['Impact', 'Financière'] },
        ],
      },
      G: {
        kpis: ['Transparence totale sur les coûts, délais et impacts environnementaux.', '100 % des projets > 5 M€ audités par un tiers indépendant.'],
        actions: [
            { id: 'regenera-g-1', text: 'Créer un portail d’information en ligne pour chaque grand projet.', tags: ['Impact'] },
            { id: 'regenera-g-2', text: 'Mandater des audits indépendants pour la performance énergétique et sociale.', tags: ['Financière'] },
            { id: 'regenera-g-3', text: 'Mettre en place un comité de suivi local avec les parties prenantes.', tags: ['Impact'] },
        ],
      },
    },
  },
   {
    id: 5,
    name: 'CleanMove',
    sector: 'Transport & Logistique',
    subSectors: ['Transport routier', 'Maritime', 'Ferroviaire', 'Aérien', 'Livraison urbaine'],
    profile: 'Spécialiste de la logistique urbaine et du transport routier à faible émission.',
    pillars: {
      E: {
        kpis: ['80 % de la flotte en véhicules basse émission (électrique, biogaz).', '–30 % de kilomètres parcourus à vide.'],
        actions: [
          { id: 'cleanmove-e-1', text: 'Planifier l’électrification complète de la flotte de livraison urbaine.', tags: ['Scope 1', 'Impact', 'Financière'] },
          { id: 'cleanmove-e-2', text: 'Utiliser un logiciel d’optimisation des tournées pour réduire les distances.', tags: ['Scope 1', 'Financière'] },
          { id: 'cleanmove-e-3', text: 'Former tous les conducteurs à l’éco-conduite.', tags: ['Scope 1', 'Impact'] },
        ],
      },
      S: {
        kpis: ['100 % des conducteurs formés aux bonnes pratiques de sécurité routière.', 'Zéro infraction grave au code du travail.'],
        actions: [
            { id: 'cleanmove-s-1', text: 'Mettre en place une charte RH pour les conducteurs (temps de repos, rémunération).', tags: ['Impact'] },
            { id: 'cleanmove-s-2', text: 'Installer des systèmes d’aide à la conduite pour prévenir les accidents.', tags: ['Impact', 'Financière'] },
        ],
      },
      G: {
        kpis: ['Score RSE intégré comme critère principal dans la sélection des sous-traitants.', 'Publication d’un rapport annuel sur les émissions par tonne-kilomètre.'],
        actions: [
          { id: 'cleanmove-g-1', text: 'Intégrer des clauses RSE strictes dans tous les contrats de transport.', tags: ['Financière', 'Impact'] },
          { id: 'cleanmove-g-2', text: 'Mettre en place un système de reporting des performances extra-financières.', tags: ['Impact'] },
        ],
      },
    },
  },
  {
    id: 6,
    name: 'EthicCloud',
    sector: 'Technologie & Télécommunications',
    subSectors: ['Software / SaaS', 'Hardware', 'IA & data', 'Télécom', 'Services numériques / agences'],
    profile: 'Fournisseur de services cloud et SaaS engagé dans la sobriété numérique et l\'éthique de l\'IA.',
    pillars: {
      E: {
        kpis: ['Intensité carbone par requête < seuil du marché.', '100% des data centers alimentés par des énergies renouvelables.'],
        actions: [
          { id: 'ethiccloud-e-1', text: 'Appliquer les principes d’éco-conception à tous les nouveaux services.', tags: ['Impact', 'Financière'] },
          { id: 'ethiccloud-e-2', text: 'Limiter la collecte et le stockage des logs inutiles.', tags: ['Impact'] },
          { id: 'ethiccloud-e-3', text: 'Proposer une option "low-tech" pour les services critiques.', tags: ['Impact'] },
        ],
      },
      S: {
        kpis: ['Score de bien-être utilisateur > 8/10.', 'Diversité des équipes produit représentative des utilisateurs.'],
        actions: [
          { id: 'ethiccloud-s-1', text: 'Mettre en place une charte UX responsable (anti-dark patterns).', tags: ['Impact'] },
          { id: 'ethiccloud-s-2', text: 'Lancer un programme de "bug bounty" éthique.', tags: ['Impact', 'Financière'] },
        ],
      },
      G: {
        kpis: ['Comité d’éthique de l’IA opérationnel et indépendant.', 'Audits de biais algorithmiques réguliers.'],
        actions: [
          { id: 'ethiccloud-g-1', text: 'Publier les principes d’éthique de l’IA de l’entreprise.', tags: ['Impact'] },
          { id: 'ethiccloud-g-2', text: 'Garantir la transparence sur l’utilisation des données personnelles.', tags: ['Financière'] },
        ],
      },
    },
  },
  {
    id: 7,
    name: '1.5° Capital',
    sector: 'Finance & Assurance',
    subSectors: ['Banques', 'Fintech', 'Asset management', 'Assurance'],
    profile: 'Société de gestion d’actifs alignée sur les objectifs de l’Accord de Paris.',
    pillars: {
      E: {
        kpis: ['80 % des actifs sous gestion alignés sur une trajectoire 1,5 °C.', 'Mesure et publication de l’empreinte carbone financée (Scope 3).'],
        actions: [
          { id: 'capital-e-1', text: 'Appliquer une politique d’exclusion stricte sur le charbon et les hydrocarbures non conventionnels.', tags: ['Impact', 'Financière'] },
          { id: 'capital-e-2', text: 'Mener des stress-tests climatiques sur l’ensemble des portefeuilles.', tags: ['Financière'] },
          { id: 'capital-e-3', text: 'Publier un rapport annuel aligné sur les recommandations de la TCFD.', tags: ['Impact'] },
        ],
      },
      S: {
        kpis: ['0 % d’investissements dans des entreprises controversées pour atteintes graves aux droits humains.', 'Formation de 100 % des gérants aux enjeux RSE.'],
        actions: [
          { id: 'capital-s-1', text: 'Mener une politique d’engagement actionnarial active sur les enjeux sociaux.', tags: ['Impact'] },
          { id: 'capital-s-2', text: 'Développer des produits d’investissement à impact social.', tags: ['Impact', 'Financière'] },
        ],
      },
      G: {
        kpis: ['Vote systématique en faveur des résolutions "pro-climat" lors des Assemblées Générales.', 'Transparence totale sur la conformité SFDR (Article 8 et 9).'],
        actions: [
          { id: 'capital-g-1', text: 'Intégrer les critères RSE dans l’analyse fondamentale de chaque investissement.', tags: ['Financière'] },
          { id: 'capital-g-2', text: 'Publier la politique de vote et le bilan des engagements.', tags: ['Impact'] },
        ],
      },
    },
  },
    {
    id: 8,
    name: 'LocalCircle',
    sector: 'Commerce & Services',
    subSectors: ['Retail (petites boutiques, grands magasins)', 'Services aux entreprises (consulting, marketing, IT)', 'Services aux particuliers (coiffeurs, gyms, artisans)'],
    profile: 'Réseau de boutiques et services de proximité favorisant les circuits courts et l’économie locale.',
    pillars: {
      E: {
        kpis: ['70 % des fournisseurs sont locaux (<150km).', '100 % d’électricité d’origine renouvelable.'],
        actions: [
          { id: 'localcircle-e-1', text: 'Privilégier le sourcing local et de saison.', tags: ['Scope 3', 'Impact'] },
          { id: 'localcircle-e-2', text: 'Afficher l’impact carbone des produits phares en rayon.', tags: ['Impact'] },
          { id: 'localcircle-e-3', text: 'Mettre en place un programme de consigne pour les emballages.', tags: ['Scope 3', 'Financière'] },
        ],
      },
      S: {
        kpis: ['100 % des employés payés au-dessus du salaire minimum local.', 'Part de contrats stables (CDI) > 80 %.'],
        actions: [
          { id: 'localcircle-s-1', text: 'Établir une politique salariale claire et équitable.', tags: ['Impact'] },
          { id: 'localcircle-s-2', text: 'Lancer un programme de fidélité qui récompense les achats responsables.', tags: ['Impact', 'Financière'] },
        ],
      },
      G: {
        kpis: ['Transparence totale sur les marges et l’origine des produits.', 'Mécanisme de gouvernance partagée avec les producteurs locaux.'],
        actions: [
          { id: 'localcircle-g-1', text: 'Publier la répartition de la valeur entre producteurs, distributeur et employés.', tags: ['Impact'] },
          { id: 'localcircle-g-2', text: 'Créer un comité des fournisseurs pour co-construire l’offre.', tags: ['Impact', 'Financière'] },
        ],
      },
    },
  },
   {
    id: 9,
    name: 'PlanetCare Clinic',
    sector: 'Santé & Bien-être',
    subSectors: ['Hôpitaux', 'Cliniques privées', 'Cabinets médicaux', 'Pharmacies', 'Centres de bien-être / spas'],
    profile: 'Clinique privée engagée dans une approche "One Health", liant santé humaine et santé planétaire.',
    pillars: {
      E: {
        kpis: ['Réduction de 20 % de l’empreinte carbone par lit.', 'Diminution de 30 % du volume de déchets médicaux dangereux.'],
        actions: [
          { id: 'planetcare-e-1', text: 'Optimiser l’usage des gaz anesthésiques à fort potentiel de réchauffement.', tags: ['Scope 1', 'Impact'] },
          { id: 'planetcare-e-2', text: 'Mettre en place un tri sélectif rigoureux pour tous les types de déchets.', tags: ['Impact', 'Financière'] },
          { id: 'planetcare-e-3', text: 'Privilégier les fournisseurs d’équipements médicaux éco-conçus.', tags: ['Scope 3', 'Impact'] },
        ],
      },
      S: {
        kpis: ['Indice de qualité des soins perçue > 90 %.', 'Plan de prévention des risques psychosociaux pour tout le personnel.'],
        actions: [
          { id: 'planetcare-s-1', text: 'Lancer des programmes de soutien psychologique pour le personnel soignant.', tags: ['Impact'] },
          { id: 'planetcare-s-2', text: 'Développer des parcours de soins préventifs pour les patients.', tags: ['Impact', 'Financière'] },
        ],
      },
      G: {
        kpis: ['Comités d’éthique actifs et consultés pour les décisions critiques.', 'Zéro incident de perte de données patients.'],
        actions: [
          { id: 'planetcare-g-1', text: 'Réaliser des audits de sécurité des données patients semestriels.', tags: ['Financière'] },
          { id: 'planetcare-g-2', text: 'Publier une charte éthique sur la relation avec l’industrie pharmaceutique.', tags: ['Impact'] },
        ],
      },
    },
  },
  {
    id: 10,
    name: 'FutureLearn Campus',
    sector: 'Éducation & Culture',
    subSectors: ['Écoles', 'Universités', 'Musées', 'Galeries / institutions culturelles', 'Formation / EdTech'],
    profile: 'Établissement d’enseignement supérieur intégrant la transition écologique et sociale à tous les niveaux.',
    pillars: {
      E: {
        kpis: ['Réduction de 40 % de la consommation d’énergie par étudiant.', '100 % de l’approvisionnement de la cantine en bio et local.'],
        actions: [
          { id: 'futurelearn-e-1', text: 'Engager un plan de rénovation énergétique des bâtiments du campus.', tags: ['Scope 1', 'Scope 2', 'Financière'] },
          { id: 'futurelearn-e-2', text: 'Intégrer un module obligatoire sur les enjeux climatiques dans tous les cursus.', tags: ['Impact'] },
          { id: 'futurelearn-e-3', text: 'Installer des panneaux solaires sur les toits des bâtiments.', tags: ['Scope 1', 'Impact'] },
        ],
      },
      S: {
        kpis: ['Taux d’inclusion (boursiers, handicap) supérieur à la moyenne nationale.', 'Participation étudiante active à la gouvernance de l’établissement.'],
        actions: [
          { id: 'futurelearn-s-1', text: 'Mettre en place des conseils d’élèves avec un réel pouvoir de décision.', tags: ['Impact'] },
          { id: 'futurelearn-s-2', text: 'Créer des procédures de signalement claires et efficaces contre le harcèlement.', tags: ['Impact'] },
        ],
      },
      G: {
        kpis: ['Transparence budgétaire totale sur l’utilisation des fonds.', 'Politique anti-harcèlement et anti-discrimination appliquée et évaluée.'],
        actions: [
          { id: 'futurelearn-g-1', text: 'Publier le budget détaillé de l’établissement en open data.', tags: ['Impact'] },
          { id: 'futurelearn-g-2', text: 'Mener une évaluation annuelle indépendante du climat social sur le campus.', tags: ['Financière'] },
        ],
      },
    },
  },
    {
    id: 11,
    name: 'Regenera Lodge',
    sector: 'Tourisme & Hôtellerie',
    subSectors: ['Hôtels', 'Auberges', 'Tour-opérateurs', 'Activités touristiques locales'],
    profile: 'Hôtel éco-responsable visant un impact positif sur son écosystème local.',
    pillars: {
      E: {
        kpis: ['Empreinte carbone par nuitée < 10 kg CO2e.', 'Consommation d’eau par client réduite de 30 %.'],
        actions: [
          { id: 'regenera-lodge-e-1', text: 'Installer des systèmes d’énergies renouvelables (solaire thermique, photovoltaïque).', tags: ['Scope 1', 'Impact', 'Financière'] },
          { id: 'regenera-lodge-e-2', text: 'Mettre en place un système de récupération des eaux de pluie et de recyclage des eaux grises.', tags: ['Impact', 'Financière'] },
          { id: 'regenera-lodge-e-3', text: 'S’approvisionner à 80 % en produits alimentaires locaux et de saison.', tags: ['Scope 3', 'Impact'] },
        ],
      },
      S: {
        kpis: ['90 % des employés sont issus des communautés locales.', 'Contribution de 5 % du revenu par nuitée à un fonds de développement local.'],
        actions: [
          { id: 'regenera-lodge-s-1', text: 'Établir des partenariats avec des artisans et guides locaux.', tags: ['Impact'] },
          { id: 'regenera-lodge-s-2', text: 'Proposer des conditions de travail et des salaires équitables, même en haute saison.', tags: ['Impact'] },
        ],
      },
      G: {
        kpis: ['Transparence totale sur les impacts environnementaux et sociaux des séjours.', 'Certification par un label de tourisme durable reconnu.'],
        actions: [
          { id: 'regenera-lodge-g-1', text: 'Communiquer de manière honnête sur les pratiques (éviter le greenwashing).', tags: ['Impact'] },
          { id: 'regenera-lodge-g-2', text: 'Mettre en place un comité de dialogue avec les représentants de la communauté locale.', tags: ['Impact', 'Financière'] },
        ],
      },
    },
  },
  {
    id: 12,
    name: 'Civic Horizon',
    sector: 'Secteur public & Organisations',
    subSectors: ['Administrations publiques', 'Communes', 'ONG / associations', 'Organisations internationales'],
    profile: 'Collectivité territoriale engagée dans une transition juste et une gouvernance ouverte.',
    pillars: {
      E: {
        kpis: ['Réduction de 40 % de l’empreinte carbone de la collectivité par habitant.', '50 % du budget d’investissement aligné avec les objectifs climatiques.'],
        actions: [
          { id: 'civic-e-1', text: 'Adopter et mettre en œuvre un Plan Climat Air Énergie Territorial (PCAET).', tags: ['Impact', 'Financière'] },
          { id: 'civic-e-2', text: 'Intégrer des critères environnementaux stricts dans 100 % des marchés publics.', tags: ['Scope 3', 'Impact'] },
          { id: 'civic-e-3', text: 'Lancer un programme de rénovation énergétique pour le patrimoine bâti public.', tags: ['Scope 1', 'Scope 2', 'Financière'] },
        ],
      },
      S: {
        kpis: ['Taux de participation citoyenne aux consultations > 10 %.', 'Accès garanti aux services publics essentiels pour tous les habitants.'],
        actions: [
          { id: 'civic-s-1', text: 'Mettre en place un budget participatif annuel.', tags: ['Impact'] },
          { id: 'civic-s-2', text: 'Développer des politiques actives d’inclusion sociale (logement, éducation, santé).', tags: ['Impact'] },
        ],
      },
      G: {
        kpis: ['Niveau d’ouverture des données publiques > 80 % (Open Data).', 'Indice de confiance citoyenne dans l’institution en hausse continue.'],
        actions: [
          { id: 'civic-g-1', text: 'Publier les décisions et les budgets en format ouvert et accessible.', tags: ['Impact'] },
          { id: 'civic-g-2', text: 'Instaurer des mécanismes de plainte et de suivi des engagements publics.', tags: ['Impact', 'Financière'] },
        ],
      },
    },
  },
];

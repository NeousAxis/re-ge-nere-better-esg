
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
          { text: '–50 % d’émissions directes (Scope 1) en 5 ans.', tags: ['Scope 1', 'Impact'] },
          { text: '100 % d’électricité vendue certifiée renouvelable (Scope 2 & 3 usage client).', tags: ['Scope 2', 'Scope 3', 'Impact'] },
          { text: 'Réduction de 20 % de l’intensité énergétique par GWh produit.', tags: ['Scope 1', 'Financière'] },
        ],
        actions: [
          { id: 'solaria-e-1', text: 'Remplacer 70 % de la flotte thermique par de l’électrique.', tags: ['Scope 1', 'Impact'] },
          { id: 'solaria-e-2', text: 'Signer des PPA renouvelables longue durée pour tous les sites.', tags: ['Scope 2', 'Impact', 'Financière'] },
          { id: 'solaria-e-3', text: 'Proposer à tous les clients un contrat “offre verte” par défaut.', tags: ['Scope 3', 'Impact', 'Financière'] },
        ],
      },
      S: {
        kpis: [
          { text: 'Taux d’accidents avec arrêt < 3 pour 1 000 employés.', tags: ['Impact'] },
          { text: '100 % des sites avec plan de transition juste pour les emplois fossiles.', tags: ['Impact', 'Financière'] },
          { text: '30 % de femmes dans les postes techniques et d’ingénierie.', tags: ['Impact'] },
        ],
        actions: [
          { id: 'solaria-s-1', text: 'Mettre en place un programme de formation vers les métiers de la transition.', tags: ['Impact'] },
          { id: 'solaria-s-2', text: 'Instaurer un dialogue social formalisé sur chaque site sensible.', tags: ['Impact', 'Financière'] },
          { id: 'solaria-s-3', text: 'Mesurer chaque année l’acceptabilité sociale des projets dans les territoires.', tags: ['Impact', 'Financière'] },
        ],
      },
      G: {
        kpis: [
          { text: '20 % de la rémunération variable du COMEX indexée sur les objectifs climat.', tags: ['Financière'] },
          { text: 'Cartographie des risques climatiques validée par le Conseil.', tags: ['Financière'] },
          { text: 'Publication annuelle d’un rapport TCFD complet.', tags: ['Impact', 'Financière'] },
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
        kpis: [
          { text: '0 % de déforestation dans la chaîne d’approvisionnement (Scope 3).', tags: ['Scope 3', 'Impact'] },
          { text: '50 % des emballages réutilisables / compostables.', tags: ['Scope 3', 'Impact'] },
          { text: 'Réduction de 15 % de la consommation d’eau par tonne produite.', tags: ['Scope 1', 'Impact'] }
        ],
        actions: [
          { id: 'terrafood-e-1', text: 'Exclure tous les fournisseurs liés à la déforestation (huile de palme non certifiée, soja à risque…).', tags: ['Scope 3', 'Impact', 'Financière'] },
          { id: 'terrafood-e-2', text: 'Lancer une gamme pilote 100 % vrac ou consigne.', tags: ['Scope 3', 'Impact'] },
          { id: 'terrafood-e-3', text: 'Mettre en place un suivi des émissions par kilo de produit vendu.', tags: ['Scope 1', 'Scope 2', 'Scope 3', 'Financière'] },
        ],
      },
      S: {
        kpis: [
          { text: '100 % des producteurs avec contrat long terme et prix minimum garanti.', tags: ['Impact', 'Financière'] },
          { text: '0 cas de travail forcé / travail enfant dans la chaîne.', tags: ['Impact'] },
          { text: 'Indice de satisfaction des producteurs partenaires > 8/10.', tags: ['Impact'] }
        ],
        actions: [
          { id: 'terrafood-s-1', text: 'Instaurer une charte “prix justes” signée avec tous les agriculteurs.', tags: ['Impact'] },
          { id: 'terrafood-s-2', text: 'Auditer les coopératives / importateurs à risque social.', tags: ['Impact', 'Financière'] },
          { id: 'terrafood-s-3', text: 'Co-financer des équipements (irrigation, stockage) pour sécuriser les revenus des producteurs.', tags: ['Impact', 'Financière'] },
        ],
      },
      G: {
        kpis: [
          { text: 'Politique d’achats responsables publiée et suivie.', tags: ['Impact'] },
          { text: 'Rapport annuel d’impact socio-environnemental.', tags: ['Impact'] },
          { text: 'Présence d’un représentant des producteurs au conseil d’administration.', tags: ['Financière'] }
        ],
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
        kpis: [
          { text: '–40 % d’émissions process (Scope 1).', tags: ['Scope 1', 'Impact'] },
          { text: '30 % de matière recyclée dans les produits.', tags: ['Scope 3', 'Impact'] },
          { text: 'Taux de recyclabilité des produits finis > 95 %.', tags: ['Scope 3', 'Impact'] }
        ],
        actions: [
          { id: 'circularfab-e-1', text: 'Installer récupération de chaleur sur les fours / presses.', tags: ['Scope 1', 'Impact', 'Financière'] },
          { id: 'circularfab-e-2', text: 'Substituer une partie des matières vierges par des matières recyclées certifiées.', tags: ['Scope 3', 'Impact'] },
          { id: 'circularfab-e-3', text: 'Réaliser une ACV sur le top 5 des produits.', tags: ['Scope 3', 'Financière'] },
        ],
      },
      S: {
        kpis: [
          { text: '0 accident mortel, TF < seuil sectoriel.', tags: ['Impact', 'Financière'] },
          { text: '90 % des salariés formés aux risques industriels.', tags: ['Impact'] },
          { text: 'Taux de maladies professionnelles inférieur à la moyenne sectorielle.', tags: ['Impact'] }
        ],
        actions: [
          { id: 'circularfab-s-1', text: 'Programme “sécurité d’abord” avec rituels quotidiens.', tags: ['Impact'] },
          { id: 'circularfab-s-2', text: 'Budget annuel pour ergonomie des postes.', tags: ['Impact', 'Financière'] },
          { id: 'circularfab-s-3', text: 'Audit social des principaux sous-traitants.', tags: ['Impact', 'Financière'] },
        ],
      },
      G: {
        kpis: [
          { text: 'Certifications ISO 9001 / 14001 / 45001.', tags: ['Impact'] },
          { text: 'Cartographie des risques réglementaires (REACH…).', tags: ['Financière'] },
          { text: 'Code de conduite signé par 100 % des fournisseurs stratégiques.', tags: ['Impact'] }
        ],
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
        kpis: [
          { text: 'Construction Bas Carbone compatible trajectoire 1.5°C (SNBC) sur 100% des projets.', tags: ['Scope 3', 'Impact'] },
          { text: 'Valorisation de 90 % des déchets de chantier (Economie Circulaire).', tags: ['Impact', 'Financière'] },
          { text: 'Utilisation majoritaire (>50%) de matériaux biosourcés ou géo-sourcés.', tags: ['Scope 3', 'Impact'] }
        ],
        actions: [
          { id: 'regenera-e-1', text: 'Systématiser l’Analyse de Cycle de Vie (ACV) dynamique dès la conception.', tags: ['Scope 3', 'Impact'] },
          { id: 'regenera-e-2', text: 'S’engager sur une clause de “Zéro Déchet Ultime” avec les sous-traitants.', tags: ['Impact', 'Financière'] },
          { id: 'regenera-e-3', text: 'Former 100% des équipes de conception aux matériaux biosourcés (bois, paille, chanvre).', tags: ['Financière'] },
        ],
      },
      S: {
        kpis: [
          { text: 'Taux de fréquence accidents < 5 (Objectif Zéro Accident).', tags: ['Impact'] },
          { text: '30 % des heures travaillées en insertion ou par main d\'œuvre locale.', tags: ['Impact'] },
          { text: '100 % des collaborateurs et sous-traitants formés aux enjeux énergie-climat.', tags: ['Scope 1', 'Impact'] }
        ],
        actions: [
          { id: 'regenera-s-1', text: 'Imposer le “Quart d’heure sécurité et environnement” hebdomadaire sur tous les chantiers.', tags: ['Impact'] },
          { id: 'regenera-s-2', text: 'Contractualiser des objectifs d’insertion sociale dans tous les marchés travaux.', tags: ['Impact'] },
          { id: 'regenera-s-3', text: 'Lancer un plan de bien-être mental et physique "Chantier Durable".', tags: ['Impact', 'Financière'] },
        ],
      },
      G: {
        kpis: [
          { text: 'Stratégie Climat validée par le SBTi (Science Based Targets).', tags: ['Scope 1', 'Scope 2', 'Scope 3'] },
          { text: 'Critères Carbone pondérés à >20% dans le choix des sous-traitants.', tags: ['Scope 3', 'Financière'] },
          { text: 'Reporting extra-financier audité annuellement (CSRD).', tags: ['Financière'] }
        ],
        actions: [
          { id: 'regenera-g-1', text: 'Refuser tout projet non aligné avec la taxonomie interne "Régénération".', tags: ['Impact'] },
          { id: 'regenera-g-2', text: 'Indexation de 20% de la marge opérationnelle sur la performance carbone réelle.', tags: ['Financière'] },
          { id: 'regenera-g-3', text: 'Comité de parties prenantes (riverains, ONG) avec droit de veto consultatif sur les grands projets.', tags: ['Impact'] },
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
        kpis: [
          { text: '80 % de la flotte en véhicules basse émission (électrique, biogaz).', tags: ['Scope 1', 'Impact'] },
          { text: '–30 % de kilomètres parcourus à vide.', tags: ['Scope 1', 'Financière'] },
          { text: 'Intensité carbone réduite de 10 % par tonne-km transportée.', tags: ['Scope 3', 'Impact'] }
        ],
        actions: [
          { id: 'cleanmove-e-1', text: 'Planifier l’électrification complète de la flotte de livraison urbaine.', tags: ['Scope 1', 'Impact', 'Financière'] },
          { id: 'cleanmove-e-2', text: 'Utiliser un logiciel d’optimisation des tournées pour réduire les distances.', tags: ['Scope 1', 'Financière'] },
          { id: 'cleanmove-e-3', text: 'Former tous les conducteurs à l’éco-conduite.', tags: ['Scope 1', 'Impact'] },
        ],
      },
      S: {
        kpis: [
          { text: '100 % des conducteurs formés aux bonnes pratiques de sécurité routière.', tags: ['Impact'] },
          { text: 'Zéro infraction grave au code du travail.', tags: ['Impact', 'Financière'] },
          { text: 'Turnover des conducteurs inférieur à 15 %.', tags: ['Impact', 'Financière'] }
        ],
        actions: [
          { id: 'cleanmove-s-1', text: 'Mettre en place une charte RH pour les conducteurs (temps de repos, rémunération).', tags: ['Impact'] },
          { id: 'cleanmove-s-2', text: 'Installer des systèmes d’aide à la conduite pour prévenir les accidents.', tags: ['Impact', 'Financière'] },
        ],
      },
      G: {
        kpis: [
          { text: 'Score RSE intégré comme critère principal dans la sélection des sous-traitants.', tags: ['Scope 3', 'Impact'] },
          { text: 'Publication d’un rapport annuel sur les émissions par tonne-kilomètre.', tags: ['Impact'] },
          { text: 'Certification ISO 14001 pour 100 % des sites logistiques.', tags: ['Impact'] }
        ],
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
        kpis: [
          { text: 'Intensité carbone par requête < seuil du marché.', tags: ['Scope 3', 'Impact'] },
          { text: '100% des data centers alimentés par des énergies renouvelables.', tags: ['Scope 2', 'Impact'] },
          { text: 'Augmentation de 25 % de la durée de vie moyenne des équipements serveurs.', tags: ['Scope 3', 'Financière'] }
        ],
        actions: [
          { id: 'ethiccloud-e-1', text: 'Appliquer les principes d’éco-conception à tous les nouveaux services.', tags: ['Impact', 'Financière'] },
          { id: 'ethiccloud-e-2', text: 'Limiter la collecte et le stockage des logs inutiles.', tags: ['Impact'] },
          { id: 'ethiccloud-e-3', text: 'Proposer une option "low-tech" pour les services critiques.', tags: ['Impact'] },
        ],
      },
      S: {
        kpis: [
          { text: 'Score de bien-être utilisateur > 8/10.', tags: ['Impact'] },
          { text: 'Diversité des équipes produit représentative des utilisateurs.', tags: ['Impact'] },
          { text: 'Taux d’accessibilité numérique des services > 90 % (WCAG).', tags: ['Impact'] }
        ],
        actions: [
          { id: 'ethiccloud-s-1', text: 'Mettre en place une charte UX responsable (anti-dark patterns).', tags: ['Impact'] },
          { id: 'ethiccloud-s-2', text: 'Lancer un programme de "bug bounty" éthique.', tags: ['Impact', 'Financière'] },
        ],
      },
      G: {
        kpis: [
          { text: 'Comité d’éthique de l’IA opérationnel et indépendant.', tags: ['Impact'] },
          { text: 'Audits de biais algorithmiques réguliers.', tags: ['Financière'] },
          { text: 'Publication annuelle d’un rapport de transparence sur les requêtes gouvernementales.', tags: ['Impact'] }
        ],
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
        kpis: [
          { text: '80 % des actifs sous gestion alignés sur une trajectoire 1,5 °C.', tags: ['Scope 3', 'Impact'] },
          { text: 'Mesure et publication de l’empreinte carbone financée (Scope 3).', tags: ['Scope 3', 'Financière'] },
          { text: 'Zéro investissement dans de nouveaux projets fossiles.', tags: ['Scope 3', 'Impact'] }
        ],
        actions: [
          { id: 'capital-e-1', text: 'Appliquer une politique d’exclusion stricte sur le charbon et les hydrocarbures non conventionnels.', tags: ['Impact', 'Financière'] },
          { id: 'capital-e-2', text: 'Mener des stress-tests climatiques sur l’ensemble des portefeuilles.', tags: ['Financière'] },
          { id: 'capital-e-3', text: 'Publier un rapport annuel aligné sur les recommandations de la TCFD.', tags: ['Impact'] },
        ],
      },
      S: {
        kpis: [
          { text: '0 % d’investissements dans des entreprises controversées pour atteintes graves aux droits humains.', tags: ['Impact'] },
          { text: 'Formation de 100 % des gérants aux enjeux RSE.', tags: ['Impact'] },
          { text: 'Parité hommes-femmes atteinte au sein des équipes de gestion.', tags: ['Impact'] }
        ],
        actions: [
          { id: 'capital-s-1', text: 'Mener une politique d’engagement actionnarial active sur les enjeux sociaux.', tags: ['Impact'] },
          { id: 'capital-s-2', text: 'Développer des produits d’investissement à impact social.', tags: ['Impact', 'Financière'] },
        ],
      },
      G: {
        kpis: [
          { text: 'Vote systématique en faveur des résolutions "pro-climat" lors des Assemblées Générales.', tags: ['Impact', 'Financière'] },
          { text: 'Transparence totale sur la conformité SFDR (Article 8 et 9).', tags: ['Financière'] },
          { text: 'Publication exhaustive des frais de gestion et coûts intermédiaires.', tags: ['Impact'] }
        ],
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
        kpis: [
          { text: '90 % des fournisseurs situés à moins de 100 km.', tags: ['Scope 3', 'Impact'] },
          { text: 'Zéro déchet alimentaire invendu (redistribution à 100 %).', tags: ['Scope 3', 'Impact'] },
          { text: 'Réduction de 50 % des emballages plastiques.', tags: ['Scope 3', 'Impact'] }
        ],
        actions: [
          { id: 'localcircle-e-1', text: 'Privilégier le sourcing local et de saison.', tags: ['Scope 3', 'Impact'] },
          { id: 'localcircle-e-2', text: 'Afficher l’impact carbone des produits phares en rayon.', tags: ['Impact'] },
          { id: 'localcircle-e-3', text: 'Mettre en place un programme de consigne pour les emballages.', tags: ['Scope 3', 'Financière'] },
        ],
      },
      S: {
        kpis: [
          { text: '100 % des employés en CDI temps plein ou choisi.', tags: ['Impact'] },
          { text: 'Salaire minimum interne > 120 % du SMIC.', tags: ['Impact', 'Financière'] },
          { text: 'Taux d’ancrage local (partenariats associations) > 5 initiatives actives.', tags: ['Impact'] }
        ],
        actions: [
          { id: 'localcircle-s-1', text: 'Établir une politique salariale claire et équitable.', tags: ['Impact'] },
          { id: 'localcircle-s-2', text: 'Lancer un programme de fidélité qui récompense les achats responsables.', tags: ['Impact', 'Financière'] },
        ],
      },
      G: {
        kpis: [
          { text: 'Structure coopérative ou participative (1 personne = 1 voix).', tags: ['Impact'] },
          { text: 'Écart de salaires max de 1 à 5.', tags: ['Impact', 'Financière'] },
          { text: 'Publication des marges par rayon.', tags: ['Impact', 'Financière'] }
        ],
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
        kpis: [
          { text: 'Réduction de 30 % de la consommation énergétique par lit.', tags: ['Scope 1', 'Impact', 'Financière'] },
          { text: 'Traitement de 100 % des déchets infectieux en filière sécurisée et bas carbone.', tags: ['Scope 3', 'Impact'] },
          { text: '50 % d’achats hospitaliers responsables (médicaments, équipements).', tags: ['Scope 3', 'Impact'] }
        ],
        actions: [
          { id: 'planetcare-e-1', text: 'Optimiser l’usage des gaz anesthésiques à fort potentiel de réchauffement.', tags: ['Scope 1', 'Impact'] },
          { id: 'planetcare-e-2', text: 'Mettre en place un tri sélectif rigoureux pour tous les types de déchets.', tags: ['Impact', 'Financière'] },
          { id: 'planetcare-e-3', text: 'Privilégier les fournisseurs d’équipements médicaux éco-conçus.', tags: ['Scope 3', 'Impact'] },
        ],
      },
      S: {
        kpis: [
          { text: 'Indice de qualité des soins perçue > 90 %.', tags: ['Impact'] },
          { text: 'Plan de prévention des risques psychosociaux pour tout le personnel.', tags: ['Impact'] },
          { text: 'Temps moyen d’attente aux urgences inférieur à 2h.', tags: ['Impact', 'Financière'] }
        ],
        actions: [
          { id: 'planetcare-s-1', text: 'Lancer des programmes de soutien psychologique pour le personnel soignant.', tags: ['Impact'] },
          { id: 'planetcare-s-2', text: 'Développer des parcours de soins préventifs pour les patients.', tags: ['Impact', 'Financière'] },
        ],
      },
      G: {
        kpis: [
          { text: 'Comité d’éthique médicale actif et consulté.', tags: ['Impact'] },
          { text: 'Transparence des liens d’intérêts avec l’industrie pharmaceutique.', tags: ['Financière'] },
          { text: 'Sécurité des données de santé certifiée (HDS).', tags: ['Impact', 'Financière'] }
        ],
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
        kpis: [
          { text: 'Réduction de 40 % de la consommation d’énergie par étudiant.', tags: ['Scope 1', 'Scope 2', 'Financière'] },
          { text: '100 % de l’approvisionnement de la cantine en bio et local.', tags: ['Scope 3', 'Impact'] },
          { text: 'Taux de tri des déchets sur le campus > 75 %.', tags: ['Impact'] }
        ],
        actions: [
          { id: 'futurelearn-e-1', text: 'Engager un plan de rénovation énergétique des bâtiments du campus.', tags: ['Scope 1', 'Scope 2', 'Financière'] },
          { id: 'futurelearn-e-2', text: 'Intégrer un module obligatoire sur les enjeux climatiques dans tous les cursus.', tags: ['Impact'] },
          { id: 'futurelearn-e-3', text: 'Installer des panneaux solaires sur les toits des bâtiments.', tags: ['Scope 1', 'Impact'] },
        ],
      },
      S: {
        kpis: [
          { text: 'Taux d’inclusion (boursiers, handicap) supérieur à la moyenne nationale.', tags: [] },
          { text: 'Participation étudiante active à la gouvernance de l’établissement.', tags: [] },
          { text: '100 % des étudiants sensibilisés aux VSS (Violences Sexistes et Sexuelles).', tags: [] }
        ],
        actions: [
          { id: 'futurelearn-s-1', text: 'Mettre en place des conseils d’élèves avec un réel pouvoir de décision.', tags: ['Impact'] },
          { id: 'futurelearn-s-2', text: 'Créer des procédures de signalement claires et efficaces contre le harcèlement.', tags: ['Impact'] },
        ],
      },
      G: {
        kpis: [
          { text: 'Transparence budgétaire totale sur l’utilisation des fonds.', tags: [] },
          { text: 'Politique anti-harcèlement et anti-discrimination appliquée et évaluée.', tags: [] },
          { text: 'Respect de la liberté académique garanti par charte.', tags: [] }
        ],
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
        kpis: [
          { text: 'Empreinte carbone par nuitée < 10 kg CO2e.', tags: ['Scope 3', 'Impact'] },
          { text: 'Consommation d’eau par client réduite de 30 %.', tags: ['Scope 1', 'Impact'] },
          { text: 'Zéro plastique à usage unique dans l’établissement.', tags: ['Scope 3', 'Impact'] }
        ],
        actions: [
          { id: 'regenera-lodge-e-1', text: 'Installer des systèmes d’énergies renouvelables (solaire thermique, photovoltaïque).', tags: ['Scope 1', 'Impact', 'Financière'] },
          { id: 'regenera-lodge-e-2', text: 'Mettre en place un système de récupération des eaux de pluie et de recyclage des eaux grises.', tags: ['Impact', 'Financière'] },
          { id: 'regenera-lodge-e-3', text: 'S’approvisionner à 80 % en produits alimentaires locaux et de saison.', tags: ['Scope 3', 'Impact'] },
        ],
      },
      S: {
        kpis: [
          { text: '90 % des employés sont issus des communautés locales.', tags: ['Impact'] },
          { text: 'Contribution de 5 % du revenu par nuitée à un fonds de développement local.', tags: ['Impact', 'Financière'] },
          { text: 'Plan de formation continue pour 100 % du personnel.', tags: ['Impact'] }
        ],
        actions: [
          { id: 'regenera-lodge-s-1', text: 'Établir des partenariats avec des artisans et guides locaux.', tags: ['Impact'] },
          { id: 'regenera-lodge-s-2', text: 'Proposer des conditions de travail et des salaires équitables, même en haute saison.', tags: ['Impact'] },
        ],
      },
      G: {
        kpis: [
          { text: 'Transparence totale sur les impacts environnementaux et sociaux des séjours.', tags: ['Impact'] },
          { text: 'Certification par un label de tourisme durable reconnu.', tags: ['Impact'] },
          { text: 'Politique d’achats responsables priorisant les fournisseurs locaux.', tags: ['Impact', 'Financière'] }
        ],
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
        kpis: [
          { text: 'Réduction de 40 % de l’empreinte carbone de la collectivité par habitant.', tags: ['Scope 3', 'Impact'] },
          { text: '50 % du budget d’investissement aligné avec les objectifs climatiques.', tags: ['Scope 1', 'Financière'] },
          { text: 'Préservation de 100 % des zones humides du territoire.', tags: ['Impact'] }
        ],
        actions: [
          { id: 'civic-e-1', text: 'Adopter et mettre en œuvre un Plan Climat Air Énergie Territorial (PCAET).', tags: ['Impact', 'Financière'] },
          { id: 'civic-e-2', text: 'Intégrer des critères environnementaux stricts dans 100 % des marchés publics.', tags: ['Scope 3', 'Impact'] },
          { id: 'civic-e-3', text: 'Lancer un programme de rénovation énergétique pour le patrimoine bâti public.', tags: ['Scope 1', 'Scope 2', 'Financière'] },
        ],
      },
      S: {
        kpis: [
          { text: 'Taux de participation citoyenne aux consultations > 10 %.', tags: ['Impact'] },
          { text: 'Accès garanti aux services publics essentiels pour tous les habitants.', tags: ['Impact'] },
          { text: 'Réduction des inégalités d’accès aux soins sur le territoire.', tags: ['Impact'] }
        ],
        actions: [
          { id: 'civic-s-1', text: 'Mettre en place un budget participatif annuel.', tags: ['Impact'] },
          { id: 'civic-s-2', text: 'Développer des politiques actives d’inclusion sociale (logement, éducation, santé).', tags: ['Impact'] },
        ],
      },
      G: {
        kpis: [
          { text: 'Niveau d’ouverture des données publiques > 80 % (Open Data).', tags: ['Impact'] },
          { text: 'Indice de confiance citoyenne dans l’institution en hausse continue.', tags: ['Impact'] },
          { text: 'Mise en place d’une commission de déontologie indépendante.', tags: ['Impact'] }
        ],
        actions: [
          { id: 'civic-g-1', text: 'Publier les décisions et les budgets en format ouvert et accessible.', tags: ['Impact'] },
          { id: 'civic-g-2', text: 'Instaurer des mécanismes de plainte et de suivi des engagements publics.', tags: ['Impact', 'Financière'] },
        ],
      },
    },
  },
];

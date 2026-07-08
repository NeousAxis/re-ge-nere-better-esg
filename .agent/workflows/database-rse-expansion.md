---
description: Plan d'expansion base de données RSE tous secteurs Suisse
---

# Expansion Base de Données RSE - Tous Secteurs Suisse

## Objectif
Créer une base de données RSE complète couvrant TOUS les domaines d'activité en Suisse (industrie, services, commerce, tech, finance, agro, etc.), pas uniquement le BTP.

## ✅ État d'avancement (implémenté 2026-07-07)

Un **premier socle d'indicateurs officiels, cantonaux et sectoriels** est livré, en code (pas encore en base PostgreSQL) :

- **Référentiel** : `constants/regions.ts` — **Cercle Indicateurs** (OFS/ARE, 32 indicateurs DD des cantons, 3 dimensions) + **MONET 2030** (fédéral) + **Projet de territoire Suisse**.
- **Cantons** : GE, VD, FR, VS, NE, JU + Confédération — plan directeur, objectif climat, **valeurs officielles chiffrées** (GES/hab., déchets kg/hab., taux de tri), sources officielles. NE/JU : valeurs numériques à compléter.
- **Secteurs** : les **12 secteurs** de l'app ont chacun un jeu d'indicateurs mesurables (repère → cible → ancrage cantonal), avec repères suisses reconnus (OFEV, OFS, SuisseEnergie, United Against Waste, Bio Suisse, SDEA, Swiss Sustainable Finance…).
- **UX** : `components/CantonIndicators.tsx` — le canton est demandé **après le questionnaire** (sélecteur explicite, stocké dans `AssessmentData.canton`) ; aucun indicateur tant que le canton n'est pas choisi.
- **IA** : le référentiel cantonal est injecté dans le prompt de support (`useChat.ts` → `buildRegionContext`).

**Reste à faire** vs ce plan : migration vers une vraie base (schéma ci-dessous), classification NOGA, mapping réglementaire CO 964a-j automatisé, benchmarks Positive Project / B Lab, embeddings RAG, compléter NE/JU.

## Sources Fédérales Transversales

### 1. SECO (Secrétariat d'État à l'économie)
- **CSR Risk Check** : Auto-évaluation gratuite pour diagnostic RSE par secteur
- **Plan d'action national RSE 2024+** : Référentiel fédéral
- URL : https://www.seco.admin.ch/seco/fr/home/Arbeit/Personenfreizugigkeit_Arbeitsbeziehungen/Gesellschaftliche_Verantwortung_der_Unternehmen.html

### 2. OFEV (Office fédéral de l'environnement)
- Indicateurs environnementaux sectoriels
- URL : https://www.bafu.admin.ch/

### 3. Agenda 2030 Suisse
- Implémentation des 17 ODD par secteur
- URL : https://www.eda.admin.ch/agenda2030

### 4. B Lab Switzerland
- **SDG Action Manager** : Alignement ODD pour PME tous secteurs
- **B Impact Assessment** : Évaluation impact pour certification B Corp
- URL : https://www.blab.ch/

### 5. Positive Project
- Rapports durabilité entreprises suisses
- Analyse anti-greenwashing
- URL : https://positiveproject.ch/

## Cadre Réglementaire 2026

### Code des Obligations (CO)
- **Art. 964a-j** : Reporting durabilité "comply or explain"
- **Art. 964j** : Diligence raisonnable minerais/métaux de conflit
- **Révision 2026** : Seuils potentiels à 250 employés (alignement CSRD)

### Influence CSRD/ESRS
- Entreprises >1000 employés
- Filiales d'entreprises UE
- Standards ESRS adaptés au contexte suisse

## Structure Base de Données

### Schéma PostgreSQL Proposé

```sql
CREATE TABLE sectors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code_noga VARCHAR(10), -- Classification NOGA (Nomenclature Générale des Activités)
    parent_sector_id INTEGER REFERENCES sectors(id)
);

CREATE TABLE regulatory_requirements (
    id SERIAL PRIMARY KEY,
    sector_id INTEGER REFERENCES sectors(id),
    requirement_type VARCHAR(50), -- 'federal', 'cantonal', 'voluntary'
    source VARCHAR(255), -- 'CO 964a', 'CSRD', 'OCDE'
    description TEXT,
    threshold_employees INTEGER,
    applies_from DATE
);

CREATE TABLE rse_indicators (
    id SERIAL PRIMARY KEY,
    category VARCHAR(10), -- 'E', 'S', 'G'
    subcategory VARCHAR(100), -- 'emissions', 'working_conditions', 'governance'
    name VARCHAR(255),
    unit VARCHAR(50),
    calculation_method TEXT,
    data_source VARCHAR(255)
);

CREATE TABLE sector_indicators (
    sector_id INTEGER REFERENCES sectors(id),
    indicator_id INTEGER REFERENCES rse_indicators(id),
    relevance_score INTEGER, -- 1-10
    mandatory BOOLEAN,
    PRIMARY KEY (sector_id, indicator_id)
);

CREATE TABLE benchmark_companies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    sector_id INTEGER REFERENCES sectors(id),
    size VARCHAR(50), -- 'micro', 'pme', 'large'
    maturity_level VARCHAR(50), -- 'discovering', 'progressing', 'committed', 'leader'
    source VARCHAR(255), -- 'Positive Project', 'B Corp', etc.
    data JSONB -- Stockage flexible des KPIs et actions
);

CREATE TABLE odd_mapping (
    id SERIAL PRIMARY KEY,
    odd_number INTEGER, -- 1-17
    sector_id INTEGER REFERENCES sectors(id),
    relevance VARCHAR(50), -- 'high', 'medium', 'low'
    examples TEXT[]
);
```

### Tags Sectoriels (Classification NOGA)

```json
{
  "A": "Agriculture, sylviculture et pêche",
  "B": "Industries extractives",
  "C": "Industrie manufacturière",
  "D": "Production et distribution d'électricité, de gaz, de vapeur et d'air conditionné",
  "E": "Production et distribution d'eau; assainissement, gestion des déchets",
  "F": "Construction",
  "G": "Commerce",
  "H": "Transports et entreposage",
  "I": "Hébergement et restauration",
  "J": "Information et communication",
  "K": "Activités financières et d'assurance",
  "L": "Activités immobilières",
  "M": "Activités spécialisées, scientifiques et techniques",
  "N": "Activités de services administratifs et de soutien",
  "O": "Administration publique",
  "P": "Enseignement",
  "Q": "Santé humaine et action sociale",
  "R": "Arts, spectacles et activités récréatives",
  "S": "Autres activités de services"
}
```

## Collecte de Données par Domaine

### Tous Secteurs
- **Diagnostic** : SECO CSR Risk Check
- **Conformité** : CO 964a-j, diligence raisonnable
- **ODD** : Agenda 2030 suisse
- **Benchmarks** : Positive Project

### Industrie / Manufacturing (C)
- **Spécifique** : Swissmem (association patronale)
- **Focus** : Innovation durable, chaîne d'approvisionnement, économie circulaire
- **Indicateurs** : Émissions scopes 1-3, gestion déchets, certifications ISO 14001

### Tech / Information (J)
- **Spécifique** : Swiss ICT, Digital Switzerland
- **Focus** : Impact numérique, data centers, e-waste
- **Indicateurs** : Consommation énergétique IT, protection données, diversité tech

### Services / PME (G, M, N)
- **Spécifique** : FER-GE auto-évaluation, B Lab SDG Action Manager
- **Focus** : Maturité RSE, actions ODD pragmatiques
- **Indicateurs** : Conditions travail, formation, mobilité collaborateurs

### Finance / Assurance (K)
- **Spécifique** : Swiss Sustainable Finance, FINMA
- **Focus** : Finance durable, investissements ESG, anti-blanchiment
- **Indicateurs** : Portefeuille vert, exclusions sectorielles, transparence fiscale

### Commerce / Retail (G)
- **Spécifique** : Positive Project, labels (Max Havelaar, Bio Suisse)
- **Focus** : Chaîne approvisionnement,  anti-greenwashing
- **Indicateurs** : Sourcing responsable, emballages, traçabilité

### Agriculture / Agro (A)
- **Spécifique** : OFAG, Bio Suisse
- **Focus** : Biodiversité, gestion eau, bien-être animal
- **Indicateurs** : Pesticides, rotation cultures, certification bio

## APIs et Outils Techniques

### 1. Swiss Triple Impact
- API ouverte pour évaluation contribution ODD
- https://www.b-lab.ch/triple-impact
- Format JSON, embeddings-ready

### 2. OpenData.swiss
- Données publiques fédérales/cantonales
- Statistiques sectorielles
- https://opendata.swiss/

### 3. Embeddings Sectoriels
```python
# Exemple structure pour RAG
{
  "query": "RSE secteur pharmaceutique Suisse",
  "context": {
    "sector": "C21 - Industrie pharmaceutique",
    "regulations": ["CO 964a", "Swissmedic ethical guidelines"],
    "priority_topics": ["supply_chain_transparency", "clinical_trials_ethics", "access_to_medicines"],
    "benchmarks": ["Novartis", "Roche"],
    "odd_priorities": [3, 9, 12]
  }
}
```

## Plan d'Action

### Phase 1 : Structuration (2 semaines)
1. Créer schéma DB PostgreSQL/Supabase
2. Importer classification NOGA complète
3. Mapper réglementations par secteur

### Phase 2 : Population (1 mois)
1. Scraping Positive Project (rapports publics)
2. Intégration API Swiss Triple Impact
3. Import benchmarks SECO/Swissmem/B Lab
4. Validation données avec experts RSE

### Phase 3 : IA-Ready (2 semaines)
1. Génération embeddings pour RAG
2. Prompts sectoriels (ex. "Si secteur=pharma, focus éthique R&D")
3. Testing comply-or-explain automatique
4. Interface admin pour mises à jour

### Phase 4 : Maintenance Continue
- Mise à jour annuelle post-révisions CO/CSRD
- Suivi évolutions réglementaires cantonales
- Ajout nouveaux benchmarks
- Feedback utilisateurs

## Ressources Documentaires

### Guides Officiels
- SECO : "Guide pratique RSE pour PME" (2023)
- OCDE : "Principes directeurs pour les entreprises multinationales" (2023)
- GRI Standards : Reporting universel

### Formations
- FER-GE : Ateliers RSE Genève
- Swiss Triple Impact : Webinaires ODD
- B Lab : Certification B Corp

### Veille
- Newsletter SECO RSE (mensuelle)
- Swiss Sustainable Finance (trimestrielle)
- Positive Project insights (hebdo)

## Notes Importantes

### Greenwashing
- Critères stricts pour validation benchmarks
- Vérification tierce partie (ex. audits SQS)
- Transparence méthodologie calculs

### Multilinguisme
- Toutes données FR/DE/EN minimum
- Termes techniques harmonisés (CSRD/ESRS)

### Privacy
- Anonymisation données sensibles
- Conformité LPD (Loi fédérale sur la protection des données)

---

**Status** : Socle indicateurs cantonaux + 12 secteurs **implémenté en code** (`constants/regions.ts`) ; migration base de données à venir
**Prochaine étape** : Compléter valeurs NE/JU · migration schéma DB · classification NOGA · benchmarks Positive Project / B Lab

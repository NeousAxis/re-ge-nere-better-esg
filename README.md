<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# re-GE-nere — Feuille de route RSE / ESG pour les entreprises suisses

**re-GE-nere** est une plateforme d'auto-évaluation RSE/ESG destinée aux PME suisses qui débutent leur démarche de durabilité. Elle réalise un **diagnostic conversationnel** (assisté par IA), en déduit une **feuille de route E/S/G** (indicateurs + actions concrètes), et propose des **indicateurs cantonaux et fédéraux officiels et chiffrés** selon le canton et le secteur de l'entreprise.

> ⚠️ Les informations saisies sont déclaratives et ne constituent pas une labellisation. La plateforme vise à aider au démarrage d'une démarche RSE, pas à certifier une entreprise.

## Fonctionnalités

- **Diagnostic conversationnel** (14 questions, une à une) qui qualifie le profil : secteur, taille, activité, territoire, matérialité d'impact et financière (double matérialité), énergie, chaîne de valeur, maturité.
- **Tableau de bord E/S/G** : score de maturité par pilier + actions SMART personnalisées (générées via Gemini) et indicateurs de référence.
- **Roadmap** : suivi des actions dans le temps.
- **Indicateurs du canton** *(nouveau)* : après le diagnostic, l'utilisateur indique son **canton** et obtient des indicateurs **officiels, clairs et chiffrés** issus des **plans directeurs cantonaux** et du **Cercle Indicateurs** (OFS/ARE), déclinés pour **les 12 secteurs** de l'app.
- **Conseiller IA** : chatbot expert RSE contextualisé (réglementation CO art. 964, CSRD/ESRS, ODD) + référentiel cantonal injecté.
- **Bilingue** FR / EN.

## Indicateurs cantonaux & fédéraux

Fondés sur les référentiels **officiels** suisses (rien n'est inventé ; les valeurs non confirmées sont omises) :

- **Cercle Indicateurs** (OFS + ARE + OFEV + OFSP) — 32 indicateurs de développement durable des cantons, sur 3 dimensions (Environnement / Économie / Société).
- **MONET 2030** (OFS) — système fédéral (~109 indicateurs alignés sur les 17 ODD) + **Projet de territoire Suisse**.
- **7 régions** : Genève, Vaud, Fribourg, Valais, Neuchâtel, Jura + Confédération, chacune avec son plan directeur, son objectif climat et ses **valeurs officielles chiffrées** (émissions GES/hab., déchets kg/hab., taux de tri…).
- **12 jeux d'indicateurs sectoriels** (énergie, agriculture, industrie, construction, transport, tech, finance, commerce, santé, éducation, tourisme/hôtellerie, secteur public) : chaque indicateur = **repère → cible → ancrage cantonal**, avec des repères suisses reconnus.

Tout le référentiel vit dans [`constants/regions.ts`](constants/regions.ts) (bilingue, sources officielles) et s'affiche via [`components/CantonIndicators.tsx`](components/CantonIndicators.tsx).

## Architecture

```
App.tsx                     Orchestrateur (auth → diagnostic → résultats + chatbot)
components/
  AssessmentChat.tsx        Diagnostic conversationnel (quick-replies depuis les tags [OPTIONS_*])
  ResultsDisplay.tsx        Onglets : Tableau de bord · Indicateurs du canton · Roadmap · Bilan · Référence
  CantonIndicators.tsx      Sélecteur de canton + indicateurs cantonaux/sectoriels chiffrés
  PillarCard, TimelineView, Chatbot, …
constants/
  regions.ts                Cercle Indicateurs + 7 régions + 12 secteurs (référentiel officiel)
  data-fr.ts / data-en.ts   Entreprises « modèles » par secteur (E/S/G, KPIs, actions)
  prompts.ts                Prompts système IA (diagnostic + support), FR/EN
hooks/
  useAssessment.ts          Chargement/sauvegarde (Firestore + démo localStorage), génération d'actions
  useChat.ts                Sessions Gemini (diagnostic & support), injection du contexte cantonal
  useAuth.ts                Firebase Auth (+ bypass démo)
context/LanguageContext.tsx i18n
```

**Capture du canton** : le diagnostic capte le **secteur** ; le **canton est demandé après le questionnaire** via un sélecteur explicite (déterministe, pas via l'IA) et stocké dans `AssessmentData.canton`. Aucun indicateur cantonal ne s'affiche tant que le canton n'est pas renseigné.

## Stack

React 19 · Vite 6 · TypeScript · Firebase (Auth + Firestore) · Google Gemini (`@google/genai`) · Tailwind (classes utilitaires).

## Lancer en local

**Prérequis :** Node.js

1. Installer les dépendances : `npm install`
2. Renseigner `GEMINI_API_KEY` dans [.env.local](.env.local)
3. Lancer : `npm run dev` → **http://localhost:3000**
4. Build de production : `npm run build`

**Accès démo** (sans Firebase/Gemini) : login `demo@re-ge-nere.com` / `123456`. Les données de démo sont persistées en `localStorage` (`better_esg_demo_data`).

View your app in AI Studio: https://ai.studio/apps/drive/1lC5JEh2CNzlUsABHTmkreA56kmgQ-314

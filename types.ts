
export type ActionTag = 'Scope 1' | 'Scope 2' | 'Scope 3' | 'Impact' | 'Financière';

export type ActionStatus = 'not_started' | 'in_progress' | 'completed';

export interface Action {
  id: string;
  text: string;
  tags: ActionTag[];
  dueDate?: string;
  completionPercentage?: number;
}

export interface KPI {
  text: string;
  tags?: ActionTag[];
}

export interface Pillar {
  kpis: KPI[];
  actions: Action[];
}

export interface ModelCompany {
  id: number;
  name: string;
  sector: string;
  subSectors?: string[];
  profile: string;
  pillars: {
    E: Pillar;
    S: Pillar;
    G: Pillar;
  };
}

export interface User {
  uid: string;
  email: string;
}

export interface FormData {
  sector: string;
  size: string;
  activityDescription: string;
  territory: string;
  supplyChain: string;
  workforceOrigin: string;
  impactMaterialityE: string[];
  impactMaterialityS: string[];
  impactMaterialityG: string[];
  financialMaterialityRisk: string[];
  financialMaterialityOpportunity: string[];
  energyConsumption: string[];
  valueChainImpact: string[];
  maturity: string;
}

export interface UserAction {
  text: string;
  status: ActionStatus;
  pillar: 'E' | 'S' | 'G';
  tags: ActionTag[];
  dueDate?: string;
  completionPercentage?: number;
}

export interface AssessmentData {
  formData: FormData;
  userActions: Record<string, UserAction>;
  customModel?: ModelCompany;
  pillarScores: {
    E: number;
    S: number;
    G: number;
  };
}

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

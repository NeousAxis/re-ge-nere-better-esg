
import { useState, useEffect, useCallback } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { GoogleGenAI, Type } from "@google/genai";
import { db } from '../firebaseConfig';
import { AssessmentData, ActionStatus, ModelCompany, FormData, UserAction, User, Action } from '../types';
import { MODEL_COMPANIES as MODEL_COMPANIES_FR } from '../constants/data-fr';
import { MODEL_COMPANIES as MODEL_COMPANIES_EN } from '../constants/data-en';
import { prompts } from '../constants/prompts';

const getAI = () => {
  try {
    return new GoogleGenAI({ apiKey: process.env.API_KEY as string });
  } catch (e) {
    console.warn("AI Client init failed", e);
    return null;
  }
}

const actionSchema = {
  type: Type.OBJECT,
  properties: {
    id: { type: Type.STRING, description: "A unique identifier for the action." },
    text: { type: Type.STRING, description: "Detailed description of the action." },
    tags: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
        enum: ['Scope 1', 'Scope 2', 'Scope 3', 'Impact', 'Financière']
      }
    },
    dueDate: { type: Type.STRING, description: "Suggested due date (YYYY-MM-DD)." }
  },
  required: ['id', 'text', 'tags']
};

export const useAssessment = (user: User | null, lang: 'fr' | 'en') => {
  const [assessment, setAssessment] = useState<AssessmentData | null>(null);
  const [matchedCompany, setMatchedCompany] = useState<ModelCompany | null>(null);
  const [loading, setLoading] = useState(true);

  const MODEL_COMPANIES = lang === 'fr' ? MODEL_COMPANIES_FR : MODEL_COMPANIES_EN;

  useEffect(() => {
    let mounted = true;

    const loadAssessment = async () => {
      if (!mounted) return;
      setLoading(true);

      try {
        if (user) {
          if (user.uid === 'demo-user-123') {
            try {
              const stored = localStorage.getItem('better_esg_demo_data');
              if (stored) {
                const data = JSON.parse(stored) as AssessmentData;
                const company = MODEL_COMPANIES.find(c => c.sector === data.formData.sector) || null;
                setAssessment(data);
                setMatchedCompany(company);
              } else {
                setAssessment(null);
                setMatchedCompany(null);
              }
            } catch (e) {
              console.error("Error loading local demo data", e);
            }
          } else {
            try {
              if (db && typeof getDoc === 'function') {
                const docRef = doc(db, 'assessments', user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                  const data = docSnap.data() as AssessmentData;
                  const company = MODEL_COMPANIES.find(c => c.sector === data.formData.sector) || null;
                  setAssessment(data);
                  setMatchedCompany(company);
                } else {
                  setAssessment(null);
                  setMatchedCompany(null);
                }
              }
            } catch (error) {
              console.error("Failed to load from Firestore", error);
              setAssessment(null);
              setMatchedCompany(null);
            }
          }
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadAssessment();
    return () => { mounted = false; };
  }, [user, MODEL_COMPANIES]);

  const saveAssessment = useCallback(async (data: AssessmentData) => {
    setAssessment(data);
    if (user) {
      if (user.uid === 'demo-user-123') {
        localStorage.setItem('better_esg_demo_data', JSON.stringify(data));
        return;
      }
      try {
        if (db) {
          const docRef = doc(db, 'assessments', user.uid);
          await setDoc(docRef, data);
        }
      } catch (error) {
        console.error("Error saving assessment:", error);
      }
    }
  }, [user]);

  const generatePersonalizedActions = async (formData: FormData, company: ModelCompany): Promise<Record<string, UserAction>> => {
    const aiClient = getAI();
    if (!aiClient) return {};

    const prompt = prompts[lang].GENERATE_ACTIONS_PROMPT
      .replace('{{sector}}', formData.sector)
      .replace('{{activityDescription}}', formData.activityDescription)
      .replace('{{size}}', formData.size)
      .replace('{{maturity}}', formData.maturity)
      .replace('{{companyName}}', company.name)
      .replace('{{e_kpis}}', company.pillars.E.kpis.join('; '))
      .replace('{{e_actions}}', company.pillars.E.actions.map(a => a.text).join('; '))
      .replace('{{s_kpis}}', company.pillars.S.kpis.join('; '))
      .replace('{{s_actions}}', company.pillars.S.actions.map(a => a.text).join('; '))
      .replace('{{g_kpis}}', company.pillars.G.kpis.join('; '))
      .replace('{{g_actions}}', company.pillars.G.actions.map(a => a.text).join('; '));

    try {
      const result = await aiClient.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt + "\nProvide at least 3 high-quality, industry-specific KPIs per pillar. For actions, provide a suggested 'dueDate' in YYYY-MM-DD format within the next 12-24 months.",
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              E: {
                type: Type.OBJECT,
                properties: {
                  kpis: { type: Type.ARRAY, items: { type: Type.STRING } },
                  actions: { type: Type.ARRAY, items: actionSchema }
                }
              },
              S: {
                type: Type.OBJECT,
                properties: {
                  kpis: { type: Type.ARRAY, items: { type: Type.STRING } },
                  actions: { type: Type.ARRAY, items: actionSchema }
                }
              },
              G: {
                type: Type.OBJECT,
                properties: {
                  kpis: { type: Type.ARRAY, items: { type: Type.STRING } },
                  actions: { type: Type.ARRAY, items: actionSchema }
                }
              }
            }
          }
        }
      });

      const aiResponse = JSON.parse(result.text);

      company.pillars.E = aiResponse.E;
      company.pillars.S = aiResponse.S;
      company.pillars.G = aiResponse.G;

      const initialUserActions: Record<string, UserAction> = {};
      Object.entries(aiResponse).forEach(([pillarKey, pillarData]) => {
        (pillarData as { actions: Action[] }).actions.forEach(action => {
          initialUserActions[action.id] = {
            text: action.text,
            status: 'not_started',
            pillar: pillarKey as 'E' | 'S' | 'G',
            tags: action.tags,
            dueDate: action.dueDate || new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          };
        });
      });
      return initialUserActions;
    } catch (error) {
      console.error("AI action generation failed.", error);
      const initialUserActions: Record<string, UserAction> = {};
      Object.entries(company.pillars).forEach(([pillarKey, pillar]) => {
        pillar.actions.forEach(action => {
          initialUserActions[action.id] = {
            text: action.text,
            status: 'not_started',
            pillar: pillarKey as 'E' | 'S' | 'G',
            tags: action.tags,
            dueDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          };
        });
      });
      return initialUserActions;
    }
  };

  const handleFindBenchmark = useCallback(async (formData: FormData) => {
    if (user) {
      setLoading(true);
      try {
        const company = JSON.parse(JSON.stringify(MODEL_COMPANIES.find(c => c.sector === formData.sector) || MODEL_COMPANIES[0]));
        const initialUserActions = await generatePersonalizedActions(formData, company);
        setMatchedCompany(company);
        await saveAssessment({ formData, userActions: initialUserActions });
      } finally {
        setLoading(false);
      }
    }
  }, [user, saveAssessment, MODEL_COMPANIES, lang]);

  const handleUpdateActionStatus = useCallback(async (actionId: string, status: ActionStatus) => {
    if (assessment) {
      const newActions = { ...assessment.userActions };
      if (newActions[actionId]) {
        newActions[actionId] = { ...newActions[actionId], status };
        await saveAssessment({ ...assessment, userActions: newActions });
      }
    }
  }, [assessment, saveAssessment]);

  const handleUpdateActionText = useCallback(async (actionId: string, text: string) => {
    if (assessment) {
      const newActions = { ...assessment.userActions };
      if (newActions[actionId]) {
        newActions[actionId] = { ...newActions[actionId], text };
        await saveAssessment({ ...assessment, userActions: newActions });
      }
    }
  }, [assessment, saveAssessment]);

  const handleUpdateActionDate = useCallback(async (actionId: string, dueDate: string) => {
    if (assessment) {
      const newActions = { ...assessment.userActions };
      if (newActions[actionId]) {
        newActions[actionId] = { ...newActions[actionId], dueDate };
        await saveAssessment({ ...assessment, userActions: newActions });
      }
    }
  }, [assessment, saveAssessment]);

  const handleDeleteAction = useCallback(async (actionId: string) => {
    if (assessment) {
      const newActions = { ...assessment.userActions };
      delete newActions[actionId];
      await saveAssessment({ ...assessment, userActions: newActions });
    }
  }, [assessment, saveAssessment]);

  const handleCreateAction = useCallback(async (pillar: 'E' | 'S' | 'G') => {
    if (assessment) {
      const newActionId = `user_${Date.now()}`;
      const newAction: UserAction = {
        text: lang === 'fr' ? "Nouvelle action à définir..." : "New action to be defined...",
        status: 'not_started',
        pillar: pillar,
        tags: [],
        dueDate: new Date().toISOString().split('T')[0]
      };
      const newActions = { ...assessment.userActions, [newActionId]: newAction };
      await saveAssessment({ ...assessment, userActions: newActions });
    }
  }, [assessment, saveAssessment, lang]);

  return {
    assessment,
    matchedCompany,
    loading,
    handleFindBenchmark,
    handleUpdateActionStatus,
    handleUpdateActionText,
    handleUpdateActionDate,
    handleCreateAction,
    handleDeleteAction
  };
};

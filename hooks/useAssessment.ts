
import { useState, useEffect, useCallback } from 'react';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
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


    // Helper to migrate legacy string KPIs to objects
    // Helper to migrate legacy string KPIs to objects
    const normalizeCompany = (c: ModelCompany): ModelCompany => {
      const copy = JSON.parse(JSON.stringify(c));
      ['E', 'S', 'G'].forEach((p) => {
        const pillar = p as 'E' | 'S' | 'G';
        if (copy.pillars[pillar]?.kpis) {
          copy.pillars[pillar].kpis = copy.pillars[pillar].kpis.map((k: any) =>
            typeof k === 'string' ? { text: k, tags: [] } : k
          );
        }
      });
      return copy;
    };

    // Helper to prefer fresh code-defined models over stale stored ones
    const getFreshModel = (data: AssessmentData): ModelCompany | null => {
      // 1. Try to find by ID in the fresh constants
      if (data.customModel?.id) {
        const fresh = MODEL_COMPANIES.find(c => c.id === data.customModel!.id);
        if (fresh) return JSON.parse(JSON.stringify(fresh));
      }

      // 2. Try to find by sector in the fresh constants
      if (data.formData?.sector) {
        const fresh = MODEL_COMPANIES.find(c => c.sector === data.formData.sector);
        if (fresh) return JSON.parse(JSON.stringify(fresh));
      }

      // 3. Fallback to stored custom model (normalized)
      if (data.customModel) {
        return normalizeCompany(data.customModel);
      }

      return null;
    };

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
                const company = getFreshModel(data);
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
                  const company = getFreshModel(data);
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
      .replace('{{e_kpis}}', company.pillars.E.kpis.map(k => k.text).join('; '))
      .replace('{{e_actions}}', company.pillars.E.actions.map(a => a.text).join('; '))
      .replace('{{s_kpis}}', company.pillars.S.kpis.map(k => k.text).join('; '))
      .replace('{{s_actions}}', company.pillars.S.actions.map(a => a.text).join('; '))
      .replace('{{g_kpis}}', company.pillars.G.kpis.map(k => k.text).join('; '))
      .replace('{{g_actions}}', company.pillars.G.actions.map(a => a.text).join('; '));

    try {
      const kpiSchema = {
        type: Type.OBJECT,
        properties: {
          text: { type: Type.STRING },
          tags: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ['text', 'tags']
      };

      const result = await aiClient.models.generateContent({
        model: 'gemini-2.0-flash-exp', // Using flash for speed/cost, reverting to pro if needed
        contents: prompt,
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
              },
              E_REF: {
                type: Type.OBJECT,
                properties: { kpis: { type: Type.ARRAY, items: kpiSchema } }
              },
              S_REF: {
                type: Type.OBJECT,
                properties: { kpis: { type: Type.ARRAY, items: kpiSchema } }
              },
              G_REF: {
                type: Type.OBJECT,
                properties: { kpis: { type: Type.ARRAY, items: kpiSchema } }
              }
            }
          }
        }
      });

      const aiResponse = JSON.parse(result.text);

      // SET 1: Update Reference Company with "Ideal" KPIs (E_REF, etc.)
      // Expecting objects { text, tags } now from AI
      if (aiResponse.E_REF?.kpis) company.pillars.E.kpis = aiResponse.E_REF.kpis;
      if (aiResponse.S_REF?.kpis) company.pillars.S.kpis = aiResponse.S_REF.kpis;
      if (aiResponse.G_REF?.kpis) company.pillars.G.kpis = aiResponse.G_REF.kpis;

      // SET 2: Generate User Actions (Standard Good Student)
      const initialUserActions: Record<string, UserAction> = {};
      const pillars = ['E', 'S', 'G'] as const;

      pillars.forEach(p => {
        if (aiResponse[p]?.actions) {
          aiResponse[p].actions.forEach((action: Action) => {
            initialUserActions[action.id] = {
              text: action.text,
              status: 'not_started',
              pillar: p,
              tags: action.tags,
              dueDate: action.dueDate || new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            };
          });
        }
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
        await saveAssessment({ formData, userActions: initialUserActions, customModel: company });
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

  const handleUpdateActionCompletion = useCallback(async (actionId: string, completionPercentage: number) => {
    if (assessment) {
      const newActions = { ...assessment.userActions };
      if (newActions[actionId]) {
        newActions[actionId] = { ...newActions[actionId], completionPercentage };
        await saveAssessment({ ...assessment, userActions: newActions });
        // Auto-recalculate scores when completion changes
        setTimeout(() => recalculateScores(), 500);
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

  const handleUpdateKpi = useCallback(async (pillar: 'E' | 'S' | 'G', index: number, text: string) => {
    if (assessment && matchedCompany) {
      const newCompany = JSON.parse(JSON.stringify(matchedCompany)); // Deep copy to be safe
      newCompany.pillars[pillar].kpis[index].text = text;
      setMatchedCompany(newCompany);

      await saveAssessment({
        ...assessment,
        customModel: newCompany
      });
    }
  }, [assessment, matchedCompany, saveAssessment]);


  const recalculateScores = async () => {
    if (!assessment || !user) return;

    const ai = getAI();
    if (!ai) return;

    try {
      setLoading(true);
      const model = (ai as any).getGenerativeModel({ model: "gemini-2.0-flash-exp" });

      const template = prompts[lang].RECALCULATE_SCORES_PROMPT;
      const userActionsList = Object.entries(assessment.userActions).map(([uid, act]) => {
        const action = act as UserAction;
        return `- [${action.pillar}] (${action.status} - ${action.completionPercentage || 0}%): ${action.text}`;
      }).join('\n');

      const prompt = template
        .replace('{{baseScores}}', JSON.stringify(assessment.pillarScores))
        .replace('{{sector}}', assessment.formData.sector)
        .replace('{{userActions}}', userActionsList);

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);

      if (jsonMatch) {
        const newScores = JSON.parse(jsonMatch[0]);

        const updatedScores = {
          E: newScores.E || assessment.pillarScores.E,
          S: newScores.S || assessment.pillarScores.S,
          G: newScores.G || assessment.pillarScores.G
        };

        // Logic to persist is already in saveAssessment
        await saveAssessment({
          ...assessment,
          pillarScores: updatedScores
        });
      }
    } catch (e) {
      console.error("Recalculation failed", e);
      setLoading(false);
    }
  };

  const resetAssessment = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      if (user.uid === 'demo-user-123') {
        localStorage.removeItem('better_esg_demo_data');
        setAssessment(null);
        setMatchedCompany(null);
      } else {
        if (db) {
          const docRef = doc(db, 'assessments', user.uid);
          await deleteDoc(docRef);
        }
      }
    } catch (e) {
      console.error("Reset failed", e);
    } finally {
      setLoading(false);
    }
    // Force local state clear
    setAssessment(null);
    setMatchedCompany(null);
  }, [user]);

  return {
    assessment,
    matchedCompany,
    loading,
    handleFindBenchmark,
    handleUpdateActionStatus,
    handleUpdateActionText,
    handleUpdateActionDate,
    handleUpdateActionCompletion,
    handleCreateAction,
    handleDeleteAction,
    handleUpdateKpi,
    recalculateScores,
    resetAssessment
  };
};

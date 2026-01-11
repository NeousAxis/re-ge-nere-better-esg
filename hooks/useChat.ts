
import { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat, Content } from "@google/genai";
import { ChatMessage, AssessmentData, ModelCompany, FormData } from '../types';
import { MODEL_COMPANIES as MODEL_COMPANIES_FR } from '../constants/data-fr';
import { MODEL_COMPANIES as MODEL_COMPANIES_EN } from '../constants/data-en';
import { prompts } from '../constants/prompts';

// Lazy init
const getAI = () => {
    try {
        return new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    } catch (e) {
        console.warn("AI Client init failed", e);
        return null;
    }
}

interface ChatOptionsAssessment {
    mode: 'assessment';
    onAssessmentComplete: (formData: FormData) => void;
}

interface ChatOptionsSupport {
    mode: 'support';
    assessment: AssessmentData;
    modelCompany: ModelCompany;
}

type ChatOptions = (ChatOptionsAssessment | ChatOptionsSupport) & { lang: 'fr' | 'en' };

export const useChat = (options: ChatOptions) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const chatRef = useRef<Chat | null>(null);

    const { lang } = options;
    const MODEL_COMPANIES = lang === 'fr' ? MODEL_COMPANIES_FR : MODEL_COMPANIES_EN;

    const initializeChat = useCallback((history: Content[] = []) => {
        const aiClient = getAI();
        if (!aiClient) return null;

        let systemInstruction = '';
        if (options.mode === 'assessment') {
            systemInstruction = prompts[lang].ASSESSMENT_SYSTEM_PROMPT
                .replace('{{SECTORS_LIST}}', MODEL_COMPANIES.map(c => `- ${c.sector}`).join('\n'));

            const newChat = aiClient.chats.create({
                model: 'gemini-2.5-flash',
                config: { systemInstruction },
                history,
            });
            chatRef.current = newChat;
            return newChat;
        } else {
            const { assessment, modelCompany } = options;
            const actionStatusSummary = Object.entries(assessment.userActions)
                .map(([id, action]) => `${action.text}: ${action.status}`)
                .join('; ');

            systemInstruction = prompts[lang].SUPPORT_SYSTEM_PROMPT
                .replace('{{sector}}', assessment.formData.sector)
                .replace('{{activityDescription}}', assessment.formData.activityDescription || '')
                .replace('{{size}}', assessment.formData.size)
                .replace('{{territory}}', assessment.formData.territory)
                .replace('{{supplyChain}}', assessment.formData.supplyChain)
                .replace('{{workforceOrigin}}', assessment.formData.workforceOrigin)
                .replace('{{impactMaterialityE}}', assessment.formData.impactMaterialityE.join(', '))
                .replace('{{impactMaterialityS}}', assessment.formData.impactMaterialityS.join(', '))
                .replace('{{impactMaterialityG}}', assessment.formData.impactMaterialityG.join(', '))
                .replace('{{financialMaterialityRisk}}', assessment.formData.financialMaterialityRisk.join(', '))
                .replace('{{financialMaterialityOpportunity}}', assessment.formData.financialMaterialityOpportunity.join(', '))
                .replace('{{energyConsumption}}', assessment.formData.energyConsumption.join(', '))
                .replace('{{valueChainImpact}}', assessment.formData.valueChainImpact.join(', '))
                .replace('{{maturity}}', assessment.formData.maturity)
                .replace('{{modelCompany}}', modelCompany.name)
                .replace('{{actionStatus}}', actionStatusSummary);

            const newChat = aiClient.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction,
                },
                history,
            });
            chatRef.current = newChat;
            return newChat;
        }
    }, [options, lang, MODEL_COMPANIES]);

    useEffect(() => {
        const startConversation = async () => {
            setIsLoading(true);
            const chat = chatRef.current ?? initializeChat();
            if (options.mode === 'assessment' && messages.length === 0) {
                const initialPrompt = lang === 'fr' ? "Bonjour, commençons le diagnostic." : "Hello, let's start the assessment.";
                if (chat) {
                    try {
                        const result = await chat.sendMessage({ message: initialPrompt });
                        const aiResponse = result.text;
                        setMessages([{ sender: 'ai', text: aiResponse }]);
                    } catch (e) {
                        console.error("Failed to send initial message", e);
                    }
                }
            } else if (options.mode === 'support' && messages.length === 0) {
                const greeting = lang === 'fr' ? 'Bonjour ! Comment puis-je vous aider avec votre bilan RSE ?' : 'Hello! How can I help you with your ESG assessment?';
                setMessages([{ sender: 'ai', text: greeting }]);
            }
            setIsLoading(false);
        };
        startConversation();
    }, [options.mode, initializeChat, messages.length, lang]);


    const sendMessage = useCallback(async (text: string) => {
        setIsLoading(true);
        setMessages(prev => [...prev, { sender: 'user', text }]);

        try {
            const chat = chatRef.current ?? initializeChat();
            if (!chat) throw new Error("Chat not initialized");

            // Create a minimum delay promise (e.g., 5s) to guarantee the user sees the typing animation
            const minDelay = new Promise(resolve => setTimeout(resolve, 5000));

            // Run the API call and the delay in parallel
            const [result] = await Promise.all([
                chat.sendMessage({ message: text }),
                minDelay
            ]);

            const aiResponse = result.text;

            if (options.mode === 'assessment' && aiResponse.includes('[ASSESSMENT_COMPLETE]')) {
                const parts = aiResponse.split('[ASSESSMENT_COMPLETE]');
                let jsonPart = parts[1].trim();

                const jsonMatch = jsonPart.match(/```json\s*([\s\S]*?)\s*```/);
                if (jsonMatch) {
                    jsonPart = jsonMatch[1];
                }

                try {
                    const formData = JSON.parse(jsonPart);
                    options.onAssessmentComplete(formData);
                } catch (e) {
                    console.error("Failed to parse assessment JSON", e, "Raw content:", jsonPart);
                    const errorMsg = lang === 'fr' ? "Une erreur est survenue lors de la finalisation du bilan." : "An error occurred while finalizing the assessment.";
                    setMessages(prev => [...prev, { sender: 'ai', text: errorMsg }]);
                }
            } else {
                setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
            }

        } catch (error) {
            console.error("Error sending message:", error);
            const errorMsg = lang === 'fr' ? "Désolé, une erreur est survenue. Veuillez réessayer." : "Sorry, an error occurred. Please try again.";
            setMessages(prev => [...prev, { sender: 'ai', text: errorMsg }]);
        } finally {
            setIsLoading(false);
        }
    }, [options, initializeChat, lang]);

    const goBack = useCallback(() => {
        if (options.mode !== 'assessment') return;
        setIsLoading(true);

        const lastUserMsgIdx = messages.map(m => m.sender).lastIndexOf('user');
        if (lastUserMsgIdx === -1) {
            setIsLoading(false);
            return;
        }

        const newUiMessages = messages.slice(0, lastUserMsgIdx);

        const newAiHistory = newUiMessages.map(msg => ({
            role: msg.sender === 'user' ? 'user' as const : 'model' as const,
            parts: [{ text: msg.text }],
        }));

        initializeChat(newAiHistory as Content[]);
        setMessages(newUiMessages);
        setIsLoading(false);

    }, [messages, options, initializeChat]);

    return { messages, isLoading, sendMessage, goBack };
};

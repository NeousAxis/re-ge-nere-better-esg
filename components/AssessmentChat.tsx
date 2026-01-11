import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../hooks/useChat';
import { FormData } from '../types';
import { useTranslation } from '../context/LanguageContext';

interface AssessmentChatProps {
    onComplete: (formData: FormData) => void;
}

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
    </svg>
);

const optionTags = {
    '[OPTIONS_SECTOR]': 'sector',
    '[OPTIONS_SIZE]': 'size',
    '[OPTIONS_TERRITORY]': 'territory',
    '[OPTIONS_SUPPLY_CHAIN]': 'supplyChain',
    '[OPTIONS_WORKFORCE]': 'workforceOrigin',
    '[OPTIONS_IMPACT_E]': 'impactMaterialityE',
    '[OPTIONS_IMPACT_S]': 'impactMaterialityS',
    '[OPTIONS_IMPACT_G]': 'impactMaterialityG',
    '[OPTIONS_RISK_F]': 'financialMaterialityRisk',
    '[OPTIONS_OPPORTUNITY_F]': 'financialMaterialityOpportunity',
    '[OPTIONS_ENERGY]': 'energyConsumption',
    '[OPTIONS_VALUE_CHAIN]': 'valueChainImpact',
    '[OPTIONS_MATURITY]': 'maturity',
} as const;

const multiSelectQuestionKeys: ((typeof optionTags)[keyof typeof optionTags])[] = [
    'impactMaterialityE', 'impactMaterialityS', 'impactMaterialityG', 'financialMaterialityRisk',
    'financialMaterialityOpportunity', 'energyConsumption', 'valueChainImpact'
];

export const AssessmentChat: React.FC<AssessmentChatProps> = ({ onComplete }) => {
    const { language, t } = useTranslation();
    const { messages, isLoading, sendMessage, goBack } = useChat({ mode: 'assessment', onAssessmentComplete: onComplete, lang: language });
    const [input, setInput] = useState('');
    const [quickReplyInfo, setQuickReplyInfo] = useState<{ type: keyof FormData | keyof typeof optionTags; options: string[] } | null>(null);
    const [currentSelections, setCurrentSelections] = useState<Set<string>>(new Set());

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(scrollToBottom, [messages]);

    useEffect(() => {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage?.sender === 'ai') {
            let foundOptions = false;
            for (const tag of Object.keys(optionTags)) {
                if (lastMessage.text.includes(tag)) {
                    const parts = lastMessage.text.split(tag);
                    const optionsText = parts[1].trim();
                    let options = optionsText.split('\n').map(o => o.replace(/^- /, '').trim()).filter(Boolean);

                    if (options.length > 0) {
                        setCurrentSelections(new Set()); // Reset selections for new question
                        setQuickReplyInfo({ type: optionTags[tag as keyof typeof optionTags], options });
                        foundOptions = true;
                        break;
                    }
                }
            }
            if (!foundOptions) {
                setQuickReplyInfo(null);
            }
        } else {
            setQuickReplyInfo(null);
        }
    }, [messages]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            sendMessage(input);
            setInput('');
        }
    };

    const handleQuickReplyClick = (reply: string) => {
        sendMessage(reply);
        setQuickReplyInfo(null);
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = e.target.value;
        if (selectedOption) {
            handleQuickReplyClick(selectedOption);
        }
    };

    const handleMultiSelectChange = (option: string, isChecked: boolean) => {
        setCurrentSelections(prev => {
            const newSet = new Set(prev);
            if (isChecked) {
                newSet.add(option);
            } else {
                newSet.delete(option);
            }
            return newSet;
        });
    };

    const handleMultiSelectSubmit = () => {
        if (currentSelections.size > 0) {
            sendMessage(Array.from(currentSelections).join(', '));
            setQuickReplyInfo(null);
        }
    };

    const isMultiSelect = quickReplyInfo && multiSelectQuestionKeys.includes(quickReplyInfo.type as any);
    const hasPreviousAnswer = messages.some(m => m.sender === 'user');
    const showIDKButtonFor = ['impactMaterialityE', 'impactMaterialityS', 'impactMaterialityG', 'financialMaterialityRisk', 'financialMaterialityOpportunity', 'energyConsumption', 'valueChainImpact'];


    return (
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-100 max-w-3xl mx-auto w-full flex flex-col flex-grow">
            <div className="text-center mb-6">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
                    {t('assessment.title')}
                </h1>
                <p className="mt-2 text-slate-600">
                    {t('assessment.subtitle')}
                </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-6 max-w-xl mx-auto w-full">
                <div className="flex justify-between items-end mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t('assessment.progress')}</span>
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                        {Math.min(messages.filter(m => m.sender === 'ai').length, 14)} / 14
                    </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-700 ease-out shadow-sm shadow-blue-200"
                        style={{ width: `${Math.min((messages.filter(m => m.sender === 'ai').length / 14) * 100, 100)}%` }}
                    ></div>
                </div>
            </div>

            <div className="flex-grow p-4 overflow-y-auto bg-slate-50 rounded-lg border border-slate-200">
                <div className="space-y-4">
                    {messages.map((msg, index) => {
                        let messageText = msg.text;
                        Object.keys(optionTags).forEach(tag => {
                            messageText = messageText.split(tag)[0].trim();
                        });
                        return (
                            <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.sender === 'ai' && <div className="brand-mark !w-8 !h-8 !text-xs !rounded-xl !shadow-md">B</div>}
                                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-slate-200 text-slate-800 rounded-bl-none'}`}>
                                    {messageText.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                                </div>
                            </div>
                        );
                    })}
                    {isLoading && (
                        <div className="flex items-end gap-2 justify-start">
                            <div className="brand-mark !w-8 !h-8 !text-xs !rounded-xl !shadow-md">B</div>
                            <div className="max-w-[85%] p-3 rounded-2xl bg-slate-200 text-slate-800 rounded-bl-none">
                                <div className="flex gap-1.5">
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-typing"></span>
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-typing" style={{ animationDelay: '200ms' }}></span>
                                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-typing" style={{ animationDelay: '400ms' }}></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            <div className="pt-4 flex-shrink-0">
                {hasPreviousAnswer && !isLoading && (
                    <div className="text-center pb-3">
                        <button onClick={goBack} className="text-sm text-blue-600 hover:underline font-semibold disabled:text-slate-400 disabled:no-underline" disabled={isLoading}>
                            {t('assessment.edit_previous_answer')}
                        </button>
                    </div>
                )}

                {isMultiSelect && quickReplyInfo && !isLoading && (
                    <div className="animate-fade-in-up space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {quickReplyInfo.options.map((option, index) => (
                                <label key={index} className="flex items-center p-3 bg-white border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 has-[:checked]:bg-blue-50 has-[:checked]:border-blue-400 transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={currentSelections.has(option)}
                                        onChange={(e) => handleMultiSelectChange(option, e.target.checked)}
                                        className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="ml-3 text-sm text-slate-700">{option}</span>
                                </label>
                            ))}
                            {showIDKButtonFor.includes(quickReplyInfo.type as any) && (
                                <label className="flex items-center p-3 bg-white border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 has-[:checked]:bg-blue-50 has-[:checked]:border-blue-400 transition-colors">
                                    <input
                                        type="checkbox"
                                        checked={currentSelections.has(t('assessment.idk_option'))}
                                        onChange={(e) => handleMultiSelectChange(t('assessment.idk_option'), e.target.checked)}
                                        className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="ml-3 text-sm text-slate-700">{t('assessment.idk_option')}</span>
                                </label>
                            )}
                        </div>
                        <button
                            onClick={handleMultiSelectSubmit}
                            disabled={currentSelections.size === 0}
                            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg disabled:bg-slate-300 hover:bg-blue-700 transition-colors"
                        >
                            {t('assessment.validate_button')}
                        </button>
                    </div>
                )}

                {!isMultiSelect && quickReplyInfo && !isLoading && (
                    <div className="animate-fade-in-up">
                        <select
                            defaultValue=""
                            onChange={handleSelectChange}
                            className="w-full p-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-700 appearance-none pr-10"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                backgroundPosition: 'right 0.75rem center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: '1.5em 1.5em',
                            }}
                        >
                            <option value="" disabled>{t('assessment.select_placeholder')}</option>
                            {quickReplyInfo.options.map((reply, index) => (
                                <option key={index} value={reply}>{reply}</option>
                            ))}
                        </select>
                    </div>
                )}

                <div className="mt-2">
                    <form onSubmit={handleSubmit} className="flex items-center gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={quickReplyInfo ? t('assessment.text_input_disabled_placeholder') : t('assessment.text_input_placeholder')}
                            className="w-full p-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-700 disabled:bg-slate-100 disabled:cursor-not-allowed"
                            disabled={isLoading || !!quickReplyInfo}
                        />
                        <button type="submit" disabled={isLoading || !input.trim() || !!quickReplyInfo} className="p-3 bg-blue-600 text-white rounded-lg disabled:bg-slate-300 hover:bg-blue-700 transition-colors">
                            <SendIcon />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
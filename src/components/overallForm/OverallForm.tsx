import React, { useEffect, useState } from 'react';
import ResultsForm from '../results/resultsForm/ResultsForm';
import CausesForm from '../causes/causesForm/CausesForm';
import OpenAI from 'openai';
import { aiInstructions } from '../../ai/ai-instructions';
import CauseCategoryForm from '../causes/causesForm/causeCategoryForm/CauseCategoryForm';
import { Cause, FishboneFormData } from '../../types/types';
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.AI_API_KEY,
    dangerouslyAllowBrowser: true,
});

interface OverallFormProps {
    setCauses: (causes: Cause[]) => void;
    setOutcome: (outcome: string) => void;
    causes: Cause[];
    fishBoneFormData: FishboneFormData;
};

const OverallForm: React.FC<OverallFormProps> = ( {setCauses, setOutcome, causes, fishBoneFormData}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [results, setResults] = useState<string>('');
    const [cause, setCause] = useState<string>('');
    const [aiRecommendation, setAiRecommendation] = useState<{ category: string, explanation: string}>({ category: '', explanation: '' });
    const [isResultsSubmitted, setIsResultsSubmitted] = useState<boolean>(false);
    const [isCauseSubmitted, setIsCauseSubmitted] = useState<boolean>(false);
    const [isCauseInputSubmitted, setIsCauseInputSubmitted] = useState<boolean>(false);
    const [isCategorySubmitted, setIsCategorySubmitted] = useState<boolean>(false);

    useEffect(() => {
        if (isCauseSubmitted) {
            setIsCauseInputSubmitted(false);
            setIsCategorySubmitted(false);
            setCause('');
            setAiRecommendation({ category: '', explanation: '' });
            setIsCauseSubmitted(false);
        };
    }, [isCauseSubmitted]);

    const handleResultsSubmit = (results: string) => {
        setIsResultsSubmitted(true);
        setOutcome(results);
        setResults(results);
    };

    const handleCauseInputSubmit = (cause: string) => {
        setIsCauseInputSubmitted(true);
        setCause(cause);
        interactWithAssistant(cause);
    };

    const handleEntireCauseSubmit = (causeCategory: string) => {
        const newCause: Cause = { reason: cause, category: causeCategory };

        setCauses([...causes, newCause]);
        setIsCauseSubmitted(true);
    };

    async function interactWithAssistant(causeExplanation: string) {
        if (!openai) return;

        setIsLoading(true);

        try {
            // 1. Create a thread
            const conversation = await openai.conversations.create({
                items: [{"role": "user", "content": `Outcome: ${results}, Cause: ${causeExplanation}`}],
                metadata: {"user_id": "IshikawaDiagramUser"},
            });

            // 2. Create a response
            let response = await openai.responses.create({
                model: "gpt-4.1-nano",
                instructions: aiInstructions,
                input: [{"role": "user", "content": `Outcome: ${results}, Cause: ${causeExplanation}`}],
                conversation: conversation.id,
            });

            // 3. Retrieve messages
            const aiOutput = JSON.parse(response.output_text || 'No content');
            setAiRecommendation(aiOutput || { category: '', explanation: '' });
            await openai.conversations.delete(conversation.id);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error('Error interacting with assistant:', error);
        }
    };

    if (!openai || isLoading) {
        return <div>Loading...</div>;
    };

    if (!isResultsSubmitted) {
        return <ResultsForm onSubmit={handleResultsSubmit} />;
    };

    if (!isCategorySubmitted && isCauseInputSubmitted) {
        return <CauseCategoryForm openai={openai} aiRecommendation={aiRecommendation} onSubmit={handleEntireCauseSubmit} />;
    };

    if (!isCauseInputSubmitted) {
        return <CausesForm onSubmit={handleCauseInputSubmit} />;
    };

    return (
        <div>Loading...</div>
    );
};

export default OverallForm;
import React, { useEffect, useState } from 'react';
import CauseCategoryDropdown from './causeCategoryDropdown/CauseCategoryDropdown';

interface CauseCategoryFormProps {
    openai: any;
    aiRecommendation: { explanation: string; category: string };
    onSubmit: ( category: string ) => void;
}

const CauseCategoryForm: React.FC<CauseCategoryFormProps> = ( {onSubmit, openai, aiRecommendation} ) => {
    const [causeCategory, setCauseCategory] = useState('People');
    const [explanation, setExplanation] = useState('');

    useEffect(() => {
        if (aiRecommendation.explanation && aiRecommendation.category) {
            setExplanation(`${aiRecommendation.explanation}. Therefore, I shall recommend you place this in the "${aiRecommendation.category}" category.`);
            setCauseCategory(aiRecommendation.category);
        };
    }, [aiRecommendation]);

    const handleCategoryChange = (value: string) => {
        setCauseCategory(value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Cause Category:', causeCategory);
        onSubmit(causeCategory);
    };

    return (
        <form onSubmit={handleSubmit}>
            {explanation.length > 0 && (
                <div style={{ marginBottom: '1rem', width: '40%' }}>
                    <label htmlFor="ai-explanation">Fishikawa explains:</label>

                    <p
                        id="ai-explanation"
                        style={{ fontStyle: 'italic', color: 'gray' }}
                    >
                        {explanation}
                    </p>
                </div>
            )}

            <div>
                <CauseCategoryDropdown value={causeCategory} onChange={handleCategoryChange} />
            </div>

            <button type="submit">Submit</button>
        </form>
    );
};

export default CauseCategoryForm;
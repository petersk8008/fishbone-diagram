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
        onSubmit(causeCategory);
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            {explanation.length > 0 && (
                <div className='ai-explanation' style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '4px', border: '1px solid #e0e0e0' }}>
                    <label htmlFor="ai-explanation" style={{ fontWeight: 'bold', display: 'block', marginBottom: '0.5rem' }}>Fishikawa explains:</label>

                    <p
                        id="ai-explanation"
                        style={{ fontStyle: 'italic', color: 'gray', margin: 0 }}
                    >
                        {explanation}
                    </p>
                </div>
            )}

            <div style={{ marginBottom: '1rem' }}>
                <CauseCategoryDropdown value={causeCategory} onChange={handleCategoryChange} />
            </div>

            <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                Submit
            </button>
        </form>
    );
};

export default CauseCategoryForm;
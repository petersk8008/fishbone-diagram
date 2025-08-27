import React from 'react';

interface ResultsInputProps {
    value: string;
    onChange: (value: string) => void;
}

const ResultsInput: React.FC<ResultsInputProps> = ({ value, onChange }) => {
    return (
        <div>
            <label htmlFor="results-input">Input an Outcome (or Effect):</label>
            
            <input
                id="results-input"
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Eg: Late Delivery"
            />
        </div>
    );
};

export default ResultsInput;
import React, { useState } from 'react';
import ResultsInput from './resultsInput/ResultsInput';

interface ResultsFormProps {
    onSubmit: (results: string) => void;
}

const ResultsForm: React.FC<ResultsFormProps> = ({onSubmit}) => {
    const [results, setResults] = useState('');

    const handleResultsChange = (value: string) => {
        setResults(value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(results);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <ResultsInput value={results} onChange={handleResultsChange} />
            </div>

            <button type="submit">Submit</button>
        </form>
    );
};

export default ResultsForm;
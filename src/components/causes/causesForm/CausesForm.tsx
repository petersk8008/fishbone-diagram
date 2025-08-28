import React, { useState } from 'react';
import CauseInput from './causeInput/CauseInput';

interface CausesFormProps {
    onSubmit: (cause: string) => void;
}

const CausesForm: React.FC<CausesFormProps> = ({onSubmit}) => {
    const [cause, setCause] = useState('');

    const handleCauseChange = (value: string) => {
        setCause(value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(cause);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <CauseInput value={cause} onChange={handleCauseChange} />
            </div>

            <button type="submit">Submit</button>
        </form>
    );
};

export default CausesForm;
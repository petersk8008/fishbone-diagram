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
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            <div>
                <CauseInput value={cause} onChange={handleCauseChange} />
            </div>

            <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
};

export default CausesForm;
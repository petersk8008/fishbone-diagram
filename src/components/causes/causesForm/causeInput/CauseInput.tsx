import React from 'react';

interface CauseInputProps {
    value: string;
    onChange: (value: string) => void;
}

const CauseInput: React.FC<CauseInputProps> = ({ value, onChange }) => {
    return (
        <div>
            <label htmlFor="cause-input">Input a reason (or Cause) for this result:</label>
            <input
                id="cause-input"
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Enter a cause"
            />
        </div>
    );
};

export default CauseInput;
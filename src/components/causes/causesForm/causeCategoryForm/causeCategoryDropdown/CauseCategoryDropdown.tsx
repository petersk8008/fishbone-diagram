import React, { useEffect, useState } from 'react';

interface CauseCategoryDropdownProps {
    value: string;
    onChange: (value: string) => void;
};

const CauseCategoryDropdown: React.FC<CauseCategoryDropdownProps> = ({value, onChange}) => {
    const [selectedCategory, setSelectedCategory] = useState(value || 'People');

    useEffect(() => {
        setSelectedCategory(value);
    }, [value]);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
        onChange(event.target.value);
    };

    return (
        <div>
            <label htmlFor="cause-category-dropdown">Choose the appropriate category: </label>
            <select
                id="cause-category-dropdown"
                value={selectedCategory}
                onChange={handleChange}
            >
                <option value="People">People</option>
                <option value="Method">Method</option>
                <option value="Measurement">Measurement</option>
                <option value="Machine">Machine</option>
                <option value="Environment">Environment</option>
                <option value="Materials">Materials</option>
            </select>
        </div>
    );
};

export default CauseCategoryDropdown;
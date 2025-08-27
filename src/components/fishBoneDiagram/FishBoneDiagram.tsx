import React, { useEffect } from 'react';
import { Cause, FishboneFormData } from '../../types/types';
import './FishBoneDiagram.css';

interface FishboneDiagram {
    fishboneFormData: FishboneFormData;
    handleSaveDiagram: (completedDiagram: FishboneFormData) => void;
    setFishboneFormData: React.Dispatch<React.SetStateAction<FishboneFormData>>;
};

interface fishboneCategory {
    [key: string]: Cause[];
}

const FishboneDiagram: React.FC<FishboneDiagram> = ({ fishboneFormData, handleSaveDiagram, setFishboneFormData }) => {
    const [fishboneCausesByCategory, setFishboneCausesByCategory] = React.useState<fishboneCategory[]>([]);

    useEffect(() => {
        const updatedCauses = fishboneFormData.causes.reduce((acc, cause) => {
            if (!acc[cause.category]) {
                acc[cause.category] = [];
            }

            acc[cause.category].push(cause);

            return acc;
        }, {} as fishboneCategory);
        
        setFishboneCausesByCategory([updatedCauses]);
    }, [fishboneFormData]);

    const handleDeleteCauseFromCategory = (category: string, causeToRemove: Cause, event: React.MouseEvent) => {
        event.preventDefault();

        setFishboneCausesByCategory(prevState => {
            const updated = { ...prevState[0] };

            updated[category] = updated[category].filter(cause => cause.reason !== causeToRemove.reason);

            if (updated[category].length === 0) {
                delete updated[category];
            }

            return [updated];
        });
    };

    return (
        <div className="fishbone-diagram">
            <div className="fishbone-diagram-header">
                <h2 className='diagram-title'>Fishbone Diagram</h2>
            </div>

            <div className="buttons">
                <button onClick={() => handleSaveDiagram(fishboneFormData)}>Save Diagram</button>
                <button onClick={() => setFishboneFormData({ outcome: '', causes: [] })}>Clear Diagram</button>
            </div>

            <div className="outcome-fish-bone-container">
                <h3 className='outcome-header'>Outcome/Result: </h3>
                <p className="outcome-text">{fishboneFormData.outcome}</p>
            </div>

            <div className="cause-fish-bone-container">
                {fishboneCausesByCategory.length > 0 && Object.entries(fishboneCausesByCategory[0]).map(([category, causes], i) => (
                    <div className={`cause-fish-bone cause-fish-bone-${i}`} key={category}>
                        <h3 className='category-header'>{category}</h3>

                        <div className="cause-fish-bone-reasons">
                            {causes.map((cause, index) => (
                                <div className={`cause-fish-bone-reason cause-fish-bone-reason-${index}`} key={`${category}-${index}`}>
                                    <p className='cause-reason'>{cause.reason}</p>

                                    <button className='remove-cause-button' style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer' }} onClick={(event) => handleDeleteCauseFromCategory(category, cause, event)}>X</button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FishboneDiagram;
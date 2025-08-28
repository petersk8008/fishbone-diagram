import React, { useEffect } from 'react';
import './App.css';
import OverallForm from './components/overallForm/OverallForm';
import { Cause, FishboneFormData } from './types/types';
import FishboneDiagram from './components/fishBoneDiagram/FishBoneDiagram';

function App() {
  const [fishboneFormData, setFishboneFormData] = React.useState<FishboneFormData>({
    outcome: '',
    causes: [],
  });
  const [diagramHistory, setDiagramHistory] = React.useState<FishboneFormData[]>([]);

  useEffect(() => {
    getDiagramHistory();
  }, []);

  const getDiagramHistory = () => {
    const history = window.localStorage.getItem('diagramHistory');

    if (history) {
      setDiagramHistory(JSON.parse(history));
    }
  };

  const setCauses = (causes: Cause[]) => {
    setFishboneFormData((prevData) => ({
      ...prevData,
      causes: causes,
    }));
  };

  const setOutcome = (outcome: string) => {
    setFishboneFormData((prevData) => ({
      ...prevData,
      outcome: outcome,
    }));
  };

  const handleSaveDiagram = (completedDiagram: FishboneFormData) => {
    setDiagramHistory((prevHistory) => [...prevHistory, completedDiagram]);

    window.localStorage.setItem('diagramHistory', JSON.stringify([...diagramHistory, completedDiagram]));
  };

  const handleAddNewCause = () => {
    setFishboneFormData((prevState) => ({
      ...prevState,
      causes: [...prevState.causes, { reason: '', category: '' }],
    }));
  };

  return (
    <div className="App">
        <header className="App-header">
            <p>
                Ishikawa (Fishbone) Diagram
            </p>
        </header>

        {/* Implement diagram history */}
        <div className="diagram-history">
            <h3>Diagram History</h3>
                {diagramHistory.length === 0 ? (
                    <p>No saved diagrams.</p>
                ) : (
                    <ul>
                        {diagramHistory.map((diagram, index) => (
                            <li key={index} onClick={() => setFishboneFormData(diagram)}>
                                Outcome: {diagram.outcome}
                            </li>
                        ))}
                    </ul>
                )}
        </div>

        <div>
            <OverallForm setCauses={setCauses} setOutcome={setOutcome} causes={fishboneFormData.causes} fishBoneFormData={fishboneFormData} />
        </div>

        {fishboneFormData && fishboneFormData.causes.length > 0 && (
          <div>
            <FishboneDiagram fishboneFormData={fishboneFormData} handleSaveDiagram={handleSaveDiagram} setFishboneFormData={setFishboneFormData} handleAddNewClause={handleAddNewCause} />
          </div>
        )}
    </div>
  );
}

export default App;

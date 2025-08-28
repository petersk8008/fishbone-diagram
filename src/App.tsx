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
  const [showCauseInput, setShowCauseInput] = React.useState<boolean>(false);

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
    const newDiagram = { id: Date.now(), ...completedDiagram };
    setDiagramHistory((prevHistory) => [...prevHistory, newDiagram]);

    window.localStorage.setItem('diagramHistory', JSON.stringify([...diagramHistory, newDiagram]));
  };

  const handleAddNewCause = () => {
      setShowCauseInput(true);
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
                    <select onChange={(e) => {
                      const selectedDiagram = diagramHistory.find(diagram => diagram.id === Number(e.target.value));
                      console.log(selectedDiagram);
                      if (selectedDiagram) {
                        setFishboneFormData(selectedDiagram);
                      }
                    }}>
                      <option value="" disabled selected>Select an existing Fishbone Diagram</option>
                      {diagramHistory.map((diagram, index) => (
                        <option key={index} value={diagram.id}>
                          {diagram.outcome}
                        </option>
                      ))}
                    </select>
                )}
        </div>

        <div>
            <OverallForm setCauses={setCauses} setOutcome={setOutcome} causes={fishboneFormData.causes} fishBoneFormData={fishboneFormData} showCauseInput={showCauseInput} setShowCauseInput={setShowCauseInput} />
        </div>

        {fishboneFormData && fishboneFormData.outcome && (
          <div>
            <FishboneDiagram fishboneFormData={fishboneFormData} handleSaveDiagram={handleSaveDiagram} setFishboneFormData={setFishboneFormData} handleAddNewClause={handleAddNewCause} />
          </div>
        )}
    </div>
  );
}

export default App;

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
    const newDiagram = { id: completedDiagram.id ?? Date.now(), ...completedDiagram };
    setDiagramHistory((prevHistory) => {
      if (!prevHistory.find(diagram => diagram.id === newDiagram.id)) {
        return [...prevHistory, newDiagram];
      }
      return prevHistory.map(diagram => diagram.id === newDiagram.id ? newDiagram : diagram);
    });

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
        {diagramHistory.length !== 0 && (
          <div className="diagram-history">
              <h3>Diagram History</h3>

              <select onChange={(e) => {
                const selectedDiagram = diagramHistory.find(diagram => diagram.id === Number(e.target.value));
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
          </div>
        )}

        <div className='overall-form'>
            <OverallForm setCauses={setCauses} setOutcome={setOutcome} causes={fishboneFormData.causes} fishBoneFormData={fishboneFormData} showCauseInput={showCauseInput} setShowCauseInput={setShowCauseInput} />
        </div>

        {fishboneFormData && fishboneFormData.outcome && (
          <div className='app-fishbone'>
            <FishboneDiagram fishboneFormData={fishboneFormData} handleSaveDiagram={handleSaveDiagram} setFishboneFormData={setFishboneFormData} handleAddNewClause={handleAddNewCause} />
          </div>
        )}
    </div>
  );
}

export default App;

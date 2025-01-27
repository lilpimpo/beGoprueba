import  { useState } from 'react';
import './trackOrdStylo.css';

const steps = [
  { title: 'Orden creada' },
  { title: 'Orden aceptada' },
  { title: 'Recolección por', driver: 'Driver Name' }, // Placeholder for driver's name
  { title: 'Recolección completada' }
];

function TrackOrd() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <section className="trackOrdr">
      <div className="progress-container-vertical">
        <div className="progress-bar-vertical" style={{ height: `${(currentStep - 1) / (steps.length - 1) * 100}%` }}></div>
        {steps.map((step, index) => (
          <div key={index} className="step-container">
            <div className={`step ${index < currentStep ? 'completed' : ''}`}>
              {index < currentStep ? '✔' : index + 1}
            </div>
            <div className="step-title">
              {step.title} {step.driver && index === 2 ? `por ${step.driver}` : ''}
            </div>
          </div>
        ))}
      </div>
      <button onClick={nextStep}>Next Step</button>
    </section>
  );
}

export default TrackOrd;

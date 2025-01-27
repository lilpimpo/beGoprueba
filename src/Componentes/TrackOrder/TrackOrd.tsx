import { useState, useEffect } from 'react';
import { Upcoming } from '../../Componentes/InfoFrame/PickDropInf';
import { useParams } from 'react-router-dom';
import { User } from '../../IconzZz';
import "./trackOrdStylo.css"

const steps = [
  { title: 'Orden creada', status: 'Orden creada' },
  { title: 'Orden aceptada', status: 'Orden aceptada' },
  { title: 'Recolección por', status: 'Recolección por', driver: 'Conductor' },
  { title: 'Recolección completada', status: 'Recolección completada' }
];

async function fetchInfoConductor(driverId: string) {
  const response = await fetch(`https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders`);
  const data = await response.json();
  const driverDetails = data.result.driver;
  if (driverDetails._id === driverId) {
    return {
      name: driverDetails.nickname,
      email: driverDetails.email,
      telephone: driverDetails.telephone
    };
  }
  return null;
}

function TrackOrd() {
  const { id } = useParams<{ id: string }>();
  const [currentStep, setCurrentStep] = useState(1);
  const [driverName, setDriverName] = useState('Conductor');
  const [formattedTime, setFormattedTime] = useState('');

  useEffect(() => {

    const fetchData = async () => {
      const response = await fetch('https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders/upcoming');
      const data = await response.json();
      const order = data.result.find((upcoming: Upcoming) => upcoming._id === id);

      if (!order) {
        console.error('Order not found');
        return;
      }

      console.log('Order:', order);

      
      if (order.status_string === 'Recolección completada') {
        setCurrentStep(steps.length);
      } else if (order.status_string === 'Orden Asignada') {
        setCurrentStep(3);
      } else {
        const stepIndex = steps.findIndex(step => step.status === order.status_string);
        if (stepIndex !== -1) {
          setCurrentStep(stepIndex + 1);
        }
      }

      // Fetch informacion
      const driverInfo = await fetchInfoConductor(order.driver);
      if (driverInfo) {
        setDriverName(driverInfo.name);
      }

      const date = new Date(order.start_date);
      const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setFormattedTime(formattedTime);
    };

    fetchData();
  }, [id]);

  const handleTrackOrderClick = () => {
    console.log('Track Order');
  };

  return (
    <section className="trackOrdr">
      <div className="progress-container-vertical">
      <div className="avatarImg">
        <User className='avatar'/>
      </div>
      <div className="time-display">{formattedTime}</div>
        <div className="progress-bar-vertical" style={{ height: `${(currentStep - 1) / (steps.length - 1) * 100}%` }}></div>
        {steps.map((step, index) => (
          <div key={index} className="step-container">
            <div className={`step ${index < currentStep ? 'completed' : ''}`}>
              {index < currentStep ? '✔' : index + 1}
            </div>
            <div className="step-title">
              {step.title} {step.driver && index === 2 ? `por ${driverName}` : ''}
            </div>
          </div>
        ))}
        <button
          className='trackOrdButt'
          onClick={handleTrackOrderClick}
          disabled={currentStep < steps.length}
        >
          Track Order
        </button>
      </div>
    </section>
  );
}

export default TrackOrd;

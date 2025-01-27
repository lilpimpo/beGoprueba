import { FetchData } from '../../FetchDat';
import { Upcoming, Destination } from '../../Componentes/InfoFrame/PickDropInf'; 
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const apiDatosUpcoming = FetchData<{ result: Upcoming[] }>('https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders/upcoming');

export async function fetchInfoConductor(driverId: string) {
  const response = await fetch(`https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders`);
  const data = await response.json();
  const driverDetails = data.result.driver;
  if (driverDetails._id === driverId) {
    return {
      email: driverDetails.email,
      telephone: driverDetails.telephone,
      name: driverDetails.nickname
    };
  }
  return null;
}

function Dialogo() {
  const { id } = useParams<{ id: string }>();
  const data = apiDatosUpcoming.read();
  const order = data?.result.find((upcoming: Upcoming) => upcoming._id === id);

  const [driverInfo, setDriverInfo] = useState<{ email: string; telephone: string } | null>(null);
  const [selectedContent, setSelectedContent] = useState<'recoleccion' | 'entrega'>('recoleccion');

  useEffect(() => {
    if (order) {
      fetchInfoConductor(order.driver).then(info => setDriverInfo(info));
    }
  }, [order]);

  if (!order) {
    return <div>Order not found</div>;
  }

  const handleButtonClick = (content: 'recoleccion' | 'entrega') => {
    setSelectedContent(content);
  };

  const filteredDestinations = order.destinations.filter(destination => {
    if (selectedContent === 'recoleccion') {
      return destination.nickname === 'Recolección';
    } else {
      return destination.nickname === 'Entrega';
    }
  });

  return (
    <>
      <details>
        <summary>Pickup Data</summary>
        <h1>Order #{order.order_number}</h1>
        <p>Driver Email: {driverInfo?.email || 'Loading...'}</p>
        <p>Driver Phone: {driverInfo?.telephone || 'Loading...'}</p>

        <div>
          <button onClick={() => handleButtonClick('recoleccion')}>Recolección</button>
          <button onClick={() => handleButtonClick('entrega')}>Entrega</button>
        </div>

        <div className="destinations">
          {filteredDestinations.map((destination: Destination, index: number) => (
            <div key={index}>
              <p> {destination.nickname}</p>
              <p>{destination.address}</p>
              <p> {new Date(destination.start_date).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </details>
    </>
  );
}

export default Dialogo;

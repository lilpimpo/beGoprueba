import { FetchData } from '../../FetchDat';
import { Upcoming, Destination } from '../../Componentes/InfoFrame/PickDropInf'; 
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "./dialoggStylo.css"

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

function Dialogo({ selectedContent }: { selectedContent: 'recoleccion' | 'entrega' }) {
  const { id } = useParams<{ id: string }>();
  const data = apiDatosUpcoming.read();
  const order = data?.result.find((upcoming: Upcoming) => upcoming._id === id);

  const [driverInfo, setDriverInfo] = useState<{ email: string; telephone: string } | null>(null);

  useEffect(() => {
    if (order) {
      fetchInfoConductor(order.driver).then(info => setDriverInfo(info));
    }
  }, [order]);

  if (!order) {
    return <div>Order not found</div>;
  }

  const filteredDestinations = order.destinations.filter(destination => {
    if (selectedContent === 'recoleccion') {
      return destination.nickname === 'Recolección';
    } else {
      return destination.nickname === 'Entrega';
    }
  });

  return (
    <>
      <details className="details-container" open>
        <summary className="summary-title">Pickup Data</summary>
        <div className="destinations">
          {filteredDestinations.map((destination: Destination, index: number) => (
            <div className="destination" key={index}>
              <p className="destination-nickname">{destination.nickname}</p>
              <p className="destination-address">{destination.address}</p>
              <p className="destination-time">{new Date(destination.start_date).toLocaleString()}</p>
            </div>
          ))}
        </div>
        <p className="driver-info">Conductor Cel: {driverInfo?.telephone || 'Loading...'}</p>
        <p className="driver-info">Conductor Email: {driverInfo?.email || 'Loading...'}</p>
      </details>
    </>
  );
}

export default Dialogo;

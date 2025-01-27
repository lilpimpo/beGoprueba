import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Headero from '../../Componentes/Header/Headero';
import Dialogo from '../../Componentes/Despliegue/Dialogg';
import TrackOrd from '../../Componentes/TrackOrder/TrackOrd';
import PickDrop from '../../Componentes/InfoFrame/PickDropInf';
import { Upcoming } from '../../Componentes/InfoFrame/PickDropInf';


function CargoDetails() {
  const { id } = useParams<{ id: string }>();
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [selectedContent, setSelectedContent] = useState<'recoleccion' | 'entrega'>('recoleccion');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const response = await fetch('https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders/upcoming');
      const data = await response.json();
      const order = data.result.find((upcoming: Upcoming) => upcoming._id === id);

      if (order) {
        setOrderNumber(order.order_number);
      }
    };

    fetchOrderDetails();
  }, [id]);

  const handleDestinationClick = (nickname: string) => {
    setSelectedContent(nickname === 'Recolección' ? 'recoleccion' : 'entrega');
    const detailsElement = document.querySelector('.details-container');
    if (detailsElement && !detailsElement.hasAttribute('open')) {
      detailsElement.setAttribute('open', 'true');
    }
    detailsElement?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Headero seccName='Cargo Details' />
      {orderNumber && <PickDrop searchQuery="" showButt='none' order2show={orderNumber} onDestinationClick={handleDestinationClick} />}
      <div className="cargoDetails">
        <TrackOrd />
        <Dialogo selectedContent={selectedContent} />
      </div>
    </>
  );
}

export default CargoDetails;

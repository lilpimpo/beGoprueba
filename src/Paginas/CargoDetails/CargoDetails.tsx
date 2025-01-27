import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Headero from '../../Componentes/Header/Headero';
import Dialogo from '../../Componentes/Despliegue/Dialogg';
import TrackOrd from '../../Componentes/TrackOrder/TrackOrd';
import PickDrop from '../../Componentes/InfoFrame/PickDropInf';
import { FetchData } from '../../FetchDat';
import { Upcoming } from '../../Componentes/InfoFrame/PickDropInf';

const apiDatosUpcoming = FetchData<{ result: Upcoming[] }>('https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders/upcoming');

function CargoDetails() {
  const { id } = useParams<{ id: string }>();
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

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

  return (
    <>
      <Headero seccName='Cargo Details' />
      {orderNumber && <PickDrop searchQuery="" showButt='none' order2show={orderNumber} />}
      <div className="cargoDetails">
        <TrackOrd />
        <Dialogo />
      </div>
    </>
  );
}

export default CargoDetails;

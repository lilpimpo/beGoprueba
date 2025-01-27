import { useParams } from 'react-router-dom';
import { FetchData } from '../../FetchDat';
import { Upcoming, Destination } from '../../Componentes/InfoFrame/PickDropInf'; // Adjust the import path as needed
import Headero from '../../Componentes/Header/Headero';
const apiDatosUpcoming = FetchData<{ result: Upcoming[] }>('https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders/upcoming');

function CargoDetails() {
  const { id } = useParams<{ id: string }>();
  const data = apiDatosUpcoming.read();
  const order = data?.result.find((upcoming: Upcoming) => upcoming._id === id);

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <>

    <Headero seccName='Cargo Details'/>
    <div className="cargoDetails">

      <h1>Order #{order.order_number}</h1>
      <p>Driver: {order.driver}</p>
      <p>Type: {order.type}</p>
      <p>Status: {order.status_string}</p>
      <div className="destinations">
        {order.destinations.map((destination: Destination, index: number) => (
          <div key={index}>
            <p>Address: {destination.address}</p>
            <p>Start Date: {new Date(destination.start_date).toLocaleString()}</p>
            <p>End Date: {new Date(destination.end_date).toLocaleString()}</p>
            <p>Nickname: {destination.nickname}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default CargoDetails;

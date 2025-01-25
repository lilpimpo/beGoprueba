import { Suspense } from 'react';
import { FetchData } from '../../FetchDat';
import { Traile, Carrillo, Ubi } from '../../IconzZz';
import NavButtn from '../NavButtn/NavButtn';
import RemndrButtn from '../RemButtn/RemndrButtn';
import './pickDropInf.css';

const apiDatosUpcoming = FetchData<{ result: Upcoming[] }>('https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders/upcoming');

interface Destination {
  address: string;
  start_date: number;
  end_date: number;
  nickname: string;
  show_navigation: boolean;
}

interface Upcoming {
  _id: number;
  driver: string;
  type: string;
  order_number: string;
  destinations: Destination[];
  status_string: string;
  status_class: string;
}

function replaceAddress(address: string): string {
  if (address.includes('Méx.')) {
    return 'CDMX';
  } else if (address.includes('Tamps.')) {
    return 'Tamaulipas';
  } else {
    return address;
  }
}

function formatDateAndTime(timestamp : number) {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-indexed
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = date.getMinutes();

  const ampm = hours >= 12 ? 'p.m.' : 'a.m.';

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  const formattedDate = `${month}/${day}/${year}`;
  const formattedTime = `${hours}:${minutes} ${ampm}`;

  return { formattedDate, formattedTime };
}


function PickNdDrop({ searchQuery }: { searchQuery: string }) {
  const data = apiDatosUpcoming.read();

  const filteredOrders = data?.result.filter((upcoming: Upcoming) =>
    upcoming.order_number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="orderInfoCont">
      {filteredOrders.map((upcoming: Upcoming) => (
        <section className="tablaInfo" key={upcoming._id}>
          <h1 className="orderNumba">
            Order<p> #{upcoming.order_number}</p>
          </h1>
        <div className="bordeo">
        <div className="orderIcons">
            <div className="traile">
              <Traile width={40} height={40} fill="none" />
            </div>
            <h3 className="tipox">{upcoming.type}</h3>
            <ul className="listaNoStyloReco statuto">
              <li className={upcoming.status_class}>
                <p className="statusTexto">{upcoming.status_string}</p>
              </li>
            </ul>
          </div>

          <div className="pickUpInf">
            {upcoming.destinations.map((destination: Destination, index: number) => {
              const { formattedDate, formattedTime } = formatDateAndTime(destination.start_date);
              return (
                <li className="listaNoStylo" key={`${upcoming._id}-${index}`}>
                  <div className="svgCont">
                    {destination.nickname === 'Recolección' ? (
                      <Carrillo className="carrillo" width={60} height={60} fill="white" stroke="#fff" />
                    ) : destination.nickname === 'Entrega' ? (
                      <Ubi className="ubi" width={60} height={60} />
                    ) : null}
                  </div>

                  <div className="ciudadYpick">
                    <p className="pickOrDrop">{destination.nickname}</p>
                    <p className="ciudad"> {replaceAddress(destination.address)}</p>
                    <p className="direccioni">{destination.address}</p>
                  </div>
                  <div className="datosEsp">
                      <p className="startDate">{formattedDate}</p>
                      <p className="startTime">{formattedTime}</p>
                    </div>
                </li>
              );
            })}
          </div>

          <div className="buttonsi">
            <RemndrButtn countdownTime={26000} className="timePickDrop" />
            <NavButtn to="details" className="resumenx" title="Resume" />
          </div>

        </div>
          
        </section>
      ))}
    </div>
  );
}

function PickDrop({ searchQuery }: { searchQuery: string }) {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <PickNdDrop searchQuery={searchQuery} />
    </Suspense>
  );
}

export default PickDrop;

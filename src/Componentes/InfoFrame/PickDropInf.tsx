import { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { FetchData } from '../../FetchDat';
import { Traile, Carrillo, Ubi } from '../../IconzZz';
import RemndrButtn from '../RemButtn/RemndrButtn';
import './pickDropInf.css';

const apiDatosUpcoming = FetchData<{ result: Upcoming[] }>('https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders/upcoming');

export interface Destination {
  address: string;
  start_date: number;
  end_date: number;
  nickname: string;
  show_navigation: boolean;
}

export interface Upcoming {
  _id: string;
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

function truncateAddress(address: string) {
  const maxLength = 27;
  if (address.length > maxLength) {
    return address.substring(0, maxLength) + '...';
  }
  return address;
}

function formatDateAndTime(timestamp: number) {
  const date = new Date(timestamp);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = date.getMinutes();

  const ampm = hours >= 12 ? 'p.m.' : 'a.m.';

  hours = hours % 12;
  hours = hours ? hours : 12;

  const formattedDate = `${month}/${day}/${year}`;
  const formattedTime = `${hours}:${minutes} ${ampm}`;

  return { formattedDate, formattedTime };
}

function PickNdDrop({ searchQuery, order2show, showButt }: { searchQuery: string, order2show?: string, showButt?: string }) {
  const data = apiDatosUpcoming.read();

  const filteredOrders = data?.result.filter((upcoming: Upcoming) =>
    upcoming.order_number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const ordersToShow = order2show
    ? filteredOrders.filter((upcoming: Upcoming) => upcoming.order_number === order2show)
    : filteredOrders;

  return (
    <div className="orderInfoCont">
      {ordersToShow.map((upcoming: Upcoming) => (
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
                        <Carrillo className="carrillo" width={38} height={38} fill='white' stroke="#fff" />
                      ) : destination.nickname === 'Entrega' ? (
                        <Ubi className="ubi" width={38} height={38} />
                      ) : null}
                    </div>

                    <div className="ciudadYpick">
                      <p className="pickOrDrop">{destination.nickname}</p>
                      <p className="ciudad"> {replaceAddress(destination.address)}</p>
                      <p className="direccioni">{truncateAddress(destination.address)}</p>
                    </div>
                    <div className="datosEsp">
                      <p className="startDate">{formattedDate}</p>
                      <p className="startTime">{formattedTime}</p>
                    </div>
                  </li>
                );
              })}
            </div>

            <div className="buttonsi" style={{ display: showButt }}>
              <RemndrButtn countdownTime={26000} className="timePickDrop" />
              <Link to={`/details/${upcoming._id}`} className="resumenx">Resume</Link>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

function PickDrop({ searchQuery, order2show, showButt }: { searchQuery: string, order2show?: string, showButt?: string }) {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <PickNdDrop searchQuery={searchQuery} order2show={order2show} showButt={showButt} />
    </Suspense>
  );
}

export default PickDrop;

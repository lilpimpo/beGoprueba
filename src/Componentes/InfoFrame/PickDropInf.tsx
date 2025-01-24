import { Suspense } from "react";
import { FetchData } from "../../FetchDat";
import { Traile, Carrillo, Ubi } from "../../IconzZz";
import NavButtn from "../NavButtn/NavButtn";
import "./pickDropInf.css"

const apiDatosUpcoming = FetchData<{ result: Upcoming[] }>("https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders/upcoming");

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
    if (address.includes("Méx.")) {
        return "CDMX";
    } else if (address.includes("Tamps.")) {
        return "Tamaulipas";
    } else {
        return address;
    }
}

function PickDropInf() {
    const data = apiDatosUpcoming.read();
  

    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <div className="orderInfoCont">
                {data?.result.map((upcoming: Upcoming) => (
                    <section className="tablaInfo" key={upcoming._id}>

                        <h1 className="orderNumba">Order<p> #{upcoming.order_number}</p></h1>
                        

                        <div className="orderIcons">
                            <div className="traile">
                                <Traile width={40} height={40} fill="none"/>
                            </div>
                            <h3 className="tipox">{upcoming.type}</h3>
                            <ul className="listaNoStylo statuto">
                                <li className={upcoming.status_class}>
                                    <p className="statusTexto">
                                        {upcoming.status_string}
                                    </p>
                                </li>
                            </ul>
                        </div>

                        <div className="pickUpInf">
                            {upcoming.destinations.map((destination: Destination, index: number) => (
                                <li className="listaNoStylo" key={`${upcoming._id}-${index}`}>
                                   <div className="svgCont">

                                    {destination.nickname === "Recolección" ? (
                                        <Carrillo width={40} height={40} fill="white" stroke="#fff"/>
                                    ) : destination.nickname === "Entrega" ? (
                                        <Ubi width={40} height={40} />
                                    ) : null}
                                   </div>

                                   <div className="ciudadYpick">
                                        <p className="pickOrDrop">{destination.nickname}</p>
                                        <p className="ciudad"> {replaceAddress(destination.address)}</p>
                                        <div className="datosEsp">
                                            <p className="direccioni">{destination.address}</p>
                                            <p className="startDate"> {new Date(destination.start_date).toLocaleString()}</p>
                                        </div>
                                   </div>
                                    
                                  
                                </li>
                            ))}
                        </div>
                        <button>PickUpTime?</button>
                       <NavButtn to="details" className="resumenx" title="Resume"/>
                    </section>
                ))}
            </div>
           
        </Suspense>
    );
}

const PickNdDrop = () => {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <PickDropInf />
        </Suspense>
    );
};

export default PickNdDrop;

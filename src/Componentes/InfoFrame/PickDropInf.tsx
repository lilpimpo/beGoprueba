import { Suspense } from "react";
import { FetchData } from "../../FetchDat";
import { Traile, Carrillo, Ubi } from "../../IconzZz";

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
}

function replaceAddress(address: string): string {
    if (address.includes("Mex.")) {
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
                        <h1 className="orderNumba">Order # {upcoming.order_number}</h1>
                        <div className="orderIcons">
                            <Traile width={40} height={40} fill="none" />
                            <h3>{upcoming.type}</h3>
                        </div>
                        <div className="pickUpInf">
                            {upcoming.destinations.map((destination: Destination, index: number) => (
                                <li key={`${upcoming._id}-${index}`}>
                                    {destination.nickname === "Recolección" ? (
                                        <Carrillo width={40} height={40} />
                                    ) : destination.nickname === "Entrega" ? (
                                        <Ubi width={40} height={40} />
                                    ) : null}
                                    <p className="pickOrDrop?">{destination.nickname}</p>
                                    <p className="ciudad"> {replaceAddress(destination.address)}</p>
                                    <p className="direccioni">{destination.address}</p>
                                    <p className="startDate"> {new Date(destination.start_date).toLocaleString()}</p>
                                    
                                  
                                </li>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
            <div className="dateo"></div>
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

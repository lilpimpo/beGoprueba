import { Suspense } from "react";
import { FetchData } from "../../FetchDat";

const apiDatos = FetchData<{ result: Upcoming[] }>("https://129bc152-6319-4e38-b755-534a4ee46195.mock.pstmn.io/orders/upcoming");



interface Upcoming {
    _id: number;
    driver: string;
    type: string;
}

function PickDropInf() {
    const data = apiDatos.read();

    return (
        <>
            <div className="infoCont">
                <Suspense fallback={<div>Cargando...</div>}></Suspense>
                <ul>
                    {data?.result.map((upcoming: Upcoming) => (<li key={upcoming._id}>{upcoming.type}</li>))}
                </ul>
           
            </div>
            <div className="dateo">
               
            </div>
        </>
    );
}

export default PickDropInf;

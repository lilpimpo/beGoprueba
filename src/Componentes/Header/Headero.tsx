import NotificationsX from "../../IconzZz/Notificazion";
import Backo from "../../IconzZz/Backo";
import './headeroStylo.css';

interface HeaderoPropz  {
    seccName: string;
};

function Headero({ seccName }: HeaderoPropz) {
    const backHref = seccName === "Cargo Details" ? "/#" : "oops!";

    return (
        <div className="headerCont">
            <a href={backHref} className="linki">
                <Backo width={40} height={40} className="atras" stroke="currentColor" strokeWidth={0.2} />
            </a>

            <h1 className="nombreHeader">{seccName}</h1>
            
            <NotificationsX width={30} height={30} className="notifications" strokeWidth={0.8} />
        </div>
    );
}

export default Headero;

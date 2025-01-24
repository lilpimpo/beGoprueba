
import NotificationsX from "../../IconzZz/Notificazion";
import  Backo  from "../../IconzZz/Backo";
import './headeroStylo.css'
type HeaderoPropz = {
    seccName : string;
   
};

function Headero({seccName} : HeaderoPropz){

    return(
        
        <div className="headerCont">
            <a href="oops!" className="linki">

            <Backo  width={40} height={40} className="atras" stroke="currentColor" strokeWidth={0.2}/>
            </a>
           
            <h1 className="nombreHeader">{seccName}</h1>
      
            <NotificationsX width={30} height={30} className="notifications" fill="white"   strokeWidth={0.8}/>
            
           
        </div>
        
        
    )
}
export default Headero
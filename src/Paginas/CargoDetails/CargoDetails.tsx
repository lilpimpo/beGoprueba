import Headero from '../../Componentes/Header/Headero';
import Dialogo from '../../Componentes/Despliegue/Dialogg';
import TrackOrd from '../../Componentes/TrackOrder/TrackOrd';

function CargoDetails() {


  return (
    <>

    <Headero seccName='Cargo Details'/>
  
    <div className="cargoDetails">
      <TrackOrd/>
      <Dialogo/>
    </div>
    </>
  );
}

export default CargoDetails;

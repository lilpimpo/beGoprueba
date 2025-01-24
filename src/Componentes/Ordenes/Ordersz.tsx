import PickDropInf from "../InfoFrame/PickDropInf";
import "./orderszStylo.css"

//interface Props {}

const Ordersz = () => {
  return (
    <div className="OrdenesCont">
        <h2>Order with numbr</h2>
        
        <PickDropInf />
        <button>PickUpTime?</button>
        <button>Resume</button>
    </div>
  )
}

export default Ordersz
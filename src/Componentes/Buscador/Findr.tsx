import { useRef } from "react";
import './findrStylo.css'
import  Search  from "../../IconzZz/Search";
function Findr() {

    const inputRef = useRef<HTMLInputElement>(null);
  
    return (
      <div className="search-container">
        <div className="lupa">
            <Search width={28} height={28} fill="#FFF"/>
        </div>
        <input ref={inputRef} type="search" name="Search" placeholder="Search..." className="findero" />
      </div>
    );
  }
export default Findr;

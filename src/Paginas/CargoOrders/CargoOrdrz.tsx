import React, { useState } from 'react';
import Headero from '../../Componentes/Header/Headero';
import Findr from '../../Componentes/Buscador/Findr';
import PickDrop from '../../Componentes/InfoFrame/PickDropInf';
import './cargoOrdrzStylo.css';

function CargoOrdrz() {
  const [searchQuery, setSearchQuery] = useState('');

  const activoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const links = document.querySelectorAll('.opciones a');
    links.forEach(link => link.classList.remove('active'));
    event.currentTarget.classList.add('active');
  };

  return (
    <>
      <div className='headero'>
        <Headero seccName='Cargo Orders' />
      </div>
      <div className="opciones">
        <a href="#" onClick={activoClick}>Upcoming</a>
        <a href="oops!" onClick={activoClick}>Completed</a>
        <a href="oops!" onClick={activoClick}>Past</a>
      </div>

      <Findr onSearch={setSearchQuery} />
      <PickDrop searchQuery={searchQuery} />
    </>
  );
}

export default CargoOrdrz;

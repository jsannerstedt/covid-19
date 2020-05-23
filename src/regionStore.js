import React, { createContext, useState } from 'react';

const stored = localStorage.getItem('regions');

let selected = stored
  ? JSON.parse(stored)
  : [
  'Sverige',  
  'Stockholm',
  'Västra Götaland',
  'Östergötland',
  'Sörmland',
  'Örebro',
  'Uppsala',
  'Skåne',
  'Jönköping',
  'Dalarna',
  'Västmanland',
  'Blekinge',
  'Gotland',
  'Gävleborg',
  'Halland',
  'Jämtland Härjedalen',
  'Kalmar',
  'Kronoberg',
  'Norrbotten',
  'Värmland',
  'Västerbotten',
  'Västernorrland'
  
    ];

export const Context = createContext();

const Store = ({ children }) => {
  const [regions, setRegions] = useState(selected);

  const toggleRegion = (region) => {
    const newRegions = regions.includes(region)
      ? regions.filter((r) => r !== region)
      : [...regions, region];
    localStorage.setItem('regions', JSON.stringify(newRegions));
    setRegions(newRegions);
  };

  return (
    <Context.Provider value={[regions, toggleRegion]}>
      {children}
    </Context.Provider>
  );
};

export default Store;

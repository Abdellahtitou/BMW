import React, { createContext, useContext, useState } from 'react';

const CarContext = createContext();

export const CarProvider = ({ children }) => {
    const [panier, setPanier] = useState([]);

    const addCar = (car) => {
        setPanier([...panier, car]);
    };

    const supprimerDuPanier = (index) => {
        setPanier(prevPanier => prevPanier.filter((_, i) => i !== index));
    };

    return (
        <CarContext.Provider value={{ panier, addCar, supprimerDuPanier }}>
            {children}
        </CarContext.Provider>
    );
};

export const useCarContext = () => {
    return useContext(CarContext);
};

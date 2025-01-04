

import React, { useState, useEffect } from "react";
import BMW from '../Asset/BMW.png';
import { Link } from "react-router-dom";
import axios from "axios";
import { useCarContext } from '../contexts/CarContext';

const Game_electrique = () => {
  const [isActive, setIsActive] = useState(false);
  const [electriques, setElectriques] = useState([]);
  const [error, setError] = useState(null);

  const { addCar } = useCarContext();

  useEffect(() => {
    fetchElectricModels();
  }, []);

  const fetchElectricModels = () => {
    axios.get('http://localhost:3002/electriques')
      .then((res) => {
        console.log("Data fetched:", res.data);
        if (Array.isArray(res.data)) {
          setElectriques(res.data);
          setError(null);
        } else {
          setError("Invalid data format");
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err); 
        setError("Error fetching data");
      });
  };

  const toggleSearch = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <header className="py-4 bg-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <i className="bx bx-menu text-3xl cursor-pointer"></i>
          <img src={BMW} alt="BMW" className="absolute top-4 left-0 w-16 sm:mr-96" />
          <ul className="flex space-x-6">
            <li>
              <Link to="/Accueil" className="hover:text-gray-300">Accueil</Link>
            </li>
            <li>
              <Link to="/Modéles" className="hover:text-gray-300">Modéles</Link>
            </li>
            <li>
              <Link to="/Acheter" className="hover:text-gray-300">Acheter</Link>
            </li>
          </ul>
          <i onClick={toggleSearch} className="bx bx-search text-3xl cursor-pointer"></i>
          <div className={`search-box ${isActive ? 'block' : 'hidden'} md:block absolute top-0 right-0 mt-5 mr-4`}>
            <input type="search"  className="bg-transparent border-b border-white outline-none" placeholder="Rechercher..." />
          </div>
        </div>
      </header>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl mb-4">Trouver votre voiture électrique BMW :</h1>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {electriques.map((Electrique) => (
              <div key={Electrique.id} className="bg-gray-800 p-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300">
                <img src={Electrique.image} alt={Electrique.title} className="w-full h-auto rounded-md" />
                <div className="mt-4">
                  <p className="text-lg font-bold">{Electrique.title}</p>
                  <p className="text-xl">{Electrique.Energie}</p>
                  <p className="text-xl">{Electrique.prix.toFixed(3)} MAD</p>
                  <button
                    className="mt-2 bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-500"
                    onClick={() => addCar({ ...Electrique, image: Electrique.image })}
                  >
                    Ajouter à Acheter
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Game_electrique;


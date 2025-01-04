import React, { useState, useEffect } from "react";
import BMW from '../Asset/BMW.png';
import { Link } from "react-router-dom";
import axios from "axios"; 
import { useCarContext } from '../contexts/CarContext';

const Modéles = () => {
  const [isActive, setIsActive] = useState(false);
  const [Berlins, setBerlins] = useState([]);
  const [compacts, setCompacts] = useState([]);
  const [coupes, setCoupes] = useState([]);
  const [bmwis, setBmwis] = useState([]);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Berlin');

  const { addCar } = useCarContext();

  useEffect(() => {
    fetchBerlins();
  }, []);

  const fetchBerlins = () => {
    axios.get('http://localhost:3002/Berlins')
      .then((res) => {
        console.log("Berlins Response:", res.data); // Log the response data
        if (Array.isArray(res.data)) {
          setBerlins(res.data);
          setError(null);
        } else {
          setError("Invalid data format");
        }
      })
      .catch(() => {
        setError("Error fetching data");
      });
  };

  const fetchCompacts = () => {
    axios.get('http://localhost:3002/compacts')
      .then((res) => {
        console.log("Compacts Response:", res.data); // Log the response data
        if (Array.isArray(res.data)) {
          setCompacts(res.data);
          setError(null);
        } else {
          setError("Invalid data format");
        }
      })
      .catch(() => {
        setError("Error fetching data");
      });
  };

  const fetchCoupes = () => {
    axios.get('http://localhost:3002/coupes')
      .then((res) => {
        console.log("Coupes Response:", res.data); // Log the response data
        if (Array.isArray(res.data)) {
          setCoupes(res.data);
          setError(null);
        } else {
          setError("Invalid data format");
        }
      })
      .catch(() => {
        setError("Error fetching data");
      });
  };

  const fetchBmwI = () => {
    axios.get('http://localhost:3002/bmwis')
      .then((res) => {
        console.log("BMW i Response:", res.data); // Log the response data
        if (Array.isArray(res.data)) {
          setBmwis(res.data);
          setError(null);
        } else {
          setError("Invalid data format");
        }
      })
      .catch(() => {
        setError("Error fetching data");
      });
  };

  const toggleSearch = () => {
    setIsActive(!isActive);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    if (category === 'compacts') {
      fetchCompacts();
    } else if (category === 'coupes') {
      fetchCoupes();
    } else if (category === 'bmwis') {
      fetchBmwI();
    }
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
              <Link to="/Gamme" className="hover:text-gray-300">Gammes électriques</Link>
            </li>
            <li>
              <Link to="/Acheter" className="hover:text-gray-300">Acheter</Link>
            </li>
          </ul>
          <i onClick={toggleSearch} className="bx bx-search text-3xl cursor-pointer"></i>
          <div className={`search-box ${isActive ? 'block' : 'hidden'} md:block absolute top-0 right-0 mt-5 mr-4`}>
            <input type="text" placeholder="Rechercher..." className="bg-transparent border-b border-white outline-none" />
          </div>
        </div>
      </header>

      <div className="container mx-auto py-8">
        <div className="flex justify-center space-x-4 mb-8">
          <button
            className={`px-4 py-2 rounded-md ${activeCategory === 'Berlin' ? 'bg-blue-600' : 'bg-gray-800'}`}
            onClick={() => handleCategoryChange('Berlin')}
          >
            Berlin
          </button>
          <button
            className={`px-4 py-2 rounded-md ${activeCategory === 'compacts' ? 'bg-blue-600' : 'bg-gray-800'}`}
            onClick={() => handleCategoryChange('compacts')}
          >
            Compacts
          </button>
          <button
            className={`px-4 py-2 rounded-md ${activeCategory === 'coupes' ? 'bg-blue-600' : 'bg-gray-800'}`}
            onClick={() => handleCategoryChange('coupes')}
          >
            Coupé
          </button>
          <button
            className={`px-4 py-2 rounded-md ${activeCategory === 'bmwis' ? 'bg-blue-600' : 'bg-gray-800'}`}
            onClick={() => handleCategoryChange('bmwis')}
          >
            BMW i
          </button>
        </div>

        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div>
            {activeCategory === 'Berlin' && (
              <div>
                <h1 className="text-2xl mt-6">BERLINS</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  {Berlins.map((Berlin) => (
                    <div key={Berlin.id} className="bg-gray-800 p-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300">
                      <img src={Berlin.image} alt={Berlin.title} className="w-full h-auto rounded-md" />
                      <div className="mt-4">
                        <p className="text-lg font-bold">{Berlin.title}</p>
                        <p className="text-xl">{Berlin.Energie}</p>
                        <p className="text-xl">{Berlin.prix.toFixed(3)} MAD</p> 
                        <button
                          className="mt-2 bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-500"
                          onClick={() => addCar({ ...Berlin, image: Berlin.image })}
                        >
                          Ajouter à Acheter
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeCategory === 'compacts' && (
              <div>
                <h1 className="text-2xl mt-6">COMPACTS</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  {compacts.map((Compact) => (
                    <div key={Compact.id} className="bg-gray-800 p-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300">
                      <img src={Compact.image} alt={Compact.title} className="w-full h-auto rounded-md" />
                      <div className="mt-4">
                        <p className="text-lg font-bold">{Compact.title}</p>
                        <p className="text-xl">{Compact.Energie}</p>
                        <p className="text-xl">{(parseFloat(Compact.prix) || 0).toFixed(3)} MAD</p> 
                        <button
                          className="mt-2 bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-500"
                          onClick={() => addCar({ ...Compact, image: Compact.image })}
                        >
                          Ajouter à Acheter
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeCategory === 'coupes' && (
              <div>
                <h1 className="text-2xl mt-6">COUPÉ</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  {coupes.map((Coupe) => (
                    <div key={Coupe.id} className="bg-gray-800 p-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300">
                      <img src={Coupe.image} alt={Coupe.title} className="w-full h-auto rounded-md" />
                      <div className="mt-4">
                        <p className="text-lg font-bold">{Coupe.title}</p>
                        <p className="text-xl">{Coupe.Energie}</p>
                        <p className="text-xl">{(parseFloat(Coupe.prix) || 0).toFixed(3)} MAD </p> {/* Ensure prix is correct */}
                        <button
                          className="mt-2 bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-500"
                          onClick={() => addCar({ ...Coupe, image: Coupe.image })}
                        >
                          Ajouter à Acheter
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeCategory === 'bmwis' && (
              <div>
                <h1 className="text-2xl mt-6">BMW i</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                  {bmwis.map((Bmwi) => (
                    <div key={Bmwi.id} className="bg-gray-800 p-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300">
                      <img src={Bmwi.image} alt={Bmwi.title} className="w-full h-auto rounded-md" />
                      <div className="mt-4">
                        <p className="text-lg font-bold">{Bmwi.title}</p>
                        <p className="text-xl">{Bmwi.Energie}</p>
                        <p className="text-xl">{(parseFloat(Bmwi.prix) || 0).toFixed(3)} MAD </p>
                        <button
                          className="mt-2 bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-500"
                          onClick={() => addCar({ ...Bmwi, image: Bmwi.image })}
                        >
                          Ajouter à Acheter
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Modéles;

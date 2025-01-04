
import React, { useState } from "react";
import BMW from '../Asset/BMW.png';
import ReactPlayer from 'react-player';
import { Link } from "react-router-dom";

const Accueil = () => {
  const [isActive, setIsActive] = useState(false);

  const toggleSearch = () => {
    setIsActive(!isActive);
  };

  const externalSource = 'https://youtu.be/x9fB-2OOHFo?si=bnMtu5J5as8DHHz1';
  const internalSource = require('../Asset/BMW M4.mp4'); 

  return (
    <div className="bg-gray-900 h-screen text-white">
      <header className="py-4">
        <div className="container mx-auto flex justify-between items-center">
          <i className="bx bx-menu text-3xl cursor-pointer"></i>
          <img src={BMW} alt="BMW" className=" absolute top-4 left-0  w-16 sm:mr-96" />
          <ul className="flex space-x-6">
            <li><a href="/Modéles" className="hover:text-gray-300">Modéles</a>
            <Link to='/Modéles'></Link>
             </li>
            <li><a href="/Gamme" className="hover:text-gray-300">Gammes électriques</a>
            <Link to='/Gamme'></Link>
            </li>
            <li><a href="/Acheter" className="hover:text-gray-300">Acheter</a>
            <Link to='/Acheter'></Link>
            </li>
          </ul>
          <i onClick={toggleSearch} className="bx bx-search text-3xl cursor-pointer"></i>
          <div className={`search-box ${isActive ? 'block' : 'hidden'} md:block absolute top-0 right-0 mt-5 mr-4`}>
            <input type="search"  className="bg-transparent border-b border-white outline-none" placeholder="Rechercher..." />
          </div>
        </div>
      </header>
      <div className="flex justify-center items-center overflow-hidden h-full">
        <ReactPlayer url={internalSource}  playing muted loop play width="auto" height="100%" className="w-full h-full"  />

      </div>
    </div>
  )
}
export default Accueil;
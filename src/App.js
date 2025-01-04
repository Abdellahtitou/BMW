import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import BrowserRouter
import Accueil from './Components/Accueil';
import Modéles from './Components/Modéles';
import Gamme from './Components/Gamme';
import Acheter from './Components/Acheter';
import { CarProvider } from './contexts/CarContext';
import AddVoiture from './Components/AjouterVoiture';

const App = () => {
  return (
    <CarProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/Accueil" element={<Accueil />} />
          <Route path="/Modéles" element={<Modéles />} />
          <Route path="/Gamme" element={<Gamme />} />
          <Route path='/AjouterVoiture' element={<AddVoiture />} />
          <Route path="/Acheter" element={<Acheter />} />
        </Routes>
      </Router>
    </CarProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
export default App;
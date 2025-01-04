
import React, { useState } from 'react';
import { useCarContext } from '../contexts/CarContext';
import BMW from '../Asset/BMW.png';
import { Link } from "react-router-dom";
import axios from 'axios';

const MonPanier = () => {
    const { panier, supprimerDuPanier } = useCarContext();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        phone: ''
    });

    const calculerTotal = () => {
        return panier.reduce((total, item) => total + item.prix, 0);
    };

    const handleConfirmation = () => {
        setShowForm(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3002/clients', formData);
            console.log("Form submitted successfully with data: ", response.data);
            setFormData({
                name: '',
                email: '',
                address: '',
                phone: ''
            });
            setShowForm(false);
        } catch (error) {
            console.error("Error submitting form: ", error);
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <header className="py-4 bg-gray-800">
                <div className="container mx-auto flex justify-between items-center">
                    <i className="bx bx-menu text-3xl cursor-pointer"></i>
                    <img src={BMW} alt="BMW" className="absolute top-4 left-0 w-16 sm:mr-96" />
                    <ul className="flex space-x-6">
                        <li><Link to='/Accueil' className="hover:text-gray-300">Accueil</Link></li>
                        <li><Link to='/Modéles' className="hover:text-gray-300">Modéles</Link></li>
                        <li><Link to='/Gamme' className="hover:text-gray-300">Gammes électriques</Link></li>
                    </ul>
                    <i className="bx bx-search text-3xl cursor-pointer"></i>
                </div>
            </header>
            <h2 className="text-3xl font-bold mb-6 text-gray-200 text-center">Mon Panier</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="w-1/4 py-3 px-4 text-left">Nom</th>
                            <th className="w-1/4 py-3 px-4 text-left">Marque</th>
                            <th className="w-1/4 py-3 px-4 text-left">Prix(MAD)</th>
                            <th className="w-1/4 py-3 px-4 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {panier.map((item, index) => (
                            <tr key={index} className="bg-gray-800">
                                <td className="border-t py-3 px-4">{item.title}</td>
                                <td className="border-t py-3 px-4">{item.description}</td>
                                <td className="border-t py-3 px-4">{item.prix}</td>
                                <td className="border-t py-3 px-4">
                                    <button onClick={handleConfirmation} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Confirmer</button>
                                    <button
                                        onClick={() => supprimerDuPanier(index)}
                                        className="ml-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr className="bg-gray-800">
                            <td className="py-2 px-4 font-bold" colSpan="3">Total</td>
                            <td className="py-2 px-4 font-bold">{calculerTotal()} MAD</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {showForm && (
                <div className="mt-6 bg-white p-6 rounded-md shadow-md max-w-lg mx-auto">
                    <h3 className="text-2xl font-bold mb-4">Formulaire d'inscription</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Nom:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Adresse:</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2">Téléphone:</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <button type="submit" onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Soumettre</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default MonPanier;

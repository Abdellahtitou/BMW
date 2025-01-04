import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddVoiture = () => {
    const [formData, setFormData] = useState({
        title: '',
        Energie: '',
        prix: '',
        image: null,
        voiture: '' 
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        try {
            const response = await axios.post('http://localhost:3002/BMW', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status === 201) {
                alert('Voiture ajouté avec succès!');
                setFormData({
                    title: '',
                    Energie: '',
                    prix: '',
                    image: 'null',
                    voiture: '' 
                });
            } else {
                alert('Erreur: ' + response.data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Erreur lors de l\'ajout du Voiture.');
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Ajouter une Voiture</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="nom" className="block text-gray-700 font-medium mb-2">title:</label>
                    <input 
                        type="text" 
                        id="title" 
                        name="title" 
                        value={formData.title} 
                        onChange={handleChange} 
                        required 
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>

                <div>
                    <label htmlFor="marque" className="block text-gray-700 font-medium mb-2">Energie:</label>
                    <input 
                        type="text" 
                        id="Energie" 
                        name="Energie" 
                        value={formData.Energie} 
                        onChange={handleChange} 
                        required 
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>

                <div>
                    <label htmlFor="prix" className="block text-gray-700 font-medium mb-2">Prix:</label>
                    <input 
                        type="number" 
                        id="prix" 
                        name="prix" 
                        value={formData.prix} 
                        onChange={handleChange} 
                        required 
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    />
                </div>
                
                <div>
                    <label htmlFor="voiture" className="block text-gray-700 font-medium mb-2">Voiture:</label>
                    <select
                        id="voiture"
                        name="voiture"
                        value={formData.voiture}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded-lg"
                    >
                        <option value="">Sélectionnez une voiture</option>
                        <option value="berlins">Berlins</option>
                        <option value="compacts">Compacts</option>
                        <option value="electriques">Électriques</option>
                        <option value="bmwis">BMWis</option>
                    </select>
                </div>

                <div className="text-center">
                    <button 
                        type="submit" 
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
                    >
                        Ajouter Voiture
                    </button>
                </div>
                <Link to={`/Accueil`} className="mt-4 text-blue-500 hover:underline">Revenir</Link>
            </form>
        </div>
    );
};

export default AddVoiture;

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3002;


app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/BMW', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const berlinSchema = new mongoose.Schema({
  id: Number,
  title: String,
  Energie: String,
  prix: Number,
  image: String
});

const Berlin = mongoose.model('Berlin', berlinSchema);


app.get('/Berlins', async (req, res) => {
  try {
    const berlins = await Berlin.find();
    res.json(berlins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


const compactSchema = new mongoose.Schema({
  id: Number,
  title: String,
  Energie: String,
  prix : Number,
  image: String
});

const   Compact = mongoose.model('Compact', compactSchema);


app.get('/compacts', async (req, res) => {
  try {
    const compacts = await  Compact.find();
    res.json(compacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const coupeSchema = new mongoose.Schema({
  id: Number,
  title: String,
  Energie: String,
  prix : Number,
  image: String
});

const   Coupe = mongoose.model('Coupe', coupeSchema);


app.get('/coupes', async (req, res) => {
  try {
    const coupes = await  Coupe.find();
    res.json(coupes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const bmwiSchema = new mongoose.Schema({
  id: Number,
  title: String,
  Energie: String,
  prix : Number,
  image: String
});

const   Bmwi = mongoose.model('Bmwi', bmwiSchema);


app.get('/bmwis', async (req, res) => {
  try {
    const bmwis = await  Bmwi.find();
    res.json(bmwis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const electriqueSchema = new mongoose.Schema({
  id: Number,
  title: String,
  Energie: String,
  prix : Number,
  image: String
});

const Electrique = mongoose.model('Electrique', electriqueSchema);

app.get('/electriques', async (req, res) => {
  try {
    const electriques = await Electrique.find();
    res.json(electriques);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const clientSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
});

const Client = mongoose.model('Client', clientSchema);


app.post('/clients', async (req, res) => {
  try {
      const { name, email, phone } = req.body;
      const client = new Client({
          name,
          email,
          phone
      });
      await client.save();
      res.status(201).send(client);
  } catch (error) {
      console.error(error);
      res.status(500).send('Erreur lors de la sauvegarde du client');
  }
});

const voitureSchema = new mongoose.Schema({
  title: String,
  Energie: String,
  prix: Number,
  voiture: String
});

const Voiture = mongoose.model('Voiture', voitureSchema);

app.post('/BMW', async (req, res) => {
  const { title, Energie, prix, voiture } = req.body;

  const newVoiture = new Voiture({
      title,
      Energie,
      prix,
      voiture
  });

  try {
      const savedVoiture = await newVoiture.save();
      res.status(201).json(savedVoiture);
  } catch (error) {
      res.status(500).json({ error: 'Erreur lors de l\'ajout de la voiture' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

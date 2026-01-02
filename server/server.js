require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Connect to DB (Replace with your actual MongoDB URL later if needed)
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/contacts')
  .then(() => console.log('DB Connected'))
  .catch(err => console.log(err));

const Contact = mongoose.model('Contact', { name: String, email: String, phone: String });

app.get('/contacts', async (req, res) => res.json(await Contact.find()));
app.post('/contacts', async (req, res) => res.json(await new Contact(req.body).save()));
app.delete('/contacts/:id', async (req, res) => res.json(await Contact.findByIdAndDelete(req.params.id)));

app.listen(5000, () => console.log('Server running on 5000'));
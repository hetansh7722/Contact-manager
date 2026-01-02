import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '' });

  // Gets data from backend
  useEffect(() => {
    axios.get('http://localhost:5000/contacts').then(res => setContacts(res.data));
  }, []);

  // Sends data to backend
  const save = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/contacts', form);
    setContacts([...contacts, res.data]);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Contacts</h1>
      <form onSubmit={save}>
        <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})} />
        <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} />
        <input placeholder="Phone" onChange={e => setForm({...form, phone: e.target.value})} />
        <button>Add</button>
      </form>
      {contacts.map(c => <h3 key={c._id}>{c.name} - {c.email}</h3>)}
    </div>
  );
}
export default App;
import React, { useState } from 'react';
import axios from 'axios';

function Antecedentes({ onGuardarAntecedente }) {
  const [informacionAdicional, setInformacionAdicional] = useState('');
  const [formData, setFormData] = useState('');

  const handleChange = (e) => {
    setInformacionAdicional(e.target.value);
  };
  const guardarAntecedente = () => {
    onGuardarAntecedente(informacionAdicional);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/form', { data: formData });
      console.log('Data submitted successfully!');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };
  return (
    <div className="container">
      <h2 className="mb-4">2. ANTECEDENTES:</h2>
      <div className="mb-3">

       
     
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Data:
          <input type="text" value={formData} onChange={(e) => setFormData(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>

      {/* Agrega más información y campos si es necesario */}
    </div>
  );
};

export default Antecedentes;


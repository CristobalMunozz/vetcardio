// Antecedentes.js
import React, { useState } from 'react';

function Antecedentes() {
  const [informacionAdicional, setInformacionAdicional] = useState('');

  const handleChange = (e) => {
    setInformacionAdicional(e.target.value);
  };

  return (
    <div>
      <h2>2. ANTECEDENTES:</h2>
      <p>Se realiza la toma de presion en un ambiente tranquilo...</p>
      <textarea
        rows="4"
        cols="50"
        value={informacionAdicional}
        onChange={handleChange}
        placeholder="Escribe información adicional aquí"
      />
      {/* Agrega más información y campos si es necesario */}
    </div>
  );
}

export default Antecedentes;

import React, { useState } from 'react';

function Antecedentes({ onGuardarAntecedente }) {
  const [informacionAdicional, setInformacionAdicional] = useState('');

  const handleChange = (e) => {
    setInformacionAdicional(e.target.value);
  };
  const guardarAntecedente = () => {
    onGuardarAntecedente(informacionAdicional);
  };
  return (
    <div className="container">
      <h2 className="mb-4">2. ANTECEDENTES:</h2>
      <div className="mb-3">
        <label htmlFor="informacionAdicional" className="form-label">
          Información Adicional:
        </label>
        <textarea
          className="form-control"
          rows="4"
          cols="50"
          id="informacionAdicional"
          value={informacionAdicional}
          onChange={handleChange}
          placeholder="Escribe información adicional aquí"
        />

        <button onClick={guardarAntecedente}>Guardar Antecedentes</button>
      </div>

      {/* Agrega más información y campos si es necesario */}
    </div>
  );
};

export default Antecedentes;


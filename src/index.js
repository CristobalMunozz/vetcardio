import React from "react";
import ReactDOM from "react-dom/client";
import Formulario from './Formulario';

//contante para renderizar root
const root = ReactDOM.createRoot(document.getElementById("root"));

//componente (primera con Mayuscula)

function App() {
    return (
      <div className="App">
        <Formulario />
      </div>
    );
  }
  
  export default App;

//elementos hijos ,aplicacion html,siempre con div que contenga todos los componentes.
root.render(
  <div>
    <Formulario />
  </div>
);

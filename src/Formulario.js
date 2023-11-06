import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import InformacionPaciente from "./InformacionPaciente";
import Antecedentes from "./Antecedentes";
import TablaMedicion from "./TablaMedicion";

function Formulario() {
  const [informacionPaciente, setInformacionPaciente] = useState({});
  const [antecedentes, setAntecedentes] = useState("");
  const [mediciones, setMediciones] = useState([
    { pas: '', pad: '', pam: '', fc: '' },
    { pas: '', pad: '', pam: '', fc: '' },
    { pas: '', pad: '', pam: '', fc: '' },
    { pas: '', pad: '', pam: '', fc: '' },
    { pas: '', pad: '', pam: '', fc: '' },
    { pas: '', pad: '', pam: '', fc: '' },
    { pas: '', pad: '', pam: '', fc: '' },
    { pas: '', pad: '', pam: '', fc: '' },
    { pas: '', pad: '', pam: '', fc: '' },
  ]);

  // Agrega un estado para guardar la información de antecedentes
  const [infoAntecedentes, setInfoAntecedentes] = useState('');

  const handleGuardarInformacion = (data) => {
    setInformacionPaciente(data);
  };

  const handleGuardarAntecedentes = (data) => {
    // Guardar la información de antecedentes en el nuevo estado
    setInfoAntecedentes(data);
  };

  const handleGuardarTablaMedicion = (data) => {
    setMediciones(data);
  };

  // generacion del informe en pdf
  const generarPDF = () => {
    const doc = new jsPDF();

    // Agregar el título al PDF
    doc.setFontSize(16);
    doc.text("INFORME DE PRESIÓN ARTERIAL", 20, 15);

    // Agregar sección de Información del Paciente en columnas
    doc.setFontSize(14);
    doc.text("1. Información del Paciente", 20, 30);
    doc.setFontSize(12);

    const infoPacienteData = [
      ["Paciente:", informacionPaciente.paciente],
      ["Fecha de Medición:", informacionPaciente.fechaMedicion],
      ["Especie:", informacionPaciente.especie],
      ["Raza:", informacionPaciente.raza],
      ["Color:", informacionPaciente.color],
      ["Sexo:", informacionPaciente.sexo],
      ["Edad:", informacionPaciente.edad],
      ["Tipo de Atención:", informacionPaciente.tipoAtencion],
      ["Tutor:", informacionPaciente.tutor],
    ];

    doc.autoTable({
      body: infoPacienteData,
      startY: 40,
      styles: { fontSize: 12 },
      columnStyles: {
        0: { fontStyle: "bold" },
      },
    });

    doc.setFontSize(14);
    doc.text("2. ANTECEDENTES:", 20, doc.autoTable.previous.finalY + 10);
    doc.setFontSize(12);

    const splitAntecedentes = doc.splitTextToSize(infoAntecedentes, 170);
    const antecedentesY = doc.autoTable.previous.finalY + 10;

    if (antecedentesY + doc.getTextDimensions(splitAntecedentes).h > 280) {
      doc.addPage();
      doc.setFontSize(12);
    }

    doc.text(splitAntecedentes, 20, antecedentesY);


// Espacio entre secciones
const espacioEntreSecciones = 20; // Puedes ajustar el valor según tus necesidades

// Agregar sección de Tabla de Medición
doc.addPage(); // Agrega una nueva página
doc.setFontSize(14);
doc.text("3. TABLA DE MEDICION DE PRESION", 20, espacioEntreSecciones);
doc.setFontSize(12); // Esto define el tamaño de fuente para el contenido de la tabla

// Calcular el promedio
const promedioPas = calcularPromedio('pas');
const promedioPad = calcularPromedio('pad');
const promedioPam = calcularPromedio('pam');
const promedioFc = calcularPromedio('fc');

const tableData = mediciones.map((medida, index) => [
  index + 1,
  medida.pas,
  medida.pad,
  medida.pam,
  medida.fc,
]);

const tableOptions = {
  startY: espacioEntreSecciones + 30, // Iniciar la tabla después del título
  margin: { top: 80 },
};
doc.autoTable({
  head: [['Nº', 'PAS', 'PAD', 'PAM', 'FC']],
  body: tableData,
  startY: espacioEntreSecciones + 30, // Iniciar la tabla después del título
});

doc.text("Promedio:", 20, doc.autoTable.previous.finalY + 10);
doc.text(`PAS: ${promedioPas}`, 50, doc.autoTable.previous.finalY + 10);
doc.text(`PAD: ${promedioPad}`, 80, doc.autoTable.previous.finalY + 10);
doc.text(`PAM: ${promedioPam}`, 110, doc.autoTable.previous.finalY + 10);
doc.text(`FC: ${promedioFc}`, 140, doc.autoTable.previous.finalY + 10);

doc.save("InformePresionArterial.pdf");

  };

  const calcularPromedio = (columna) => {
    const valores = mediciones.map((medida) => Number(medida[columna]) || 0);
    const promedio = valores.reduce((acc, curr) => acc + curr, 0) / valores.length;
    return promedio.toFixed(1);
  };

  return (
    <div>
      <h1>INFORME MEDICIÓN DE PRESIÓN ARTERIAL</h1>
      <InformacionPaciente onGuardarInformacion={handleGuardarInformacion} />
      <Antecedentes onGuardarAntecedentes={handleGuardarAntecedentes} />
      <TablaMedicion onGuardarTablaMedicion={handleGuardarTablaMedicion} />

      <button onClick={generarPDF}>Generar PDF</button>
    </div>
  );
}

export default Formulario;

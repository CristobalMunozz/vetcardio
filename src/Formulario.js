import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import InformacionPaciente from "./InformacionPaciente";
import Antecedentes from "./Antecedentes";
import TablaMedicion from "./TablaMedicion";
//import logoImage from "./moniflores-01_140x.PNG";

function Formulario() {
  const [informacionPaciente, setInformacionPaciente] = useState({});
  const [infoAntecedentes, setAntecedentes] = useState('');

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

  const handleGuardarInformacion = (data) => {
    setInformacionPaciente(data);
  };

  const handleGuardarAntecedentes = (data) => {
    setAntecedentes(data);
  };

  const handleGuardarTablaMedicion = (data) => {
    setMediciones(data);
  };

  // generación del informe en PDF
const generarPDF = () => {
  const doc = new jsPDF();

  //doc.addImage(logoImage, "PNG", 20, 10, 50, 50); // Ajusta las coordenadas y dimensiones según tu diseño

  // Agregar el título al PDF
  doc.setFontSize(16);
  doc.text(" INFORME DE PRESIÓN ARTERIAL", 20, 30);

  // Agregar sección de Información del Paciente
  doc.setFontSize(14);
  doc.text("1. INFORMACION DEL PACIENTE", 20, 50);
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
    startY: 60, // Establece la posición Y donde comienza la tabla
    styles: { fontSize: 12 },
    columnStyles: {
      0: { fontStyle: "bold" },
    },
  });
  
  // Ajustar la posición Y para la siguiente sección (Antecedentes)
  const nuevaPosicionYAntecedentes = doc.autoTable.previous.finalY + 10;
  
  // Agregar sección de Antecedentes
  doc.setFontSize(14);
  doc.text("2. ANTECEDENTES:", 20, nuevaPosicionYAntecedentes);
  doc.setFontSize(12);
  
  const splitAntecedentes = doc.splitTextToSize(infoAntecedentes, 170);
  doc.text(splitAntecedentes, 20, nuevaPosicionYAntecedentes + 20); //

  // Agregar sección de Tabla de Medición
  doc.addPage(); // Nueva página para Tabla de Medición
  doc.setFontSize(14);
  doc.text("3. TABLA DE MEDICIÓN DE PRESIÓN", 20, 30);
  doc.setFontSize(12);

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

  doc.autoTable({
    head: [['Nº', 'PAS', 'PAD', 'PAM', 'FC']],
    body: tableData,
    startY: 40,
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
    <div className="container mt-6">
      <h1 className="text-center mb-4">INFORME MEDICIÓN DE PRESIÓN ARTERIAL</h1>

      <div className="row">
        <div className="col-md-6 mb-4">
          <h2 className="mb-3">1. Información del Paciente</h2>
          <InformacionPaciente onGuardarInformacion={handleGuardarInformacion} />
        </div>

        <div className="col-md-6 mb-4">
          <h2 className="mb-3">2. Antecedentes</h2>
          <Antecedentes onGuardarAntecedente={handleGuardarAntecedentes} />
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <h2 className="mb-3">3. Tabla de Medición de Presión</h2>
          <TablaMedicion onGuardarTablaMedicion={handleGuardarTablaMedicion} />
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-12">
          <button className="btn btn-primary" onClick={generarPDF}>Generar PDF</button>
        </div>
      </div>
    </div>

  );
}

export default Formulario;

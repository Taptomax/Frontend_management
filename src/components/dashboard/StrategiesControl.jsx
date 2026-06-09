import React, { useState, useEffect } from 'react';
import styles from "./dashboardStyles.js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function StrategiesControl() {
  const [strategies, setStrategies] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const getTodayString = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const fetchStrategies = async () => {
    setLoadingTable(true);
    try {
      const response = await fetch(`${API_BASE_URL}/strategies`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        }
      });
      const resData = await response.json();
      if (response.ok && resData.success) {
        setStrategies(resData.data);
      }
    } catch (err) {
      console.error("Error al leer iniciativas:", err);
    } finally {
      setLoadingTable(false);
    }
  };

  useEffect(() => {
    fetchStrategies();
  }, []);

  const handleSubmitStrategy = async (e) => {
    e.preventDefault();
    setLoadingBtn(true);
    setErrorMsg('');
    setSuccessMsg('');

    const form = new FormData(e.target);
    
    const payload = {
      idIndicador: parseInt(form.get('idIndicador')),
      nombreEstrategia: form.get('nombreEstrategia').trim(),
      descripcion: form.get('descripcion').trim(),
      fechaImplementacion: form.get('fechaImplementacion'),
      responsable: form.get('responsable').trim()
    };

    try {
      const response = await fetch(`${API_BASE_URL}/strategies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify(payload)
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setSuccessMsg(` Estrategia vinculada con éxito al KPI: "${resData.data.indicadorAfectado}".`);
        e.target.reset();
        fetchStrategies(); 
      } else {
        setErrorMsg(resData.error || 'No cumple con las reglas de longitud o validación de la estrategia.');
      }
    } catch (err) {
      console.error("Error de red en Estrategias:", err);
      setErrorMsg('Fallo de comunicación con el clúster remoto.');
    } finally {
      setLoadingBtn(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* SECCIÓN 1: Formulario de Iniciativas de Mitigación */}
      <section style={styles.container}>
        <h3 style={{ marginTop: 0, color: '#34495E' }}> Formulación de Iniciativas y Decisiones Estratégicas</h3>
        <p style={{ color: '#7F8C8D', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
          Módulo ejecutivo para registrar planes de contingencia táctica frente a desviaciones negativas en los indicadores de control gerencial.
        </p>

        {errorMsg && (
          <div style={{ backgroundColor: '#FFEBEE', color: '#C62828', padding: '0.8rem', borderRadius: '4px', fontWeight: 'bold', marginBottom: '1rem', fontSize: '0.9rem' }}>
            ⚠️ Error de Regla: {errorMsg}
          </div>
        )}
        {successMsg && (
          <div style={{ backgroundColor: '#E8F5E9', color: '#2E7D32', padding: '0.8rem', borderRadius: '4px', fontWeight: 'bold', marginBottom: '1rem', fontSize: '0.9rem' }}>
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmitStrategy} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={styles.label}>Indicador Crítico a Mitigar:</label>
              <select name="idIndicador" required style={styles.select}>
                <option value="1">ID 1 - Índice de Satisfacción del Cliente</option>
                <option value="2">ID 2 - Margen de Utilidad Operativa</option>
                <option value="3">ID 3 - Tiempo Promedio de Entrega</option>
                <option value="4">ID 4 - Retención del Talento Humano</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={styles.label}>Nombre de la Estrategia Gerencial:</label>
              <input 
                type="text" 
                name="nombreEstrategia" 
                required 
                placeholder="Mínimo 5 letras. Ej: Campaña de Fidelización Express" 
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #BDC3C7' }} 
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={styles.label}>Justificación Técnica y Descripción Operativa del Plan:</label>
            <textarea 
              name="descripcion" 
              required 
              rows={3}
              placeholder="Mínimo 10 letras. Detalla exhaustivamente el plan de acción táctico corporativo..." 
              style={{ padding: '8px', borderRadius: '4px', border: '1px solid #BDC3C7', resize: 'vertical', fontFamily: 'inherit' }} 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={styles.label}>Fecha Límite de Implementación:</label>
              <input 
                type="text" 
                name="fechaImplementacion" 
                required 
                defaultValue={getTodayString()} 
                placeholder="YYYY-MM-DD"
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #BDC3C7' }} 
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={styles.label}>Área o Ejecutivo Responsable:</label>
              <input 
                type="text" 
                name="responsable" 
                required 
                placeholder="Ej: Gerencia de Operaciones - Carlos Mamani" 
                style={{ padding: '8px', borderRadius: '4px', border: '1px solid #BDC3C7' }} 
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '5px' }}>
            <button
              type="submit"
              disabled={loadingBtn}
              style={{ ...styles.btnAction, backgroundColor: loadingBtn ? '#BDC3C7' : '#2980B9', padding: '10px 24px', fontWeight: 'bold' }}
            >
              {loadingBtn ? 'Procesando Directriz...' : ' Desplegar Iniciativa Estratégica'}
            </button>
          </div>
        </form>
      </section>

      {/* SECCIÓN 2: Historial de Directrices Tácticas */}
      <section style={styles.container}>
        <h3 style={{ marginTop: 0, color: '#34495E', marginBottom: '1rem' }}> Registro Histórico de Acciones Tácticas Desplegadas</h3>
        
        {loadingTable ? (
          <p style={{ color: '#7F8C8D' }}>⏳ Cargando matriz de decisiones estratégicas...</p>
        ) : strategies.length === 0 ? (
          <p style={{ color: '#7F8C8D', fontStyle: 'italic' }}>No se han registrado planes de mitigación en este ciclo operativo.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Indicador Afectado</th>
                <th style={styles.th}>Estrategia Implementada</th>
                <th style={styles.th}>Descripción del Plan de Acción</th>
                <th style={styles.th}>Fecha Límite</th>
                <th style={styles.th}>Responsable de Ejecución</th>
              </tr>
            </thead>
            <tbody>
              {strategies.map((s) => (
                <tr key={s.idEstrategia}>
                  <td style={styles.td}>{s.idEstrategia}</td>
                  <td style={styles.td} style={{ color: '#C0392B', fontWeight: '500' }}>{s.IndicadorCritico}</td>
                  <td style={styles.td} style={{ fontWeight: 'bold', color: '#2C3E50' }}>{s.NombreEstrategia}</td>
                  <td style={styles.td} style={{ fontSize: '0.85rem', color: '#5D6D7E', maxWidth: '300px', lineHeight: '1.2rem' }}>{s.Descripcion}</td>
                  <td style={styles.td} style={{ whiteSpace: 'nowrap' }}>{s.FechaImplementacion.split('T')[0]}</td>
                  <td style={styles.td} style={{ fontWeight: '500', color: '#16A085' }}>{s.Responsable}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

    </div>
  );
}
import React, { useState, useEffect } from 'react';
import styles from "./dashboardStyles.js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function KPIGoals() {
  const [goals, setGoals] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const fetchGoals = async () => {
    setLoadingTable(true);
    try {
      const response = await fetch(`${API_BASE_URL}/kpis/goals`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        }
      });
      const resData = await response.json();
      if (response.ok && resData.success) {
        setGoals(resData.data);
      }
    } catch (err) {
      console.error("Error cargando metas:", err);
    } finally {
      setLoadingTable(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleSubmitGoal = async (e) => {
    e.preventDefault();
    setLoadingBtn(true);
    setErrorMsg('');
    setSuccessMsg('');

    const form = new FormData(e.target);

    const payload = {
      idIndicador: parseInt(form.get('idIndicador')),
      anio: parseInt(form.get('anio')),
      mes: parseInt(form.get('mes')),
      valorObjetivo: parseFloat(form.get('valorObjetivo')),
      umbralVerde: parseFloat(form.get('umbralVerde')),
      umbralAmarillo: parseFloat(form.get('umbralAmarillo'))
    };

    try {
      const response = await fetch(`${API_BASE_URL}/kpis/goals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify(payload)
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setSuccessMsg(` ¡Meta guardada señor adminitrador! KPI: ${resData.data.kpi} para el periodo ${resData.data.period}.`);
        e.target.reset();
        fetchGoals();
      } else {
        setErrorMsg(resData.error || 'Error al procesar la meta por reglas de Zod.');
      }
    } catch (err) {
      console.error("Error de red:", err);
      setErrorMsg('No se pudo establecer conexión para registrar la planificación.');
    } finally {
      setLoadingBtn(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* SECCIÓN 1: Formulario Administrativo */}
      <section style={styles.container}>
        <h3 style={{ marginTop: 0, color: '#34495E' }}> Planificación de Metas Estratégicas (CMI)</h3>
        <p style={{ color: '#7F8C8D', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
          Define los objetivos y umbrales del semáforo para el control gerencial. Los valores deben ser estrictamente positivos.
        </p>

        {errorMsg && (
          <div style={{ backgroundColor: '#FFEBEE', color: '#C62828', padding: '0.8rem', borderRadius: '4px', fontWeight: 'bold', marginBottom: '1rem', fontSize: '0.9rem' }}>
            ⚠️ {errorMsg}
          </div>
        )}
        {successMsg && (
          <div style={{ backgroundColor: '#E8F5E9', color: '#2E7D32', padding: '0.8rem', borderRadius: '4px', fontWeight: 'bold', marginBottom: '1rem', fontSize: '0.9rem' }}>
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmitGoal} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={styles.label}>Indicador de Gestión:</label>
            <select name="idIndicador" required style={styles.select}>
              <option value="1">ID 1 - Índice de Satisfacción del Cliente</option>
              <option value="2">ID 2 - Margen de Utilidad Operativa</option>
              <option value="3">ID 3 - Tiempo Promedio de Entrega</option>
              <option value="4">ID 4 - Retención del Talento Humano</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={styles.label}>Año de Gestión:</label>
            <select name="anio" required style={styles.select}>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={styles.label}>Mes Corporativo:</label>
            <select name="mes" required style={styles.select}>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>Mes {i + 1}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={styles.label}>Valor Objetivo (Meta % o Valor):</label>
            <input type="number" step="0.01" name="valorObjetivo" required placeholder="Ej: 95.00" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #BDC3C7' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={styles.label}>Umbral Verde (Mínimo Óptimo):</label>
            <input type="number" step="0.01" name="umbralVerde" required placeholder="Ej: 85.00" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #BDC3C7' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={styles.label}>Umbral Amarillo (Límite Alerta):</label>
            <input type="number" step="0.01" name="umbralAmarillo" required placeholder="Ej: 70.00" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #BDC3C7' }} />
          </div>

          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button
              type="submit"
              disabled={loadingBtn}
              style={{ ...styles.btnAction, backgroundColor: loadingBtn ? '#BDC3C7' : '#27AE60', padding: '10px 20px', fontWeight: 'bold' }}
            >
              {loadingBtn ? 'Guardando...' : '💾 Registrar Meta Estratégica'}
            </button>
          </div>
        </form>
      </section>

      {/* SECCIÓN 2: Historial de Control de Metas */}
      <section style={styles.container}>
        <h3 style={{ marginTop: 0, color: '#34495E', marginBottom: '1rem' }}> Historial de Metas Configuradas</h3>

        {loadingTable ? (
          <p style={{ color: '#7F8C8D' }}>⏳ Leyendo base de datos del CMI...</p>
        ) : goals.length === 0 ? (
          <p style={{ color: '#7F8C8D', fontStyle: 'italic' }}>No se han parametrizado objetivos de rendimiento todavía.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Perspectiva CMI</th>
                <th style={styles.th}>Indicador (KPI)</th>
                <th style={styles.th}>Periodo</th>
                <th style={styles.th}>Valor Objetivo</th>
                <th style={styles.th}>Umbral Verde</th>
                <th style={styles.th}>Umbral Amarillo</th>
              </tr>
            </thead>
            <tbody>
              {goals.map((g) => (
                <tr key={g.idMeta}>
                  <td style={styles.td} style={{ fontWeight: 'bold', color: '#2980B9' }}>{g.NombrePerspectiva}</td>
                  <td style={styles.td}>{g.NombreIndicador}</td>
                  <td style={styles.td}>{`${g.Mes}/${g.Anio}`}</td>
                  <td style={styles.td} style={{ fontWeight: 'bold' }}>{g.ValorObjetivo.toFixed(2)}</td>
                  <td style={styles.td} style={{ color: '#27AE60', fontWeight: 'bold' }}>≥ {g.UmbralVerde.toFixed(2)}</td>
                  <td style={styles.td} style={{ color: '#F39C12', fontWeight: 'bold' }}>≥ {g.UmbralAmarillo.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

    </div>
  );
}
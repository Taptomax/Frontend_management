import React, { useState, useEffect } from 'react';
import styles from "./dashboardStyles.js";
import DashboardCMI from './DashboardCMI';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function DashboardHome() {
  const [dashboard, setDashboard] = useState(null);
  const [anio, setAnio] = useState('2026');
  const [mes, setMes] = useState('6'); // Junio por defecto, alineado a tus pruebas
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fetchDashboardData = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const response = await fetch(`${API_BASE_URL}/analytics/dashboard?anio=${anio}&mes=${mes}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        }
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setDashboard(resData.data);
      } else {
        setErrorMsg(resData.error || 'No se pudo procesar la matriz analítica.');
      }
    } catch (err) {
      console.error("Error en motor analítico:", err);
      setErrorMsg('Error de enlace con el servidor de inteligencia de negocios.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [anio, mes]);


  const getBadgeStyle = (estado) => {
    switch (estado) {
      case 'Verde':
        return { backgroundColor: '#E8F5E9', color: '#2E7D32', border: '1px solid #A5D6A7' };
      case 'Amarillo':
        return { backgroundColor: '#FFFDE7', color: '#F57F17', border: '1px solid #FFF59D' };
      case 'Rojo':
        return { backgroundColor: '#FFEBEE', color: '#C62828', border: '1px solid #EF9A9A' };
      default:
        return { backgroundColor: '#F5F5F5', color: '#757575', border: '1px solid #E0E0E0' };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* ─── CUADRO DE MANDO INTEGRAL ─── */}
      <DashboardCMI />

      {/* Selector Ejecutivo de Periodo */}
      <section style={styles.container}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ marginTop: 0, color: '#34495E', marginBottom: '5px' }}> Filtro de Control Directivo</h3>
            <p style={{ color: '#7F8C8D', fontSize: '0.85rem', margin: 0 }}>Selecciona el periodo fiscal para evaluar el comportamiento del Copo de Nieve.</p>
          </div>

          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <label style={styles.label}>Año:</label>
            <select value={anio} onChange={(e) => setAnio(e.target.value)} style={styles.select}>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
            </select>

            <label style={styles.label}>Mes:</label>
            <select value={mes} onChange={(e) => setMes(e.target.value)} style={styles.select}>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>Mes {i + 1}</option>
              ))}
            </select>

            <button
              onClick={fetchDashboardData}
              style={{ ...styles.btnAction, padding: '8px 16px', fontSize: '0.85rem' }}
            >
              Recalcular Tablero
            </button>
          </div>
        </div>
      </section>

      {errorMsg && (
        <div style={{ backgroundColor: '#FFEBEE', color: '#C62828', padding: '1rem', borderRadius: '4px', fontWeight: 'bold' }}>
          ⚠️ {errorMsg}
        </div>
      )}

      {/* Matriz del Cuadro de Mando Integral */}
      <section style={styles.container}>
        <h3 style={{ marginTop: 0, color: '#34495E', marginBottom: '1.5rem' }}>
          📊 Balance Scorecard (Periodo Fiscal: {dashboard?.period || `${mes}/${anio}`})
        </h3>

        {loading ? (
          <p style={{ color: '#7F8C8D' }}>⏳ Evaluando variables de latencia y procesando cubos relacionales...</p>
        ) : !dashboard || !dashboard.indicadores || dashboard.indicadores.length === 0 ? (
          <p style={{ color: '#7F8C8D', fontStyle: 'italic' }}>
            {dashboard?.mensaje || 'No hay metas parametrizadas para este periodo. Dirígete a "Configurar Metas" primero.'}
          </p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Perspectiva CMI</th>
                <th style={styles.th}>Indicador Clave (KPI)</th>
                <th style={styles.th}>Meta Parametrizada</th>
                <th style={styles.th}>Realidad Data Warehouse</th>
                <th style={styles.th}>Desempeño (% Cumplimiento)</th>
                <th style={styles.th}>Semáforo Táctico</th>
              </tr>
            </thead>
            <tbody>
              {dashboard.indicadores.map((ind, idx) => (
                <tr key={idx}>
                  <td style={{ ...styles.td, fontWeight: 'bold', color: '#2C3E50' }}>{ind.perspectiva}</td>
                  <td style={styles.td}>{ind.indicador}</td>
                  <td style={{ ...styles.td, fontWeight: '500' }}>
                    {ind.meta.toLocaleString('en-US', { minimumFractionDigits: 2 })} {ind.unidad}
                  </td>
                  <td style={{ ...styles.td, fontWeight: 'bold', color: '#2980B9' }}>
                    {ind.realidad.toLocaleString('en-US', { minimumFractionDigits: 2 })} {ind.unidad}
                  </td>
                  <td style={{ ...styles.td, fontWeight: 'bold' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '60px', backgroundColor: '#ECF0F1', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
                        <div style={{
                          width: `${Math.min(ind.porcentajeCumplimiento, 100)}%`,
                          backgroundColor: ind.estado === 'Verde' ? '#27AE60' : ind.estado === 'Amarillo' ? '#F39C12' : '#C0392B',
                          height: '100%'
                        }} />
                      </div>
                      <span>{ind.porcentajeCumplimiento}%</span>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <span style={{
                      ...getBadgeStyle(ind.estado),
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: 'bold',
                      display: 'inline-block',
                      textAlign: 'center',
                      minWidth: '70px'
                    }}>
                      ● {ind.estado.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

    </div>
  );
}
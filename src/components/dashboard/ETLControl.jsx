import React, { useState } from 'react';
import styles from "./dashboardStyles.js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ETLControl() {
  const [syncResult, setSyncResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleTriggerETL = async () => {
    setLoading(true);
    setErrorMsg('');
    setSyncResult(null);

    try {
      const response = await fetch(`${API_BASE_URL}/etl/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        }
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setSyncResult(resData.data);
      } else {
        setErrorMsg(resData.error || 'Fallo inesperado al procesar el pipeline analitico.');
      }
    } catch (err) {
      console.error("Error al disparar el ETL:", err);
      setErrorMsg('No se pudo establecer contacto con el motor ETL rematado por ngrok.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={styles.container}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ marginTop: 0, color: '#34495E' }}>⚙️ Orquestador del Pipeline de Datos (ETL)</h3>
        <p style={{ color: '#7F8C8D', fontSize: '0.9rem', lineHeight: '1.4rem' }}>
          Este módulo permite consolidar el <strong>Data Warehouse (Copo de Nieve)</strong> de Pollos Copacabana de forma asíncrona.
          Al activarlo, el sistema extrae de manera automática las ventas transaccionales del MIS operativo, las transforma agregando variables de tiempo estructurado y las carga en la tabla de hechos analítica.
        </p>
      </div>

      {/* Botón Maestro Interactivo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '2rem' }}>
        <button
          disabled={loading}
          onClick={handleTriggerETL}
          style={{
            ...styles.btnAction,
            backgroundColor: loading ? '#BDC3C7' : '#CE1126',
            padding: '12px 24px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? ' Procesando Pipeline Analítico...' : 'Disparar Consolidación Histórica'}
        </button>
      </div>

      {/* Caja de feedback de errores */}
      {errorMsg && (
        <div style={{ backgroundColor: '#FFEBEE', color: '#C62828', padding: '1rem', borderRadius: '4px', fontWeight: 'bold', marginBottom: '1.5rem' }}>
          ⚠️ Error Crítico en Ingesta: {errorMsg}
        </div>
      )}

      {/* Despliegue Dinámico de Métricas de Auditoría de BI */}
      {syncResult && (
        <div style={{ backgroundColor: '#E8F5E9', borderLeft: '5px solid #2E7D32', padding: '1.5rem', borderRadius: '4px' }}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#2E7D32', fontSize: '1.1rem' }}>Sincronización Completada con Éxito!</h4>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '1rem' }}>
            <div style={{ backgroundColor: '#FFFFFF', padding: '1rem', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <span style={{ fontSize: '0.85rem', color: '#7F8C8D', display: 'block' }}>Registros Extraídos (MIS)</span>
              <strong style={{ fontSize: '1.8rem', color: '#2C3E50' }}>{syncResult.extracted} filas</strong>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', padding: '1rem', borderRadius: '4px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <span style={{ fontSize: '0.85rem', color: '#7F8C8D', display: 'block' }}>Registros Cargados (DW)</span>
              <strong style={{ fontSize: '1.8rem', color: '#2E7D32' }}>{syncResult.loaded} hechos</strong>
            </div>
          </div>

          <p style={{ margin: 0, fontSize: '0.9rem', color: '#2C3E50', fontWeight: '500' }}>
            <strong>Estado del Motor:</strong> {syncResult.status}
          </p>
        </div>
      )}
    </section>
  );
}
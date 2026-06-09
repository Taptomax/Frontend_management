import React, { useState, useEffect } from 'react';
import styles from "./dashboardStyles.js";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function OLAPQueries() {
  const [olapData, setOlapData] = useState([]);
  const [agruparPor, setAgruparPor] = useState('categoria');
  const [anio, setAnio] = useState('');
  const [mes, setMes] = useState('');
  const [idCiudad, setIdCiudad] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const executeOlapQuery = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      let url = `${API_BASE_URL}/olap/query?agruparPor=${agruparPor}`;
      if (anio) url += `&anio=${anio}`;
      if (mes) url += `&mes=${mes}`;
      if (idCiudad) url += `&idCiudad=${idCiudad}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true'
        }
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setOlapData(resData.data);
      } else {
        setErrorMsg(resData.error || 'Error al procesar el cubo multidimensional.');
      }
    } catch (err) {
      console.error("Error en petición OLAP:", err);
      setErrorMsg('No se pudo establecer contacto con el motor OLAP del Data Warehouse.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    executeOlapQuery();
  }, [agruparPor, anio, mes, idCiudad]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* SECCIÓN 1: Consola de Control del Cubo de Datos */}
      <section style={styles.container}>
        <h3 style={{ marginTop: 0, color: '#34495E', marginBottom: '1rem' }}> Consola de Exploración Multidimensional (Cubo OLAP)</h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '15px' }}>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={styles.label}>Ver Rendimiento por (Eje):</label>
            <select value={agruparPor} onChange={(e) => setAgruparPor(e.target.value)} style={styles.select}>
              <option value="categoria">Categoría de Producto</option>
              <option value="sucursal">Sucursal / Tienda</option>
              <option value="ciudad">Ciudad Geográfica</option>
              <option value="mes">Comportamiento Mensual</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={styles.label}>Filtro de Año:</label>
            <select value={anio} onChange={(e) => setAnio(e.target.value)} style={styles.select}>
              <option value="">-- Todos los Años --</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={styles.label}>Filtro de Mes:</label>
            <select value={mes} onChange={(e) => setMes(e.target.value)} style={styles.select}>
              <option value="">-- Todos los Meses --</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>Mes {i + 1}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <label style={styles.label}>Filtro Geográfico (Ciudad):</label>
            <select value={idCiudad} onChange={(e) => setIdCiudad(e.target.value)} style={styles.select}>
              <option value="">-- Todas las Ciudades --</option>
              <option value="1">La Paz</option>
              <option value="2">Cochabamba</option>
              <option value="3">Santa Cruz</option>
            </select>
          </div>

        </div>
      </section>

      {errorMsg && (
        <div style={{ backgroundColor: '#FFEBEE', color: '#C62828', padding: '1rem', borderRadius: '4px', fontWeight: 'bold' }}>
          ⚠️ {errorMsg}
        </div>
      )}

      {/* SECCIÓN 2: Matriz de Resultados Generados */}
      <section style={styles.container}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ margin: 0, color: '#34495E' }}>📊 Matriz de Resultados OLAP Cruzados</h3>
          <span style={{ fontSize: '0.8rem', backgroundColor: '#EBF5FB', color: '#2980B9', padding: '4px 10px', borderRadius: '4px', fontWeight: 'bold' }}>
            Dimensión Actual: {agruparPor.toUpperCase()}
          </span>
        </div>

        {loading ? (
          <p style={{ color: '#7F8C8D' }}> Segmentando el Cubo Multidimensional...</p>
        ) : olapData.length === 0 ? (
          <p style={{ color: '#7F8C8D', fontStyle: 'italic' }}>No existen hechos consolidados para los filtros cruzados seleccionados.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Eje Analítico</th>
                <th style={styles.th}>Volumen Total Vendido</th>
                <th style={styles.th}>Ingresos Consolidados</th>
                <th style={styles.th}>Tiempo Promedio de Espera</th>
              </tr>
            </thead>
            <tbody>
              {olapData.map((row, idx) => (
                <tr key={idx}>
                  <td style={{ ...styles.td, fontWeight: 'bold', color: '#2C3E50' }}>
                    {agruparPor === 'mes' ? `Mes ${row.EjeAnalitico}` : row.EjeAnalitico}
                  </td>
                  <td style={styles.td}>
                    {row.TotalVolumen.toLocaleString('en-US')} unidades
                  </td>
                  <td style={{ ...styles.td, fontWeight: 'bold', color: '#27AE60' }}>
                    Bs. {row.TotalIngresos.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td style={{ ...styles.td, color: '#D35400', fontWeight: '500' }}>
                    {row.TiempoEsperaPromedio.toFixed(1)} minutos
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
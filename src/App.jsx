import React, { useState } from 'react';
import styles from "./components/dashboard/dashboardStyles.js";

import DashboardHome from './components/dashboard/DashboardHome'; 
import ETLControl from './components/dashboard/ETLControl';
import KPIGoals from './components/dashboard/KPIGoals';
import StrategiesControl from './components/dashboard/StrategiesControl';
import OLAPQueries from './components/dashboard/OLAPQueries';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome />;
      case 'etl':
        return <ETLControl />;
      case 'kpis':
        return <KPIGoals />;
      case 'strategies':
        return <StrategiesControl />;
      case 'olap':
        return <OLAPQueries />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div style={styles.dashboardContainer}>
      {/* Sidebar Gerencial Avanzado */}
      <aside style={styles.sidebar}>
        <div style={styles.logoArea}>
          <h2 style={{ margin: 0, fontSize: '1.2rem', tracking: '1px' }}>COPACABANA MIS</h2>
          <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)' }}>Soporte de Decisiones</span>
        </div>
        
        <nav style={{ flex: 1, padding: '1rem 0' }}>
          <div 
            onClick={() => setActiveTab('dashboard')} 
            style={activeTab === 'dashboard' ? { ...styles.menuLink, ...styles.activeLink } : styles.menuLink}
          >
            📊 Cuadro de Mando CMI
          </div>
          <div 
            onClick={() => setActiveTab('kpis')} 
            style={activeTab === 'kpis' ? { ...styles.menuLink, ...styles.activeLink } : styles.menuLink}
          >
            🎯 Configurar Metas
          </div>
          <div 
            onClick={() => setActiveTab('strategies')} 
            style={activeTab === 'strategies' ? { ...styles.menuLink, ...styles.activeLink } : styles.menuLink}
          >
            🧠 Plan Estratégico
          </div>
          <div 
            onClick={() => setActiveTab('olap')} 
            style={activeTab === 'olap' ? { ...styles.menuLink, ...styles.activeLink } : styles.menuLink}
          >
            🧱 Análisis Cubo OLAP
          </div>
          <div 
            onClick={() => setActiveTab('etl')} 
            style={activeTab === 'etl' ? { ...styles.menuLink, ...styles.activeLink } : styles.menuLink}
          >
            ⚙️ Pipeline ETL Data
          </div>
        </nav>

        <div style={{ padding: '1rem', textAlign: 'center', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          Mateo Torrez · Rol Ejecutivo
        </div>
      </aside>

      {/* Área Central de Contenido */}
      <main style={styles.mainContent}>
        <header style={styles.topHeader}>
          <h2 style={{ margin: 0, color: '#2C3E50', fontSize: '1.3rem' }}>
            {activeTab === 'dashboard' && 'Módulo: Indicadores de Gestión CMI'}
            {activeTab === 'kpis' && 'Módulo: Planificación de Metas de Rendimiento'}
            {activeTab === 'strategies' && 'Módulo: Gestión de Iniciativas Estratégicas'}
            {activeTab === 'olap' && 'Módulo: Consultas Multidimensionales OLAP'}
            {activeTab === 'etl' && 'Módulo: Integración e Ingesta de Datos Históricos (ETL)'}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.8rem', backgroundColor: '#E8F5E9', color: '#2E7D32', padding: '4px 8px', borderRadius: '20px', fontWeight: 'bold' }}>
              ● Sistema Analítico Conectado
            </span>
          </div>
        </header>

        <div style={{ padding: '2rem' }}>
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
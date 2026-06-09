const styles = {
  // Contenedor principal de la aplicación
  dashboardContainer: { 
    display: 'flex', 
    height: '100vh', 
    overflow: 'hidden', 
    fontFamily: 'Segoe UI, sans-serif', 
    backgroundColor: '#F5F7F8', 
  },
  dashboard: { display: 'flex', height: '100vh', overflow: 'hidden', fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#F5F7F8', width: '100vw' },
  
  // Sidebar Gerencial Izquierdo
  sidebar: { 
    width: '260px', 
    background: 'linear-gradient(180deg, #CE1126 0%, #A80E1E 100%)', 
    color: 'white', 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'space-between' 
  },
  logoArea: { 
    padding: '2rem 1.5rem', 
    textAlign: 'center', 
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)', 
    margin: 0 
  },
  brand: { padding: '2rem 1.5rem', textAlign: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' },
  menu: { display: 'flex', flexDirection: 'column', padding: '1rem 0', flexGrow: 1 },
  
  // Enlaces de navegación interactivos
  menuLink: { 
    color: 'rgba(255, 255, 255, 0.8)', 
    padding: '1rem 1.5rem', 
    cursor: 'pointer', 
    textDecoration: 'none', 
    fontSize: '0.95rem', 
    borderLeft: '5px solid transparent', 
    display: 'block', 
    transition: '0.3s' 
  },
  activeLink: { 
    color: 'white', 
    backgroundColor: 'rgba(255, 255, 255, 0.15)', 
    borderLeft: '5px solid #FDB813', 
    paddingLeft: '1.2rem' 
  },
  
  // Contenedor de contenido central (Scrollable)
  mainContent: { 
    flexGrow: 1, 
    overflowY: 'auto', 
    display: 'flex', 
    flexDirection: 'column' 
  },
  
  // Barra Superior Ejecutiva
  topHeader: { 
    backgroundColor: 'white', 
    padding: '1.5rem 2rem', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
    borderBottom: '1px solid #ECF0F1'
  },
  topBar: { backgroundColor: 'white', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' },
  latencyBadge: { backgroundColor: '#E8F5E9', color: '#2E7D32', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' },
  dot: { width: '8px', height: '8px', backgroundColor: '#4CAF50', borderRadius: '50%' },
  
  // Tarjetas de Módulos Analíticos (Cajas Blancas)
  container: { 
    backgroundColor: 'white', 
    padding: '2rem', 
    borderRadius: '12px', 
    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
    border: '1px solid #EBF0F3'
  },
  
  // Grillas para KPIs
  kpiGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', padding: '2rem 2rem 0 2rem' },
  kpiCard: { backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', borderLeft: '4px solid #BDC3C7' },
  
  // Tablas Multidimensionales Estilizadas
  table: { 
    width: '100%', 
    borderCollapse: 'collapse', 
    marginTop: '1.5rem',
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  th: { 
    backgroundColor: '#F8F9FA', 
    padding: '1rem', 
    color: '#7F8C8D', 
    fontSize: '0.85rem', 
    textTransform: 'uppercase', 
    textAlign: 'left',
    fontWeight: '600',
    borderBottom: '2px solid #EBF0F3'
  },
  td: { 
    padding: '1rem', 
    borderBottom: '1px solid #ECF0F1', 
    fontSize: '0.95rem',
    color: '#2C3E50',
    verticalAlign: 'middle'
  },
  
  // Formularios de Control
  select: { 
    padding: '10px', 
    fontSize: '0.95rem', 
    borderRadius: '6px', 
    border: '1px solid #CFD8DC', 
    backgroundColor: 'white',
    color: '#2C3E50',
    outline: 'none',
    cursor: 'pointer'
  },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '1rem' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '5px' },
  input: { padding: '8px', borderRadius: '4px', border: '1px solid #CFD8DC', fontSize: '1rem' },
  label: { 
    fontWeight: '600', 
    color: '#34495E', 
    fontSize: '0.85rem',
    marginBottom: '4px'
  },
  
  // Botones Maestros de Acción
  btnAction: { 
    backgroundColor: '#CE1126', 
    color: 'white', 
    border: 'none', 
    padding: '10px 20px', 
    borderRadius: '6px', 
    cursor: 'pointer', 
    fontWeight: 'bold', 
    fontSize: '0.95rem', 
    transition: '0.2s ease',
    boxShadow: '0 2px 4px rgba(206,17,38,0.2)',
    ':hover': {
      backgroundColor: '#A80E1E'
    }
  }
};

export default styles;

export default function DashboardCMI() {

    const urlPowerBI = "https://app.powerbi.com/reportEmbed?reportId=961f9beb-357f-4edf-9b2c-98af8592bc41&autoAuth=true";

    return (
        <div style={{ width: '100%', height: '78vh', marginTop: '1rem' }}>
            <iframe
                title="Tablero CMI Pollos Copacabana"
                src={urlPowerBI}
                frameBorder="0"
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    border: '1px solid #EBF0F3'
                }}
                allowFullScreen={true}
            ></iframe>
        </div>
    );
}
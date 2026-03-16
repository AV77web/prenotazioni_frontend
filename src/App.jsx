import { useState } from 'react';
import { AuthProvider, useAuth } from "./components/Context/AuthContext";
import { Header } from "./components/Header/Header.jsx";
import { Table } from "./components/Table/Table.jsx";
import { VerificaPrenotazione } from "./components/VerificaPrenotazione.jsx/VerificaPrenotazione.jsx";
import "./App.css";
/**
 * Dashboard principale sempre visibile.
 * In alto a destra: login operatore / utente loggato + logout.
 * Nella parte centrale: form pubblico per verificare una prenotazione tramite codice.
 */
const Dashboard = () => {
  const { user, login, logout, isAuthenticated, loading } = useAuth();
  // Stato per attivare gestione clienti-campi-prrenotazioni-operatori
  const [activeView, setActiveView] = useState("home"); //"clienti", "prenotazioni", "campi", "operatori"

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner-large" />
        <p>Verifica sessione in corso...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <Header activeView={activeView} setActiveView={setActiveView} />
      </div>

      <div className="dashboard-content">
        {/* Sezione pubblica: verifica prenotazione (solo se non loggato e vista home) */}
        {!loading && activeView === 'home' && !isAuthenticated() && (
          <VerificaPrenotazione />
        )}

        {/* Tabelle gestione (solo se loggato) */}
        {!loading && isAuthenticated() && activeView === 'clienti' && (
          <Table
            title="Clienti"
            endpoint={'clienti'}
          />
        )}
        {!loading && isAuthenticated() && activeView === 'prenotazioni' && (
          <Table
            title="Prenotazioni"
            endpoint={'prenotazione'}
          />
        )}
        {!loading && isAuthenticated() && activeView === 'campi' && (
          <Table
            title="Campi"
            endpoint={'campi'}
          />
        )}
        {!loading && isAuthenticated() && activeView === 'operatori' && (
          <Table
            title="Operatori"
            endpoint={'operatore'}
          />
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  );
}

export default App;

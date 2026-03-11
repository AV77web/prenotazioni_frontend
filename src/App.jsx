import { useState } from 'react';
import { AuthProvider, useAuth } from "./components/Context/AuthContext";
import { loginUser, verificaPrenotazione } from "./api.js";

/**
 * Dashboard principale sempre visibile.
 * In alto a destra: login operatore / utente loggato + logout.
 * Nella parte centrale: form pubblico per verificare una prenotazione tramite codice.
 */
const Dashboard = () => {
  const { user, login, logout, isAuthenticated, loading } = useAuth();

  // Stato per il login inline
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Stato per la verifica prenotazione
  const [codice, setCodice] = useState("");
  const [verificaLoading, setVerificaLoading] = useState(false);
  const [verificaError, setVerificaError] = useState("");
  const [prenotazione, setPrenotazione] = useState(null);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    try {
      const data = await loginUser(email, password);
      // Adegua la struttura a ciò che ritorna il backend (es. data.operatore)
      const userData = data.operatore || data.user || null;
      if (!userData) {
        throw new Error("Risposta login non valida");
      }
      login(userData);
      setEmail("");
      setPassword("");
    } catch (err) {
      setLoginError(err.message || "Errore durante il login");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleVerificaSubmit = async (e) => {
    e.preventDefault();
    setVerificaError("");
    setPrenotazione(null);
    setVerificaLoading(true);
    try {
      const data = await verificaPrenotazione(codice);
      setPrenotazione(data);
    } catch (err) {
      setVerificaError(err.message || "Prenotazione non trovata");
    } finally {
      setVerificaLoading(false);
    }
  };

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
        <div className="header-left">
          <h1>Gestione Prenotazioni</h1>
        </div>
        <div className="header-right">
          {isAuthenticated() ? (
            <>
              <span className="user-name">
                👤 {user?.nome} {user?.cognome}
              </span>
              <button onClick={logout} className="btn-logout">
                Logout
              </button>
            </>
          ) : (
            <form onSubmit={handleLoginSubmit} className="inline-login-form">
              <input
                type="email"
                placeholder="Email operatore"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" disabled={loginLoading}>
                {loginLoading ? "Login..." : "Login"}
              </button>
              {loginError && <span className="error-text">{loginError}</span>}
            </form>
          )}
        </div>
      </div>

      {/* Sezione pubblica: verifica prenotazione */}
      <div className="dashboard-content">
        <section className="card verifica-prenotazione-card">
          <h2>Verifica la tua prenotazione</h2>
          <p>Inserisci il codice prenotazione ricevuto al momento della richiesta.</p>
          <form onSubmit={handleVerificaSubmit} className="verifica-form">
            <input
              type="text"
              placeholder="Codice prenotazione"
              value={codice}
              onChange={(e) => setCodice(e.target.value)}
            />
            <button type="submit" disabled={verificaLoading || !codice.trim()}>
              {verificaLoading ? "Verifica in corso..." : "Verifica"}
            </button>
          </form>
          {verificaError && <p className="error-text">{verificaError}</p>}
          {prenotazione && (
            <div className="prenotazione-dettaglio">
              <h3>Dettaglio prenotazione</h3>
              <p><strong>Data:</strong> {prenotazione.data}</p>
              <p><strong>Orario:</strong> {prenotazione.orario}</p>
              <p><strong>Campo:</strong> {prenotazione.campo}</p>
              <p><strong>Stato:</strong> {prenotazione.stato}</p>
            </div>
          )}
        </section>

        {/* Qui puoi aggiungere altre sezioni della dashboard, esposte o solo per operatori */}
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

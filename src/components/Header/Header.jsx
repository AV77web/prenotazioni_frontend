//=======================================================
// File: index.jsx 
// Componente per la gestione dell'Header dell'app
// @author: "andrea.vilari@allievi.itsdigitalacademy.com"
// @version: "1.0.0 2026-03-11"
//=======================================================

import { React, useState } from 'react';
import { useAuth } from "../Context/AuthContext.jsx";
import { loginUser } from "../../api.js";
import "./Header.css";


export const Header = ({ activeView, setActiveView }) => {
    const { user, login, logout, isAuthenticated, loading } = useAuth();
    // activeView e setActiveView arrivano dalla Dashboard (stato unico)
    // Stato per il login inline
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

    const handleLoginSubmit = async (e) => {
      e.preventDefault();
      setLoginError("");
      setLoginLoading(true);
      try {
        console.log("[LOGIN] Tentativo login con:", { email, password });
        const data = await loginUser(email, password);
        console.log("[LOGIN] Risposta backend:", data);
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

    return (
        <div  className="dashboard-header">
            <h1>Gestione Prenotazioni</h1>
            <div className="content-header">
            {!loading && isAuthenticated() && (
                <div className='menu-buttons'>
                    <button onClick={() => setActiveView('clienti')}>Gestione Clienti</button>
                    <button onClick={() => setActiveView('campi')}>Gestione Campi</button>
                    <button onClick={() => setActiveView('prenotazioni')}>Gestione Prenotazioni</button>
                    <button onClick={() => setActiveView('operatori')}>Gestione Operatori</button>
                </div>
            )}
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
        </div>
    )
}

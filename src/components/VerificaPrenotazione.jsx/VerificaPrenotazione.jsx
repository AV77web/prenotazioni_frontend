//======================================================
// File: VerificaPrenotazione.jsx
// componente per verificare la prenotazione di un campo
// @author: "andrea.villari@allievi.itsdigitalacademy.com"
// @version: "1.0.0 2026-03-16"
//======================================================

import { useState } from "react";
import { verificaPrenotazione } from "../../api.js";

export const VerificaPrenotazione = () => {
    const [codice, setCodice] = useState("");
    const [verificaLoading, setVerificaLoading] = useState(false);
    const [verificaError, setVerificaError] = useState("");
    const [prenotazione, setPrenotazione] = useState(null);

    const handleVerificaSubmit = async (e) => {
        e.preventDefault();
        setVerificaError("");
        setPrenotazione(null);
        setVerificaLoading(true);
        try {
            const data = await verificaPrenotazione(codice);
            setPrenotazione(data);
            console.log(prenotazione);
        } catch (err) {
            setVerificaError(err.message || "Prenotazione non trovata");
        } finally {
            setVerificaLoading(false);
        }
    };

    return (
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
                <button
                    type="submit"
                    disabled={verificaLoading || !codice.trim()}
                >
                    {verificaLoading ? "Verifica in corso..." : "Verifica"}
                </button>
            </form>

            {verificaError && <p className="error-text">{verificaError}</p>}

            {prenotazione && (
                <div className="prenotazione-dettaglio">
                    <h3>Dettaglio prenotazione</h3>
                    <p>
                        <strong>Data:</strong> {prenotazione.Data}
                    </p>
                    <p>
                        <strong>Orario Inizio:</strong> {prenotazione.OrarioInizio}
                    </p>
                    <p>
                        <strong>Orario Fine:</strong> {prenotazione.OrarioFine}
                    </p>
                    <p>
                        <strong>Campo</strong>
                    </p>
                    <p>
                        <strong>Stato:</strong> {prenotazione.Stato}
                    </p>
                    <p>
                        <strong>CampoID</strong>
                        {prenotazione.CampoID}
                    </p>
                    <p>
                        <strong>ClienteID</strong>
                        {prenotazione.ClienteID}
                    </p>
                </div>
            )}
        </section>
    );
}

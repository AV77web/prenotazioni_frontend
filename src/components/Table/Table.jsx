//=======================================================
// File: Table.jsx
// Componente Table per 
// @author: "andrea.villari@allievi.itsdigitalacademy.com"
// @version: "1.0.0 2026-03-11"
//=======================================================

import React, { useState, useEffect } from 'react';
import {API_BASE_URL} from "../../api.js";
import "./Table.css";

export const Table = ({ title, data = [], endpoint }) => {
    const [dataTable, setDataTable] = useState([]);

    useEffect(() => {
        if (!endpoint) return;
        fetch(`${API_BASE_URL}/server/${endpoint}`, { credentials: 'include' })
            .then(res => res.json())
            .then(data => { const list = Array.isArray(data) ? data : (data?.data ?? []); setDataTable(list); })
            .catch(() => setDataTable([]));
    }, [endpoint]);

    return (
        <section className="card">
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}>
            {title && <h2>Gestione {title}</h2>}
            <table>
                <thead>
                    <tr>
                        {Array.isArray(dataTable) && dataTable.length > 0 &&
                            Object.keys(dataTable[0]).map((key) => (
                                <th key={key}
                                    style={{
                                            textAlign: "center",
                                            border: "1px solid #3f3f3f" ,
                                            margin: "10px",
                                            padding: "10px",   
                                        }}
                                >
                                    {key}
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {(!Array.isArray(dataTable) || dataTable.length === 0) ? (
                        <tr>
                            <td colSpan={2}>Nessun dato disponibile.</td>
                        </tr>
                    ) : (
                        dataTable.map((row, index) => (
                            <tr key={row.id ?? index}>
                                {Object.keys(row).map((key) => (
                                    <td key={key}
                                        style={{
                                            textAlign: "center",
                                            border: "1px solid #3f3f3f",
                                            margin: "10px",
                                            padding: "10px",
                                        }}
                                    >{typeof row[key] === 'object' ? JSON.stringify(row[key]) : String(row[key])}</td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            </div>
        </section>
    );
};

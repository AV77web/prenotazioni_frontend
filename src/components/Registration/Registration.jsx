//=========================================================
// File: Registration.jsx
// Componente per la pagina di registrazione
// @author : "andrea.villari@allievi.itsdigitalacademy.com"
// @version: "1.0.0 2026-03-10"
//==========================================================

import {useState} from 'react';
import { registerUser} from "../../api.js"

const Registration = ({onSwitchToLogin, onRegistrationSuccess}) => 
{
    const [fromData, setFormDate] = useState({
        nome:'',
        cognome:'',
        email:'',
        password:'',
        confirmPassword:'',
        admin:''
    });

};


export default Registration;
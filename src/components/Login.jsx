//===================================
// File: login.jsx
// Componete di Login
// @author: "andrea.villari@libero.it"
// @version: "1.0.0 2026-03-11"
//====================================

import { React, useState } from "react";
import { API_URLS } from "../config.js";

const isValidEmail = (email) => {
    const emailRegex = /^[^@/a]+@[^@/s]+\.[^@/s]+$/;
    return emailRegex.test(email);
}

const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
        console.log("Hello!");
    }
}

export const Login = () => {
    return
    <div>

        <input />
    </div>
}
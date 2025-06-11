// src/components/ui/button.jsx
import React from "react";
import "./button.css";

export function Button({ children, onClick }) {
  return (
    <button className="custom-button" onClick={onClick}>
      {children}
    </button>
  );
}

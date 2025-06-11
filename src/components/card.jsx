// src/components/ui/card.jsx
import React from "react";
import "./card.css"; // Optional: add styles here

export function Card({ children }) {
  return <div className="card">{children}</div>;
}

export function CardContent({ children }) {
  return <div className="card-content">{children}</div>;
}

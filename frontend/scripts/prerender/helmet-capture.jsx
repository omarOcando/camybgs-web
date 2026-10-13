import { Children } from "react";

// Sustituto de react-helmet-async solo para el prerenderizado (alias en
// scripts/prerender.js): en vez de pintar las etiquetas, las guarda para
// escribirlas en el <head> del HTML de cada página.

let captured = [];

export function Helmet({ children }) {
  captured.push(...Children.toArray(children));
  return null;
}

export function HelmetProvider({ children }) {
  return children;
}

// Devuelve las etiquetas capturadas desde la última llamada y vacía la lista
export function takeCaptured() {
  const elements = captured;
  captured = [];
  return elements;
}

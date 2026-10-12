import { SiVisa, SiAmericanexpress, SiApplepay, SiPaypal } from "react-icons/si";
import { TbBuildingBank } from "react-icons/tb";

// Fila de medios de pago de la sección "Paga como mejor te parezca" de
// Servicios: una pastilla por medio, con el logo en el color de cada marca. Formas de simple-icons (CC0, vía
// react-icons); Mastercard, Google Pay y Klarna se dibujan aquí con sus
// colores reales, que simple-icons da en un solo color.
// Cada logo lleva su viewBox recortado al dibujo, su proporción (ratio =
// ancho / alto de ese viewBox) y una altura propia (h, en px) para que todos
// se vean del mismo peso dentro de pastillas iguales. El ancho se fija a mano
// (h × ratio): react-icons pone width="1em" y con width: auto quedan cuadrados.

// Ruta de Google Pay (simple-icons): la G y la palabra "Pay"
const GPAY_PATH = "M3.963 7.235A3.963 3.963 0 00.422 9.419a3.963 3.963 0 000 3.559 3.963 3.963 0 003.541 2.184c1.07 0 1.97-.352 2.627-.957.748-.69 1.18-1.71 1.18-2.916a4.722 4.722 0 00-.07-.806H3.964v1.526h2.14a1.835 1.835 0 01-.79 1.205c-.356.241-.814.379-1.35.379-1.034 0-1.911-.697-2.225-1.636a2.375 2.375 0 010-1.517c.314-.94 1.191-1.636 2.225-1.636a2.152 2.152 0 011.52.594l1.132-1.13a3.808 3.808 0 00-2.652-1.033zm6.501.55v6.9h.886V11.89h1.465c.603 0 1.11-.196 1.522-.588a1.911 1.911 0 00.635-1.464 1.92 1.92 0 00-.635-1.456 2.125 2.125 0 00-1.522-.598zm2.427.85a1.156 1.156 0 01.823.365 1.176 1.176 0 010 1.686 1.171 1.171 0 01-.877.357H11.35V8.635h1.487a1.156 1.156 0 01.054 0zm4.124 1.175c-.842 0-1.477.308-1.907.925l.781.491c.288-.417.68-.626 1.175-.626a1.255 1.255 0 01.856.323 1.009 1.009 0 01.366.785v.202c-.34-.193-.774-.289-1.3-.289-.617 0-1.11.145-1.479.434-.37.288-.554.677-.554 1.165a1.476 1.476 0 00.525 1.156c.35.308.785.463 1.305.463.61 0 1.098-.27 1.465-.81h.038v.655h.848v-2.909c0-.61-.19-1.09-.568-1.44-.38-.35-.896-.525-1.551-.525zm2.263.154l1.946 4.422-1.098 2.38h.915L24 9.963h-.965l-1.368 3.391h-.02l-1.406-3.39zm-2.146 2.368c.494 0 .88.11 1.156.33 0 .372-.147.696-.44.973a1.413 1.413 0 01-.997.414 1.081 1.081 0 01-.69-.232.708.708 0 01-.293-.578c0-.257.12-.47.363-.647.24-.173.54-.26.9-.26Z";

// Ruta de Klarna (simple-icons): la "K."
const KLARNA_PATH = "M4.592 2v20H0V2h4.592zm11.46 0c0 4.194-1.583 8.105-4.415 11.068l-.278.283L17.702 22h-5.668l-6.893-9.4 1.779-1.332c2.858-2.14 4.535-5.378 4.637-8.924L11.562 2h4.49zM21.5 17a2.5 2.5 0 110 5 2.5 2.5 0 010-5z";

// G de Google en sus cuatro colores: cuñas de color recortadas con la forma de la G
const G_CENTER = [3.963, 11.2];
function gWedge(from, to) {
  const [cx, cy] = G_CENTER;
  const pts = Array.from({ length: 9 }, (_, i) => {
    const a = ((from + ((to - from) * i) / 8) * Math.PI) / 180;
    return `${(cx + 7 * Math.cos(a)).toFixed(3)},${(cy - 7 * Math.sin(a)).toFixed(3)}`;
  });
  return `${cx},${cy} ${pts.join(" ")}`;
}

function GooglePayLogo(props) {
  return (
    <svg viewBox="0 7.1 24 9.8" {...props}>
      <defs>
        <clipPath id="payment-gpay-g">
          <path d={GPAY_PATH} />
        </clipPath>
      </defs>
      <path d={GPAY_PATH} fill="#5F6368" />
      <g clipPath="url(#payment-gpay-g)">
        <rect x="0" y="7" width="8" height="9" fill="#fff" />
        <polygon points={gWedge(0, 165)} fill="#EA4335" />
        <polygon points={gWedge(165, 215)} fill="#FBBC05" />
        <polygon points={gWedge(215, 320)} fill="#34A853" />
        <polygon points={gWedge(320, 360)} fill="#4285F4" />
        <rect x={G_CENTER[0]} y={G_CENTER[1] - 0.8} width="5" height="1.8" fill="#4285F4" />
      </g>
    </svg>
  );
}

function MastercardLogo(props) {
  return (
    <svg viewBox="0 0 38 24" {...props}>
      <defs>
        <clipPath id="payment-mc-red">
          <circle cx="12" cy="12" r="12" />
        </clipPath>
      </defs>
      <circle cx="12" cy="12" r="12" fill="#EB001B" />
      <circle cx="26" cy="12" r="12" fill="#F79E1B" />
      <circle cx="26" cy="12" r="12" fill="#FF5F00" clipPath="url(#payment-mc-red)" />
    </svg>
  );
}

// Placa rosa oficial de Klarna con la "K." en negro
function KlarnaLogo(props) {
  return (
    <svg viewBox="0 0 40 24" {...props}>
      <rect width="40" height="24" rx="5" fill="#FFB3C7" />
      <path d={KLARNA_PATH} fill="#0B051D" transform="translate(12.2 4.5) scale(0.625)" />
    </svg>
  );
}

const METHODS = [
  { name: "Visa",             h: 17, ratio: 24 / 8,    Logo: (p) => <SiVisa viewBox="0 8 24 8" color="#1A1F71" {...p} /> },
  { name: "Mastercard",       h: 26, ratio: 38 / 24,   Logo: MastercardLogo },
  { name: "American Express", h: 30, ratio: 1,         Logo: (p) => <SiAmericanexpress color="#2E77BC" {...p} /> },
  { name: "Apple Pay",        h: 25, ratio: 24.4 / 15.8, Logo: (p) => <SiApplepay viewBox="-0.2 4.1 24.4 15.8" color="#000000" {...p} /> },
  { name: "Google Pay",       h: 21, ratio: 24 / 9.8,  Logo: GooglePayLogo },
  { name: "PayPal",           h: 28, ratio: 20.4 / 24, Logo: (p) => <SiPaypal viewBox="1.8 0 20.4 24" color="#003087" {...p} /> },
  { name: "Klarna",           h: 25, ratio: 40 / 24,   Logo: KlarnaLogo },
];

// bankLabel: "Transferencia" / "Bank transfer" (va con un icono de banco)
function PaymentMethods({ bankLabel }) {
  return (
    <ul className="srv-payment__pills">
      {METHODS.map((m) => (
        <li key={m.name} className="srv-payment__pill">
          <m.Logo role="img" aria-label={m.name} width={m.h * m.ratio} height={m.h} style={{ width: m.h * m.ratio, height: m.h }} />
        </li>
      ))}
      <li className="srv-payment__pill srv-payment__pill--bank">
        <TbBuildingBank aria-hidden="true" />
        <span>{bankLabel}</span>
      </li>
    </ul>
  );
}

export default PaymentMethods;

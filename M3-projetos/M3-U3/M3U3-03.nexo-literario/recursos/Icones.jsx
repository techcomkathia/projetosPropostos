// Ícones do Nexo Literário (biblioteca Lucide), prontos para usar no JSX.
// Copie este arquivo para src/components/ e importe só os que precisar:
//
//   import { IconeMenu, IconeFechar } from "./Icones";
//   <IconeMenu />
//
// Os ícones são decorativos (aria-hidden): quem dá nome ao botão é o
// aria-label do próprio botão. Você não precisa alterar este arquivo.

function Svg({ tamanho = 20, espessura = 2, children, ...resto }) {
  return (
    <svg
      width={tamanho}
      height={tamanho}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={espessura}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...resto}
    >
      {children}
    </svg>
  );
}

// ----- Topo -----

export function IconeMenu() {
  return (
    <Svg tamanho={22}>
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </Svg>
  );
}

export function IconeFechar() {
  return (
    <Svg tamanho={22}>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </Svg>
  );
}

// ----- Carrossel (setas curtas, dentro do círculo) -----

export function IconeSetaEsquerdaCurta() {
  return (
    <Svg>
      <path d="m15 18-6-6 6-6" />
    </Svg>
  );
}

export function IconeSetaDireitaCurta() {
  return (
    <Svg>
      <path d="m9 18 6-6-6-6" />
    </Svg>
  );
}

// ----- Página do livro (voltar, anterior e próximo) -----

export function IconeSetaEsquerda() {
  return (
    <Svg tamanho={16}>
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </Svg>
  );
}

export function IconeSetaDireita() {
  return (
    <Svg tamanho={16}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </Svg>
  );
}

// ----- Avaliação -----
// "preenchimento" vai de 0 (apagada) a 1 (cheia). Ex.: na nota 4.8, a quinta
// estrela recebe 0.8. O cálculo de cada estrela é com você.

export function IconeEstrela({ preenchimento = 1 }) {
  return (
    <Svg tamanho={16} fill="currentColor" opacity={preenchimento}>
      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
    </Svg>
  );
}

// ----- O Clube (pilares) -----

export function IconeLivroAberto() {
  return (
    <Svg tamanho={30} espessura={1.25} className="pilar-clube__icone">
      <path d="M12 7v14" />
      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
    </Svg>
  );
}

export function IconeCalendario() {
  return (
    <Svg tamanho={30} espessura={1.25} className="pilar-clube__icone">
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </Svg>
  );
}

export function IconePena() {
  return (
    <Svg tamanho={30} espessura={1.25} className="pilar-clube__icone">
      <path d="M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z" />
      <path d="M16 8 2 22" />
      <path d="M17.5 15H9" />
    </Svg>
  );
}

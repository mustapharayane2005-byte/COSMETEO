/** Décor de Noël : branche d'eucalyptus, pin et baies dorées (SVG en ligne, purement décoratif). */
export default function NoelDecor({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 240 120" width="240" height="120" fill="none" aria-hidden="true" focusable="false">
      {/* eucalyptus */}
      <path d="M236 8C190 20 150 40 104 74" stroke="#3f6a58" strokeWidth="1.6" strokeLinecap="round" />
      <g fill="#5f8a76">
        <ellipse cx="214" cy="14" rx="9" ry="6" transform="rotate(-20 214 14)" />
        <ellipse cx="205" cy="30" rx="9" ry="6" transform="rotate(25 205 30)" />
        <ellipse cx="184" cy="26" rx="9" ry="6" transform="rotate(-25 184 26)" />
        <ellipse cx="176" cy="44" rx="9.5" ry="6.5" transform="rotate(25 176 44)" />
        <ellipse cx="154" cy="42" rx="9.5" ry="6.5" transform="rotate(-30 154 42)" />
        <ellipse cx="146" cy="60" rx="10" ry="7" transform="rotate(25 146 60)" />
        <ellipse cx="124" cy="60" rx="10" ry="7" transform="rotate(-30 124 60)" />
        <ellipse cx="110" cy="76" rx="10" ry="7" transform="rotate(20 110 76)" />
      </g>
      {/* pin */}
      <path d="M240 56C204 62 172 70 140 96" stroke="#3f6a58" strokeWidth="1.5" strokeLinecap="round" />
      <g stroke="#4f7a68" strokeWidth="1.2" strokeLinecap="round">
        <path d="M222 60l-4 -12M222 60l-2 12M204 66l-5 -12M204 66l-1 13M186 74l-6 -11M186 74l0 13M168 83l-6 -10M168 83l1 12M152 92l-6 -9M152 92l3 11" />
      </g>
      {/* baies dorées */}
      <g fill="#c9a45c">
        <circle cx="232" cy="38" r="4" />
        <circle cx="224" cy="44" r="3.4" />
        <circle cx="160" cy="68" r="3.6" />
        <circle cx="132" cy="84" r="3.2" />
        <circle cx="168" cy="22" r="3.4" />
      </g>
    </svg>
  );
}

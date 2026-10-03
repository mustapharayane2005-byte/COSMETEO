import type { SVGProps } from "react";

const paths = {
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></>,
  heart: <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.4a4.3 4.3 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20Z" />,
  bag: <><path d="M5.5 8h13l-1 12h-11l-1-12Z" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" /></>,
  user: <><circle cx="12" cy="8.5" r="3.8" /><path d="M4.5 20c.6-3.8 3.7-6 7.5-6s6.9 2.2 7.5 6" /></>,
  leaf: <><path d="M5 19C4 10 9 4.5 19.5 4.5c0 10.5-5.5 15-13 14" /><path d="M5 19c3-5 6-7.500 9-9" /></>,
  cross: <path d="M9.500 4h5v5.500H20v5h-5.500V20h-5v-5.500H4v-5h5.500V4Z" />,
  shield: <><path d="M12 3.500 5 6v5.500c0 4.500 3 7.500 7 9 4-1.500 7-4.500 7-9V6l-7-2.500Z" /><path d="m9 12 2.200 2.200L15.500 10" /></>,
  drop: <path d="M12 3.500c3 3.800 6 6.800 6 10.200a6 6 0 0 1-12 0c0-3.400 3-6.400 6-10.200Z" />,
  sun: <><circle cx="12" cy="12" r="3.800" /><path d="M12 3v2.200M12 18.800V21M3 12h2.200M18.800 12H21M5.600 5.600l1.600 1.600M16.800 16.800l1.600 1.600M18.400 5.600l-1.600 1.600M7.200 16.800l-1.600 1.600" /></>,
  hair: <path d="M8 4c-2 4 2 6 0 10s2 5 0 6M12 4c-2 4 2 6 0 10s2 5 0 6M16 4c-2 4 2 6 0 10s2 5 0 6" />,
  bear: <><circle cx="12" cy="13" r="6.500" /><circle cx="6.500" cy="6.500" r="2.200" /><circle cx="17.500" cy="6.500" r="2.200" /><path d="M10 12.500v.01M14 12.500v.01M10.500 16c.8.7 2.200.7 3 0" /></>,
  man: <><circle cx="12" cy="8.500" r="3.600" /><path d="M8.700 7c1-1.800 5.600-1.800 6.600 0M5 20c.5-4 3.400-6 7-6s6.500 2 7 6" /></>,
  sparkle: <path d="M12 3.500l1.800 5.200 5.200 1.800-5.200 1.800L12 17.500l-1.800-5.200L5 10.500l5.200-1.800L12 3.500ZM18.500 16l.7 1.800 1.800.7-1.800.7-.7 1.800-.7-1.800-1.800-.7 1.800-.7.7-1.800Z" />,
  eye: <><path d="M2.500 12S6 6 12 6s9.500 6 9.500 6-3.500 6-9.500 6S2.500 12 2.500 12Z" /><circle cx="12" cy="12" r="2.800" /></>,
  pore: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><path d="M12 12v.01" /></>,
  bottle: <><path d="M10 3h4v3h-4zM8.500 6h7v14a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V6ZM8.500 11h7" /></>,
  menu: <path d="M4 8h16M4 16h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  arrow: <path d="M4 12h15m-5-5 5 5-5 5" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  home: <path d="M4 11 12 4l8 7v8.5a.5.5 0 0 1-.5.5H15v-6H9v6H4.5a.5.5 0 0 1-.5-.5V11Z" />,
  grid: <><rect x="4" y="4" width="6.5" height="6.5" rx="1.2" /><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.2" /><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.2" /><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.2" /></>,
  truck: <><path d="M3 6.5h11V16H3z" /><path d="M14 10h4l3 3v3h-7" /><circle cx="7.5" cy="17" r="1.8" /><circle cx="17.5" cy="17" r="1.8" /></>,
  badge: <><path d="M12 3.5 14.4 5l2.8-.1.9 2.7 2.3 1.6-.9 2.7.9 2.7-2.3 1.6-.9 2.7-2.8-.1L12 20.5 9.6 19l-2.8.1-.9-2.7-2.3-1.6.9-2.7-.9-2.7 2.3-1.6.9-2.7L9.6 5 12 3.5Z" /><path d="m9 12 2.2 2.2L15.5 10" /></>,
  chat: <path d="M4.5 6.5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v7.5a2 2 0 0 1-2 2H11l-4.5 3.5V16a2 2 0 0 1-2-2V6.5Z" />,
  lock: <><rect x="5" y="10.5" width="14" height="9.5" rx="2" /><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5" /></>,
  instagram: <><rect x="4" y="4" width="16" height="16" rx="4.5" /><circle cx="12" cy="12" r="3.6" /><circle cx="16.8" cy="7.2" r=".6" fill="currentColor" /></>,
  facebook: <path d="M14 8.5h2V5.2h-2.3A3.7 3.7 0 0 0 10 8.9V11H8v3.2h2V20h3.2v-5.8h2.3l.5-3.2h-2.8V9.2c0-.4.3-.7.8-.7Z" />,
  tiktok: <path d="M14 4v10.2a3.6 3.6 0 1 1-3.6-3.6M14 4c.3 2.3 1.8 3.8 4.2 4" />,
  whatsapp: <><path d="M3.5 20.5 5 16A8.3 8.3 0 1 1 8.2 19l-4.7 1.5Z" /><path d="M9.2 8.8c.4 2.6 2.4 4.6 5 5.1l1.1-1.2-1.8-1-.8.7a3.6 3.6 0 0 1-2-2l.7-.8-1-1.8-1.2 1Z" /></>,
} as const;

export type IconName = keyof typeof paths;

type Props = SVGProps<SVGSVGElement> & { name: IconName; size?: number };

export default function Icon({ name, size = 22, ...rest }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}

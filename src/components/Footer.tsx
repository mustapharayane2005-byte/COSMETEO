import Link from "next/link";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import Logo from "@/components/ui/Logo";
import { footerColumns, socials } from "@/data/site";
import PaymentMethods from "@/components/PaymentMethods";
import s from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div data-reveal className={`container ${s.main}`}>
        <div className={s.brand}>
          <Reveal>
            <Logo tone="light" />
          </Reveal>
          <p className={s.about}>
            Soins, beauté et bien-être, sélectionnés avec exigence. Livraison au Bénin et à l&apos;international.
          </p>
          <div className={s.brandRow}>
            <PaymentMethods className={s.payDesktop} />
          <ul className={s.socials}>
            {socials.map((so) => (
              <li key={so.icon}>
                <a href={so.href} aria-label={so.label} target="_blank" rel="noopener noreferrer">
                  <Icon name={so.icon} size={20} />
                </a>
              </li>
            ))}
          </ul>
          </div>
        </div>

        {footerColumns.map((col) => (
          <nav key={col.title} aria-label={col.title} className={s.col}>
            <h3 className={s.colTitle}>{col.title}</h3>
            <ul>
              {col.links.map((l) => (
                <li key={l.href + l.label}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <PaymentMethods className={s.payMobile} />
      </div>

      <div className={`container ${s.legal}`}>
        <p>© {new Date().getFullYear()} COSMÉTÉO. Tous droits réservés.</p>
        <ul>
          <li>
            <Link href="/mentions-legales">Mentions légales</Link>
          </li>
          <li>
            <Link href="/cgv">CGV</Link>
          </li>
          <li>
            <Link href="/confidentialite">Confidentialité</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

import Icon from "@/components/ui/Icon";
import { trustItems } from "@/data/site";
import s from "./TrustSection.module.css";

export default function TrustSection() {
  return (
    <section className={s.section} aria-label="Nos engagements">
      <ul className={`container ${s.grid}`} data-reveal>
        {trustItems.map((item) => (
          <li key={item.title} className={s.item}>
            <span className={s.icon}>
              <Icon name={item.icon} size={24} />
            </span>
            <div>
              <h3 className={s.title}>{item.title}</h3>
              <p className={s.text}>{item.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

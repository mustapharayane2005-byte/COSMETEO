import Icon from "@/components/ui/Icon";
import { trustStrip } from "@/data/home";

/** Bande de réassurance. */
export default function TrustSection() {
  return (
    <section className="container pt-11 lg:pt-14" aria-label="Nos engagements">
      <ul className="grid gap-5 rounded-3xl bg-[var(--pastel-sauge)] p-6 md:grid-cols-3 md:p-8" data-reveal>
        {trustStrip.map((item) => (
          <li key={item.title} className="flex items-center gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-[#1A1A1A]">
              <Icon name={item.icon} size={24} />
            </span>
            <div>
              <h3 className="font-ui text-sm font-semibold text-[#1A1A1A]">{item.title}</h3>
              <p className="text-sm text-ink/70">{item.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

import Icon from "@/components/ui/Icon";
import { trustStrip } from "@/data/home";

/** Bande de réassurance. */
export default function TrustSection() {
  return (
    <section className="container pt-14 lg:pt-20" aria-label="Nos engagements">
      <ul className="grid gap-5 rounded-3xl bg-[#FAF8F4] p-6 md:grid-cols-3 md:p-8" data-reveal>
        {trustStrip.map((item) => (
          <li key={item.title} className="flex items-center gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-green">
              <Icon name={item.icon} size={24} />
            </span>
            <div>
              <h3 className="font-ui text-sm font-semibold text-green">{item.title}</h3>
              <p className="text-sm text-ink/70">{item.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

import Link from "next/link";
import { besoins } from "@/data/besoins";

/** Bloc « Que recherchez-vous ? » : pastilles par besoin (accueil et tête de /boutique). */
export default function BesoinsBlock() {
  return (
    <section className="container py-10 md:py-14" aria-labelledby="besoins-title">
      <h2 id="besoins-title" className="h2">
        Que recherchez-vous ?
      </h2>
      <ul className="mt-6 flex flex-wrap gap-2.5">
        {besoins.map((b, i) => (
          <li key={b.slug}>
            <Link
              href={`/besoins/${b.slug}`}
              className={`inline-flex min-h-11 items-center rounded-full border border-line px-5 text-sm font-medium text-green transition-colors hover:border-green ${
                i % 2 ? "bg-blush" : "bg-sage"
              }`}
            >
              {b.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

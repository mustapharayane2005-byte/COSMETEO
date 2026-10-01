import Reveal from "@/components/ui/Reveal";
import CategoryCard from "@/components/CategoryCard";
import { categories } from "@/data/categories";
import { sections } from "@/data/home";
import s from "./CategorySection.module.css";

export default function CategorySection() {
  return (
    <section className={s.section} aria-labelledby="cat-title">
      <div className="container" data-reveal>
        <h2 id="cat-title" className={`h2 ${s.title}`}>
          {sections.categories.title}
        </h2>
      </div>
      {/* Mobile/tablette : rail horizontal. Desktop large : grille de 9. */}
      <ul className={s.rail}>
        {categories.map((c, i) => (
          <li key={c.id} className={s.item}>
            <Reveal delay={i * 0.09}>
              <CategoryCard category={c} />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

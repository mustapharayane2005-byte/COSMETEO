import Reveal from "@/components/ui/Reveal";
import NewsletterForm from "@/components/NewsletterForm";

export default function NewsletterSection() {
  return (
    <section
      className="mx-5 mb-[72px] mt-[72px] rounded-3xl bg-[#F7F6F3] px-6 py-[72px] text-[#5A534E] lg:mt-[120px] lg:mx-4 lg:mb-24 lg:px-12 lg:py-[120px]"
      aria-labelledby="news-title"
     
    >
      <Reveal className="mx-auto max-w-[640px] text-center">
        <h2 id="news-title" className="font-ui text-[clamp(2.5rem,4vw,4rem)] font-normal leading-[1.1]">
          Restez au courant
        </h2>
        <p className="mt-6 font-ui text-lg opacity-85">
          Recevez nos nouveautés, conseils beauté et offres exclusives.
        </p>
        <NewsletterForm />
      </Reveal>
    </section>
  );
}

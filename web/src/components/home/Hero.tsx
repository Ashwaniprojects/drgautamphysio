import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { StarIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";
import { doctor } from "@/lib/data/doctor";

export function Hero() {
  return (
    <section className="bg-paper px-6 md:px-22 py-14 md:py-24">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-18">
        <div className="flex-1 flex flex-col gap-5 max-w-xl">
          <span className="text-[13px] font-bold tracking-[0.12em] uppercase text-primary">
            Physiotherapy &amp; Rehabilitation, Lucknow
          </span>
          <h1 className="font-display text-[38px] md:text-[52px] font-semibold leading-[1.12] text-ink">
            Move better. Feel stronger. Live without limitation.
          </h1>
          <p className="text-[17px] md:text-[18px] leading-relaxed text-ink/70 max-w-[500px]">
            Personalized physiotherapy, rehabilitation and hands-on care by {doctor.name} {doctor.suffix},
            helping patients manage pain, improve movement and return to everyday life.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <Button href="/book">Book Appointment</Button>
            <WhatsAppButton />
          </div>
          <div className="flex flex-col gap-1.5 mt-2 pt-4 border-t border-ink/10">
            <span className="text-sm font-semibold text-ink">
              {doctor.name} {doctor.suffix}
            </span>
            <span className="text-[13px] text-ink/55">
              PhD Scholar &middot; M.P.T. Neuro &middot; Fellowship in Osteopathy, Australia
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} size={15} className="text-accent" />
            ))}
            <span className="text-sm text-ink/60 ml-1">
              4.8 average &middot; 391+ verified reviews on Google &amp; JustDial
            </span>
          </div>
        </div>

        <div className="flex-1 relative w-full max-w-[560px] h-[320px] md:h-[420px]">
          <div className="absolute inset-0 bg-tint rounded-3xl border-[1.5px] border-dashed border-primary/35 flex items-center justify-center text-center p-10">
            <span className="text-sm text-primary font-semibold">
              [PHOTO: {doctor.name} treating a patient at the Subhash Marg clinic]
            </span>
          </div>
          <div className="absolute -left-4 md:-left-7 bottom-6 md:bottom-9 bg-white rounded-2xl px-5 py-4 md:px-6 md:py-5 shadow-[0_16px_40px_rgba(16,30,28,0.16)] w-[210px] md:w-[240px]">
            <span className="font-display text-2xl md:text-3xl font-semibold text-ink leading-none block">
              4.8★
            </span>
            <span className="text-[12.5px] md:text-[13px] text-ink/55 mt-1 block">
              {siteConfig.reviewSummary.replace("4.8★ · ", "")} &middot; Google &amp; JustDial verified
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

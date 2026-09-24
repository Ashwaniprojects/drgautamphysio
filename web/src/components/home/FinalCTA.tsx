import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { PhoneIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";

export function FinalCTA() {
  return (
    <section className="bg-primary-dark px-6 md:px-22 py-16 md:py-20">
      <div className="flex flex-col items-center text-center gap-5 max-w-2xl mx-auto">
        <h2 className="font-display text-[26px] md:text-[36px] font-semibold text-paper">
          Not sure where to start?
        </h2>
        <p className="text-[16px] md:text-[17px] text-paper/75 leading-relaxed">
          Tell us what you&apos;re experiencing. We&apos;ll help you understand the next step.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3.5 mt-2">
          <Button href="/book">Book Appointment</Button>
          <WhatsAppButton className="!border-paper !text-paper hover:!bg-white/10" />
        </div>
        <div className="flex items-center gap-2 text-paper/70 text-sm mt-1">
          <PhoneIcon size={15} />
          <a href={siteConfig.clinicPhoneHref} className="hover:text-paper">
            Call {siteConfig.clinicPhoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}

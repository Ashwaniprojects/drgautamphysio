import { PhoneIcon, ChatIcon, CalendarIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";

export function MobileActionBar() {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 h-[68px] bg-white border-t border-ink/10 shadow-[0_-8px_24px_rgba(27,27,24,0.08)] flex">
      <a href={siteConfig.clinicPhoneHref} className="flex-1 flex flex-col items-center justify-center gap-1 text-primary">
        <PhoneIcon size={19} />
        <span className="text-[11px] font-semibold">Call</span>
      </a>
      <a
        href={siteConfig.whatsappHref}
        className="flex-1 flex flex-col items-center justify-center gap-1 text-primary border-x border-ink/10"
      >
        <ChatIcon size={19} />
        <span className="text-[11px] font-semibold">WhatsApp</span>
      </a>
      <a href="/book" className="flex-[1.3] flex flex-col items-center justify-center gap-1 bg-accent text-white">
        <CalendarIcon size={19} className="text-white" />
        <span className="text-[11px] font-bold">Book</span>
      </a>
    </div>
  );
}

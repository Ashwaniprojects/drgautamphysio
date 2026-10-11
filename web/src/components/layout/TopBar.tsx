import { PhoneIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";

export function TopBar() {
  return (
    <div className="h-10 bg-gradient-to-r from-primary-900 to-primary-800 text-paper flex items-center justify-between px-6 md:px-22 text-[13px] font-medium relative overflow-hidden">
      {/* Subtle animated shimmer */}
      <div className="absolute inset-0 opacity-[0.06]" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)", animation: "shimmer 4s ease infinite" }} />

      <div className="flex items-center gap-2 relative">
        <span className="relative flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <PhoneIcon size={14} />
          <a href={siteConfig.clinicPhoneHref} className="hover:underline font-medium">
            {siteConfig.clinicPhoneDisplay}
          </a>
        </span>
        <span className="hidden sm:inline text-white/40">&nbsp;&middot;&nbsp;3 clinics across Lucknow</span>
      </div>
      <a href={siteConfig.whatsappHref} className="font-semibold hover:underline relative">
        WhatsApp Us
      </a>
    </div>
  );
}

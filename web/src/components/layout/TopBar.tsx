import { PhoneIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site-config";

export function TopBar() {
  return (
    <div className="h-10 bg-primary text-paper flex items-center justify-between px-6 md:px-22 text-[13px] font-medium">
      <div className="flex items-center gap-2">
        <PhoneIcon size={14} />
        <a href={siteConfig.clinicPhoneHref} className="hover:underline">
          {siteConfig.clinicPhoneDisplay}
        </a>
        <span className="hidden sm:inline">&nbsp;&middot;&nbsp;3 clinics across Lucknow</span>
      </div>
      <a href={siteConfig.whatsappHref} className="font-semibold hover:underline">
        WhatsApp Us
      </a>
    </div>
  );
}

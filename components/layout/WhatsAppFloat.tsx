import { WHATSAPP_MESSAGES } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import { WhatsAppOutlineIcon } from "@/components/ui/icons";

/** Botão flutuante de WhatsApp (canto inferior direito). */
export function WhatsAppFloat() {
  return (
    <a
      id="whatsapp-float"
      href={whatsappLink(WHATSAPP_MESSAGES.float)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chamar no WhatsApp"
    >
      <WhatsAppOutlineIcon />
      <span className="wap-label-desktop">WhatsApp</span>
      <span className="wap-label-mobile">→</span>
    </a>
  );
}

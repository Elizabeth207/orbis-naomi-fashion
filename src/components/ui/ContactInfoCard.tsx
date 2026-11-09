import { Mail, MessageCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface ContactInfoCardProps {
  icon: "whatsapp" | "phone" | "mail";
  label: string;
  value: string;
  href?: string;
}

const ICONS: Record<ContactInfoCardProps["icon"], LucideIcon> = {
  whatsapp: MessageCircle,
  phone: Phone,
  mail: Mail,
};

export default function ContactInfoCard({
  icon,
  label,
  value,
  href,
}: ContactInfoCardProps) {
  const Icon = ICONS[icon];
  const iconTint =
    icon === "whatsapp"
      ? "bg-orbis-tint text-orbis-dark group-hover:bg-orbis group-hover:text-white"
      : "bg-ink/5 text-ink group-hover:bg-ink group-hover:text-paper";

  const content = (
    <div className="flex items-center gap-4">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 shrink-0 ${iconTint}`}
      >
        <Icon className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-[0.16em] text-ink-soft font-semibold">{label}</p>
        <p className="text-sm font-medium text-ink truncate">{value}</p>
      </div>
    </div>
  );

  const cardClass =
    "group block border border-line rounded-xl p-5 md:p-6 bg-paper shadow-[0_8px_24px_rgba(34,31,28,0.06)] hover:border-ink/25 hover:shadow-[0_12px_32px_rgba(34,31,28,0.1)] transition-all duration-300";

  if (href) {
    const isExternal =
      href.startsWith("https://") || href.startsWith("mailto:") || href.startsWith("tel:");
    return (
      <motion.a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className={`${cardClass} cursor-pointer`}
      >
        {content}
      </motion.a>
    );
  }

  return <div className={cardClass}>{content}</div>;
}

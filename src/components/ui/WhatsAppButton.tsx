import { motion } from 'framer-motion'

interface WhatsAppButtonProps {
  phone: string;
  label?: string;
  className?: string;
}

export default function WhatsAppButton({ phone, label = "Escribir por WhatsApp", className = "" }: WhatsAppButtonProps) {
  return (
    <motion.a
      href={`https://wa.me/${phone}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-2 ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
      {label}
    </motion.a>
  )
}

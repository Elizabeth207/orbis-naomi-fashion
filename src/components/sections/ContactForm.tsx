import { useState } from "react";
import WhatsAppButton from "../ui/WhatsAppButton";
import { FORMSPREE_ENDPOINT, WHATSAPP_NUMBER } from "../../lib/constants";
import { AnimatePresence, motion } from "framer-motion";

const fieldVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.08 * i, ease: "easeOut" as const },
  }),
};

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [storeInterest, setStoreInterest] = useState("Orbis II");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          storeInterest,
          message,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setName("");
        setEmail("");
        setMessage("");
        setStoreInterest("Orbis II");
      } else {
        setErrorMsg(
          "No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos directo por WhatsApp."
        );
      }
    } catch {
      setErrorMsg(
        "No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos directo por WhatsApp."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full border border-line bg-paper px-4 py-2.5 text-sm focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink/15 transition-all duration-200";

  return (
    <div className="bg-paper border border-line shadow-sm p-8 md:p-9">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35 }}
            className="text-center py-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
              className="w-14 h-14 rounded-full bg-orbis-tint flex items-center justify-center mx-auto mb-5"
            >
              <svg
                className="w-6 h-6 text-orbis-dark"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
            <h3 className="font-serif text-2xl text-ink mb-2">¡Mensaje enviado!</h3>
            <p className="text-sm text-ink-soft mb-6 leading-relaxed">
              Te responderemos pronto. Si es urgente, escríbenos directo por WhatsApp.
            </p>
            <WhatsAppButton phone={WHATSAPP_NUMBER} className="justify-center mx-auto" />
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-serif text-2xl text-ink mb-2">Escríbenos</h3>
            <p className="text-sm text-ink-soft mb-8 leading-relaxed">
              Completa el formulario y te responderemos a la brevedad, o
              escríbenos directo por WhatsApp si prefieres una respuesta más
              rápida.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={fieldVariants} custom={0} initial="hidden" animate="visible">
                <label className="block text-xs uppercase tracking-wide text-ink-soft font-medium mb-1.5">
                  Nombre completo
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                  placeholder="Tu nombre"
                />
              </motion.div>

              <motion.div variants={fieldVariants} custom={1} initial="hidden" animate="visible">
                <label className="block text-xs uppercase tracking-wide text-ink-soft font-medium mb-1.5">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  placeholder="tu@email.com"
                />
              </motion.div>

              <motion.div variants={fieldVariants} custom={2} initial="hidden" animate="visible">
                <label className="block text-xs uppercase tracking-wide text-ink-soft font-medium mb-1.5">
                  ¿Sobre qué tienda nos escribes?
                </label>
                <select
                  value={storeInterest}
                  onChange={(e) => setStoreInterest(e.target.value)}
                  className={inputClass}
                >
                  <option value="Orbis II">Orbis II</option>
                  <option value="Novias Naomi">Novias Naomi</option>
                  <option value="Ambas / No estoy seguro">Ambas / No estoy seguro</option>
                </select>
              </motion.div>

              <motion.div variants={fieldVariants} custom={3} initial="hidden" animate="visible">
                <label className="block text-xs uppercase tracking-wide text-ink-soft font-medium mb-1.5">
                  Mensaje
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${inputClass} resize-none`}
                  placeholder="Escribe tu mensaje aquí..."
                />
              </motion.div>

              <motion.div variants={fieldVariants} custom={4} initial="hidden" animate="visible">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-ink text-paper py-3.5 text-sm font-medium hover:bg-orbis-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {isSubmitting ? "Enviando..." : "Enviar mensaje"}
                </motion.button>
              </motion.div>

              <AnimatePresence>
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -6, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-start gap-2 text-red-700/90 mb-4">
                      <svg
                        className="w-4 h-4 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v3.75m0 3.75h.008M10.29 3.86L1.82 18a1.5 1.5 0 001.29 2.25h17.78a1.5 1.5 0 001.29-2.25L13.71 3.86a1.5 1.5 0 00-2.42 0z"
                        />
                      </svg>
                      <p className="text-sm leading-relaxed">{errorMsg}</p>
                    </div>
                    <WhatsAppButton phone={WHATSAPP_NUMBER} />
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

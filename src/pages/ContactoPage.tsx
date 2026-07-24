import { motion } from "framer-motion";
import { STORES } from "../data/stores";
import { WHATSAPP_NUMBER, CONTACT_EMAIL } from "../lib/constants";
import ContactForm from "../components/sections/ContactForm";
import ContactInfoCard from "../components/ui/ContactInfoCard";
import PhotoOrFallback from "../components/ui/PhotoOrFallback";
import Reveal from "../components/ui/Reveal";

const CONTACT_IMAGE = "/images/tienda/contacto.jpg";

export default function ContactoPage() {
  return (
    <div>
      {/* Editorial intro: foto + titular, como una apertura de revista */}
      <section className="grid grid-cols-1 md:grid-cols-2 border-b border-line overflow-hidden">
        <div className="relative aspect-[4/5] md:aspect-auto md:h-[560px] overflow-hidden order-1">
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="w-full h-full"
          >
            <PhotoOrFallback
              src={CONTACT_IMAGE}
              brand="orbis"
              alt="Conversemos con Orbis II y Novias Naomi"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
        </div>

        <div className="flex flex-col items-start justify-center p-10 md:p-16 order-2 bg-paper">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-sans text-xs uppercase tracking-[0.25em] font-semibold text-ink-soft mb-5"
          >
            Contacto
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="font-script text-5xl md:text-6xl lg:text-7xl text-ink mb-6 leading-none"
          >
            Conversemos
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-12 h-px bg-line mb-6 origin-left"
          />
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
            className="font-sans text-sm text-ink-soft leading-relaxed max-w-sm"
          >
            Escríbenos por el medio que prefieras. Estamos para ayudarte a
            encontrar lo que buscas, sea una prenda casual o el vestido para
            tu próxima gran ocasión.
          </motion.p>
        </div>
      </section>

      <div className="px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto my-16">
          {/* Columna izquierda: Formulario */}
          <Reveal>
            <ContactForm />
          </Reveal>

          {/* Columna derecha: Info de contacto y tiendas */}
          <div className="flex flex-col gap-4">
            <Reveal delay={0.05}>
              <ContactInfoCard
                icon="whatsapp"
                label="WhatsApp"
                value="+51 916 621 772"
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
              />
            </Reveal>
            <Reveal delay={0.12}>
              <ContactInfoCard
                icon="phone"
                label="Teléfono"
                value="+51 916 621 772"
                href="tel:+51916621772"
              />
            </Reveal>
            <Reveal delay={0.19}>
              <ContactInfoCard
                icon="mail"
                label="Correo (opcional)"
                value={CONTACT_EMAIL}
                href={`mailto:${CONTACT_EMAIL}`}
              />
            </Reveal>

            {/* Resumen de tiendas */}
            <Reveal delay={0.26}>
              <div className="mt-4">
                <h4 className="text-xs uppercase tracking-widest text-ink-soft font-semibold mb-3">
                  Nuestras tiendas
                </h4>
                <div className="space-y-3">
                  {STORES.map((store) => {
                    const isOrbis = store.brand === "orbis";
                    const badgeBg = isOrbis ? "bg-orbis-tint" : "bg-naomi-tint";
                    const badgeText = isOrbis ? "text-orbis-dark" : "text-naomi-dark";
                    const accentBorder = isOrbis ? "border-orbis" : "border-naomi";

                    return (
                      <motion.div
                        key={store.id}
                        whileHover={{ y: -2 }}
                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                        className={`border border-line border-l-4 ${accentBorder} p-4 hover:shadow-md transition-shadow`}
                      >
                        <div
                          className={`${badgeBg} ${badgeText} text-[10px] uppercase tracking-widest px-3 py-1 rounded-sm inline-block mb-2`}
                        >
                          {store.name}
                        </div>
                        <h5 className="font-serif text-base text-ink mb-1">{store.name}</h5>
                        <p className="text-xs text-ink-soft mb-1">{store.address}</p>
                        <p className="text-xs text-ink-soft">{store.hours}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}

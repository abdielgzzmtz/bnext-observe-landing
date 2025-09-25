"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Activity, Cpu, Eye, Monitor, Network } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BorderBeam } from "@/components/magicui/border-beam";
import { useTheme } from "next-themes";

export default function Features() {
  type ImageKey = "item-1" | "item-2" | "item-3" | "item-4" | "item-5";

  const [activeItem, setActiveItem] = useState<ImageKey>("item-1");
  const { resolvedTheme } = useTheme();

  // 🔑 Evita mismatch: no uses resolvedTheme hasta que el componente monte
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Asegúrate que coincida con tu ThemeProvider (e.g., defaultTheme="light" o "system")
  const DEFAULT_THEME: "light" | "dark" = "light";
  const effectiveTheme = mounted ? (resolvedTheme === "dark" ? "dark" : "light") : DEFAULT_THEME;

  const images = useMemo(
    () => ({
      "item-1": { image: `/features/devices-list-${effectiveTheme}.png`, alt: "Observe Vision" },
      "item-2": { image: `/features/hardware-${effectiveTheme}.png`, alt: "Observe Hardware" },
      "item-3": { image: `/features/software-${effectiveTheme}.png`, alt: "Observe Operative" },
      "item-4": { image: `/features/connections-${effectiveTheme}.png`, alt: "Observe Connections" },
      "item-5": { image: `/features/platform-${effectiveTheme}.png`, alt: "Observe Platform" },
    }),
    [effectiveTheme]
  );

  // (Opcional) si BorderBeam usa aleatoriedad, pintarlo solo tras montar evita diferencias SSR/CSR
  const showBorderBeam = mounted;

  return (
    <section id="modulos" className="py-12 md:py-20 lg:py-32">
      <div className="bg-linear-to-b inset-0 -z-10 sm:inset-6 sm:rounded-b-3xl dark:block dark:to-[color-mix(in_oklab,var(--color-zinc-900)_75%,var(--color-background))]" />
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16 lg:space-y-20 dark:[--color-border:color-mix(in_oklab,var(--color-white)_10%,transparent)]">
        <div className="relative z-10 mx-auto max-w-2xl space-y-6 text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-6xl">
            Pensado para el retail, preparado para <span className="crayon-underline">todo</span>.
          </h2>
          <p>
            Bnext Observe es un conjunto de soluciones especializadas para el monitoreo y control de operaciones de una
            locación de negocio.
          </p>
        </div>

        <div className="grid gap-12 sm:px-12 md:grid-cols-2 lg:gap-20 lg:px-0">
          <Accordion
            type="single"
            value={activeItem}
            onValueChange={(value) => setActiveItem(value as ImageKey)}
            className="w-full"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex items-center gap-2 text-base">
                  <Eye className="size-4" />
                  Observe Vision
                </div>
              </AccordionTrigger>
              <AccordionContent>
                Modulo de monitoreo en tiempo real de conectividad de cámaras y dispositivos asociados.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                <div className="flex items-center gap-2 text-base">
                  <Cpu className="size-4" />
                  Observe Hardware
                </div>
              </AccordionTrigger>
              <AccordionContent>Visibilidad completa del estado y rendimiento del hardware en cada equipo.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                <div className="flex items-center gap-2 text-base">
                  <Monitor className="size-4" />
                  Observe Operative
                </div>
              </AccordionTrigger>
              <AccordionContent>
                Visibilidad total y control centralizado sobre el software instalado en los equipos en tiempo real.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                <div className="flex items-center gap-2 text-base">
                  <Network className="size-4" />
                  Observe Connections
                </div>
              </AccordionTrigger>
              <AccordionContent>
                Facilitar la gestión centralizada de actualizaciones y parches de seguridad en múltiples dispositivos
                manteniendo su operatividad.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>
                <div className="flex items-center gap-2 text-base">
                  <Activity className="size-4" />
                  Observe Platform
                </div>
              </AccordionTrigger>
              <AccordionContent>Vigila el desempeño de servicios críticos en equipos de cómputo.</AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="bg-background relative flex overflow-hidden rounded-3xl border p-2">
            <div className="w-15 absolute inset-0 right-0 ml-auto border-l bg-[repeating-linear-gradient(-45deg,var(--color-border),var(--color-border)_1px,transparent_1px,transparent_8px)]" />
            <div className="aspect-76/59 bg-background relative w-[calc(3/4*100%+3rem)] rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeItem}-${effectiveTheme}`}
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="size-full overflow-hidden rounded-2xl border bg-zinc-900 shadow-md"
                >
                  {!mounted ? (
                    <div className="size-full animate-pulse bg-zinc-100 dark:bg-zinc-800" aria-hidden />
                  ) : (
                    <Image
                      src={images[activeItem].image}
                      className="size-full object-cover object-left-top dark:mix-blend-lighten"
                      alt={images[activeItem].alt}
                      width={1207}
                      height={929}
                      priority
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {showBorderBeam && (
              <BorderBeam duration={6} size={200} className="from-transparent via-yellow-700 to-transparent dark:via-white/50" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

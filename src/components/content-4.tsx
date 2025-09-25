import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function ContentEcosystemSection() {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
                <div className="grid gap-6 md:grid-cols-2 md:gap-12">
                    <h2 className="text-4xl font-medium">Operación inteligente impulsada por el <span className="crayon-underline">ecosistema</span> Bnext.</h2>
                    <div className="space-y-6">
                        <p>Bnext Observe evoluciona para ser más que una plataforma: es <span className="font-bold">tu socio tecnológico</span>. Integra módulos como Vision, Hardware, Operative, Platform y Connections para centralizar la salud de CCTV, el estado de dispositivos, el desempeño de servicios críticos y la conectividad — facilitando decisiones ágiles y una operación inteligente.</p>
                        <p>
                            Revisa las capacidades de cada producto y cómo se conectan entre sí. Inspírate con casos reales y da el siguiente paso para transformar tu operación.
                        </p>
                        <Button
                            asChild
                            variant="secondary"
                            size="sm"
                            className="gap-1 pr-1.5">
                            <Link href="#contactanos">
                                <span>Descubre cómo</span>
                                <ChevronRight className="size-2" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default function StatsSection() {
    return (
        <section id="solucion" className="py-12 md:py-20">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
                    <h2 className="text-4xl font-medium lg:text-5xl">Datos que impulsan <span className="crayon-underline">resultados</span></h2>
                    <p>Monitorear, comprender y accionar en tiempo real para elevar la eficiencia del negocio.</p>
                </div>

                <div className="grid gap-12 divide-y *:text-center md:grid-cols-3 md:gap-2 md:divide-x md:divide-y-0">
                    <div className="space-y-4">
                        <div className="text-5xl font-bold">+200,000</div>
                        <p>Dispositivos monitoreados</p>
                    </div>
                    <div className="space-y-4">
                        <div className="text-5xl font-bold">+1K</div>
                        <p>Usuarios satisfechos</p>
                    </div>
                    <div className="space-y-4">
                        <div className="text-5xl font-bold">+30,000</div>
                        <p>Ubicaciones monitoreadas</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

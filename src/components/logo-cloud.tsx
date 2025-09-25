import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import Image from 'next/image'

export default function LogoCloud() {
    return (
        <section className="bg-background overflow-hidden py-16">
            <div className="group relative m-auto max-w-7xl px-6">
                <div className="flex flex-col items-center md:flex-row">
                    <div className="md:max-w-44 md:border-r md:pr-6">
                        <p className="text-end text-sm">Con la confianza de grandes marcas</p>
                    </div>
                    <div className="relative py-6 md:w-[calc(100%-11rem)]">
                        <InfiniteSlider
                            speedOnHover={20}
                            speed={40}
                            gap={112}>
                            <div className="flex shrink-0">
                                <img
                                    className="mx-auto h-8 grayscale dark:invert"
                                    src="/clients/oxxo.png"
                                    alt="Oxxo Logo"
                                    height="20"
                                    width="80"
                                />
                            </div>

                            <div className="flex shrink-0">
                                <img
                                    className="mx-auto h-8 dark:invert"
                                    src="/clients/six.png"
                                    alt="Tiendas SIX Logo"
                                    height="20"
                                    width="80"
                                />
                            </div>
                            <div className="flex shrink-0">
                                <Image
                                    className="mx-auto h-10 dark:invert"
                                    src="/clients/bafar.png"
                                    alt="Grupo Bafar Logo"
                                    height="20"
                                    width="80"
                                />
                            </div>

                            <div className="flex shrink-0">
                                <Image
                                    className="mx-auto h-8 dark:invert"
                                    src="/clients/finsa.png"
                                    alt="Finsa Logo"
                                    height="16"
                                    width="80"
                                />
                            </div>
                            <div className="flex shrink-0">
                                <Image
                                    className="mx-auto h-8 dark:invert"
                                    src="/clients/ace-hardware.png"
                                    alt="Laravel Logo"
                                    height="16"
                                    width="80"
                                />
                            </div>
                            <div className="flex shrink-0">
                                <Image
                                    className="mx-auto h-8 dark:invert"
                                    src="/clients/grupo-nazan.png"
                                    alt="GitHub Logo"
                                    height="16"
                                    width="80"
                                />
                            </div>
                        </InfiniteSlider>

                        <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
                        <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
                        <ProgressiveBlur
                            className="pointer-events-none absolute left-0 top-0 h-full w-20"
                            direction="left"
                            blurIntensity={1}
                        />
                        <ProgressiveBlur
                            className="pointer-events-none absolute right-0 top-0 h-full w-20"
                            direction="right"
                            blurIntensity={1}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

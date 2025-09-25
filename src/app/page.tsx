import ContactSection from "@/components/contact"
import ContentSection from "@/components/content-5"
import ContentEcosystemSection from "@/components/content-4"
import Features from "@/components/features-12"
import FooterSection from "@/components/footer"
import HeroSection from "@/components/hero-section"
import IntegrationsSection from "@/components/integrations-6"
import LogoCloud from "@/components/logo-cloud"
import StatsSection from "@/components/stats"

export const metadata = {
    title: 'Bnext Observe',
    description: 'A platform for observing and analyzing business processes',
}

export default async function Page() {
    return (
        <>
        <HeroSection />
        
        <ContentSection />
        <Features />
        <IntegrationsSection />
        <ContentEcosystemSection />
        <StatsSection />
        <LogoCloud />
        <ContactSection />
        <FooterSection />
        </>
    )
}
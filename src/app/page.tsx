import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import ScrollVelocityBanner from '@/components/ScrollVelocityBanner';
import SocialProof from '@/components/SocialProof';
import HowItWorks from '@/components/HowItWorks';
import ProductShowcase from '@/components/ProductShowcase';
import ContentShowcase from '@/components/ContentShowcase';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-surface text-white overflow-x-hidden">
      <Nav />
      <Hero />
      <ScrollVelocityBanner />
      <SocialProof />
      <HowItWorks />
      <ProductShowcase />
      <ContentShowcase />
      <Pricing />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}

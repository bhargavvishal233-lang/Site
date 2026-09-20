import { EditorialHero } from "@/components/sections/EditorialHero";
import { MobileHero } from "@/components/sections/MobileHero";
import { AboutSection } from "@/components/sections/AboutSection";
import { Curved3DGallerySection } from "@/components/sections/Curved3DGallerySection";
import { MobileSwipeGallery } from "@/components/sections/MobileSwipeGallery";
import { WhyChooseUsTimeline } from "@/components/sections/WhyChooseUsTimeline";
import { MobileStatsCarousel } from "@/components/sections/MobileStatsCarousel";
import { Pricing } from "@/components/sections/Pricing";
import { ParallaxGallery } from "@/components/sections/ParallaxGallery";
import { ReservationBookingSection } from "@/components/sections/ReservationBookingSection";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <div className="hidden lg:block">
        <EditorialHero />
      </div>
      <div className="block lg:hidden">
        <MobileHero />
      </div>
      <div className="hidden lg:block">
        <Curved3DGallerySection />
        <WhyChooseUsTimeline />
      </div>
      <div className="block lg:hidden">
        <MobileSwipeGallery />
        <MobileStatsCarousel />
      </div>
      <Pricing />
      <div className="hidden lg:block">
        <ParallaxGallery />
      </div>

      <ReservationBookingSection />
      <AboutSection />
      <FAQ />
      <Footer />
    </>
  );
}

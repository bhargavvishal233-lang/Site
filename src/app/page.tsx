import { EditorialHero } from "@/components/sections/EditorialHero";
import { Curved3DGallerySection } from "@/components/sections/Curved3DGallerySection";
import { WhyChooseUsTimeline } from "@/components/sections/WhyChooseUsTimeline";
import { Pricing } from "@/components/sections/Pricing";
import { ParallaxGallery } from "@/components/sections/ParallaxGallery";
import { ReservationBookingSection } from "@/components/sections/ReservationBookingSection";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <EditorialHero />
      <Curved3DGallerySection />
      <WhyChooseUsTimeline />
      <Pricing />
      <ParallaxGallery />

      <ReservationBookingSection />
      <FAQ />
      <Footer />
    </>
  );
}

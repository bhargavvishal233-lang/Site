import { EditorialHero } from "@/components/sections/EditorialHero";
import { Curved3DGallerySection } from "@/components/sections/Curved3DGallerySection";
import { WhyChooseUsTimeline } from "@/components/sections/WhyChooseUsTimeline";
import { EditorialOfferings } from "@/components/sections/EditorialOfferings";
import { ParallaxGallery } from "@/components/sections/ParallaxGallery";
import { ReservationBookingSection } from "@/components/sections/ReservationBookingSection";
import { EditorialFAQ } from "@/components/sections/EditorialFAQ";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <EditorialHero />
      <Curved3DGallerySection />
      <WhyChooseUsTimeline />
      <EditorialOfferings />
      <ParallaxGallery />
      <ReservationBookingSection />
      <EditorialFAQ />
      <Footer />
    </>
  );
}

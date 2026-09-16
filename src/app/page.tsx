import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight } from "lucide-react";
import { Services } from "@/components/sections/Services";
import { Showcase } from "@/components/sections/Showcase";
import { Pricing } from "@/components/sections/Pricing";

export default function Home() {
  return (
    <>
      {/* Hero Section (From Phase 1) */}
      <section className="relative pt-12 pb-24 overflow-hidden bg-canvas">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-6">
            <Badge>Performance Marketing & Digital Systems</Badge>
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-charcoal max-w-5xl mx-auto leading-[1.1]">
            Engineering Digital Growth That Drives{" "}
            <span className="bracket-accent text-crimson">Real Business Impact</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-charcoal-muted max-w-2xl mx-auto font-normal">
            We combine data-driven performance marketing with custom UI/UX design and scalable software engineering.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="w-full sm:w-auto gap-2" size="lg" variant="primary">
              Start a Project <ArrowRight className="w-4 h-4"/>
            </Button>
            <Button className="w-full sm:w-auto" size="lg" variant="outline">
              Explore Templates & Demos
            </Button>
          </div>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto bg-white p-6 rounded-3xl shadow-card border border-black/5">
            {[
              { value: "150+", label: "Projects Completed" },
              { value: "98%", label: "Client Satisfaction" },
              { value: "5+ Years", label: "Industry Experience" },
              { value: "24/7", label: "Dedicated Support" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-charcoal">{stat.value}</div>
                <div className="text-xs sm:text-sm text-charcoal-muted mt-1 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Phase 2 Sections */}
      <Services/>
      <Showcase/>
      <Pricing/>
    </>
  );
}

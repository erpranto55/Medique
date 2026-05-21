import AvailableTutors from "@/components/AvailableTutors";
import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
import Statistics from "@/components/Statistics";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <div>
      <Hero />
      <Statistics />
      <AvailableTutors />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
    </div>
  );
}

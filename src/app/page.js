import AvailableTutors from "@/components/AvailableTutors";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <div>
      <Hero />
      <AvailableTutors />
      <WhyChooseUs />
      <Testimonials />
    </div>
  );
}

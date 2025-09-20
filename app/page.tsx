import Footer from "./_components/Footer";
import Hero from "./_components/HeroSection";
// import { PopularCityList } from "./_components/PopularCityList";

export const metadata = {
  title: "Tripzy-Ai",
  description: "Your personalized Ai-Trip Planner",
};
export default function Home() {
  return (
    <div>
      <Hero />
      <Footer />
      {/* <PopularCityList /> */}
    </div>
  );
}

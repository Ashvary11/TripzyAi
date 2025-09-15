
import Hero from "./_components/Hero";
import { PopularCityList } from "./_components/PopularCityList";


export const metadata = {
  title: "Tripzy-Ai",
  description: "Your personalized Ai-Trip Planner",
};
export default function Home() {
  return (
    <div>
      <Hero />
      <PopularCityList />
    </div>
  );
}

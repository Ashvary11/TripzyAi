import Link from "next/link";
import Hero from "./_components/Hero";
import { PopularCityList } from "./_components/PopularCityList";
import Image from "next/image";

export const metadata = {
  title: "Tripzy-Ai",
  description: "Your personalized Ai-Trip Planner",
};
export default function Home() {
  return (
    <div>
      <Hero />
      <PopularCityList />
      <div>
        <h1>test</h1>
        <img src="https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg" alt="" width={200} height={200} />
        <Image src="https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg" alt="dummy" width={200} height={200}/>
        {/* <Image src="https://thumbs.dreamstime.com/b/vector-illustration-avatar-dummy-logo-collection-image-icon-stock-isolated-object-set-symbol-web-137160339.jpg" alt="dummy" width={200} height={200} unoptimized/> */}
      </div>
    </div>
  );
}

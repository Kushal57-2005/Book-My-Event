import Events from "../events/Events";
import Navbar from "../layout/Navbar";
import HeroSection from "./HeroSection";
export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Events />
    </>
  );
}

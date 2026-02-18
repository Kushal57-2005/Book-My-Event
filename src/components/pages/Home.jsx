import Events from "../events/Events";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import HeroSection from "./HeroSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Events />
      <Footer />
    </>
  );
}

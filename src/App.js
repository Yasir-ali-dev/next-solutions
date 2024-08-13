import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./LandingPage/Header";
import HeroSection from "./LandingPage/HeroSection";
import NewComponents from "./LandingPage/NewComponents";
import Description from "./LandingPage/Description";
import VideoComponent from "./LandingPage/VideoComponent";
import AllTechPlatform from "./LandingPage/AllTechPlatform";
import Growth from "./LandingPage/Growth";
import Footer from "./LandingPage/Footer";
import Services from "./LandingPage/Services";
import Pricing from "./LandingPage/Pricing";
function App() {
  return (
    <>
      <Header />
      <HeroSection />
      <NewComponents />
      <Services />
      <Description />
      <VideoComponent />
      <AllTechPlatform />
      <Growth />
      <Pricing />
      <Footer />
    </>
  );
}

export default App;

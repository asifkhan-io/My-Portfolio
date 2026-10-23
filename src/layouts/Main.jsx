import { Outlet } from "react-router-dom";
import Footer from "../components/common/footer/Footer";
import LocationMap from "../components/common/locationMap/LocationMap";
import ScrollToTop from "../components/common/scrollToTop/ScrollToTop";

const Main = () => {
  return (
    <div data-theme={"light"} className='relative'>
      <Outlet />
      <LocationMap />
      <footer className='bg-[#2A374A]'>
        <Footer />
      </footer>
      <ScrollToTop />
    </div>
  );
};

export default Main;

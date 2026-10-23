import React, { useState } from "react";
import NavBar from "../components/common/navbar/NavBar";
import Introduction from "../components/introduction/Introduction";
import Profile from "../components/profile/Profile";
import WorkProcess from "../components/workProcess/WorkProcess";
import Portfolio from "../components/portfolio/Portfolio";
import WorkTogether from "../components/workTogether/WorkTogether";
import Profession from "../components/profession/Profession";
import HappyClients from "../components/happyClients/HappyClients";
import Testimonial from "../components/testimonial/Testimonial";
import Contact from "../components/contact/Contact";
import "../../index.css";
import AiAssistant from "../components/AI-assistant/Ai-Assistant";

const Home = () => {
  const [isAiOpen, setIsAiOpen] = useState(false);

  return (
    <div className='relative'>
      <header className='sticky top-0 z-50'>
        <NavBar onAiClick={() => setIsAiOpen(true)} />
      </header>

      <main id='main-content' tabIndex='-1'>
        <div className='introduction-profile-background'>
          <div className='content'>
            <Introduction />
            <Profile />
          </div>
        </div>
        <div className='bg-soft-white pt-30'>
          <WorkProcess />
        </div>
        <Portfolio />
        <div className='bg-gray-900'>
          <WorkTogether />
        </div>
        <div className='bg-soft-white'>
          <Profession />
        </div>
        <HappyClients />
        <Testimonial />
        <Contact />
      </main>

      <AiAssistant isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
    </div>
  );
};

export default Home;

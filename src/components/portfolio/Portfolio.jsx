import Projects from "./Projects";
import card1 from "../../assets/images/portfolio-images/card-1.png";
import card2 from "../../assets/images/portfolio-images/card-2.png";
import card3 from "../../assets/images/portfolio-images/card-3.png";
import card5 from "../../assets/images/portfolio-images/card-5.png";
import card6 from "../../assets/images/portfolio-images/card-6.png";
import aiChatbot from "../../assets/images/portfolio-images/ai-chatbot.svg";

const projectData = [
  {
    id: 1,
    image: card1,
    category: "HEALTHCARE TECH",
    title: "NodeMedCore",
    description:
      "Built a medical billing and revenue cycle platform for independent practices, covering coding, claim submission and denial management so claims go out clean and nothing stalls in a queue.",
    link: "https://nodemedcore.com/",
    linkLabel: "Visit Site",
  },
  {
    id: 2,
    image: card2,
    category: "WEB DEVELOPMENT",
    title: "Jadoo Travel Landing Page",
    description:
      "Built a responsive travel agency landing page with destination showcases, service highlights, top-selling trip cards, a 3-step booking flow and testimonial sections.",
    link: "https://travel-me-lilac.vercel.app/",
    linkLabel: "Visit Site",
  },
  {
    id: 3,
    image: card3,
    category: "E-COMMERCE",
    title: "West Village Academy",
    description:
      "Developed a bilingual K-8 school website on Shopify with online enrollment, news and announcements, photo and video galleries, a school calendar and a staff directory.",
    link: "https://www.westvillageacademy.org/",
    linkLabel: "Visit Site",
  },
  {
    id: 4,
    image: aiChatbot,
    category: "AI APPLICATION",
    title: "Asif AI Chatbot",
    description:
      "Created a responsive AI assistant that helps visitors learn about Asif's skills, experience and projects through a friendly conversational interface.",
    link: "https://asif-chatbot.vercel.app/",
    linkLabel: "Visit Site",
  },
  {
    id: 5,
    image: card5,
    category: "UI-UX DESIGN",
    title: "Product Admin Dashboard",
    description:
      "Implemented interactive charts and widgets to visualize product data effectively for stakeholders.",
    link: "#!",
  },
  {
    id: 6,
    image: card6,
    category: "UI-UX DESIGN",
    title: "Product Admin Dashboard",
    description:
      "Enhanced user experience by streamlining workflows and optimizing interface components and so on.",
    link: "#!",
  },
];

const Portfolio = () => {
  return (
    <section
      className='content mb-10 mt-10 px-2 md:mb-25 md:mt-15 xl:mt-25'
      id='portfolio'
    >
      <div className='mb-8 flex flex-col gap-5 sm:mb-12 md:flex-row md:items-end md:justify-between'>
        <div className='max-w-2xl'>
          <p className='mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-picto-primary'>
            Selected work
          </p>
          <h2 className='section-title'>Projects that make an impact</h2>
          <p className='pt-5 text-sm leading-7 text-slate-500 sm:text-base'>
            Here's a selection of my recent work, showcasing my skills in
            creating user-centric and visually appealing interfaces.
          </p>
        </div>
        <div className='hidden shrink-0 items-center gap-3 text-sm font-medium text-slate-500 md:flex'>
          <span className='h-px w-10 bg-purple-200' />
          <span>{projectData.length} projects</span>
        </div>
      </div>
      <div className='mx-auto grid justify-items-center gap-5 md:grid-cols-2 xl:grid-cols-3'>
        {projectData.map((data) => (
          <Projects data={data} key={data.id} />
        ))}
      </div>
      <div className='mt-12 text-center'>
        <a
          href='https://wa.me/923359763990'
          target='_blank'
          rel='noopener noreferrer'
          className='btn btn-primary px-6 py-3 text-center text-sm font-semibold sm:text-base'
        >
          Start a project
        </a>
      </div>
    </section>
  );
};

export default Portfolio;

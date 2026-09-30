import Projects from "./Projects";
import card1 from "../../assets/images/portfolio-images/card-1.png";
import card2 from "../../assets/images/portfolio-images/card-2.png";
import card3 from "../../assets/images/portfolio-images/card-3.png";
import card4 from "../../assets/images/portfolio-images/card-4.png";
import card5 from "../../assets/images/portfolio-images/card-5.png";
import card6 from "../../assets/images/portfolio-images/card-6.png";

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
    image: card4,
    category: "E-COMMERCE",
    title: "BoldStride Store",
    description:
      "Built a full Shopify storefront for a Pakistani streetwear label, with Men/Women collections, product filtering, cart, COD payments and a customised theme.",
    link: "https://boldstride.shop/",
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
    <div
      className='content mt-10 md:mt-15 xl:mt-25 mb-10 md:mb-25 max-xxl:p-2'
      id='portfolio'
    >
      <div className='xl:mb-17.5 mb-5'>
        <div className='max-sm:px-2 text-center mx-auto max-w-144.25'>
          <p className='section-title '>Portfolio</p>
          <p className='font-normal text-[18px] max-sm:text-[14px] pt-6 text-gray-400'>
            Here's a selection of my recent work, showcasing my skills in
            creating user-centric and visually appealing interfaces.
          </p>
        </div>
      </div>
      <div className='mx-auto flex justify-center'>
        <div className='grid xl:grid-cols-3 md:grid-cols-2 gap-6'>
          {projectData.map((data, index) => (
            <Projects data={data} key={index} />
          ))}
        </div>
      </div>
      <div className='text-center'>
        <a
          href='#!'
          className='btn btn-primary py-3 px-6 mt-12.5 text-center text-[16px] font-semibold'
        >
          More Project
        </a>
      </div>
    </div>
  );
};

export default Portfolio;

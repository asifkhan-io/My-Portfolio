import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import TestimonialTemplate from "./TestimonialTemplate";
import "./testimonial.css";

const testimonialData = [
  {
    message:
      "Asif delivered an outstanding e-commerce platform that perfectly captured our brand vision and exceeded user expectations.",
    quote: `Working with Asif was incredible. He built our complete dashboard with real-time analytics and responsive design. His expertise in React and Node.js made the complex project feel effortless. Communication was excellent throughout, and he delivered ahead of schedule.`,
    name: "Ahmed Khan",
    designation: "CEO, TechVentures Pakistan",
  },
  {
    message:
      "Exceptional React developer who transformed our outdated website into a modern, high-performance platform.",
    quote: `Asif redesigned our entire web presence with Next.js and Tailwind CSS. Page load times improved by 60%, and mobile responsiveness is now flawless. His clean code approach and attention to SEO made a significant impact on our business metrics.`,
    name: "Sarah Mahmood",
    designation: "Marketing Director, Digital Solutions Inc.",
  },
  {
    message:
      "Professional, skilled, and dedicated—Asif is the developer every startup needs for rapid growth.",
    quote: `We hired Asif for API integration and website optimization. He delivered results within 2 weeks that our previous developer couldn't achieve in months. His full-stack capabilities with TypeScript and Node.js were exactly what our project needed. Will definitely collaborate again.`,
    name: "Zain Ul Abideen",
    designation: "Founder, StartupHub Islamabad",
  },
];

const Testimonial = () => {
  return (
    <div className='flex mx-auto justify-center px-2 max-w-218 pb-10 md:pb-25'>
      <div className='w-full h-full cursor-grab'>
        <h2 className='section-title mb-6 text-center'>Client testimonials</h2>
        <Swiper
          id='testimonialSwiper'
          spaceBetween={30}
          navigation={false}
          pagination={{
            clickable: true,
          }}
          modules={[EffectFade, Navigation, Pagination]}
        >
          {testimonialData.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <TestimonialTemplate testimonial={testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;

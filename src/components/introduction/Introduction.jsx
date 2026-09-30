import person from "../../assets/images/person.jpeg";
import "./introduction.css";
import InformationSummary from "./InformationSummary";

// Information summary data
const informationSummaryData = [
  {
    id: 1,
    title: "Experience",
    description: "2+ Year",
  },
  {
    id: 2,
    title: "Projects Completed",
    description: "15+",
  },
  {
    id: 3,
    title: "Happy Clients",
    description: "10+",
  },
];

const Introduction = () => {
  return (
    <div
      className='flex max-lg:flex-col-reverse sm:justify-between pt-10 lg:pt-31.5 lg:mb-27.5 max-xl:gap-2 p-2 max-xxl:px-4'
      id='introduction'
    >
      <div className='w-full flex flex-col justify-between max-lg:text-center'>
        <div className='pt-13 me-31.5 w-full lg:w-auto transition-all duration-500'>
          <p className='text-3xl xxs:text-4xl sm:max-xl:text-5xl xl:text-6xl font-semibold w-full'>
            Hello, I’m
            <span className='text-nowrap shrink-0 inline-block w-full'>
              Asif Khan
            </span>
          </p>
          <p className='text-xs xxs:text-lg lg:text-[18px] my-6'>
            I'm a Freelance <span className='bg-highlight'>UI/UX Designer</span>{" "}
            and <span className='bg-highlight'> Developer</span> based in
            Islamabad, Pakistan.I strive to build immersive and visually
            engaging web applications through carefully crafted code and
            user-centered design.
          </p>
          <p className='text-center lg:text-start'>
            <a
              className='btn-primary btn btn-xs xxs:btn-lg text-white'
              href='https://wa.me/923709199062'
              target='_blank'
              rel='noreferrer'
            >
              Say Hello!
            </a>
          </p>
        </div>
        <div className='mx-auto lg:mx-0 relative'>
          <div className='grid max-xxs:grid-flow-col grid-cols-3 w-fit mt-10 gap-1'>
            {informationSummaryData.map((item) => (
              <InformationSummary key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
      <div
        className={`max-w-134 w-full h-full max-lg:mx-auto aspect-[536/636] relative`}
      >
        <img
          className={`shadow-2xl shadow-gray-200 w-full h-full absolute bottom-0 object-cover bg-white rounded-3xl`}
          src={person}
          alt='person'
        />
      </div>
    </div>
  );
};

export default Introduction;

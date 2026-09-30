import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Projects = ({ data }) => {
  const rawLink = data?.link;
  const hasLiveLink = Boolean(rawLink) && rawLink !== "#!";
  const isExternal = hasLiveLink && /^https?:\/\//i.test(rawLink);
  const linkLabel = data?.linkLabel || "Case Study";

  return (
    <div className='max-w-106 rounded-lg outline-[#FFFFFF] hover:shadow-2xl duration-300 transition-all shadow-gray-300 border border-gray-200'>
      <img src={data?.image} alt={`${data?.title} image`} />
      <div className='p-4 xs:p-8'>
        <p className='text-gray-400 text-xs font-medium'>{data?.category}</p>
        <p className='text-gray-900 text-md xxs:text-lg font-semibold pt-1 mb-3'>
          {data?.title}
        </p>
        <p
          style={{ lineHeight: "20px", letterSpacing: "0%" }}
          className='text-gray-600 text-xs xxs:text-[14px] text-wrap'
        >
          {data?.description}
        </p>
        {hasLiveLink && (
          <a
            href={rawLink}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className='btn hover:border-picto-primary hover:text-picto-primary bg-white text-sm xs:text-[16px] font-semibold hover:gap-3 xs:hover:gap-4 transition-all duration-300 mt-5 xs:py-5.75 px-6 max-sm:w-full'
          >
            {linkLabel}
            <span className='ms-1 xs:ms-3'>
              <FontAwesomeIcon icon={faArrowRight} size='l' className='' />
            </span>
          </a>
        )}
      </div>
    </div>
  );
};

export default Projects;

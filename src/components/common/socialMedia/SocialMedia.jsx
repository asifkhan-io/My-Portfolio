import {
  faGithub,
  faLinkedin,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const socialIcons = [
  {
    id: "github",
    icon: faGithub,
    link: "https://github.com/Asifkhan-io",
    label: "Visit my GitHub profile",
  },
  {
    id: "linkedin",
    icon: faLinkedin,
    link: "https://www.linkedin.com/in/asif-khan-547105375/",
    label: "Visit my LinkedIn profile",
  },
  {
    id: "facebook",
    icon: faFacebookF,
    link: "https://www.facebook.com",
    label: "Visit my Facebook profile",
  },
];

const SocialMedia = () => {
  return (
    <div className='flex gap-3'>
      {socialIcons.map((item) => (
        <a
          key={item.id}
          href={item.link}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={item.label}
          className='text-picto-primary hover:bg-picto-primary p-2 pt-3 xs:p-2.5 sm:p-3 sm:pt-5 md:p-4 md:pt-5 hover:text-white rounded-md'
        >
          <FontAwesomeIcon
            icon={item.icon}
            className='text-xl w-4 aspect-square'
          />
        </a>
      ))}
    </div>
  );
};

export default SocialMedia;

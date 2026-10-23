import { useEffect, useState } from "react";
import logo from "../../../assets/logo.png";
import { Link } from "react-scroll";
import { FiCpu } from "react-icons/fi";

const navItems = [
  { id: 1, name: "About", url: "profile" },
  { id: 3, name: "Process", url: "work-process" },
  { id: 4, name: "Projects", url: "portfolio" },
  { id: 5, name: "Services", url: "services" },
];

const handleMenuClick = () => {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
};

const menu = navItems.map((item) => (
  <li key={item.id} onMouseDown={(e) => e.preventDefault()}>
    <Link
      onClick={handleMenuClick}
      to={item.url.toLowerCase()}
      smooth={true}
      duration={1000}
      spy={true}
      offset={-140}
      activeStyle={{
        backgroundColor: "#9929fb",
        color: "white",
      }}
      className={`hover:text-picto-primary px-5 py-3 mx-1`}
    >
      {item.name}
    </Link>
  </li>
));

const NavBar = ({ onAiClick }) => {
  // Add onAiClick prop
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={` ${
        position > 50
          ? "bg-soft-white border-b border-gray-300"
          : "bg-white border-white"
      } z-50 transition-all duration-1000`}
    >
      <div className='navbar flex justify-between mx-auto content'>
        <div className='flex items-center justify-between'>
          <div className='dropdown'>
            <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h8m-8 6h16'
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className={`menu menu-lg dropdown-content rounded-box z-1 mt-3 w-lvw p-2 shadow font-semibold flex-nowrap bg-white text-black`}
            >
              {menu}
            </ul>
          </div>

          <Link
            href='#introduction'
            to={`introduction`}
            smooth={true}
            duration={900}
            className='flex items-center border-0 lg:max-xxl:ps-5'
          >
            <img src={logo} className='h-8 sm:h-14 rounded-2xl' alt='Asif-Dev logo' />
            <p className='text-2xl sm:text-[32px] my-auto ms-[12px] font-semibold'>
              Asif-Dev
            </p>
          </Link>
        </div>

        <div className='lg:flex items-center'>
          <ul className='hidden lg:flex menu menu-horizontal text-[16px] font-medium md:shrink-0'>
            {menu}
          </ul>
          {/* Replaced Contact button with Ask AI button */}
          <p className=''>
            <button
              onClick={onAiClick}
              className='btn btn-sm xs:btn-md sm:btn-lg bg-gradient-to-r bg-[#9929fb] text-white   border-none transition-all duration-300 hover:scale-105'
            >
              <span className='flex items-center gap-2'>
                <FiCpu />
                <span>Ask AI</span>
              </span>
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

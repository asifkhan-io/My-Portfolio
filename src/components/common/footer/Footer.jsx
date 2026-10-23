import logo from "../../../assets/logo.png";

const navItems = [
  { id: 1, name: "About", url: "profile" },
  { id: 2, name: "Process", url: "work-process" },
  { id: 3, name: "Portfolio", url: "portfolio" },
  { id: 4, name: "Blog", url: "blog" },
  { id: 5, name: "Services", url: "Services" },
  { id: 6, name: "Contact", url: "Contact" },
];
const copyrightYear = new Date().getFullYear();

const Footer = () => {
  return (
    <div className='pt-25 md:pt-40 content max-2xl:px-3'>
      <div className='flex max-md:flex-col justify-between mx-0 items-center h-full w-full text-neutral-200'>
        <a href='#introduction' className='flex items-center border-0'>
          <img src={logo} className='h-8 sm:h-14 rounded-2xl' alt='Asif-Dev logo' />
          <p className='text-3xl sm:text-[32px] my-auto ms-3 font-semibold'>
            Asif-Dev
          </p>
        </a>
        <div className='mx-7 max-md:my-7 text-center'>
          {navItems.map((item) => (
            <a
              key={item.id}
              className='mx-2 group inline-block relative w-fit text-[12px] sm:text-[16px]'
              href={`#${item.url.toLowerCase()}`}
            >
              {item.name}
              <span className='absolute left-0 bottom-0 h-0.5 w-full bg-white scale-x-0 duration-300 group-hover:scale-x-100'></span>
            </a>
          ))}
        </div>
      </div>
      <p className='text-white text-center max-xs:text-[12px] max-md:text-[14px] w-full py-10'>
        Copyright &copy; {copyrightYear} Asif-Dev.{" "}
      </p>
    </div>
  );
};

export default Footer;

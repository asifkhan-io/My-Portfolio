import logo from "../../../assets/logo.png";
import SocialMedia from "../socialMedia/SocialMedia";

const navItems = [
  { id: 1, name: "About", url: "profile" },
  { id: 2, name: "Process", url: "work-process" },
  { id: 3, name: "Portfolio", url: "portfolio" },
  { id: 4, name: "Services", url: "services" },
  { id: 5, name: "Contact", url: "contact" },
];
const copyrightYear = new Date().getFullYear();

const Footer = () => {
  return (
    <div className='content px-4 pb-6 pt-16 text-neutral-200 sm:px-6 md:pt-24'>
      <div className='grid gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.2fr_1fr_1fr] md:gap-8'>
        <div>
          <a href='#introduction' className='flex w-fit items-center border-0'>
            <img
              src={logo}
              className='h-10 rounded-xl sm:h-12'
              alt='Asif-Dev logo'
            />
            <span className='ms-3 text-2xl font-semibold sm:text-3xl'>
              Asif-Dev
            </span>
          </a>
          <p className='mt-4 max-w-sm text-sm leading-6 text-slate-300'>
            Frontend developer and UI/UX designer creating thoughtful,
            high-performing digital experiences from Islamabad, Pakistan.
          </p>
          <div className='mt-5'>
            <SocialMedia />
          </div>
        </div>

        <div>
          <h2 className='mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-white'>
            Explore
          </h2>
          <nav className='grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-3 md:grid-cols-1'>
            {navItems.map((item) => (
              <a
                key={item.id}
                className='group relative w-fit text-sm text-slate-300 transition-colors hover:text-white'
                href={`#${item.url}`}
              >
                {item.name}
                <span className='absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100' />
              </a>
            ))}
          </nav>
        </div>

        <div>
          <h2 className='mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-white'>
            Let’s connect
          </h2>
          <p className='text-sm leading-6 text-slate-300'>
            Have an idea or project in mind? I’d be happy to hear about it.
          </p>
          <a
            href='mailto:asifk.code@gmail.com'
            className='mt-4 inline-block text-sm font-medium text-white transition-colors hover:text-purple-300'
          >
            asifk.code@gmail.com
          </a>
          <a
            href='https://wa.me/923359763990'
            target='_blank'
            rel='noopener noreferrer'
            className='mt-4 block w-fit rounded-lg bg-picto-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-picto-primary-dark'
          >
            Start a conversation
          </a>
        </div>
      </div>

      <div className='flex flex-col items-center justify-between gap-3 pt-6 text-center text-xs text-slate-400 sm:flex-row sm:text-left'>
        <p>Copyright &copy; {copyrightYear} Asif-Dev. All rights reserved.</p>
        <p>Available for freelance opportunities</p>
      </div>
    </div>
  );
};

export default Footer;

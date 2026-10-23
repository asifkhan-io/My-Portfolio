import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Projects = ({ data }) => {
  const rawLink = data?.link;
  const hasLiveLink = Boolean(rawLink) && rawLink !== "#!";
  const isExternal = hasLiveLink && /^https?:\/\//i.test(rawLink);
  const linkLabel = data?.linkLabel || "Case Study";

  return (
    <article className='group flex h-full max-w-106 flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_10px_35px_rgba(19,34,56,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-200 hover:shadow-[0_20px_45px_rgba(19,34,56,0.14)]'>
      <div className='relative aspect-[16/10] overflow-hidden bg-slate-100'>
        <img
          src={data?.image}
          alt={`${data?.title} project preview`}
          className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent opacity-70' />
        <span className='absolute left-4 top-4 rounded-full border border-white/30 bg-slate-900/65 px-3 py-1.5 text-[10px] font-semibold tracking-[0.12em] text-white backdrop-blur-sm'>
          {data?.category}
        </span>
      </div>
      <div className='flex flex-1 flex-col p-5 xs:p-7'>
        <p className='mb-2 text-xs font-medium uppercase tracking-[0.12em] text-picto-primary'>
          Featured project
        </p>
        <h3 className='text-lg font-semibold text-slate-900 xxs:text-xl'>
          {data?.title}
        </h3>
        <p className='mt-3 text-xs leading-6 text-slate-600 xxs:text-sm'>
          {data?.description}
        </p>
        {hasLiveLink && (
          <a
            href={rawLink}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className='mt-auto flex w-fit items-center gap-2 pt-6 text-sm font-semibold text-slate-900 transition-all duration-300 hover:gap-3 hover:text-picto-primary xs:text-base'
          >
            {linkLabel}
            <span className='transition-transform duration-300 group-hover:translate-x-0.5'>
              <FontAwesomeIcon icon={faArrowRight} />
            </span>
          </a>
        )}
      </div>
    </article>
  );
};

export default Projects;

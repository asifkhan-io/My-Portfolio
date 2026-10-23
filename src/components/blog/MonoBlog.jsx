const MonoBlog = ({ data }) => {
  const hasLink = data?.link && data.link !== "#!";

  return (
    <article className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-gray-300 transition-all duration-300 hover:shadow-2xl">
      {hasLink ? (
        <a href={data.link}>
          <img
            src={data?.image}
            alt={data?.title}
            className="h-56.5 w-full object-cover"
          />
          <div className="m-6">
            <p className="text-[10px] font-normal text-gray-400 xs:text-[14px]">
              Coming soon
            </p>
            <h3 className="text-[14px] font-medium text-[#333333] xs:text-lg">
              {data?.title}
            </h3>
          </div>
        </a>
      ) : (
        <>
        <img
          src={data?.image}
          alt={data?.title}
          className="h-56.5 w-full object-cover"
        />
          <div className="m-6">
            <p className="text-[10px] font-normal text-gray-400 xs:text-[14px]">
              Coming soon
            </p>
            <h3 className="text-[14px] font-medium text-[#333333] xs:text-lg">
              {data?.title}
            </h3>
          </div>
        </>
      )}
    </article>
  );
};

export default MonoBlog;

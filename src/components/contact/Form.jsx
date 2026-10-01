
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const telegramSVG = (
  <svg
    className='w-4 md:w-6 aspect-square'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    role='img'
    aria-label='Telegram icon'
  >
    <title>Telegram</title>
    <path
      d='M20.34 9.32013L6.34 2.32013C5.78749 2.04514 5.16362 1.94724 4.55344 2.03978C3.94326 2.13232 3.37646 2.4108 2.93033 2.83724C2.48421 3.26369 2.18046 3.81735 2.0605 4.42274C1.94054 5.02813 2.0102 5.65578 2.26 6.22013L4.66 11.5901C4.71446 11.72 4.74251 11.8593 4.74251 12.0001C4.74251 12.1409 4.71446 12.2803 4.66 12.4101L2.26 17.7801C2.0567 18.2368 1.97076 18.7371 2.00998 19.2355C2.0492 19.7339 2.21235 20.2145 2.48459 20.6338C3.56883 21.6363 4.00812 21.875 4.50009 22 5 22.0001C5.46823 21.9955 5.92949 21.8861 6.35 21.6801L20.35 14.6801C20.8466 14.4303 21.264 14.0474 21.5557 13.5742C21.8474 13.101 22.0018 12.556 22.0018 12.0001C22.0018 11.4442 21.8474 10.8993 21.5557 10.4261C21.264 9.95282 20.8466 9.56994 20.35 9.32013H20.34Z'
      fill='white'
    />
  </svg>
);

const commonClass =
  "input input-lg border-0 border-b-2 focus:outline-none focus:placeholder:text-picto-primary placeholder:text-[15px] md:placeholder:text-lg focus:border-picto-primary border-[#E6E8EB] w-full rounded-none px-0";

const Form = () => {
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formRef = useRef(null);
  const textareaRef = useRef(null);

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);

      setStatus({
        type: "success",
        message: "Message sent successfully!",
      });

      formRef.current.reset();

      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus({
        type: "error",
        message: "Failed to send message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='overflow-hidden'>
      <p className='text-[12px] xs:text-[14px] max-lg:text-center sm:text-lg font-normal text-soft-dark'>
        I'm always open to discussing product design work or partnership
        opportunities.
      </p>

      <div className='mx-2'>
        <form
          ref={formRef}
          className='flex flex-col gap-4 mt-4'
          onSubmit={handleSubmit}
        >
          <input
            type='text'
            placeholder='Name*'
            name='name'
            autoComplete='name'
            className={commonClass}
            required
          />

          <input
            type='email'
            placeholder='Email*'
            name='email'
            autoComplete='email'
            className={commonClass}
            required
          />

          <input
            type='text'
            placeholder='Location*'
            name='location'
            autoComplete='address-level1'
            className={commonClass}
            required
          />

          <div className='flex max-xs:flex-col max-xs:gap-4'>
            <input
              type='text'
              placeholder='Budget*'
              name='budget'
              className={`${commonClass} xs:w-[50%] me-5`}
              required
            />

            <input
              type='text'
              placeholder='Subject*'
              name='subject'
              className={commonClass}
              required
            />
          </div>

          <textarea
            ref={textareaRef}
            placeholder='Message*'
            name='message'
            rows={1}
            onInput={handleInput}
            className={`${commonClass} w-full resize-none overflow-hidden whitespace-pre-wrap break-words leading-relaxed`}
            required
          />

          {status && (
            <div
              className={`text-sm px-4 py-2 rounded ${
                status.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
              role='alert'
            >
              {status.message}
            </div>
          )}

          <button
            type='submit'
            disabled={isSubmitting}
            className='btn gap-3 max-lg:mx-auto btn-primary rounded-sm mt-5 text-[13px] md:text-[16px] w-fit font-semibold lg:mt-12 p-2 md:px-4 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isSubmitting ? "Sending..." : "Submit"} {telegramSVG}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
